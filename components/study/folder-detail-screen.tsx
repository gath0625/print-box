"use client"

import { useState } from "react"
import { ChevronLeft, Pencil, Camera, FolderClosed, ChevronRight, MoreHorizontal } from "lucide-react"
import { detailFolders } from "@/lib/mock-data"
import type { Screen } from "./bottom-nav"
import { cn } from "@/lib/utils"

const tabs = [
  { key: "all", label: "すべて" },
  { key: "new", label: "新しい順" },
  { key: "hard", label: "難易度" },
] as const

export function FolderDetailScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [tab, setTab] = useState<(typeof tabs)[number]["key"]>("all")

  const list = tab === "all" ? detailFolders : detailFolders.filter((f) => f.tag === tab)

  return (
    <div className="space-y-4 px-4 pb-28 pt-3">
      <header className="flex items-center gap-2">
        <button onClick={() => onNavigate("folders")} aria-label="戻る" className="flex h-9 w-9 items-center justify-center rounded-full bg-card shadow-sm">
          <ChevronLeft className="h-5 w-5 text-foreground" />
        </button>
        <h1 className="flex-1 text-lg font-bold text-foreground">国語</h1>
        <button aria-label="その他" className="flex h-9 w-9 items-center justify-center rounded-full bg-card shadow-sm">
          <MoreHorizontal className="h-5 w-5 text-foreground" />
        </button>
      </header>

      {/* Cover */}
      <div className="relative flex aspect-[16/9] w-full items-center justify-center rounded-3xl bg-[oklch(0.62_0.06_20)]">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-foreground/20 text-4xl">
          📖
        </span>
        <button
          onClick={() => onNavigate("camera")}
          aria-label="写真を撮る"
          className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-card shadow-md"
        >
          <Camera className="h-5 w-5 text-foreground" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "rounded-full px-4 py-1.5 text-xs font-semibold transition-colors",
              tab === t.key ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground shadow-sm",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Sub folders */}
      <div className="space-y-2">
        {list.map((f) => (
          <button
            key={f.id}
            className="flex w-full items-center gap-3 rounded-2xl bg-card p-3.5 text-left shadow-sm transition-transform active:scale-[0.98]"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent">
              <FolderClosed className="h-5 w-5 text-accent-foreground" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">{f.name}</p>
              <p className="text-xs text-muted-foreground">{f.count}件のノート</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
        {list.length === 0 && (
          <p className="py-10 text-center text-sm text-muted-foreground">項目がありません</p>
        )}
      </div>
    </div>
  )
}
