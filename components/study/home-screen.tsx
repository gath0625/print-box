"use client"

import { useState } from "react"
import { Bell, Camera, FolderPlus, Star, Clock, ChevronRight, ChevronLeft, X, Plus, Trash2, AlertCircle, Calendar as CalendarIcon } from "lucide-react"
import { folders, tasks } from "@/lib/mock-data"
import type { Screen } from "./bottom-nav"
import { cn } from "@/lib/utils"

// 予定データの型定義
type Event = {
  id: string
  dateKey: string // 例: "6-13" (6月13日)
  text: string
}

// 6月1日〜31日＋翌月データ
const daysList = [
  { d: "金", n: 1 },
  { d: "土", n: 2 },
  { d: "日", n: 3 },
  { d: "月", n: 4 },
  { d: "火", n: 5 },
  { d: "水", n: 6 },
  { d: "木", n: 7 },
  { d: "金", n: 8 },
  { d: "土", n: 9 },
  { d: "日", n: 10 },
  { d: "月", n: 11 },
  { d: "火", n: 12 },
  { d: "水", n: 13, active: true },
  { d: "木", n: 14 },
  { d: "金", n: 15 },
  { d: "土", n: 16 },
  { d: "日", n: 17 },
  { d: "月", n: 18 },
  { d: "火", n: 19 },
  { d: "水", n: 20 },
  { d: "木", n: 21 },
  { d: "金", n: 22 },
  { d: "土", n: 23 },
  { d: "日", n: 24 },
  { d: "月", n: 25 },
  { d: "火", n: 26 },
  { d: "水", n: 27 },
  { d: "木", n: 28 },
  { d: "金", n: 29 },
  { d: "土", n: 30 },
  { d: "日", n: 31 },
  { d: "月", n: 1 },
  { d: "火", n: 2 },
  { d: "水", n: 3 },
  { d: "木", n: 4 },
]

const quickActions = [
  { icon: Camera, label: "撮影", screen: "camera" as Screen },
  { icon: FolderPlus, label: "作成", screen: "create" as Screen },
  { icon: Star, label: "お気に入り", screen: "folders" as Screen },
  { icon: Clock, label: "期限", screen: "folders" as Screen },
]

export function HomeScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  // カレンダーモーダルの表示状態
  const [showCalendarModal, setShowCalendarModal] = useState(false)
  // 表示中の月（初期値: 6月）
  const [currentMonth, setCurrentMonth] = useState(6)
  // 選択された日付（初期値: 13日）
  const [selectedDay, setSelectedDay] = useState(13)
  // 入力中の予定テキスト
  const [newEventText, setNewEventText] = useState("")
  // 保存された予定のリスト
  const [events, setEvents] = useState<Event[]>([
    { id: "1", dateKey: "6-13", text: "数学の宿題提出" },
  ])

  // 削除確認モーダル用の状態
  const [deletingEvent, setDeletingEvent] = useState<Event | null>(null)

  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  const handlePrevMonth = () => setCurrentMonth((prev) => (prev === 1 ? 12 : prev - 1))
  const handleNextMonth = () => setCurrentMonth((prev) => (prev === 12 ? 1 : prev + 1))

  // 選択中日付のキー
  const selectedDateKey = `${currentMonth}-${selectedDay}`

  // 予定の追加処理
  const handleAddEvent = () => {
    if (!newEventText.trim()) return
    const newEvent: Event = {
      id: Date.now().toString(),
      dateKey: selectedDateKey,
      text: newEventText.trim(),
    }
    setEvents([...events, newEvent])
    setNewEventText("")
  }

  // 削除の確定処理
  const confirmDelete = () => {
    if (deletingEvent) {
      setEvents(events.filter((e) => e.id !== deletingEvent.id))
      setDeletingEvent(null)
    }
  }

  // 選択中の日付の予定リスト
  const currentDayEvents = events.filter((e) => e.dateKey === selectedDateKey)

  return (
    <div className="space-y-6 px-4 pb-28 pt-4 bg-background min-h-screen">
      {/* 画面ヘッダー */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">ホーム</h1>
          <p className="text-xs text-muted-foreground">予定とタスクの確認</p>
        </div>
        <button
          aria-label="通知"
          className="relative flex h-10 w-10 items-center justify-center rounded-full bg-muted/50 border border-border/50 transition-transform active:scale-95"
        >
          <Bell className="h-4 w-4 text-foreground" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
        </button>
      </header>

      {/* Week calendar card（ミニマル・ノングラデーション） */}
      <section className="rounded-3xl bg-card border border-border/60 p-4 shadow-sm">
        <div 
          onClick={() => setShowCalendarModal(true)}
          className="mb-3 flex items-center justify-between cursor-pointer group"
        >
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-foreground/70" />
            <p className="text-xs font-bold text-foreground">カレンダー</p>
          </div>
          <span className="flex items-center text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
            6月 <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
          </span>
        </div>
        
        {/* 横スクロール領域 */}
        <div className="overflow-x-auto scrollbar-none pb-1 -mx-4 px-4">
          <div className="flex gap-2 w-max">
            {daysList.map((day, idx) => {
              const hasEvent = events.some((e) => e.dateKey === `6-${day.n}`)
              return (
                <div 
                  key={idx} 
                  onClick={() => {
                    setSelectedDay(day.n)
                    setShowCalendarModal(true)
                  }}
                  className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer min-w-[36px]"
                >
                  <span className="text-[10px] font-medium text-muted-foreground">{day.d}</span>
                  <div className="relative">
                    <span
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-2xl text-xs font-semibold transition-all",
                        day.active
                          ? "bg-foreground text-background font-bold shadow-sm"
                          : "bg-muted/40 text-foreground hover:bg-muted",
                      )}
                    >
                      {day.n}
                    </span>
                    {hasEvent && !day.active && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-foreground/60" />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quick actions */}
      <section>
        <h2 className="mb-2.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">クイック</h2>
        <div className="grid grid-cols-4 gap-2.5">
          {quickActions.map((a) => (
            <button
              key={a.label}
              onClick={() => onNavigate(a.screen)}
              className="flex flex-col items-center gap-2 rounded-2xl bg-card border border-border/50 py-3 shadow-sm transition-transform active:scale-95 hover:bg-muted/30"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted/60 text-foreground">
                <a.icon className="h-4 w-4" />
              </span>
              <span className="text-[11px] font-medium text-foreground">{a.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Folder list */}
      <section>
        <div className="mb-2.5 flex items-center justify-between">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">フォルダ</h2>
          <button
            onClick={() => onNavigate("folders")}
            className="flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            すべて <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {folders.slice(0, 3).map((f) => (
            <button
              key={f.id}
              onClick={() => onNavigate("detail")}
              className="flex flex-col items-start gap-2 rounded-2xl bg-card border border-border/50 p-3 text-left shadow-sm transition-transform active:scale-95 hover:bg-muted/30"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/60 text-sm">
                {f.name === "国語" ? "📖" : f.name.includes("数学") ? "📐" : "🔤"}
              </span>
              <div className="w-full">
                <span className="block truncate text-xs font-bold text-foreground">{f.name}</span>
                <span className="text-[10px] text-muted-foreground">{f.itemCount}件</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Upcoming tasks */}
      <section>
        <h2 className="mb-2.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">直近のタスク</h2>
        <div className="space-y-2">
          {tasks.map((t) => (
            <div
              key={t.id}
              className="flex items-center gap-3 rounded-2xl bg-card border border-border/50 p-3 shadow-sm"
            >
              <span
                className={cn(
                  "flex h-10 w-10 flex-col items-center justify-center rounded-xl font-bold shrink-0 text-xs",
                  t.daysLeft <= 2
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground",
                )}
              >
                <span>{t.due.split("/")[1]}</span>
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-foreground">{t.title}</p>
                <p className="text-[10px] text-muted-foreground">{t.folder}</p>
              </div>
              <span
                className={cn(
                  "shrink-0 rounded-lg px-2 py-1 text-[10px] font-semibold",
                  t.daysLeft <= 2
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground",
                )}
              >
                あと{t.daysLeft}日
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* カレンダー＆予定入力モーダル */}
      {showCalendarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-sm rounded-3xl bg-card border border-border p-5 shadow-xl text-card-foreground max-h-[90vh] overflow-y-auto">
            {/* モーダルヘッダー */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-foreground">{currentMonth}月</h3>
                <div className="flex gap-1">
                  <button onClick={handlePrevMonth} className="p-1 rounded-md hover:bg-muted text-muted-foreground">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button onClick={handleNextMonth} className="p-1 rounded-md hover:bg-muted text-muted-foreground">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <button 
                onClick={() => setShowCalendarModal(false)} 
                className="rounded-full p-1.5 hover:bg-muted text-muted-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            {/* カレンダーグリッド */}
            <div className="space-y-2">
              <div className="grid grid-cols-7 text-center text-[11px] font-medium text-muted-foreground">
                <span>日</span>
                <span>月</span>
                <span>火</span>
                <span>水</span>
                <span>木</span>
                <span>金</span>
                <span>土</span>
              </div>
              <div className="grid grid-cols-7 text-center text-xs gap-y-1">
                {Array.from({ length: daysInMonth[currentMonth - 1] }, (_, i) => i + 1).map((day) => {
                  const hasEvent = events.some((e) => e.dateKey === `${currentMonth}-${day}`)
                  const isSelected = selectedDay === day
                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`relative h-8 w-8 mx-auto flex items-center justify-center rounded-xl text-xs font-medium transition-colors ${
                        isSelected
                          ? "bg-foreground text-background font-bold"
                          : "hover:bg-muted text-foreground"
                      }`}
                    >
                      {day}
                      {hasEvent && !isSelected && (
                        <span className="absolute bottom-1 h-1 w-1 rounded-full bg-foreground/50" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            <hr className="my-4 border-border/50" />

            {/* 選択した日付の予定エリア */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-foreground">
                {currentMonth}月{selectedDay}日の予定
              </h4>

              {/* 予定一覧 */}
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {currentDayEvents.length === 0 ? (
                  <p className="text-xs text-muted-foreground py-3 text-center bg-muted/20 rounded-xl border border-dashed border-border/50">
                    予定なし
                  </p>
                ) : (
                  currentDayEvents.map((event) => (
                    <div 
                      key={event.id} 
                      className="flex items-center justify-between rounded-xl bg-muted/40 p-2.5 text-xs border border-border/40"
                    >
                      <span className="font-medium text-foreground truncate">{event.text}</span>
                      <button 
                        onClick={() => setDeletingEvent(event)} 
                        className="text-muted-foreground hover:text-red-500 p-1 shrink-0"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* 予定追加フォーム */}
              <div className="flex gap-1.5 pt-1">
                <input
                  type="text"
                  placeholder="新しい予定..."
                  value={newEventText}
                  onChange={(e) => setNewEventText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddEvent()}
                  className="flex-1 rounded-xl bg-muted/50 border border-border/50 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-foreground"
                />
                <button
                  onClick={handleAddEvent}
                  className="flex items-center justify-center rounded-xl bg-foreground text-background px-3 py-2 text-xs font-semibold active:scale-95 transition-transform"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <button
              onClick={() => setShowCalendarModal(false)}
              className="mt-5 w-full rounded-xl bg-muted/60 py-2.5 text-xs font-semibold text-foreground hover:bg-muted"
            >
              閉じる
            </button>
          </div>
        </div>
      )}

      {/* 削除確認ダイアログ */}
      {deletingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-xs rounded-2xl bg-card border border-border p-5 shadow-xl text-card-foreground space-y-4">
            <div className="flex flex-col items-center text-center space-y-2 pt-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-500 dark:bg-red-950/30">
                <AlertCircle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-foreground">予定を削除しますか？</h3>
              <p className="text-xs text-muted-foreground px-2">
                「{deletingEvent.text}」を削除します。
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => setDeletingEvent(null)}
                className="rounded-xl bg-muted py-2 text-xs font-semibold text-foreground hover:bg-muted/80"
              >
                キャンセル
              </button>
              <button
                onClick={confirmDelete}
                className="rounded-xl bg-red-500 py-2 text-xs font-semibold text-white hover:bg-red-600 active:scale-95 transition-all"
              >
                削除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}