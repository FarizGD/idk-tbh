"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Plus, Save } from "lucide-react"
import { useState } from "react"

const caseTypes = [
  "Terlambat",
  "Tidak Hadir",
  "Pelanggaran Seragam",
  "Gangguan Kelas",
  "Tidak Mengerjakan Tugas",
  "Pelanggaran Tata Tertib",
  "Lainnya",
]

const severityLevels = ["Ringan", "Sedang", "Berat"]
const classes = ["X-TKJ 1", "X-TKJ 2", "XI-TKJ 1", "XI-TKJ 2", "XII-TKJ 1", "XII-TKJ 2"]

export function AddCaseForm() {
  const [formData, setFormData] = useState({
    studentName: "",
    class: "",
    caseType: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    time: new Date().toTimeString().slice(0, 5),
    severity: "",
    followUp: "",
    reportedBy: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("New case submitted:", formData)

    // Reset form
    setFormData({
      studentName: "",
      class: "",
      caseType: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      time: new Date().toTimeString().slice(0, 5),
      severity: "",
      followUp: "",
      reportedBy: "",
    })

    setIsSubmitting(false)
    alert("Kasus berhasil dicatat!")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Tambah Kasus Baru</h2>
        <p className="text-muted-foreground">Catat kasus pelanggaran siswa</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Form Pencatatan Kasus
          </CardTitle>
          <CardDescription>Isi semua informasi yang diperlukan untuk mencatat kasus siswa</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Student Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">Informasi Siswa</h3>

                <div className="space-y-2">
                  <Label htmlFor="studentName">Nama Siswa *</Label>
                  <Input
                    id="studentName"
                    value={formData.studentName}
                    onChange={(e) => handleInputChange("studentName", e.target.value)}
                    placeholder="Masukkan nama lengkap siswa"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="class">Kelas *</Label>
                  <Select value={formData.class} onValueChange={(value) => handleInputChange("class", value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kelas" />
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
              </div>

              {/* Case Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">Informasi Kasus</h3>

                <div className="space-y-2">
                  <Label htmlFor="caseType">Jenis Kasus *</Label>
                  <Select
                    value={formData.caseType}
                    onValueChange={(value) => handleInputChange("caseType", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis kasus" />
                    </SelectTrigger>
                    <SelectContent>
                      {caseTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="severity">Tingkat Keparahan *</Label>
                  <Select
                    value={formData.severity}
                    onValueChange={(value) => handleInputChange("severity", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih tingkat keparahan" />
                    </SelectTrigger>
                    <SelectContent>
                      {severityLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi Kasus *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Jelaskan detail kasus yang terjadi..."
                rows={4}
                required
              />
            </div>

            {/* Date and Time */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date">Tanggal Kejadian *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Waktu Kejadian *</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange("time", e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Follow-up and Reporter */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="followUp">Tindak Lanjut</Label>
                <Textarea
                  id="followUp"
                  value={formData.followUp}
                  onChange={(e) => handleInputChange("followUp", e.target.value)}
                  placeholder="Tindakan yang akan diambil..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reportedBy">Dilaporkan Oleh *</Label>
                <Input
                  id="reportedBy"
                  value={formData.reportedBy}
                  onChange={(e) => handleInputChange("reportedBy", e.target.value)}
                  placeholder="Nama guru/staff yang melaporkan"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? "Menyimpan..." : "Simpan Kasus"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setFormData({
                    studentName: "",
                    class: "",
                    caseType: "",
                    description: "",
                    date: new Date().toISOString().split("T")[0],
                    time: new Date().toTimeString().slice(0, 5),
                    severity: "",
                    followUp: "",
                    reportedBy: "",
                  })
                }}
              >
                Reset Form
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Panduan Pencatatan Kasus
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm">Tingkat Keparahan:</h4>
              <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                <li>
                  <strong>Ringan:</strong> Terlambat, tidak memakai atribut lengkap
                </li>
                <li>
                  <strong>Sedang:</strong> Tidak hadir tanpa keterangan, mengganggu kelas
                </li>
                <li>
                  <strong>Berat:</strong> Melanggar tata tertib serius, berkelahi
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm">Tips Pencatatan:</h4>
              <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                <li>• Catat kasus sesegera mungkin setelah kejadian</li>
                <li>• Berikan deskripsi yang jelas dan objektif</li>
                <li>• Tentukan tindak lanjut yang sesuai dengan tingkat keparahan</li>
                <li>• Koordinasikan dengan guru BK untuk kasus sedang dan berat</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
