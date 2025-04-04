"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, ChevronDown, Info } from "lucide-react"
import { AnalyticsChart } from "@/components/analytics-chart"
import { DataTable } from "@/components/data-table"
import { PlatformTabs } from "@/components/platform-tabs"
import { Sidebar } from "@/components/sidebar"
import { TopCitiesChart } from "@/components/top-cities-chart"
import { DateRangePicker } from "@/components/date-range-picker"
import { dashboardData } from "@/data/dashboard-data"
import { fetchCubeData } from "@/lib/cube-api"

export default function Dashboard() {
  const [analyticsData, setAnalyticsData] = useState<any>({
    salesMrp: { total: 0, data: [] },
    qtySold: { total: 0, data: [] },
    topCities: { total: 0, data: [] },
    skuData: [],
    cityData: [],
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Find cards by their IDs
        const salesMrpCard = dashboardData.cards.find((card) => card.id === "blinkit-insights-sku-sales_mrp")
        const qtySoldCard = dashboardData.cards.find((card) => card.id === "blinkit-insights-sku-qty_sold")
        const topCitiesCard = dashboardData.cards.find((card) => card.id === "blinkit-insights-city-sales_mrp_sum")
        const skuTableCard = dashboardData.cards.find((card) => card.id === "blinkit-insights-sku")
        const cityTableCard = dashboardData.cards.find((card) => card.id === "blinkit-insights-city")

        // Parse queries and fetch data
        const salesMrpData = salesMrpCard ? await fetchCubeData(JSON.parse(salesMrpCard.query)) : null
        const qtySoldData = qtySoldCard ? await fetchCubeData(JSON.parse(qtySoldCard.query)) : null
        const topCitiesData = topCitiesCard ? await fetchCubeData(JSON.parse(topCitiesCard.query)) : null
        const skuTableData = skuTableCard ? await fetchCubeData(JSON.parse(skuTableCard.query)) : null
        const cityTableData = cityTableCard ? await fetchCubeData(JSON.parse(cityTableCard.query)) : null

        setAnalyticsData({
          salesMrp: {
            total: salesMrpData?.[0]?.data?.[0]?.["blinkit_insights_sku.sales_mrp_sum"] || 125.49,
            data: salesMrpData?.[1]?.data || [],
          },
          qtySold: {
            total: qtySoldData?.[0]?.data?.[0]?.["blinkit_insights_sku.qty_sold"] || 125.49,
            data: qtySoldData?.[1]?.data || [],
          },
          topCities: {
            total:
              topCitiesData?.[0]?.data?.reduce(
                (sum: number, item: any) => sum + (item["blinkit_insights_city.sales_mrp_sum"] || 0),
                0,
              ) || 68.2,
            data: topCitiesData?.[0]?.data || [],
          },
          skuData: skuTableData?.[0]?.data || [],
          cityData: cityTableData?.[0]?.data || [],
        })
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="flex h-screen bg-[#fafafa]">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <ArrowLeft className="w-5 h-5 text-[#8c9198]" />
              <h1 className="text-lg font-medium">Quick Commerce</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full border border-[#8c9198] flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#027056] rounded-full"></div>
                  </div>
                </div>
                <div className="h-5 border-r border-[#d9d9d9]"></div>
              </div>
              <DateRangePicker />
            </div>
          </div>

          <PlatformTabs />

          <div className="grid grid-cols-3 gap-6 mt-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-[#4f4d55]">Sales (MRP)</h3>
                <Info className="w-4 h-4 text-[#8c9198]" />
              </div>
              <div className="flex flex-col mb-1">
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-semibold">
                    {/* ₹{analyticsData.salesMrp.total.toLocaleString("en-IN", { maximumFractionDigits: 2 })} */}
                  </span>
                  <div className="flex items-center text-xs text-[#1d874f]">
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
                    <span>2.4%</span>
                  </div>
                </div>
              </div>
              <div className="text-xs text-[#8c9198] mb-4">vs ₹119.69 last month</div>
              <AnalyticsChart data={analyticsData.salesMrp.data} dataKey="blinkit_insights_sku.sales_mrp_sum" />
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-[#4f4d55]">Total Quantity Sold</h3>
                <Info className="w-4 h-4 text-[#8c9198]" />
              </div>
              <div className="flex flex-col mb-1">
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-semibold">
                    {analyticsData.qtySold.total.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                  </span>
                  <div className="flex items-center text-xs text-[#1d874f]">
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
                    <span>2.4%</span>
                  </div>
                </div>
              </div>
              <div className="text-xs text-[#8c9198] mb-4">vs 119.69 last month</div>
              <AnalyticsChart data={analyticsData.qtySold.data} dataKey="blinkit_insights_sku.qty_sold" />
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-[#4f4d55]">Top Cities</h3>
                <Info className="w-4 h-4 text-[#8c9198]" />
              </div>
              <TopCitiesChart data={analyticsData.topCities.data} total={analyticsData.topCities.total} />
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-base font-semibold">SKU level data</h2>
                <p className="text-xs text-[#8c9198]">Analytics for all your SKUs</p>
              </div>
              <button className="bg-[#027056] text-white text-sm px-3 py-1.5 rounded-md flex items-center gap-1">
                Filters(1)
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <DataTable type="sku" data={analyticsData.skuData} isLoading={isLoading} />
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-base font-semibold">City level data</h2>
                <p className="text-xs text-[#8c9198]">Analytics for all your Cities</p>
              </div>
              <button className="bg-[#027056] text-white text-sm px-3 py-1.5 rounded-md flex items-center gap-1">
                Filters(1)
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <DataTable type="city" data={analyticsData.cityData} isLoading={isLoading} />
          </div>
        </div>
      </main>
    </div>
  )
}

