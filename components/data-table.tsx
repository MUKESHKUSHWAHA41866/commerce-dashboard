"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface DataTableProps {
  type: "sku" | "city"
  data: any[]
  isLoading: boolean
}

export function DataTable({ type, data, isLoading }: DataTableProps) {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set([0, 1]))

  // Use the provided data or fallback to demo data if empty
  const tableData = data.length > 0 ? data : type === "sku" ? skuDemoData : cityDemoData

  const toggleRow = (id: number) => {
    const newSelected = new Set(selectedRows)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedRows(newSelected)
  }

  const toggleAllRows = () => {
    if (selectedRows.size === tableData.length) {
      setSelectedRows(new Set())
    } else {
      setSelectedRows(new Set(tableData.map((_, index) => index)))
    }
  }

  return (
    <div className="bg-white rounded-lg border border-[#ebebeb] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#f7f7f7] border-b border-[#ebebeb]">
              <th className="w-8 p-3">
                <input
                  type="checkbox"
                  className="rounded border-[#d9d9d9]"
                  checked={selectedRows.size === tableData.length && tableData.length > 0}
                  onChange={toggleAllRows}
                />
              </th>
              <th className="p-3 text-left text-sm font-medium text-[#4f4d55]">
                <div className="flex items-center gap-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 4H14" stroke="#8c9198" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 8H14" stroke="#8c9198" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path
                      d="M2 12H14"
                      stroke="#8c9198"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{type === "sku" ? "SKU Name" : "City Name"}</span>
                </div>
              </th>
              <th className="p-3 text-left text-sm font-medium text-[#4f4d55]">
                <div className="flex items-center gap-1">
                  <span>Sales</span>
                  <ChevronDown className="w-4 h-4 text-[#8c9198]" />
                </div>
              </th>
              <th className="p-3 text-center text-sm font-medium text-[#4f4d55] border-l border-[#ebebeb]" colSpan={2}>
                <div className="flex items-center justify-center">
                  <span>Availability</span>
                </div>
              </th>
              <th className="p-3 text-left text-sm font-medium text-[#4f4d55]">
                <div className="flex items-center gap-1">
                  <span>Out of Stock</span>
                  <ChevronDown className="w-4 h-4 text-[#8c9198]" />
                </div>
              </th>
              <th className="p-3 text-left text-sm font-medium text-[#4f4d55]">
                <div className="flex items-center gap-1">
                  <span>Total Inventory</span>
                  <ChevronDown className="w-4 h-4 text-[#8c9198]" />
                </div>
              </th>
              <th className="p-3 text-center text-sm font-medium text-[#4f4d55] border-l border-[#ebebeb]" colSpan={2}>
                <div className="flex items-center justify-center">
                  <span>Visibility</span>
                </div>
              </th>
              <th className="p-3 text-left text-sm font-medium text-[#4f4d55]">
                <div className="flex items-center gap-1">
                  <span>Average Rank</span>
                  <ChevronDown className="w-4 h-4 text-[#8c9198]" />
                </div>
              </th>
              <th className="p-3 text-left text-sm font-medium text-[#4f4d55]">
                <div className="flex items-center gap-1">
                  <span>Est. Traffic</span>
                  <ChevronDown className="w-4 h-4 text-[#8c9198]" />
                </div>
              </th>
              <th className="p-3 text-left text-sm font-medium text-[#4f4d55]">
                <div className="flex items-center gap-1">
                  <span>Est. Impressions</span>
                  <ChevronDown className="w-4 h-4 text-[#8c9198]" />
                </div>
              </th>
              <th className="p-3 text-left text-sm font-medium text-[#4f4d55]">
                <div className="flex items-center gap-1">
                  <span>Clicks</span>
                  <ChevronDown className="w-4 h-4 text-[#8c9198]" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={13} className="p-4 text-center">
                  Loading data...
                </td>
              </tr>
            ) : (
              tableData.map((item, index) => (
                <tr key={index} className="border-b border-[#ebebeb] hover:bg-[#f7f7f7]">
                  <td className="p-3">
                    <input
                      type="checkbox"
                      className="rounded border-[#d9d9d9]"
                      checked={selectedRows.has(index)}
                      onChange={() => toggleRow(index)}
                    />
                  </td>
                  <td className="p-3 text-sm">
                    {type === "sku"
                      ? item["blinkit_insights_sku.name"] || `Product ${index + 1}`
                      : item["blinkit_insights_city.name"] || `City ${index + 1}`}
                  </td>
                  <td className="p-3 text-sm">
                    <div>
                      <div>
                        {type === "sku"
                          ? formatCurrency(item["blinkit_insights_sku.sales_mrp_sum"])
                          : formatCurrency(item["blinkit_insights_city.sales_mrp_sum"])}
                      </div>
                      {index === 1 && (
                        <div className="flex items-center text-xs text-[#1d874f]">
                              <svg
                            width="12"
                            height="12"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
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
                          <span>6.79%</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-3 text-sm border-l border-[#ebebeb]">
                    {type === "sku"
                      ? item["blinkit_scraping_stream.on_shelf_availability"] || "1.68%"
                      : item["blinkit_scraping_stream.on_shelf_availability"] || "1.68%"}
                  </td>
                  <td className="p-3 text-sm">
                    {index === 1 && (
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
                        <span>2.4%</span>
                      </div>
                    )}
                  </td>
                  <td className="p-3 text-sm">
                    {type === "sku"
                      ? item["blinkit_insights_sku.days_of_inventory_14"] || "931.9"
                      : item["blinkit_insights_city.days_of_inventory_14"] || "931.9"}
                  </td>
                  <td className="p-3 text-sm">{index === 1 ? "-" : ""}</td>
                  <td className="p-3 text-sm border-l border-[#ebebeb]">
                    {type === "sku"
                      ? item["blinkit_scraping_stream.rank_avg"] || "3.2"
                      : item["blinkit_scraping_stream.rank_avg"] || "3.2"}
                  </td>
                  <td className="p-3 text-sm">
                    {index === 1 && (
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
                        <span>2.4%</span>
                      </div>
                    )}
                  </td>
                  <td className="p-3 text-sm">
                    {type === "sku"
                      ? item["blinkit_insights_sku.qty_sold"] || "12,303"
                      : item["blinkit_insights_city.qty_sold"] || "12,303"}
                  </td>
                  <td className="p-3 text-sm">
                    {index === 1 && (
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
                        <span>2.4%</span>
                      </div>
                    )}
                  </td>
                  <td className="p-3 text-sm">25,005</td>
                  <td className="p-3 text-sm">
                    {index === 1 && (
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
                        <span>2.4%</span>
                      </div>
                    )}
                  </td>
                  <td className="p-3 text-sm">1.9</td>
                  <td className="p-3 text-sm">
                    {index === 1 && (
                      <div className="flex items-center text-xs text-[#db3500]">
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
                        <span>2.4%</span>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
            <tr className="bg-[#f7f7f7] border-b border-[#ebebeb]">
              <td className="p-3"></td>
              <td className="p-3 text-sm font-medium">Total</td>
              <td className="p-3 text-sm font-medium">₹2,93,132.12</td>
              <td className="p-3 text-sm font-medium border-l border-[#ebebeb]">16%</td>
              <td className="p-3 text-sm font-medium"></td>
              <td className="p-3 text-sm font-medium">2931</td>
              <td className="p-3 text-sm font-medium"></td>
              <td className="p-3 text-sm font-medium border-l border-[#ebebeb]">8.3</td>
              <td className="p-3 text-sm font-medium"></td>
              <td className="p-3 text-sm font-medium">61,985</td>
              <td className="p-3 text-sm font-medium"></td>
              <td className="p-3 text-sm font-medium">2,61,768</td>
              <td className="p-3 text-sm font-medium"></td>
              <td className="p-3 text-sm font-medium">1.9</td>
              <td className="p-3 text-sm font-medium"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Helper function to format currency
function formatCurrency(value: any): string {
  if (!value) return "₹0"

  const numValue = typeof value === "string" ? Number.parseFloat(value) : value

  if (numValue >= 100000) {
    return `₹${(numValue / 100000).toFixed(2)}L`
  } else if (numValue >= 1000) {
    return `₹${numValue.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`
  } else {
    return `₹${numValue.toFixed(2)}`
  }
}

// Demo data for SKUs
const skuDemoData = [
  {
    "blinkit_insights_sku.name": "Protein Bar 100g",
    "blinkit_insights_sku.sales_mrp_sum": 93132.12,
    "blinkit_scraping_stream.on_shelf_availability": "1.68%",
    "blinkit_insights_sku.days_of_inventory_14": 931.9,
    "blinkit_scraping_stream.rank_avg": 3.2,
    "blinkit_insights_sku.qty_sold": 12303,
  },
  {
    "blinkit_insights_sku.name": "Choco Bar 100g",
    "blinkit_insights_sku.sales_mrp_sum": 8526.32,
    "blinkit_scraping_stream.on_shelf_availability": "3.28%",
    "blinkit_insights_sku.days_of_inventory_14": 328,
    "blinkit_scraping_stream.rank_avg": 4,
    "blinkit_insights_sku.qty_sold": 2960,
  },
  {
    "blinkit_insights_sku.name": "Energy Drink 250ml",
    "blinkit_insights_sku.sales_mrp_sum": 9313,
    "blinkit_scraping_stream.on_shelf_availability": "1.68%",
    "blinkit_insights_sku.days_of_inventory_14": 931.9,
    "blinkit_scraping_stream.rank_avg": 11,
    "blinkit_insights_sku.qty_sold": 1931.9,
  },
  {
    "blinkit_insights_sku.name": "Organic Oats 500g",
    "blinkit_insights_sku.sales_mrp_sum": 0,
    "blinkit_scraping_stream.on_shelf_availability": "0",
    "blinkit_insights_sku.days_of_inventory_14": 0,
    "blinkit_scraping_stream.rank_avg": 0,
    "blinkit_insights_sku.qty_sold": 0,
  },
]

// Demo data for Cities
const cityDemoData = [
  {
    "blinkit_insights_city.name": "Delhi",
    "blinkit_insights_city.sales_mrp_sum": 93132.12,
    "blinkit_scraping_stream.on_shelf_availability": "1.68%",
    "blinkit_insights_city.days_of_inventory_14": 931.9,
    "blinkit_scraping_stream.rank_avg": 3.2,
    "blinkit_insights_city.qty_sold": 12303,
  },
  {
    "blinkit_insights_city.name": "Bengaluru",
    "blinkit_insights_city.sales_mrp_sum": 8526.32,
    "blinkit_scraping_stream.on_shelf_availability": "3.28%",
    "blinkit_insights_city.days_of_inventory_14": 328,
    "blinkit_scraping_stream.rank_avg": 4,
    "blinkit_insights_city.qty_sold": 2960,
  },
  {
    "blinkit_insights_city.name": "Mumbai",
    "blinkit_insights_city.sales_mrp_sum": 9313,
    "blinkit_scraping_stream.on_shelf_availability": "1.68%",
    "blinkit_insights_city.days_of_inventory_14": 931.9,
    "blinkit_scraping_stream.rank_avg": 11,
    "blinkit_insights_city.qty_sold": 1931.9,
  },
  {
    "blinkit_insights_city.name": "Hyderabad",
    "blinkit_insights_city.sales_mrp_sum": 0,
    "blinkit_scraping_stream.on_shelf_availability": "0",
    "blinkit_insights_city.days_of_inventory_14": 0,
    "blinkit_scraping_stream.rank_avg": 0,
    "blinkit_insights_city.qty_sold": 0,
  },
]

