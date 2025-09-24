"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const attendanceData = [
  { day: "Sen", present: 165, absent: 15 },
  { day: "Sel", present: 172, absent: 8 },
  { day: "Rab", present: 168, absent: 12 },
  { day: "Kam", present: 175, absent: 5 },
  { day: "Jum", present: 170, absent: 10 },
]

export function AttendanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Grafik Kehadiran Mingguan</CardTitle>
        <CardDescription>Data kehadiran siswa dalam seminggu terakhir</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={attendanceData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="day" className="text-muted-foreground" fontSize={12} />
            <YAxis className="text-muted-foreground" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Line type="monotone" dataKey="present" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Hadir" />
            <Line
              type="monotone"
              dataKey="absent"
              stroke="hsl(var(--destructive))"
              strokeWidth={2}
              name="Tidak Hadir"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
