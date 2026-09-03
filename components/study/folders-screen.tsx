"use client"

import { useState } from "react"
import { Search, LayoutGrid, List, Plus, Star, Clock, Trash2, ChevronRight } from "lucide-react"
import { folders, subjects } from "@/lib/mock-data"
import type { Screen } from "./bottom-nav"
import { cn } from "@/lib/utils"

const colorMap: Record<string, string> = {
  rose: "bg-[oklch(0.62_0.06_20)]",
  sky: "bg-[oklch(0.68_0.05_240)]",
  sage: "bg-[oklch(0.7_0.05_150)]",
  sand: "bg-[oklch(0.72_0.05_70)]",
  plum: "bg-[oklch(0.55_0.06_320)]",
}

const shortcuts = [
  { icon: Star, label: "お気に入り", count: 3 },
  { icon: Clock, label: "提出期限が近い", count: 1 },
  { icon: Trash2, label: "ゴミ箱", count: 1 },
]

export function FoldersScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [query, setQuery] = useState("")

  const filtered = folders.filter((f) => f.name.includes(query))

  return (
    <div className="space-y-4 px-4 pb-28 pt-3">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">フォルダ画面</h1>
        <button
          onClick={() => onNavigate("create")}
          aria-label="新規フォルダ"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm"
        >
          <Plus className="h-5 w-5" />
        </button>
      </header>

      {/* Search + view toggle */}
      <div className="flex items-center gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-2xl bg-card px-3.5 py-2.5 shadow-sm">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="フォルダを検索"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex items-center rounded-2xl bg-card p-1 shadow-sm">
          <button
            onClick={() => setView("grid")}
            aria-label="グリッド表示"
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-xl",
              view === "grid" ? "bg-accent text-accent-foreground" : "text-muted-foreground",
            )}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setView("list")}
            aria-label="リスト表示"
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-xl",
              view === "list" ? "bg-accent text-accent-foreground" : "text-muted-foreground",
            )}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Folders */}
      {view === "grid" ? (
        <div className="grid grid-cols-3 gap-2.5">
          {filtered.map((f) => {
            const subj = subjects.find((s) => s.id === f.subjectId)
            return (
              <button
                key={f.id}
                onClick={() => onNavigate("detail")}
                className="flex flex-col items-start gap-2 rounded-2xl bg-card p-2.5 text-left shadow-sm transition-transform active:scale-95"
              >
                <span
                  className={cn(
                    "flex aspect-square w-full items-center justify-center rounded-xl text-xl text-primary-foreground",
                    colorMap[f.color],
                  )}
                >
                  {subj?.emoji}
                </span>
                <span className="w-full truncate text-xs font-semibold text-foreground">{f.name}</span>
                <span className="text-[10px] text-muted-foreground">{f.itemCount}件</span>
              </button>
            )
          })}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((f) => {
            const subj = subjects.find((s) => s.id === f.subjectId)
            return (
              <button
                key={f.id}
                onClick={() => onNavigate("detail")}
                className="flex w-full items-center gap-3 rounded-2xl bg-card p-2.5 text-left shadow-sm transition-transform active:scale-[0.98]"
              >
                <span
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-xl text-lg text-primary-foreground",
                    colorMap[f.color],
                  )}
                >
                  {subj?.emoji}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">{f.name}</p>
                  <p className="text-xs text-muted-foreground">{f.itemCount}件</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            )
          })}
        </div>
      )}

      {/* Shortcut list */}
      <div className="space-y-2 pt-1">
        {shortcuts.map((s) => (
          <button
            key={s.label}
            className="flex w-full items-center gap-3 rounded-2xl bg-card p-3.5 text-left shadow-sm transition-transform active:scale-[0.98]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent">
              <s.icon className="h-4.5 w-4.5 text-accent-foreground" />
            </span>
            <span className="flex-1 text-sm font-semibold text-foreground">{s.label}</span>
            <span className="text-sm font-semibold text-muted-foreground">{s.count}</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  )
}
