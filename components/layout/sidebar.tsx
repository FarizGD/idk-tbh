"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  Calendar,
  ClipboardList,
  BookOpen,
  UserCheck,
  FileText,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface SidebarProps {
  currentUser: { username: string; role: string }
  onLogout: () => void
  activeSection: string
  onSectionChange: (section: string) => void
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ["admin", "moderator", "guru", "siswa"] },
  { id: "attendance", label: "Kehadiran", icon: UserCheck, roles: ["admin", "moderator", "guru"] },
  { id: "schedule", label: "Jadwal Pelajaran", icon: Calendar, roles: ["admin", "moderator", "guru", "siswa"] },
  { id: "cases", label: "Kasus Siswa", icon: ClipboardList, roles: ["admin", "moderator", "guru"] },
  { id: "students", label: "Data Siswa", icon: Users, roles: ["admin", "moderator", "guru"] },
  { id: "teachers", label: "Data Guru", icon: BookOpen, roles: ["admin", "moderator"] },
  { id: "guest-book", label: "Buku Tamu", icon: FileText, roles: ["admin", "moderator", "guru"] },
  { id: "documents", label: "Dokumen", icon: FileText, roles: ["admin", "moderator"] },
]

export function Sidebar({ currentUser, onLogout, activeSection, onSectionChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  const filteredMenuItems = menuItems.filter((item) => item.roles.includes(currentUser.role))

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="p-2 bg-sidebar-primary rounded-lg">
              <GraduationCap className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
            <div>
              <h2 className="font-semibold text-sidebar-foreground">SIJ SMK</h2>
              <p className="text-xs text-muted-foreground">TKJ System</p>
            </div>
          </div>
        )}
        <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)} className="h-8 w-8 p-0">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* User Info */}
      {!collapsed && (
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-sidebar-primary rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-sidebar-primary-foreground">
                {currentUser.username.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-medium text-sidebar-foreground">{currentUser.username}</p>
              <p className="text-xs text-muted-foreground capitalize">{currentUser.role}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <ScrollArea className="flex-1 p-2">
        <nav className="space-y-1">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "secondary" : "ghost"}
                className={cn("w-full justify-start gap-3 h-10", collapsed && "justify-center px-2")}
                onClick={() => onSectionChange(item.id)}
              >
                <Icon className="h-4 w-4" />
                {!collapsed && <span>{item.label}</span>}
              </Button>
            )
          })}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="p-2 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3 h-10 text-destructive hover:text-destructive",
            collapsed && "justify-center px-2",
          )}
          onClick={onLogout}
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span>Keluar</span>}
        </Button>
      </div>
    </div>
  )
}
