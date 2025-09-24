"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, AlertTriangle, Calendar } from "lucide-react"

interface StatsCardsProps {
  userRole: string
}

export function StatsCards({ userRole }: StatsCardsProps) {
  // Mock data - in real app, this would come from API
  const stats = {
    totalStudents: 180,
    presentToday: 165,
    totalCases: 12,
    todaySchedule: 8,
  }

  const cards = [
    {
      title: "Total Siswa",
      value: stats.totalStudents,
      icon: Users,
      description: "Siswa aktif",
      color: "text-chart-1",
      roles: ["admin", "moderator", "guru"],
    },
    {
      title: "Hadir Hari Ini",
      value: stats.presentToday,
      icon: UserCheck,
      description: `${Math.round((stats.presentToday / stats.totalStudents) * 100)}% kehadiran`,
      color: "text-chart-2",
      roles: ["admin", "moderator", "guru"],
    },
    {
      title: "Kasus Bulan Ini",
      value: stats.totalCases,
      icon: AlertTriangle,
      description: "Perlu perhatian",
      color: "text-destructive",
      roles: ["admin", "moderator", "guru"],
    },
    {
      title: "Jadwal Hari Ini",
      value: stats.todaySchedule,
      icon: Calendar,
      description: "Mata pelajaran",
      color: "text-chart-4",
      roles: ["admin", "moderator", "guru", "siswa"],
    },
  ]

  const filteredCards = cards.filter((card) => card.roles.includes(userRole))

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {filteredCards.map((card) => {
        const Icon = card.icon
        return (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <Icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">{card.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
