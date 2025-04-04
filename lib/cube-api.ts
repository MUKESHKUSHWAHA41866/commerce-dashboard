// This is a mock implementation of the Cube.js API client
// In a real application, you would use the official Cube.js client

export async function fetchCubeData(query: any[]): Promise<any[]> {
  try {
    // In a real implementation, you would make an actual API call to Cube.js
    // For this demo, we'll return mock data based on the query type

    const results = await Promise.all(
      query.map(async (singleQuery) => {
        // Determine what kind of data to return based on the query
        if (singleQuery.measures?.includes("blinkit_insights_sku.sales_mrp_sum")) {
          if (singleQuery.timeDimensions?.[0]?.granularity === "day") {
            // Return time series data for sales
            return {
              data: generateTimeSeriesData("blinkit_insights_sku.sales_mrp_sum", 28),
            }
          } else {
            // Return total sales
            return {
              data: [
                {
                  "blinkit_insights_sku.sales_mrp_sum": 125490,
                },
              ],
            }
          }
        } else if (singleQuery.measures?.includes("blinkit_insights_sku.qty_sold")) {
          if (singleQuery.timeDimensions?.[0]?.granularity === "day") {
            // Return time series data for quantity sold
            return {
              data: generateTimeSeriesData("blinkit_insights_sku.qty_sold", 28),
            }
          } else {
            // Return total quantity sold
            return {
              data: [
                {
                  "blinkit_insights_sku.qty_sold": 125490,
                },
              ],
            }
          }
        } else if (
          singleQuery.measures?.includes("blinkit_insights_city.sales_mrp_sum") &&
          singleQuery.dimensions?.includes("blinkit_insights_city.name")
        ) {
          // Return top cities data
          return {
            data: [
              {
                "blinkit_insights_city.name": "New Delhi",
                "blinkit_insights_city.sales_mrp_sum": 2650000000,
              },
              {
                "blinkit_insights_city.name": "Mumbai",
                "blinkit_insights_city.sales_mrp_sum": 164000000,
              },
              {
                "blinkit_insights_city.name": "West Bengal",
                "blinkit_insights_city.sales_mrp_sum": 122000000,
              },
              {
                "blinkit_insights_city.name": "Others",
                "blinkit_insights_city.sales_mrp_sum": 2430000000,
              },
            ],
          }
        } else if (singleQuery.dimensions?.includes("blinkit_insights_sku.name")) {
          // Return SKU table data
          return {
            data: generateSkuTableData(),
          }
        } else if (singleQuery.dimensions?.includes("blinkit_insights_city.name")) {
          // Return city table data
          return {
            data: generateCityTableData(),
          }
        }

        // Default empty response
        return { data: [] }
      }),
    )

    return results
  } catch (error) {
    console.error("Error fetching Cube.js data:", error)
    return []
  }
}

// Helper function to generate time series data
function generateTimeSeriesData(measureKey: string, days: number) {
  const data = []
  const baseDate = new Date(2025, 1, 1) // February 1, 2025
  const baseValue = measureKey.includes("qty_sold") ? 100 : 5000

  for (let i = 0; i < days; i++) {
    const date = new Date(baseDate)
    date.setDate(date.getDate() + i)

    // Generate a value with some randomness but an upward trend
    const value = baseValue + i * baseValue * 0.05 + Math.random() * baseValue * 0.2

    data.push({
      "blinkit_insights_sku.created_at": date.toISOString(),
      [measureKey]: value,
    })
  }

  return data
}

// Helper function to generate SKU table data
function generateSkuTableData() {
  return [
    {
      "blinkit_insights_sku.id": "SKU001",
      "blinkit_insights_sku.name": "Protein Bar 100g",
      "blinkit_insights_sku.sales_mrp_sum": 93132.12,
      "blinkit_insights_sku.qty_sold": 12303,
      "blinkit_insights_sku.drr_7": "2.4%",
      "blinkit_insights_sku.drr_14": "3.1%",
      "blinkit_insights_sku.drr_30": "4.2%",
      "blinkit_insights_sku.days_of_inventory_14": 931.9,
      "blinkit_scraping_stream.on_shelf_availability": "1.68%",
      "blinkit_scraping_stream.rank_avg": 3.2,
    },
    {
      "blinkit_insights_sku.id": "SKU002",
      "blinkit_insights_sku.name": "Choco Bar 100g",
      "blinkit_insights_sku.sales_mrp_sum": 8526.32,
      "blinkit_insights_sku.qty_sold": 2960,
      "blinkit_insights_sku.drr_7": "1.8%",
      "blinkit_insights_sku.drr_14": "2.3%",
      "blinkit_insights_sku.drr_30": "3.5%",
      "blinkit_insights_sku.days_of_inventory_14": 328,
      "blinkit_scraping_stream.on_shelf_availability": "3.28%",
      "blinkit_scraping_stream.rank_avg": 4,
    },
    {
      "blinkit_insights_sku.id": "SKU003",
      "blinkit_insights_sku.name": "Energy Drink 250ml",
      "blinkit_insights_sku.sales_mrp_sum": 9313,
      "blinkit_insights_sku.qty_sold": 1931.9,
      "blinkit_insights_sku.drr_7": "1.2%",
      "blinkit_insights_sku.drr_14": "1.8%",
      "blinkit_insights_sku.drr_30": "2.7%",
      "blinkit_insights_sku.days_of_inventory_14": 931.9,
      "blinkit_scraping_stream.on_shelf_availability": "1.68%",
      "blinkit_scraping_stream.rank_avg": 11,
    },
    {
      "blinkit_insights_sku.id": "SKU004",
      "blinkit_insights_sku.name": "Organic Oats 500g",
      "blinkit_insights_sku.sales_mrp_sum": 0,
      "blinkit_insights_sku.qty_sold": 0,
      "blinkit_insights_sku.drr_7": "0%",
      "blinkit_insights_sku.drr_14": "0%",
      "blinkit_insights_sku.drr_30": "0%",
      "blinkit_insights_sku.days_of_inventory_14": 0,
      "blinkit_scraping_stream.on_shelf_availability": "0",
      "blinkit_scraping_stream.rank_avg": 0,
    },
  ]
}

// Helper function to generate city table data
function generateCityTableData() {
  return [
    {
      "blinkit_insights_city.id": "CITY001",
      "blinkit_insights_city.name": "Delhi",
      "blinkit_insights_city.sales_mrp_sum": 93132.12,
      "blinkit_insights_city.qty_sold": 12303,
      "blinkit_insights_city.drr_7": "2.4%",
      "blinkit_insights_city.drr_14": "3.1%",
      "blinkit_insights_city.drr_30": "4.2%",
      "blinkit_insights_city.days_of_inventory_14": 931.9,
      "blinkit_scraping_stream.on_shelf_availability": "1.68%",
      "blinkit_scraping_stream.rank_avg": 3.2,
    },
    {
      "blinkit_insights_city.id": "CITY002",
      "blinkit_insights_city.name": "Bengaluru",
      "blinkit_insights_city.sales_mrp_sum": 8526.32,
      "blinkit_insights_city.qty_sold": 2960,
      "blinkit_insights_city.drr_7": "1.8%",
      "blinkit_insights_city.drr_14": "2.3%",
      "blinkit_insights_city.drr_30": "3.5%",
      "blinkit_insights_city.days_of_inventory_14": 328,
      "blinkit_scraping_stream.on_shelf_availability": "3.28%",
      "blinkit_scraping_stream.rank_avg": 4,
    },
    {
      "blinkit_insights_city.id": "CITY003",
      "blinkit_insights_city.name": "Mumbai",
      "blinkit_insights_city.sales_mrp_sum": 9313,
      "blinkit_insights_city.qty_sold": 1931.9,
      "blinkit_insights_city.drr_7": "1.2%",
      "blinkit_insights_city.drr_14": "1.8%",
      "blinkit_insights_city.drr_30": "2.7%",
      "blinkit_insights_city.days_of_inventory_14": 931.9,
      "blinkit_scraping_stream.on_shelf_availability": "1.68%",
      "blinkit_scraping_stream.rank_avg": 11,
    },
    {
      "blinkit_insights_city.id": "CITY004",
      "blinkit_insights_city.name": "Hyderabad",
      "blinkit_insights_city.sales_mrp_sum": 0,
      "blinkit_insights_city.qty_sold": 0,
      "blinkit_insights_city.drr_7": "0%",
      "blinkit_insights_city.drr_14": "0%",
      "blinkit_insights_city.drr_30": "0%",
      "blinkit_insights_city.days_of_inventory_14": 0,
      "blinkit_scraping_stream.on_shelf_availability": "0",
      "blinkit_scraping_stream.rank_avg": 0,
    },
  ]
}

