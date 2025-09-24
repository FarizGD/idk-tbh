"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { FileText, Search, Filter, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import { useState } from "react"

// Mock document tracking data
const documentsData = [
  {
    id: "DOC001",
    studentName: "Ahmad Rizki Pratama",
    nis: "2024001",
    class: "XII-TKJ 1",
    graduationYear: "2024",
    documents: {
      ijazah: { status: "Belum Diambil", date: null },
      sertifikatKompetensi: { status: "Sudah Diambil", date: "2024-01-10" },
      transkrip: { status: "Belum Diambil", date: null },
      skhun: { status: "Belum Diambil", date: null },
      raport: { status: "Sudah Diambil", date: "2024-01-08" },
    },
    contactInfo: {
      phone: "081234567890",
      parentPhone: "081234567891",
      address: "Jl. Merdeka No. 123, Jakarta",
    },
    lastContact: "2024-01-05",
    notes: "Sudah dihubungi via telepon, akan diambil minggu depan",
  },
  {
    id: "DOC002",
    studentName: "Siti Nurhaliza",
    nis: "2024002",
    class: "XII-TKJ 2",
    graduationYear: "2024",
    documents: {
      ijazah: { status: "Sudah Diambil", date: "2024-01-12" },
      sertifikatKompetensi: { status: "Sudah Diambil", date: "2024-01-12" },
      transkrip: { status: "Sudah Diambil", date: "2024-01-12" },
      skhun: { status: "Sudah Diambil", date: "2024-01-12" },
      raport: { status: "Sudah Diambil", date: "2024-01-12" },
    },
    contactInfo: {
      phone: "081234567892",
      parentPhone: "081234567893",
      address: "Jl. Sudirman No. 456, Jakarta",
    },
    lastContact: "2024-01-12",
    notes: "Semua dokumen sudah diambil lengkap",
  },
  {
    id: "DOC003",
    studentName: "Budi Santoso",
    nis: "2024003",
    class: "XII-TKJ 1",
    graduationYear: "2024",
    documents: {
      ijazah: { status: "Belum Diambil", date: null },
      sertifikatKompetensi: { status: "Belum Diambil", date: null },
      transkrip: { status: "Belum Diambil", date: null },
      skhun: { status: "Belum Diambil", date: null },
      raport: { status: "Belum Diambil", date: null },
    },
    contactInfo: {
      phone: "081234567894",
      parentPhone: "081234567895",
      address: "Jl. Thamrin No. 789, Jakarta",
    },
    lastContact: "2023-12-20",
    notes: "Belum bisa dihubungi, nomor tidak aktif",
  },
  {
    id: "DOC004",
    studentName: "Dewi Sartika",
    nis: "2024004",
    class: "XII-TKJ 2",
    graduationYear: "2024",
    documents: {
      ijazah: { status: "Belum Diambil", date: null },
      sertifikatKompetensi: { status: "Sudah Diambil", date: "2024-01-09" },
      transkrip: { status: "Belum Diambil", date: null },
      skhun: { status: "Belum Diambil", date: null },
      raport: { status: "Sudah Diambil", date: "2024-01-09" },
    },
    contactInfo: {
      phone: "081234567896",
      parentPhone: "081234567897",
      address: "Jl. Gatot Subroto No. 321, Jakarta",
    },
    lastContact: "2024-01-09",
    notes: "Ijazah dan transkrip masih tertinggal",
  },
]

const documentTypes = ["Semua", "Ijazah", "Sertifikat Kompetensi", "Transkrip", "SKHUN", "Raport"]
const statusOptions = ["Semua", "Belum Diambil", "Sudah Diambil"]
const graduationYears = ["Semua", "2024", "2023", "2022"]

export function DocumentTracking() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDocument, setSelectedDocument] = useState("Semua")
  const [selectedStatus, setSelectedStatus] = useState("Semua")
  const [selectedYear, setSelectedYear] = useState("Semua")

  const filteredStudents = documentsData.filter((student) => {
    const matchesSearch =
      student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.nis.includes(searchTerm) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesYear = selectedYear === "Semua" || student.graduationYear === selectedYear

    // Filter by document type and status
    if (selectedDocument !== "Semua" || selectedStatus !== "Semua") {
      const docKey = selectedDocument
        .toLowerCase()
        .replace(/\s+/g, "")
        .replace("sertifikatkompetensi", "sertifikatKompetensi")
      if (selectedDocument !== "Semua") {
        const docStatus = student.documents[docKey as keyof typeof student.documents]?.status
        if (selectedStatus !== "Semua" && docStatus !== selectedStatus) return false
        if (selectedStatus === "Semua" && !docStatus) return false
      }
    }

    return matchesSearch && matchesYear
  })

  const getDocumentStatus = (status: string) => {
    switch (status) {
      case "Sudah Diambil":
        return { variant: "secondary" as const, icon: CheckCircle, color: "text-chart-2" }
      case "Belum Diambil":
        return { variant: "destructive" as const, icon: AlertTriangle, color: "text-destructive" }
      default:
        return { variant: "outline" as const, icon: Clock, color: "text-muted-foreground" }
    }
  }

  const calculatePendingDocuments = (documents: any) => {
    return Object.values(documents).filter((doc: any) => doc.status === "Belum Diambil").length
  }

  const documentStats = {
    totalStudents: documentsData.length,
    completedStudents: documentsData.filter((student) =>
      Object.values(student.documents).every((doc: any) => doc.status === "Sudah Diambil"),
    ).length,
    pendingStudents: documentsData.filter((student) =>
      Object.values(student.documents).some((doc: any) => doc.status === "Belum Diambil"),
    ).length,
    totalPendingDocs: documentsData.reduce((total, student) => total + calculatePendingDocuments(student.documents), 0),
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tracking Dokumen</h1>
        <p className="text-muted-foreground">Monitoring pengambilan ijazah dan dokumen lainnya</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Alumni</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documentStats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">Lulusan terdaftar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dokumen Lengkap</CardTitle>
            <CheckCircle className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">{documentStats.completedStudents}</div>
            <p className="text-xs text-muted-foreground">Sudah mengambil semua</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Belum Lengkap</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{documentStats.pendingStudents}</div>
            <p className="text-xs text-muted-foreground">Masih ada dokumen tertinggal</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dokumen Tertinggal</CardTitle>
            <Clock className="h-4 w-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-4">{documentStats.totalPendingDocs}</div>
            <p className="text-xs text-muted-foreground">Total dokumen belum diambil</p>
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
                placeholder="Cari nama atau NIS..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedDocument} onValueChange={setSelectedDocument}>
              <SelectTrigger>
                <SelectValue placeholder="Jenis Dokumen" />
              </SelectTrigger>
              <SelectContent>
                {documentTypes.map((doc) => (
                  <SelectItem key={doc} value={doc}>
                    {doc}
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

            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue placeholder="Tahun Lulus" />
              </SelectTrigger>
              <SelectContent>
                {graduationYears.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedDocument("Semua")
                setSelectedStatus("Semua")
                setSelectedYear("Semua")
              }}
            >
              Reset Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Document Tracking List */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Alumni ({filteredStudents.length})</CardTitle>
          <CardDescription>Status pengambilan dokumen kelulusan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStudents.map((student) => {
              const pendingCount = calculatePendingDocuments(student.documents)
              return (
                <div key={student.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {student.studentName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">{student.studentName}</h3>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>NIS: {student.nis}</span>
                          <span>•</span>
                          <span>{student.class}</span>
                          <span>•</span>
                          <span>Lulus {student.graduationYear}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {pendingCount > 0 ? (
                        <Badge variant="destructive">{pendingCount} dokumen tertinggal</Badge>
                      ) : (
                        <Badge variant="secondary">Lengkap</Badge>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm">Status Dokumen:</h4>
                      <div className="space-y-2">
                        {Object.entries(student.documents).map(([docType, docInfo]) => {
                          const statusInfo = getDocumentStatus((docInfo as any).status)
                          const StatusIcon = statusInfo.icon
                          return (
                            <div key={docType} className="flex items-center justify-between text-sm">
                              <span className="capitalize">
                                {docType.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                              </span>
                              <div className="flex items-center gap-2">
                                <StatusIcon className={`h-3 w-3 ${statusInfo.color}`} />
                                <span className={statusInfo.color}>{(docInfo as any).status}</span>
                                {(docInfo as any).date && (
                                  <span className="text-xs text-muted-foreground ml-2">
                                    ({new Date((docInfo as any).date).toLocaleDateString("id-ID")})
                                  </span>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-sm">Informasi Kontak:</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Siswa: </span>
                          <span>{student.contactInfo.phone}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Orang Tua: </span>
                          <span>{student.contactInfo.parentPhone}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Alamat: </span>
                          <span className="text-xs">{student.contactInfo.address}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Kontak Terakhir: </span>
                          <span>{new Date(student.lastContact).toLocaleDateString("id-ID")}</span>
                        </div>
                      </div>

                      {student.notes && (
                        <div className="p-2 bg-muted rounded-md">
                          <p className="text-xs">
                            <strong>Catatan:</strong> {student.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}

            {filteredStudents.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Tidak ada data yang ditemukan dengan filter yang dipilih.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
