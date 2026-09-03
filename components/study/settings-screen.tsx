"use client"

import { Bell, Moon, Lock, CircleHelp, LogOut, ChevronRight } from "lucide-react"

const rows = [
  { icon: Bell, label: "通知" },
  { icon: Moon, label: "ダークモード" },
  { icon: Lock, label: "プライバシー" },
  { icon: CircleHelp, label: "ヘルプ" },
]

export function SettingsScreen() {
  return (
    <div className="space-y-5 px-4 pb-28 pt-3">
      <h1 className="text-xl font-bold text-foreground">設定</h1>

      <div className="flex items-center gap-3 rounded-3xl bg-card p-4 shadow-sm">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl text-primary-foreground">
          名
        </span>
        <div>
          <p className="text-base font-bold text-foreground">名前</p>
          <p className="text-xs text-muted-foreground">高校3年生 · 6フォルダ</p>
        </div>
      </div>

      <div className="space-y-2">
        {rows.map((r) => (
          <button
            key={r.label}
            className="flex w-full items-center gap-3 rounded-2xl bg-card p-3.5 text-left shadow-sm transition-transform active:scale-[0.98]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent">
              <r.icon className="h-4.5 w-4.5 text-accent-foreground" />
            </span>
            <span className="flex-1 text-sm font-semibold text-foreground">{r.label}</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
      </div>

      <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary/10 py-3.5 text-sm font-bold text-primary">
        <LogOut className="h-4.5 w-4.5" />
        ログアウト
      </button>
    </div>
  )
}
