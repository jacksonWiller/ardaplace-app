"use client"

import { Bar, CartesianGrid, XAxis, BarChart } from 'recharts'
import { Card, CardHeader, CardTitle } from '../ui/card'
import { ChartConfig, ChartContainer } from "@/components/ui/chart"

export function ChartOverview() {

    const chartData = [
        { month: "January", desktop: 186, mobile: 80 },
        { month: "February", desktop: 305, mobile: 200 },
        { month: "March", desktop: 237, mobile: 120 },
        { month: "April", desktop: 73, mobile: 190 },
        { month: "May", desktop: 209, mobile: 130 },
        { month: "June", desktop: 214, mobile: 140 },
      ]
       
      const chartConfig = {
        desktop: {
          label: "Desktop",
          color: "#2563eb",
        },
        mobile: {
          label: "Mobile",
          color: "#60a5fa",
        },
      } satisfies ChartConfig

  return (
    <Card className="w-full md:1/2 md:max-w-[600px]" >
        <CardHeader>
            <div className="flex items-center justify-center">
                <CardTitle className="text-lg sm:text-xl text-gray-800">
                    Overriew vendas
                </CardTitle>
            </div>
        </CardHeader>

        <ChartContainer config={chartConfig} className="min0-h-[200px] w-full" >
            <BarChart data={chartData} >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <Bar dataKey="desktop"  />
                <Bar dataKey="mobile"  />
            </BarChart>
        </ChartContainer>
    </Card>
  )
}



