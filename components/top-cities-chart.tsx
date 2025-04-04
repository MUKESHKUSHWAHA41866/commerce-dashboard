"use client"

import { useEffect, useRef } from "react"

interface TopCitiesChartProps {
  data: any[]
  total: number
}

export function TopCitiesChart({ data, total }: TopCitiesChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Format city data
  const cityData =
    data.length > 0
      ? data.slice(0, 3).map((city, index) => {
          const colors = ["#6c4fed", "#ea6153", "#f7c245"]
          return {
            name: city["blinkit_insights_city.name"] || `City ${index + 1}`,
            value: city["blinkit_insights_city.sales_mrp_sum"] || 0,
            percent: (((city["blinkit_insights_city.sales_mrp_sum"] || 0) / total) * 100).toFixed(0) + "%",
            color: colors[index],
            change: index === 1 ? -3.3 : (Math.random() * 3).toFixed(1),
          }
        })
      : [
          { name: "New Delhi", value: 26500000, percent: "33%", color: "#6c4fed", change: 1.8 },
          { name: "Mumbai", value: 1640000, percent: "21%", color: "#ea6153", change: -3.3 },
          { name: "West Bengal", value: 1220000, percent: "15%", color: "#f7c245", change: 2.2 },
        ]

  // Calculate others
  const othersValue = total - cityData.reduce((sum, city) => sum + city.value, 0)
  const othersPercent = ((othersValue / total) * 100).toFixed(0) + "%"

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

    // Chart dimensions
    const chartWidth = rect.width
    const chartHeight = 100
    const centerX = chartWidth / 2
    const centerY = chartHeight / 2
    const radius = Math.min(centerX, centerY) - 10

    // Draw gauge background
    const gradient = ctx.createLinearGradient(0, 0, chartWidth, 0)
    gradient.addColorStop(0, "#6c4fed")
    gradient.addColorStop(0.4, "#ea6153")
    gradient.addColorStop(0.7, "#f7c245")
    gradient.addColorStop(1, "#dfeae8")

    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, Math.PI, 0)
    ctx.lineWidth = 15
    ctx.strokeStyle = gradient
    ctx.stroke()

    // Draw needle
    const needleValue = 0.6 // 60% of the way
    const needleAngle = Math.PI - needleValue * Math.PI

    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(centerX + radius * 0.7 * Math.cos(needleAngle), centerY + radius * 0.7 * Math.sin(needleAngle))
    ctx.lineWidth = 2
    ctx.strokeStyle = "#4f4d55"
    ctx.stroke()

    // Draw center circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, 5, 0, Math.PI * 2)
    ctx.fillStyle = "#4f4d55"
    ctx.fill()
  }, [data, total])

  // Format total for display
  const formattedTotal = total >= 100000 ? `₹${(total / 100000).toFixed(1)}L` : `₹${total.toLocaleString("en-IN")}`

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="h-[100px] w-full">
          <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
        </div>
        <div className="text-center -mt-2">
          <div className="text-2xl font-semibold">{formattedTotal}</div>
          <div className="flex items-center justify-center text-xs text-[#1d874f]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 12.6667V3.33334"
                stroke="#1d874f"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 7.33334L8 3.33334L12 7.33334"
                stroke="#1d874f"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>2.2%</span>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {cityData.map((city, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: city.color }}></div>
              <span>{city.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium">
                {city.value >= 100000
                  ? `₹${(city.value / 100000).toFixed(1)}L`
                  : `₹${city.value.toLocaleString("en-IN")}`}
              </span>
              <span className="text-xs text-[#8c9198]">{city.percent}</span>
              <div
                className={`flex items-center text-xs ${Number(city.change) >= 0 ? "text-[#1d874f]" : "text-[#db3500]"}`}
              >
                {Number(city.change) >= 0 ? (
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8 12.6667V3.33334"
                      stroke="#1d874f"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 7.33334L8 3.33334L12 7.33334"
                      stroke="#1d874f"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8 3.33334V12.6667"
                      stroke="#db3500"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 8.66666L8 12.6667L4 8.66666"
                      stroke="#db3500"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                <span>{Math.abs(Number(city.change))}%</span>
              </div>
            </div>
          </div>
        ))}

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-[#d9d9d9]"></div>
            <span>Others</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">
              {othersValue >= 100000
                ? `₹${(othersValue / 100000).toFixed(1)}L`
                : `₹${othersValue.toLocaleString("en-IN")}`}
            </span>
            <span className="text-xs text-[#8c9198]">{othersPercent}</span>
            <div className="flex items-center text-xs text-[#1d874f]">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8 12.6667V3.33334"
                  stroke="#1d874f"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 7.33334L8 3.33334L12 7.33334"
                  stroke="#1d874f"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>1.09%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

