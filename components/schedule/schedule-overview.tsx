"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, MapPin, User, Calendar } from "lucide-react"
import { useState } from "react"

// Mock schedule data
const scheduleData = {
  "X-TKJ 1": {
    Senin: [
      { time: "07:00-07:45", subject: "Matematika", teacher: "Pak Budi", room: "Kelas A1" },
      { time: "07:45-08:30", subject: "Bahasa Indonesia", teacher: "Bu Sari", room: "Kelas A1" },
      { time: "08:30-09:15", subject: "Bahasa Inggris", teacher: "Bu Maya", room: "Kelas A1" },
      { time: "09:30-10:15", subject: "Fisika", teacher: "Pak Andi", room: "Lab Fisika" },
      { time: "10:15-11:00", subject: "Kimia", teacher: "Bu Dewi", room: "Lab Kimia" },
      { time: "11:00-11:45", subject: "Jaringan Dasar", teacher: "Pak Rizki", room: "Lab Komputer 1" },
      { time: "12:30-13:15", subject: "Sistem Komputer", teacher: "Bu Nina", room: "Lab Komputer 1" },
      { time: "13:15-14:00", subject: "Pemrograman Dasar", teacher: "Pak Doni", room: "Lab Komputer 2" },
      { time: "14:00-14:45", subject: "Simulasi Digital", teacher: "Bu Lina", room: "Lab Multimedia" },
      { time: "14:45-15:30", subject: "PKN", teacher: "Pak Hadi", room: "Kelas A1" },
      { time: "15:30-16:15", subject: "Agama", teacher: "Pak Usman", room: "Kelas A1" },
      { time: "16:15-17:00", subject: "Olahraga", teacher: "Pak Joko", room: "Lapangan" },
    ],
    Selasa: [
      { time: "07:00-07:45", subject: "Bahasa Indonesia", teacher: "Bu Sari", room: "Kelas A1" },
      { time: "07:45-08:30", subject: "Matematika", teacher: "Pak Budi", room: "Kelas A1" },
      { time: "08:30-09:15", subject: "Sejarah", teacher: "Bu Ratna", room: "Kelas A1" },
      { time: "09:30-10:15", subject: "Jaringan Dasar", teacher: "Pak Rizki", room: "Lab Komputer 1" },
      { time: "10:15-11:00", subject: "Sistem Komputer", teacher: "Bu Nina", room: "Lab Komputer 1" },
      { time: "11:00-11:45", subject: "Pemrograman Dasar", teacher: "Pak Doni", room: "Lab Komputer 2" },
      { time: "12:30-13:15", subject: "Simulasi Digital", teacher: "Bu Lina", room: "Lab Multimedia" },
      { time: "13:15-14:00", subject: "Fisika", teacher: "Pak Andi", room: "Lab Fisika" },
      { time: "14:00-14:45", subject: "Kimia", teacher: "Bu Dewi", room: "Lab Kimia" },
      { time: "14:45-15:30", subject: "Bahasa Inggris", teacher: "Bu Maya", room: "Kelas A1" },
      { time: "15:30-16:15", subject: "Seni Budaya", teacher: "Bu Tari", room: "Ruang Seni" },
      { time: "16:15-17:00", subject: "BK", teacher: "Bu Eka", room: "Kelas A1" },
    ],
    // Add more days...
  },
  "X-TKJ 2": {
    Senin: [
      { time: "07:00-07:45", subject: "Bahasa Indonesia", teacher: "Bu Sari", room: "Kelas A2" },
      { time: "07:45-08:30", subject: "Matematika", teacher: "Pak Budi", room: "Kelas A2" },
      { time: "08:30-09:15", subject: "Bahasa Inggris", teacher: "Bu Maya", room: "Kelas A2" },
      { time: "09:30-10:15", subject: "Jaringan Dasar", teacher: "Pak Rizki", room: "Lab Komputer 2" },
      { time: "10:15-11:00", subject: "Sistem Komputer", teacher: "Bu Nina", room: "Lab Komputer 2" },
      { time: "11:00-11:45", subject: "Pemrograman Dasar", teacher: "Pak Doni", room: "Lab Komputer 1" },
      { time: "12:30-13:15", subject: "Simulasi Digital", teacher: "Bu Lina", room: "Lab Multimedia" },
      { time: "13:15-14:00", subject: "Fisika", teacher: "Pak Andi", room: "Lab Fisika" },
      { time: "14:00-14:45", subject: "Kimia", teacher: "Bu Dewi", room: "Lab Kimia" },
      { time: "14:45-15:30", subject: "PKN", teacher: "Pak Hadi", room: "Kelas A2" },
      { time: "15:30-16:15", subject: "Agama", teacher: "Pak Usman", room: "Kelas A2" },
      { time: "16:15-17:00", subject: "Olahraga", teacher: "Pak Joko", room: "Lapangan" },
    ],
    // Add more days...
  },
  // Add more classes...
}

const classes = ["X-TKJ 1", "X-TKJ 2", "XI-TKJ 1", "XI-TKJ 2", "XII-TKJ 1", "XII-TKJ 2"]
const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"]

export function ScheduleOverview() {
  const [selectedClass, setSelectedClass] = useState("X-TKJ 1")
  const [selectedDay, setSelectedDay] = useState("Senin")

  const getCurrentSchedule = () => {
    return (
      scheduleData[selectedClass as keyof typeof scheduleData]?.[
        selectedDay as keyof (typeof scheduleData)["X-TKJ 1"]
      ] || []
    )
  }

  const getCurrentTime = () => {
    const now = new Date()
    const currentTime = now.getHours() * 100 + now.getMinutes()
    return currentTime
  }

  const isCurrentPeriod = (timeSlot: string) => {
    const [start] = timeSlot.split("-")
    const [startHour, startMinute] = start.split(":").map(Number)
    const startTime = startHour * 100 + startMinute
    const currentTime = getCurrentTime()

    // Check if current time is within 45 minutes of start time
    return currentTime >= startTime && currentTime < startTime + 45
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Jadwal Pelajaran</h1>
        <p className="text-muted-foreground">Manajemen jadwal untuk semua kelas TKJ</p>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Pilih Kelas" />
          </SelectTrigger>
          <SelectContent>
            {classes.map((cls) => (
              <SelectItem key={cls} value={cls}>
                {cls}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedDay} onValueChange={setSelectedDay}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Pilih Hari" />
          </SelectTrigger>
          <SelectContent>
            {days.map((day) => (
              <SelectItem key={day} value={day}>
                {day}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Schedule Display */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Jadwal {selectedClass} - {selectedDay}
          </CardTitle>
          <CardDescription>{getCurrentSchedule().length} jam pelajaran</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {getCurrentSchedule().map((schedule, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border transition-all ${
                  isCurrentPeriod(schedule.time)
                    ? "bg-chart-1/10 border-chart-1 shadow-md"
                    : "bg-muted/50 border-border"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="font-mono text-sm font-medium">{schedule.time}</span>
                      </div>
                      {isCurrentPeriod(schedule.time) && (
                        <Badge variant="secondary" className="bg-chart-1 text-chart-1-foreground">
                          Sedang Berlangsung
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-semibold text-lg">{schedule.subject}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {schedule.teacher}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {schedule.room}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-muted-foreground">{String(index + 1).padStart(2, "0")}</div>
                    <div className="text-xs text-muted-foreground">Jam ke-</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
