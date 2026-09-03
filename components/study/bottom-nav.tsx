"use client"

import { Home, FolderClosed, Plus, CalendarDays, User } from "lucide-react"
import { cn } from "@/lib/utils"

export type Screen = "home" | "folders" | "create" | "detail" | "camera" | "settings"

const items: { key: Screen; label: string; icon: typeof Home }[] = [
  { key: "home", label: "ホーム", icon: Home },
  { key: "folders", label: "フォルダ", icon: FolderClosed },
  { key: "create", label: "作成", icon: Plus },
  { key: "settings", label: "予定", icon: CalendarDays },
  { key: "settings", label: "設定", icon: User },
]

export function BottomNav({
  active,
  onNavigate,
}: {
  active: Screen
  onNavigate: (s: Screen) => void
}) {
  return (
    <nav className="absolute inset-x-0 bottom-0 z-20 border-t border-border/70 bg-card/95 backdrop-blur-md">
      <div className="flex items-end justify-around px-2 pb-6 pt-2">
        {items.map((item, i) => {
          const isCenter = item.key === "create"
          const isActive = active === item.key && !isCenter
          const Icon = item.icon

          if (isCenter) {
            return (
              <button
                key={i}
                onClick={() => onNavigate("create")}
                aria-label="フォルダを作成"
                className="-mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform active:scale-95"
              >
                <Icon className="h-6 w-6" strokeWidth={2.5} />
              </button>
            )
          }

          return (
            <button
              key={i}
              onClick={() => onNavigate(item.key)}
              aria-label={item.label}
              className={cn(
                "flex flex-1 flex-col items-center gap-0.5 py-1 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
