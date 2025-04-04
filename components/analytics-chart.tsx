"use client"

import { useEffect, useRef } from "react"

interface AnalyticsChartProps {
  data: any[]
  dataKey: string
}

export function AnalyticsChart({ data, dataKey }: AnalyticsChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with higher resolution for retina displays
    const dpr = window.devicePixelRatio || 1
    const rect = canvasRef.current.getBoundingClientRect()
    canvasRef.current.width = rect.width * dpr
    canvasRef.current.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Chart data
    const thisMonthData = data.map((item) => ({
      day: new Date(item["blinkit_insights_sku.created_at"]).getDate(),
      value: item[dataKey] || 0,
    }))

    // Generate last month data (for demo purposes - slightly lower than this month)
    const lastMonthData = thisMonthData.map((item) => ({
      day: item.day,
      value: item.value * 0.9,
    }))

    // Get days from data or use default range
    const days = thisMonthData.length > 0 ? thisMonthData.map((item) => item.day) : [1, 5, 10, 15, 20, 25, 28]

    // Chart dimensions
    const chartWidth = rect.width
    const chartHeight = rect.height
    const padding = { top: 10, right: 10, bottom: 20, left: 10 }
    const graphWidth = chartWidth - padding.left - padding.right
    const graphHeight = chartHeight - padding.top - padding.bottom - 15 // Added extra space for legend

    // Find max value for scaling
    const allValues = [...thisMonthData.map((d) => d.value), ...lastMonthData.map((d) => d.value)]
    const maxValue = Math.max(...allValues) * 1.2 || 4.5
    const yScale = graphHeight / maxValue

    // X-axis scale
    const xScale = graphWidth / (days.length - 1)

    // Draw dotted horizontal lines
    ctx.beginPath()
    ctx.strokeStyle = "#ebebeb"
    ctx.setLineDash([2, 2])

    const yValues = [maxValue * 0.33, maxValue * 0.66, maxValue]
    yValues.forEach((value) => {
      const y = padding.top + graphHeight - value * yScale
      ctx.moveTo(padding.left, y)
      ctx.lineTo(padding.left + graphWidth, y)
    })
    ctx.stroke()
    ctx.setLineDash([])

    // Draw x-axis labels
    ctx.fillStyle = "#8c9198"
    ctx.font = "10px sans-serif"
    ctx.textAlign = "center"
    days.forEach((day, i) => {
      const x = padding.left + i * xScale
      ctx.fillText(day.toString(), x, chartHeight - 15) // Adjusted position for legend space
    })

    // Draw last month line (dotted orange)
    ctx.beginPath()
    ctx.strokeStyle = "#ea6153"
    ctx.setLineDash([2, 2])
    ctx.lineWidth = 2

    lastMonthData.forEach((item, i) => {
      const x = padding.left + i * xScale
      const y = padding.top + graphHeight - item.value * yScale

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.stroke()
    ctx.setLineDash([])

    // Draw this month line (solid green)
    ctx.beginPath()
    ctx.strokeStyle = "#1d874f"
    ctx.lineWidth = 2

    thisMonthData.forEach((item, i) => {
      const x = padding.left + i * xScale
      const y = padding.top + graphHeight - item.value * yScale

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.stroke()

    // Draw dots for this month line
    thisMonthData.forEach((item, i) => {
      const x = padding.left + i * xScale
      const y = padding.top + graphHeight - item.value * yScale

      ctx.beginPath()
      ctx.fillStyle = "#1d874f"
      ctx.arc(x, y, 3, 0, Math.PI * 2)
      ctx.fill()
    })

    // Draw legend with proper spacing
    const legendY = chartHeight - 5

    // Calculate text widths to prevent overlap
    ctx.font = "10px sans-serif"
    const thisMonthTextWidth = ctx.measureText("This Month").width
    const lastMonthTextWidth = ctx.measureText("Last Month").width

    // This month legend
    ctx.beginPath()
    ctx.fillStyle = "#1d874f"
    ctx.arc(padding.left + 5, legendY, 3, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = "#4f4d55"
    ctx.textAlign = "left"
    ctx.fillText("This Month", padding.left + 12, legendY + 3)

    // Last month legend - position based on first legend width
    const lastMonthX = padding.left + 12 + thisMonthTextWidth + 30 // Add 30px spacing between legends

    ctx.beginPath()
    ctx.fillStyle = "#ea6153"
    ctx.arc(lastMonthX, legendY, 3, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = "#4f4d55"
    ctx.fillText("Last Month", lastMonthX + 7, legendY + 3)
  }, [data, dataKey])

  return (
    <div className="h-[120px] w-full">
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </div>
  )
}

