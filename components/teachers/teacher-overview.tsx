"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Search, Filter, GraduationCap, Phone, Mail, MapPin, Calendar } from "lucide-react"
import { useState } from "react"

// Mock teacher data
const teachersData = [
  {
    id: "T001",
    name: "Budi Santoso, S.Pd",
    nip: "196501011990031001",
    subject: "Matematika",
    position: "Guru Mata Pelajaran",
    gender: "Laki-laki",
    birthDate: "1965-01-01",
    address: "Jl. Pendidikan No. 123, Jakarta",
    phone: "081234567800",
    email: "budi.santoso@smk.sch.id",
    education: "S1 Pendidikan Matematika",
    experience: "30 tahun",
    status: "Aktif",
    classes: ["X-TKJ 1", "X-TKJ 2", "XI-TKJ 1"],
    avatar: "/teacher-male.jpg",
  },
  {
    id: "T002",
    name: "Sari Dewi, S.Pd",
    nip: "197203151998032001",
    subject: "Bahasa Indonesia",
    position: "Guru Mata Pelajaran",
    gender: "Perempuan",
    birthDate: "1972-03-15",
    address: "Jl. Guru No. 456, Jakarta",
    phone: "081234567801",
    email: "sari.dewi@smk.sch.id",
    education: "S1 Pendidikan Bahasa Indonesia",
    experience: "25 tahun",
    status: "Aktif",
    classes: ["XI-TKJ 2", "XII-TKJ 1", "XII-TKJ 2"],
    avatar: "/teacher-female.jpg",
  },
  {
    id: "T003",
    name: "Rizki Pratama, S.Kom",
    nip: "198505102010011001",
    subject: "Jaringan Dasar",
    position: "Guru Produktif",
    gender: "Laki-laki",
    birthDate: "1985-05-10",
    address: "Jl. Teknologi No. 789, Jakarta",
    phone: "081234567802",
    email: "rizki.pratama@smk.sch.id",
    education: "S1 Teknik Informatika",
    experience: "12 tahun",
    status: "Aktif",
    classes: ["X-TKJ 1", "XI-TKJ 1", "XII-TKJ 1"],
    avatar: "/teacher-male.jpg",
  },
  {
    id: "T004",
    name: "Maya Sari, S.Pd",
    nip: "198008201005022001",
    subject: "Bahasa Inggris",
    position: "Guru Mata Pelajaran",
    gender: "Perempuan",
    birthDate: "1980-08-20",
    address: "Jl. Bahasa No. 321, Jakarta",
    phone: "081234567803",
    email: "maya.sari@smk.sch.id",
    education: "S1 Pendidikan Bahasa Inggris",
    experience: "18 tahun",
    status: "Aktif",
    classes: ["X-TKJ 2", "XI-TKJ 2", "XII-TKJ 2"],
    avatar: "/teacher-female.jpg",
  },
  {
    id: "T005",
    name: "Andi Wijaya, S.T",
    nip: "197912121999031001",
    subject: "Sistem Komputer",
    position: "Kepala Jurusan TKJ",
    gender: "Laki-laki",
    birthDate: "1979-12-12",
    address: "Jl. Komputer No. 654, Jakarta",
    phone: "081234567804",
    email: "andi.wijaya@smk.sch.id",
    education: "S1 Teknik Elektro",
    experience: "22 tahun",
    status: "Aktif",
    classes: ["XI-TKJ 1", "XI-TKJ 2"],
    avatar: "/teacher-male.jpg",
  },
]

const subjects = [
  "Semua",
  "Matematika",
  "Bahasa Indonesia",
  "Bahasa Inggris",
  "Jaringan Dasar",
  "Sistem Komputer",
  "Fisika",
  "Kimia",
]
const positions = ["Semua", "Guru Mata Pelajaran", "Guru Produktif", "Kepala Jurusan TKJ", "Wali Kelas"]
const statusOptions = ["Semua", "Aktif", "Cuti", "Pensiun"]

export function TeacherOverview() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("Semua")
  const [selectedPosition, setSelectedPosition] = useState("Semua")
  const [selectedStatus, setSelectedStatus] = useState("Semua")

  const filteredTeachers = teachersData.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.nip.includes(searchTerm) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = selectedSubject === "Semua" || teacher.subject === selectedSubject
    const matchesPosition = selectedPosition === "Semua" || teacher.position === selectedPosition
    const matchesStatus = selectedStatus === "Semua" || teacher.status === selectedStatus

    return matchesSearch && matchesSubject && matchesPosition && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aktif":
        return "secondary"
      case "Cuti":
        return "destructive"
      case "Pensiun":
        return "outline"
      default:
        return "secondary"
    }
  }

  const calculateAge = (birthDate: string) => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  const teacherStats = {
    total: teachersData.length,
    active: teachersData.filter((t) => t.status === "Aktif").length,
    productive: teachersData.filter((t) => t.position.includes("Produktif")).length,
    headTeachers: teachersData.filter((t) => t.position.includes("Kepala")).length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Data Guru</h1>
        <p className="text-muted-foreground">Manajemen data guru SMK TKJ</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Guru</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teacherStats.total}</div>
            <p className="text-xs text-muted-foreground">Semua guru</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Guru Aktif</CardTitle>
            <GraduationCap className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-1">{teacherStats.active}</div>
            <p className="text-xs text-muted-foreground">Sedang mengajar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Guru Produktif</CardTitle>
            <Calendar className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">{teacherStats.productive}</div>
            <p className="text-xs text-muted-foreground">Mata pelajaran produktif</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kepala Jurusan</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teacherStats.headTeachers}</div>
            <p className="text-xs text-muted-foreground">Jabatan struktural</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter & Pencarian
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama atau NIP..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Mata Pelajaran" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedPosition} onValueChange={setSelectedPosition}>
              <SelectTrigger>
                <SelectValue placeholder="Jabatan" />
              </SelectTrigger>
              <SelectContent>
                {positions.map((position) => (
                  <SelectItem key={position} value={position}>
                    {position}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedSubject("Semua")
                setSelectedPosition("Semua")
                setSelectedStatus("Semua")
              }}
            >
              Reset Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Teachers List */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Guru ({filteredTeachers.length})</CardTitle>
          <CardDescription>Data lengkap guru SMK TKJ</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTeachers.map((teacher) => (
              <div key={teacher.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={teacher.avatar || "/placeholder.svg"} alt={teacher.name} />
                    <AvatarFallback>
                      {teacher.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{teacher.name}</h3>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>NIP: {teacher.nip}</span>
                          <span>•</span>
                          <span>{calculateAge(teacher.birthDate)} tahun</span>
                          <span>•</span>
                          <span>{teacher.experience} pengalaman</span>
                        </div>
                      </div>
                      <Badge variant={getStatusColor(teacher.status)}>{teacher.status}</Badge>
                    </div>

                    <div className="grid gap-2 md:grid-cols-2">
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Mata Pelajaran: </span>
                          <span className="font-medium">{teacher.subject}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Jabatan: </span>
                          <span className="font-medium">{teacher.position}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Pendidikan: </span>
                          <span className="font-medium">{teacher.education}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span>{teacher.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span>{teacher.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="truncate">{teacher.address}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Mengajar Kelas: </span>
                        <div className="flex gap-1 mt-1">
                          {teacher.classes.map((cls) => (
                            <Badge key={cls} variant="outline" className="text-xs">
                              {cls}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredTeachers.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Tidak ada guru yang ditemukan dengan filter yang dipilih.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
