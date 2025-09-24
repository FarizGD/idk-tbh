"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Clock, User, Calendar, TrendingUp, Search, Filter } from "lucide-react"
import { useState } from "react"

// Mock case data
const casesData = [
  {
    id: "C001",
    studentName: "Ahmad Rizki",
    class: "XII-TKJ 1",
    caseType: "Terlambat",
    description: "Terlambat masuk sekolah 15 menit",
    date: "2024-01-15",
    time: "07:15",
    reportedBy: "Pak Budi",
    status: "Aktif",
    severity: "Ringan",
    followUp: "Teguran lisan",
  },
  {
    id: "C002",
    studentName: "Siti Nurhaliza",
    class: "XI-TKJ 2",
    caseType: "Tidak Hadir",
    description: "Tidak hadir tanpa keterangan",
    date: "2024-01-14",
    time: "07:00",
    reportedBy: "Bu Sari",
    status: "Dalam Proses",
    severity: "Sedang",
    followUp: "Panggil orang tua",
  },
  {
    id: "C003",
    studentName: "Budi Santoso",
    class: "X-TKJ 1",
    caseType: "Pelanggaran Seragam",
    description: "Tidak memakai sepatu hitam",
    date: "2024-01-13",
    time: "07:30",
    reportedBy: "Bu Maya",
    status: "Selesai",
    severity: "Ringan",
    followUp: "Peringatan tertulis",
  },
  {
    id: "C004",
    studentName: "Dewi Sartika",
    class: "XII-TKJ 2",
    caseType: "Terlambat",
    description: "Terlambat masuk kelas setelah istirahat",
    date: "2024-01-12",
    time: "10:30",
    reportedBy: "Pak Andi",
    status: "Aktif",
    severity: "Ringan",
    followUp: "Teguran lisan",
  },
  {
    id: "C005",
    studentName: "Andi Wijaya",
    class: "XI-TKJ 1",
    caseType: "Gangguan Kelas",
    description: "Mengganggu teman saat pelajaran",
    date: "2024-01-11",
    time: "09:15",
    reportedBy: "Bu Nina",
    status: "Dalam Proses",
    severity: "Sedang",
    followUp: "Konseling BK",
  },
]

const caseTypes = ["Semua", "Terlambat", "Tidak Hadir", "Pelanggaran Seragam", "Gangguan Kelas", "Lainnya"]
const severityLevels = ["Semua", "Ringan", "Sedang", "Berat"]
const statusOptions = ["Semua", "Aktif", "Dalam Proses", "Selesai"]

export function CaseOverview() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("Semua")
  const [selectedSeverity, setSelectedSeverity] = useState("Semua")
  const [selectedStatus, setSelectedStatus] = useState("Semua")

  const filteredCases = casesData.filter((caseItem) => {
    const matchesSearch =
      caseItem.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.caseType.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "Semua" || caseItem.caseType === selectedType
    const matchesSeverity = selectedSeverity === "Semua" || caseItem.severity === selectedSeverity
    const matchesStatus = selectedStatus === "Semua" || caseItem.status === selectedStatus

    return matchesSearch && matchesType && matchesSeverity && matchesStatus
  })

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Ringan":
        return "bg-chart-2/20 text-chart-2 border-chart-2/30"
      case "Sedang":
        return "bg-chart-4/20 text-chart-4 border-chart-4/30"
      case "Berat":
        return "bg-destructive/20 text-destructive border-destructive/30"
      default:
        return "bg-muted/20 text-muted-foreground border-muted/30"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aktif":
        return "destructive"
      case "Dalam Proses":
        return "secondary"
      case "Selesai":
        return "outline"
      default:
        return "secondary"
    }
  }

  const caseStats = {
    total: casesData.length,
    active: casesData.filter((c) => c.status === "Aktif").length,
    inProgress: casesData.filter((c) => c.status === "Dalam Proses").length,
    resolved: casesData.filter((c) => c.status === "Selesai").length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manajemen Kasus Siswa</h1>
        <p className="text-muted-foreground">Pencatatan dan penanganan kasus pelanggaran siswa</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Kasus</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{caseStats.total}</div>
            <p className="text-xs text-muted-foreground">Bulan ini</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kasus Aktif</CardTitle>
            <Clock className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{caseStats.active}</div>
            <p className="text-xs text-muted-foreground">Perlu tindakan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dalam Proses</CardTitle>
            <TrendingUp className="h-4 w-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-4">{caseStats.inProgress}</div>
            <p className="text-xs text-muted-foreground">Sedang ditangani</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Selesai</CardTitle>
            <User className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">{caseStats.resolved}</div>
            <p className="text-xs text-muted-foreground">Sudah ditangani</p>
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
                placeholder="Cari nama siswa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Jenis Kasus" />
              </SelectTrigger>
              <SelectContent>
                {caseTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
              <SelectTrigger>
                <SelectValue placeholder="Tingkat" />
              </SelectTrigger>
              <SelectContent>
                {severityLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
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
                setSelectedType("Semua")
                setSelectedSeverity("Semua")
                setSelectedStatus("Semua")
              }}
            >
              Reset Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Cases List */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Kasus ({filteredCases.length})</CardTitle>
          <CardDescription>Kasus siswa yang tercatat dalam sistem</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCases.map((caseItem) => (
              <div key={caseItem.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm text-muted-foreground">{caseItem.id}</span>
                      <Badge variant={getStatusColor(caseItem.status)}>{caseItem.status}</Badge>
                      <div className={`px-2 py-1 rounded-md text-xs border ${getSeverityColor(caseItem.severity)}`}>
                        {caseItem.severity}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg">{caseItem.studentName}</h3>
                      <p className="text-sm text-muted-foreground">{caseItem.class}</p>
                    </div>

                    <div>
                      <p className="font-medium text-destructive">{caseItem.caseType}</p>
                      <p className="text-sm text-muted-foreground">{caseItem.description}</p>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(caseItem.date).toLocaleDateString("id-ID")}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {caseItem.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {caseItem.reportedBy}
                      </div>
                    </div>

                    <div className="p-2 bg-muted rounded-md">
                      <p className="text-sm">
                        <strong>Tindak Lanjut:</strong> {caseItem.followUp}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredCases.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Tidak ada kasus yang ditemukan dengan filter yang dipilih.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
