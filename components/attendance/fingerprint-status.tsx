"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Fingerprint, Wifi, Activity, Settings, RefreshCw } from "lucide-react"
import { useState } from "react"

export function FingerprintStatus() {
  const [isConnected, setIsConnected] = useState(true)
  const [lastScan, setLastScan] = useState("07:45:23")

  const deviceInfo = {
    model: "ESP32-WROOM-32",
    firmware: "v2.1.0",
    ipAddress: "192.168.1.100",
    uptime: "2 hari 14 jam",
    totalScans: 1247,
    todayScans: 165,
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Status Perangkat Fingerprint</h2>
        <p className="text-muted-foreground">Monitoring ESP32 dan sensor fingerprint</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Device Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Fingerprint className="h-5 w-5" />
              ESP32 Fingerprint Scanner
            </CardTitle>
            <CardDescription>Status koneksi dan informasi perangkat</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Status Koneksi</span>
              <Badge variant={isConnected ? "secondary" : "destructive"} className="flex items-center gap-1">
                <Wifi className="h-3 w-3" />
                {isConnected ? "Online" : "Offline"}
              </Badge>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Model</span>
                <span className="text-sm font-medium">{deviceInfo.model}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Firmware</span>
                <span className="text-sm font-medium">{deviceInfo.firmware}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">IP Address</span>
                <span className="text-sm font-medium font-mono">{deviceInfo.ipAddress}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Uptime</span>
                <span className="text-sm font-medium">{deviceInfo.uptime}</span>
              </div>
            </div>

            <Separator />

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                <Settings className="h-4 w-4 mr-2" />
                Konfigurasi
              </Button>
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                <RefreshCw className="h-4 w-4 mr-2" />
                Restart
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Scan Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Statistik Scan
            </CardTitle>
            <CardDescription>Data penggunaan sensor fingerprint</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-chart-1">{deviceInfo.todayScans}</div>
                <div className="text-sm text-muted-foreground">Scan Hari Ini</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-chart-2">{deviceInfo.totalScans}</div>
                <div className="text-sm text-muted-foreground">Total Scan</div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Scan Terakhir</span>
                <span className="text-sm font-medium font-mono">{lastScan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Rata-rata/Hari</span>
                <span className="text-sm font-medium">~180 scan</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Success Rate</span>
                <span className="text-sm font-medium text-chart-2">98.5%</span>
              </div>
            </div>

            <Separator />

            <div className="p-3 bg-chart-1/10 rounded-lg border border-chart-1/20">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-chart-1 rounded-full animate-pulse" />
                <span className="font-medium">Sistem Aktif</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Sensor fingerprint siap menerima input dari siswa</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Scans */}
      <Card>
        <CardHeader>
          <CardTitle>Scan Terbaru</CardTitle>
          <CardDescription>10 scan fingerprint terakhir</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { time: "07:45:23", name: "Ahmad Rizki", class: "XII-TKJ 1", status: "success" },
              { time: "07:44:15", name: "Siti Nurhaliza", class: "XI-TKJ 2", status: "success" },
              { time: "07:43:02", name: "Budi Santoso", class: "X-TKJ 1", status: "success" },
              { time: "07:42:18", name: "Dewi Sartika", class: "XII-TKJ 2", status: "success" },
              { time: "07:41:45", name: "Andi Wijaya", class: "XI-TKJ 1", status: "failed" },
              { time: "07:40:33", name: "Maya Sari", class: "X-TKJ 2", status: "success" },
            ].map((scan, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Fingerprint className="h-4 w-4 text-muted-foreground" />
                    <span className="font-mono text-sm">{scan.time}</span>
                  </div>
                  <div>
                    <p className="font-medium">{scan.name}</p>
                    <p className="text-sm text-muted-foreground">{scan.class}</p>
                  </div>
                </div>
                <Badge variant={scan.status === "success" ? "secondary" : "destructive"}>
                  {scan.status === "success" ? "Berhasil" : "Gagal"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
