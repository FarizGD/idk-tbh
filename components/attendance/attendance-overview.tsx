"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Wifi, Fingerprint, Users } from "lucide-react"

// Mock data for attendance
const attendanceData = [
  { class: "X-TKJ 1", present: 28, absent: 2, total: 30 },
  { class: "X-TKJ 2", present: 25, absent: 5, total: 30 },
  { class: "XI-TKJ 1", present: 27, absent: 3, total: 30 },
  { class: "XI-TKJ 2", present: 29, absent: 1, total: 30 },
  { class: "XII-TKJ 1", present: 26, absent: 4, total: 30 },
  { class: "XII-TKJ 2", present: 30, absent: 0, total: 30 },
]

const weeklyData = [
  { day: "Senin", hadir: 165, tidak: 15 },
  { day: "Selasa", hadir: 172, tidak: 8 },
  { day: "Rabu", hadir: 168, tidak: 12 },
  { day: "Kamis", hadir: 175, tidak: 5 },
  { day: "Jumat", hadir: 170, tidak: 10 },
]

const pieData = [
  { name: "Hadir", value: 165, color: "hsl(var(--chart-1))" },
  { name: "Tidak Hadir", value: 15, color: "hsl(var(--destructive))" },
]

export function AttendanceOverview() {
  const totalPresent = attendanceData.reduce((sum, item) => sum + item.present, 0)
  const totalStudents = attendanceData.reduce((sum, item) => sum + item.total, 0)
  const attendanceRate = Math.round((totalPresent / totalStudents) * 100)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Sistem Kehadiran</h1>
        <p className="text-muted-foreground">Monitoring kehadiran siswa dengan teknologi fingerprint</p>
      </div>

      {/* ESP32 Status */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status ESP32</CardTitle>
            <div className="flex items-center gap-2">
              <Wifi className="h-4 w-4 text-chart-2" />
              <Badge variant="secondary" className="bg-chart-2/10 text-chart-2">
                Online
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Connected</div>
            <p className="text-xs text-muted-foreground">Fingerprint scanner aktif</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kehadiran Hari Ini</CardTitle>
            <Users className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalPresent}/{totalStudents}
            </div>
            <Progress value={attendanceRate} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">{attendanceRate}% kehadiran</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scan Terakhir</CardTitle>
            <Fingerprint className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">07:45</div>
            <p className="text-xs text-muted-foreground">Ahmad Rizki - XII-TKJ 1</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="daily" className="space-y-4">
        <TabsList>
          <TabsTrigger value="daily">Harian</TabsTrigger>
          <TabsTrigger value="weekly">Mingguan</TabsTrigger>
          <TabsTrigger value="class">Per Kelas</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Distribusi Kehadiran Hari Ini</CardTitle>
                <CardDescription>Persentase kehadiran siswa</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 mt-4">
                  {pieData.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                      <span className="text-sm">
                        {entry.name}: {entry.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Kehadiran Per Kelas</CardTitle>
                <CardDescription>Data kehadiran hari ini</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {attendanceData.map((item) => (
                  <div key={item.class} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.class}</span>
                      <span className="text-sm text-muted-foreground">
                        {item.present}/{item.total}
                      </span>
                    </div>
                    <Progress value={(item.present / item.total) * 100} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tren Kehadiran Mingguan</CardTitle>
              <CardDescription>Data kehadiran dalam seminggu terakhir</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={weeklyData}>
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
                  <Bar dataKey="hadir" fill="hsl(var(--chart-1))" name="Hadir" />
                  <Bar dataKey="tidak" fill="hsl(var(--destructive))" name="Tidak Hadir" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="class" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {attendanceData.map((classData) => (
              <Card key={classData.class}>
                <CardHeader>
                  <CardTitle className="text-lg">{classData.class}</CardTitle>
                  <CardDescription>Kehadiran hari ini</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-chart-1">{classData.present}</span>
                      <span className="text-sm text-muted-foreground">dari {classData.total} siswa</span>
                    </div>
                    <Progress value={(classData.present / classData.total) * 100} />
                    <div className="flex justify-between text-sm">
                      <span className="text-chart-1">Hadir: {classData.present}</span>
                      <span className="text-destructive">Tidak Hadir: {classData.absent}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
