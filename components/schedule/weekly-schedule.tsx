"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

const timeSlots = [
  "07:00-07:45",
  "07:45-08:30",
  "08:30-09:15",
  "09:30-10:15",
  "10:15-11:00",
  "11:00-11:45",
  "12:30-13:15",
  "13:15-14:00",
  "14:00-14:45",
  "14:45-15:30",
  "15:30-16:15",
  "16:15-17:00",
]

const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"]
const classes = ["X-TKJ 1", "X-TKJ 2", "XI-TKJ 1", "XI-TKJ 2", "XII-TKJ 1", "XII-TKJ 2"]

// Mock weekly schedule data
const weeklySchedule = {
  "X-TKJ 1": {
    Senin: {
      "07:00-07:45": { subject: "Matematika", teacher: "Pak Budi", room: "A1" },
      "07:45-08:30": { subject: "B. Indonesia", teacher: "Bu Sari", room: "A1" },
      "08:30-09:15": { subject: "B. Inggris", teacher: "Bu Maya", room: "A1" },
      "09:30-10:15": { subject: "Fisika", teacher: "Pak Andi", room: "Lab" },
      "10:15-11:00": { subject: "Kimia", teacher: "Bu Dewi", room: "Lab" },
      "11:00-11:45": { subject: "Jaringan Dasar", teacher: "Pak Rizki", room: "Lab Komp" },
      "12:30-13:15": { subject: "Sistem Komputer", teacher: "Bu Nina", room: "Lab Komp" },
      "13:15-14:00": { subject: "Pemrograman", teacher: "Pak Doni", room: "Lab Komp" },
      "14:00-14:45": { subject: "Simulasi Digital", teacher: "Bu Lina", room: "Lab MM" },
      "14:45-15:30": { subject: "PKN", teacher: "Pak Hadi", room: "A1" },
      "15:30-16:15": { subject: "Agama", teacher: "Pak Usman", room: "A1" },
      "16:15-17:00": { subject: "Olahraga", teacher: "Pak Joko", room: "Lapangan" },
    },
    Selasa: {
      "07:00-07:45": { subject: "B. Indonesia", teacher: "Bu Sari", room: "A1" },
      "07:45-08:30": { subject: "Matematika", teacher: "Pak Budi", room: "A1" },
      "08:30-09:15": { subject: "Sejarah", teacher: "Bu Ratna", room: "A1" },
      "09:30-10:15": { subject: "Jaringan Dasar", teacher: "Pak Rizki", room: "Lab Komp" },
      "10:15-11:00": { subject: "Sistem Komputer", teacher: "Bu Nina", room: "Lab Komp" },
      "11:00-11:45": { subject: "Pemrograman", teacher: "Pak Doni", room: "Lab Komp" },
      "12:30-13:15": { subject: "Simulasi Digital", teacher: "Bu Lina", room: "Lab MM" },
      "13:15-14:00": { subject: "Fisika", teacher: "Pak Andi", room: "Lab" },
      "14:00-14:45": { subject: "Kimia", teacher: "Bu Dewi", room: "Lab" },
      "14:45-15:30": { subject: "B. Inggris", teacher: "Bu Maya", room: "A1" },
      "15:30-16:15": { subject: "Seni Budaya", teacher: "Bu Tari", room: "Seni" },
      "16:15-17:00": { subject: "BK", teacher: "Bu Eka", room: "A1" },
    },
    // Add more days...
  },
  // Add more classes...
}

export function WeeklySchedule() {
  const [selectedClass, setSelectedClass] = useState("X-TKJ 1")

  const getScheduleForClass = () => {
    return weeklySchedule[selectedClass as keyof typeof weeklySchedule] || {}
  }

  const getSubjectColor = (subject: string) => {
    const colors = {
      Matematika: "bg-chart-1/20 text-chart-1 border-chart-1/30",
      "B. Indonesia": "bg-chart-2/20 text-chart-2 border-chart-2/30",
      "B. Inggris": "bg-chart-3/20 text-chart-3 border-chart-3/30",
      Fisika: "bg-chart-4/20 text-chart-4 border-chart-4/30",
      Kimia: "bg-chart-5/20 text-chart-5 border-chart-5/30",
      "Jaringan Dasar": "bg-primary/20 text-primary border-primary/30",
      "Sistem Komputer": "bg-secondary/20 text-secondary-foreground border-secondary/30",
      Pemrograman: "bg-accent/20 text-accent-foreground border-accent/30",
    }
    return colors[subject as keyof typeof colors] || "bg-muted/20 text-muted-foreground border-muted/30"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Jadwal Mingguan</h2>
          <p className="text-muted-foreground">Tampilan jadwal dalam format grid mingguan</p>
        </div>
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
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Jadwal {selectedClass}</CardTitle>
          <CardDescription>Senin - Jumat, 12 jam pelajaran per hari</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Header */}
              <div className="grid grid-cols-6 gap-2 mb-4">
                <div className="font-semibold text-sm text-muted-foreground p-2">Jam</div>
                {days.map((day) => (
                  <div key={day} className="font-semibold text-sm text-center p-2 bg-muted rounded-lg">
                    {day}
                  </div>
                ))}
              </div>

              {/* Schedule Grid */}
              <div className="space-y-2">
                {timeSlots.map((timeSlot, index) => (
                  <div key={timeSlot} className="grid grid-cols-6 gap-2">
                    <div className="flex items-center p-2 text-xs font-mono text-muted-foreground">
                      <div>
                        <div className="font-medium">{timeSlot}</div>
                        <div className="text-xs">Jam {index + 1}</div>
                      </div>
                    </div>
                    {days.map((day) => {
                      const classSchedule = getScheduleForClass()
                      const daySchedule = classSchedule[day as keyof typeof classSchedule]
                      const schedule = daySchedule ? daySchedule[timeSlot] : null
                      return (
                        <div key={`${day}-${timeSlot}`} className="min-h-[60px]">
                          {schedule ? (
                            <div className={`p-2 rounded-lg border text-xs ${getSubjectColor(schedule.subject)}`}>
                              <div className="font-medium truncate">{schedule.subject}</div>
                              <div className="text-xs opacity-75 truncate">{schedule.teacher}</div>
                              <div className="text-xs opacity-75 truncate">{schedule.room}</div>
                            </div>
                          ) : (
                            <div className="p-2 rounded-lg border border-dashed border-muted bg-muted/20 min-h-[60px] flex items-center justify-center">
                              <span className="text-xs text-muted-foreground">-</span>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Keterangan Mata Pelajaran</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              "Matematika",
              "B. Indonesia",
              "B. Inggris",
              "Fisika",
              "Kimia",
              "Jaringan Dasar",
              "Sistem Komputer",
              "Pemrograman",
            ].map((subject) => (
              <div key={subject} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded border ${getSubjectColor(subject)}`} />
                <span className="text-sm">{subject}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
