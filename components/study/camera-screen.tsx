"use client"

import { ChevronLeft, Images, RotateCcw, Zap } from "lucide-react"
import type { Screen } from "./bottom-nav"

export function CameraScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <div className="flex min-h-full flex-col px-4 pb-28 pt-3">
      <header className="mb-4 flex items-center gap-2">
        <button onClick={() => onNavigate("detail")} aria-label="戻る" className="flex h-9 w-9 items-center justify-center rounded-full bg-card shadow-sm">
          <ChevronLeft className="h-5 w-5 text-foreground" />
        </button>
        <h1 className="flex-1 text-lg font-bold text-foreground">カメラ</h1>
        <button aria-label="フラッシュ" className="flex h-9 w-9 items-center justify-center rounded-full bg-card shadow-sm">
          <Zap className="h-5 w-5 text-foreground" />
        </button>
      </header>

      {/* Viewfinder with grid guide */}
      <div className="relative flex-1 overflow-hidden rounded-3xl bg-[oklch(0.35_0.01_25)]">
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="border border-primary-foreground/15" />
          ))}
        </div>
        {/* Focus frame */}
        <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-xl border-2 border-primary-foreground/70" />
        <div className="absolute inset-x-0 bottom-4 text-center text-xs text-primary-foreground/70">
          書類を枠に合わせてください
        </div>
      </div>

      {/* Controls */}
      <div className="mt-5 flex items-center justify-between px-6">
        <button aria-label="アルバム" className="flex h-11 w-11 items-center justify-center rounded-2xl bg-card shadow-sm">
          <Images className="h-5 w-5 text-foreground" />
        </button>
        <button
          onClick={() => onNavigate("detail")}
          aria-label="撮影"
          className="flex h-16 w-16 items-center justify-center rounded-full bg-card shadow-md ring-4 ring-primary/40 transition-transform active:scale-95"
        >
          <span className="h-12 w-12 rounded-full bg-primary" />
        </button>
        <button aria-label="カメラ切替" className="flex h-11 w-11 items-center justify-center rounded-2xl bg-card shadow-sm">
          <RotateCcw className="h-5 w-5 text-foreground" />
        </button>
      </div>
    </div>
  )
}
