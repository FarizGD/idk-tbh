"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Search, Filter, Calendar, Clock, User, Phone, Plus } from "lucide-react"
import { useState } from "react"

// Mock guest book data
const guestBookData = [
  {
    id: "GB001",
    parentName: "Budi Pratama",
    studentName: "Ahmad Rizki Pratama",
    studentClass: "XII-TKJ 1",
    phone: "081234567891",
    visitDate: "2024-01-15",
    visitTime: "09:30",
    purpose: "Konsultasi nilai rapor",
    description: "Ingin menanyakan tentang nilai matematika anak",
    metWith: "Pak Budi (Wali Kelas)",
    status: "Selesai",
  },
  {
    id: "GB002",
    parentName: "Hasan Basri",
    studentName: "Siti Nurhaliza",
    studentClass: "XI-TKJ 2",
    phone: "081234567893",
    visitDate: "2024-01-14",
    visitTime: "10:15",
    purpose: "Pembahasan kasus siswa",
    description: "Membahas masalah keterlambatan anak",
    metWith: "Bu Eka (Guru BK)",
    status: "Dalam Proses",
  },
  {
    id: "GB003",
    parentName: "Santoso Wijaya",
    studentName: "Budi Santoso",
    studentClass: "X-TKJ 1",
    phone: "081234567895",
    visitDate: "2024-01-13",
    visitTime: "11:00",
    purpose: "Informasi kegiatan sekolah",
    description: "Menanyakan jadwal kegiatan ekstrakurikuler",
    metWith: "Pak Rizki (Guru TKJ)",
    status: "Selesai",
  },
  {
    id: "GB004",
    parentName: "Sartika Dewi",
    studentName: "Dewi Sartika",
    studentClass: "XII-TKJ 2",
    phone: "081234567897",
    visitDate: "2024-01-12",
    visitTime: "13:45",
    purpose: "Persiapan kelulusan",
    description: "Konsultasi tentang persiapan ujian dan kelulusan",
    metWith: "Bu Sari (Wali Kelas)",
    status: "Selesai",
  },
  {
    id: "GB005",
    parentName: "Wijaya Kusuma",
    studentName: "Andi Wijaya",
    studentClass: "XI-TKJ 1",
    phone: "081234567899",
    visitDate: "2024-01-11",
    visitTime: "14:20",
    purpose: "Konsultasi prestasi",
    description: "Membahas perkembangan prestasi akademik anak",
    metWith: "Pak Andi (Kepala Jurusan)",
    status: "Selesai",
  },
]

const purposeOptions = [
  "Semua",
  "Konsultasi nilai rapor",
  "Pembahasan kasus siswa",
  "Informasi kegiatan sekolah",
  "Persiapan kelulusan",
  "Konsultasi prestasi",
  "Lainnya",
]
const statusOptions = ["Semua", "Selesai", "Dalam Proses", "Dijadwalkan"]

export function GuestBookOverview() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPurpose, setSelectedPurpose] = useState("Semua")
  const [selectedStatus, setSelectedStatus] = useState("Semua")
  const [showAddForm, setShowAddForm] = useState(false)

  const [newEntry, setNewEntry] = useState({
    parentName: "",
    studentName: "",
    studentClass: "",
    phone: "",
    purpose: "",
    description: "",
    metWith: "",
  })

  const filteredEntries = guestBookData.filter((entry) => {
    const matchesSearch =
      entry.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.studentClass.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPurpose = selectedPurpose === "Semua" || entry.purpose === selectedPurpose
    const matchesStatus = selectedStatus === "Semua" || entry.status === selectedStatus

    return matchesSearch && matchesPurpose && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Selesai":
        return "secondary"
      case "Dalam Proses":
        return "destructive"
      case "Dijadwalkan":
        return "outline"
      default:
        return "secondary"
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("New guest book entry:", newEntry)
    // Reset form
    setNewEntry({
      parentName: "",
      studentName: "",
      studentClass: "",
      phone: "",
      purpose: "",
      description: "",
      metWith: "",
    })
    setShowAddForm(false)
    alert("Entri buku tamu berhasil ditambahkan!")
  }

  const guestStats = {
    total: guestBookData.length,
    today: guestBookData.filter((entry) => entry.visitDate === "2024-01-15").length,
    thisWeek: guestBookData.length,
    inProcess: guestBookData.filter((entry) => entry.status === "Dalam Proses").length,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Buku Tamu Orang Tua</h1>
          <p className="text-muted-foreground">Pencatatan kunjungan orang tua siswa</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Tambah Entri
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Kunjungan</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{guestStats.total}</div>
            <p className="text-xs text-muted-foreground">Bulan ini</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hari Ini</CardTitle>
            <Calendar className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-1">{guestStats.today}</div>
            <p className="text-xs text-muted-foreground">Kunjungan hari ini</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Minggu Ini</CardTitle>
            <Clock className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">{guestStats.thisWeek}</div>
            <p className="text-xs text-muted-foreground">Total minggu ini</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dalam Proses</CardTitle>
            <User className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{guestStats.inProcess}</div>
            <p className="text-xs text-muted-foreground">Perlu tindak lanjut</p>
          </CardContent>
        </Card>
      </div>

      {/* Add Entry Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Tambah Entri Buku Tamu</CardTitle>
            <CardDescription>Catat kunjungan orang tua siswa</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="parentName">Nama Orang Tua *</Label>
                  <Input
                    id="parentName"
                    value={newEntry.parentName}
                    onChange={(e) => setNewEntry({ ...newEntry, parentName: e.target.value })}
                    placeholder="Masukkan nama orang tua"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">No. Telepon</Label>
                  <Input
                    id="phone"
                    value={newEntry.phone}
                    onChange={(e) => setNewEntry({ ...newEntry, phone: e.target.value })}
                    placeholder="Masukkan nomor telepon"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="studentName">Nama Siswa *</Label>
                  <Input
                    id="studentName"
                    value={newEntry.studentName}
                    onChange={(e) => setNewEntry({ ...newEntry, studentName: e.target.value })}
                    placeholder="Masukkan nama siswa"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="studentClass">Kelas Siswa *</Label>
                  <Select
                    value={newEntry.studentClass}
                    onValueChange={(value) => setNewEntry({ ...newEntry, studentClass: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kelas" />
                    </SelectTrigger>
                    <SelectContent>
                      {["X-TKJ 1", "X-TKJ 2", "XI-TKJ 1", "XI-TKJ 2", "XII-TKJ 1", "XII-TKJ 2"].map((cls) => (
                        <SelectItem key={cls} value={cls}>
                          {cls}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="purpose">Tujuan Kunjungan *</Label>
                <Select
                  value={newEntry.purpose}
                  onValueChange={(value) => setNewEntry({ ...newEntry, purpose: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih tujuan kunjungan" />
                  </SelectTrigger>
                  <SelectContent>
                    {purposeOptions.slice(1).map((purpose) => (
                      <SelectItem key={purpose} value={purpose}>
                        {purpose}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  value={newEntry.description}
                  onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
                  placeholder="Jelaskan detail kunjungan..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="metWith">Bertemu Dengan</Label>
                <Input
                  id="metWith"
                  value={newEntry.metWith}
                  onChange={(e) => setNewEntry({ ...newEntry, metWith: e.target.value })}
                  placeholder="Nama guru/staff yang ditemui"
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit">Simpan Entri</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Batal
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

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
                placeholder="Cari nama orang tua/siswa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedPurpose} onValueChange={setSelectedPurpose}>
              <SelectTrigger>
                <SelectValue placeholder="Tujuan Kunjungan" />
              </SelectTrigger>
              <SelectContent>
                {purposeOptions.map((purpose) => (
                  <SelectItem key={purpose} value={purpose}>
                    {purpose}
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
                setSelectedPurpose("Semua")
                setSelectedStatus("Semua")
              }}
            >
              Reset Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Guest Book Entries */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Kunjungan ({filteredEntries.length})</CardTitle>
          <CardDescription>Riwayat kunjungan orang tua siswa</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredEntries.map((entry) => (
              <div key={entry.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{entry.parentName}</h3>
                    <p className="text-sm text-muted-foreground">
                      Orang tua dari {entry.studentName} ({entry.studentClass})
                    </p>
                  </div>
                  <Badge variant={getStatusColor(entry.status)}>{entry.status}</Badge>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span>{new Date(entry.visitDate).toLocaleDateString("id-ID")}</span>
                      <Clock className="h-3 w-3 text-muted-foreground ml-2" />
                      <span>{entry.visitTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      <span>{entry.phone}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Bertemu dengan: </span>
                      <span className="font-medium">{entry.metWith}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Tujuan: </span>
                      <span className="font-medium">{entry.purpose}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Deskripsi: </span>
                      <span>{entry.description}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredEntries.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Tidak ada entri yang ditemukan dengan filter yang dipilih.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
