"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Search, Filter, GraduationCap, Phone, Mail, MapPin, Calendar } from "lucide-react"
import { useState } from "react"

// Mock student data
const studentsData = [
  {
    id: "S001",
    name: "Ahmad Rizki Pratama",
    nis: "2024001",
    class: "XII-TKJ 1",
    gender: "Laki-laki",
    birthDate: "2006-03-15",
    address: "Jl. Merdeka No. 123, Jakarta",
    phone: "081234567890",
    email: "ahmad.rizki@email.com",
    parentName: "Budi Pratama",
    parentPhone: "081234567891",
    status: "Aktif",
    enrollmentYear: "2021",
    avatar: "/student-male-studying.png",
  },
  {
    id: "S002",
    name: "Siti Nurhaliza",
    nis: "2024002",
    class: "XI-TKJ 2",
    gender: "Perempuan",
    birthDate: "2007-05-20",
    address: "Jl. Sudirman No. 456, Jakarta",
    phone: "081234567892",
    email: "siti.nurhaliza@email.com",
    parentName: "Hasan Basri",
    parentPhone: "081234567893",
    status: "Aktif",
    enrollmentYear: "2022",
    avatar: "/diverse-female-student.png",
  },
  {
    id: "S003",
    name: "Budi Santoso",
    nis: "2024003",
    class: "X-TKJ 1",
    gender: "Laki-laki",
    birthDate: "2008-01-10",
    address: "Jl. Thamrin No. 789, Jakarta",
    phone: "081234567894",
    email: "budi.santoso@email.com",
    parentName: "Santoso Wijaya",
    parentPhone: "081234567895",
    status: "Aktif",
    enrollmentYear: "2023",
    avatar: "/student-male-studying.png",
  },
  {
    id: "S004",
    name: "Dewi Sartika",
    nis: "2024004",
    class: "XII-TKJ 2",
    gender: "Perempuan",
    birthDate: "2006-08-25",
    address: "Jl. Gatot Subroto No. 321, Jakarta",
    phone: "081234567896",
    email: "dewi.sartika@email.com",
    parentName: "Sartika Dewi",
    parentPhone: "081234567897",
    status: "Lulus",
    enrollmentYear: "2021",
    avatar: "/diverse-female-student.png",
  },
  {
    id: "S005",
    name: "Andi Wijaya",
    nis: "2024005",
    class: "XI-TKJ 1",
    gender: "Laki-laki",
    birthDate: "2007-11-30",
    address: "Jl. Kuningan No. 654, Jakarta",
    phone: "081234567898",
    email: "andi.wijaya@email.com",
    parentName: "Wijaya Kusuma",
    parentPhone: "081234567899",
    status: "Aktif",
    enrollmentYear: "2022",
    avatar: "/student-male-studying.png",
  },
]

const classes = ["Semua", "X-TKJ 1", "X-TKJ 2", "XI-TKJ 1", "XI-TKJ 2", "XII-TKJ 1", "XII-TKJ 2"]
const statusOptions = ["Semua", "Aktif", "Lulus", "Pindah", "Drop Out"]

export function StudentOverview() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClass, setSelectedClass] = useState("Semua")
  const [selectedStatus, setSelectedStatus] = useState("Semua")

  const filteredStudents = studentsData.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.nis.includes(searchTerm) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = selectedClass === "Semua" || student.class === selectedClass
    const matchesStatus = selectedStatus === "Semua" || student.status === selectedStatus

    return matchesSearch && matchesClass && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aktif":
        return "secondary"
      case "Lulus":
        return "outline"
      case "Pindah":
        return "destructive"
      case "Drop Out":
        return "destructive"
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

  const studentStats = {
    total: studentsData.length,
    active: studentsData.filter((s) => s.status === "Aktif").length,
    graduated: studentsData.filter((s) => s.status === "Lulus").length,
    transferred: studentsData.filter((s) => s.status === "Pindah").length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Data Siswa</h1>
        <p className="text-muted-foreground">Manajemen data siswa SMK TKJ</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Siswa</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentStats.total}</div>
            <p className="text-xs text-muted-foreground">Semua siswa</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Siswa Aktif</CardTitle>
            <GraduationCap className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-1">{studentStats.active}</div>
            <p className="text-xs text-muted-foreground">Sedang bersekolah</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lulus</CardTitle>
            <Calendar className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">{studentStats.graduated}</div>
            <p className="text-xs text-muted-foreground">Sudah lulus</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pindah</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentStats.transferred}</div>
            <p className="text-xs text-muted-foreground">Pindah sekolah</p>
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
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama atau NIS..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger>
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
                setSelectedClass("Semua")
                setSelectedStatus("Semua")
              }}
            >
              Reset Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Students List */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Siswa ({filteredStudents.length})</CardTitle>
          <CardDescription>Data lengkap siswa SMK TKJ</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <div key={student.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                    <AvatarFallback>
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{student.name}</h3>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>NIS: {student.nis}</span>
                          <span>•</span>
                          <span>{student.class}</span>
                          <span>•</span>
                          <span>{calculateAge(student.birthDate)} tahun</span>
                        </div>
                      </div>
                      <Badge variant={getStatusColor(student.status)}>{student.status}</Badge>
                    </div>

                    <div className="grid gap-2 md:grid-cols-2">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span>{student.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span>{student.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="truncate">{student.address}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Orang Tua: </span>
                          <span className="font-medium">{student.parentName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span>{student.parentPhone}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Tahun Masuk: </span>
                          <span className="font-medium">{student.enrollmentYear}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredStudents.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Tidak ada siswa yang ditemukan dengan filter yang dipilih.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
