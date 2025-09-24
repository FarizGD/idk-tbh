"use client"

import { useState } from "react"
import { LoginForm } from "@/components/auth/login-form"
import { Sidebar } from "@/components/layout/sidebar"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { AttendanceChart } from "@/components/dashboard/attendance-chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AttendanceOverview } from "@/components/attendance/attendance-overview"
import { FingerprintStatus } from "@/components/attendance/fingerprint-status"
import { ScheduleOverview } from "@/components/schedule/schedule-overview"
import { WeeklySchedule } from "@/components/schedule/weekly-schedule"
import { CaseOverview } from "@/components/cases/case-overview"
import { AddCaseForm } from "@/components/cases/add-case-form"
import { StudentOverview } from "@/components/students/student-overview"
import { TeacherOverview } from "@/components/teachers/teacher-overview"
import { GuestBookOverview } from "@/components/guest-book/guest-book-overview"
import { DocumentTracking } from "@/components/documents/document-tracking"

interface User {
  username: string
  role: string
}

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null)
  const [activeSection, setActiveSection] = useState("dashboard")

  const handleLogin = (credentials: { username: string; password: string; role: string }) => {
    // In real app, validate credentials with API
    setUser({ username: credentials.username, role: credentials.role })
  }

  const handleLogout = () => {
    setUser(null)
    setActiveSection("dashboard")
  }

  if (!user) {
    return <LoginForm onLogin={handleLogin} />
  }

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">Selamat datang di Sistem Informasi Jurusan TKJ</p>
            </div>

            <StatsCards userRole={user.role} />

            <div className="grid gap-6 md:grid-cols-2">
              <AttendanceChart />

              <Card>
                <CardHeader>
                  <CardTitle>Jadwal Hari Ini</CardTitle>
                  <CardDescription>
                    {new Date().toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { time: "07:00-07:45", subject: "Matematika", class: "X-TKJ 1", room: "Lab 1" },
                    { time: "07:45-08:30", subject: "Bahasa Indonesia", class: "X-TKJ 2", room: "Kelas A" },
                    { time: "08:30-09:15", subject: "Jaringan Dasar", class: "XI-TKJ 1", room: "Lab 2" },
                    { time: "09:30-10:15", subject: "Sistem Operasi", class: "XII-TKJ 1", room: "Lab 3" },
                  ].map((schedule, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{schedule.time}</span>
                        </div>
                        <p className="font-semibold">{schedule.subject}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{schedule.class}</Badge>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {schedule.room}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "attendance":
        return (
          <Tabs defaultValue="overview" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Sistem Kehadiran</h1>
                <p className="text-muted-foreground">Monitoring kehadiran siswa dengan teknologi fingerprint</p>
              </div>
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="device">Perangkat</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview">
              <AttendanceOverview />
            </TabsContent>

            <TabsContent value="device">
              <FingerprintStatus />
            </TabsContent>
          </Tabs>
        )

      case "schedule":
        return (
          <Tabs defaultValue="daily" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Jadwal Pelajaran</h1>
                <p className="text-muted-foreground">Manajemen jadwal untuk semua kelas TKJ</p>
              </div>
              <TabsList>
                <TabsTrigger value="daily">Harian</TabsTrigger>
                <TabsTrigger value="weekly">Mingguan</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="daily">
              <ScheduleOverview />
            </TabsContent>

            <TabsContent value="weekly">
              <WeeklySchedule />
            </TabsContent>
          </Tabs>
        )

      case "cases":
        return (
          <Tabs defaultValue="overview" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Manajemen Kasus</h1>
                <p className="text-muted-foreground">Pencatatan dan penanganan kasus siswa</p>
              </div>
              <TabsList>
                <TabsTrigger value="overview">Daftar Kasus</TabsTrigger>
                <TabsTrigger value="add">Tambah Kasus</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview">
              <CaseOverview />
            </TabsContent>

            <TabsContent value="add">
              <AddCaseForm />
            </TabsContent>
          </Tabs>
        )

      case "students":
        return <StudentOverview />

      case "teachers":
        return <TeacherOverview />

      case "guest-book":
        return <GuestBookOverview />

      case "documents":
        return <DocumentTracking />

      default:
        return (
          <div className="flex items-center justify-center h-full">
            <Card className="w-full max-w-md">
              <CardHeader className="text-center">
                <CardTitle>Fitur Dalam Pengembangan</CardTitle>
                <CardDescription>Fitur {activeSection} sedang dalam tahap pengembangan</CardDescription>
              </CardHeader>
            </Card>
          </div>
        )
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        currentUser={user}
        onLogout={handleLogout}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <main className="flex-1 overflow-auto">
        <div className="p-6">{renderContent()}</div>
      </main>
    </div>
  )
}
