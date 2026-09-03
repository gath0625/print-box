"use client"

import { useState, useRef } from "react"
import { ChevronLeft, Check, ImagePlus, Pencil, PartyPopper, Plus, Image as ImageIcon } from "lucide-react"
import { subjects as initialSubjects, subjectColors } from "@/lib/mock-data"
import type { Screen } from "./bottom-nav"
import { cn } from "@/lib/utils"

type SubjectItem = {
  id: string
  name: string
  emoji?: string
  imageUrl?: string
}

const PRESET_SUBJECT_NAMES = [
  "情報", "音楽", "保健体育", "技術家庭", "物理", "化学", "歴史", "地理"
]

const EMOJI_OPTIONS = ["📚", "💻", "🎵", "⚽", "🛠️", "⚡", "🧪", "📜", "🗺️", "🎨", "✍️", "📖"]

export function CreateWizard({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [step, setStep] = useState(1)
  const [subjectList, setSubjectList] = useState<SubjectItem[]>(initialSubjects)
  const [subject, setSubject] = useState<string | null>("jp")
  const [color, setColor] = useState("rose")
  const [name, setName] = useState("国語")

  // 教科追加ダイアログ用
  const [isAdding, setIsAdding] = useState(false)
  const [newSubjectName, setNewSubjectName] = useState("")
  const [selectedEmoji, setSelectedEmoji] = useState("📚")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const selectedSubject = subjectList.find((s) => s.id === subject)
  const selectedColor = subjectColors.find((c) => c.key === color) || subjectColors[0]

  const back = () => (step > 1 ? setStep(step - 1) : onNavigate("folders"))

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.URL.createObjectURL(file)
      setUploadedImage(url)
    }
  }

  const handleAddSubject = () => {
    const finalName = newSubjectName.trim()
    if (!finalName) return

    const newId = `custom-${Date.now()}`
    const newSub: SubjectItem = {
      id: newId,
      name: finalName,
      ...(uploadedImage
        ? { imageUrl: uploadedImage }
        : { emoji: selectedEmoji }),
    }

    setSubjectList([...subjectList, newSub])
    setSubject(newId)
    setName(newSub.name)
    setNewSubjectName("")
    setUploadedImage(null)
    setIsAdding(false)
  }

  return (
    <div className="flex min-h-full flex-col px-4 pb-28 pt-3">
      {/* Header + stepper */}
      <header className="mb-6 flex items-center gap-2">
        <button onClick={back} aria-label="戻る" className="flex h-9 w-9 items-center justify-center rounded-full bg-card shadow-sm">
          <ChevronLeft className="h-5 w-5 text-foreground" />
        </button>
        <h1 className="flex-1 text-center text-base font-bold text-foreground">
          フォルダ作成 {step}
        </h1>
        <span className="h-9 w-9" />
      </header>

      <Stepper step={step} />

      <div className="mt-6 flex-1">
        {step === 1 && (
          <section>
            <h2 className="mb-3 text-sm font-bold text-foreground">教科を選択</h2>
            <div className="grid grid-cols-3 gap-3">
              {subjectList.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setSubject(s.id)
                    setName(s.name)
                  }}
                  className={cn(
                    "relative flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border-2 bg-card shadow-sm transition-all active:scale-95",
                    subject === s.id ? "border-primary" : "border-transparent",
                  )}
                >
                  {s.imageUrl ? (
                    <img src={s.imageUrl} alt={s.name} className="h-8 w-8 rounded-full object-cover" />
                  ) : (
                    <span className="text-2xl">{s.emoji}</span>
                  )}
                  <span className="text-xs font-semibold text-foreground">{s.name}</span>
                  {subject === s.id && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                  )}
                </button>
              ))}

              {/* 教科追加ボタン */}
              <button
                onClick={() => setIsAdding(true)}
                className="flex aspect-square flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-border bg-card/50 text-muted-foreground transition-all active:scale-95 hover:bg-accent"
              >
                <Plus className="h-6 w-6" />
                <span className="text-xs font-semibold">追加</span>
              </button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="space-y-5">
            {/* 選択したカラーが背景色に反映されるカード */}
            <div
              className={cn(
                "relative mx-auto flex aspect-[4/3] w-full items-center justify-center rounded-3xl transition-colors duration-300 opacity-90 shadow-sm",
                selectedColor.swatch
              )}
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-black/20 backdrop-blur-md text-3xl text-white overflow-hidden shadow-inner">
                {selectedSubject?.imageUrl ? (
                  <img src={selectedSubject.imageUrl} alt="" className="h-full w-full object-cover" />
                ) : (
                  selectedSubject?.emoji
                )}
              </span>
              <button aria-label="編集" className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm shadow-md">
                <Pencil className="h-4 w-4 text-foreground" />
              </button>
            </div>

            <div className="flex items-center gap-2 rounded-2xl bg-card px-3.5 py-2.5 shadow-sm">
              <Pencil className="h-4 w-4 text-muted-foreground" />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="フォルダ名を入力"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>

            <button className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-card py-4 text-sm font-semibold text-muted-foreground hover:bg-accent/50 transition-colors">
              <ImagePlus className="h-5 w-5" />
              画像を追加
            </button>

            {/* 横スクロール対応のカラーパレット */}
            <div>
              <p className="mb-3 text-sm font-bold text-foreground">色を選ぶ</p>
              <div className="flex gap-3 overflow-x-auto py-2 px-1 no-scrollbar">
                {subjectColors.map((c) => (
                  <button
                    key={c.key}
                    onClick={() => setColor(c.key)}
                    aria-label={c.label}
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all active:scale-90 shadow-sm",
                      c.swatch,
                      color === c.key ? "ring-2 ring-foreground ring-offset-2 ring-offset-background scale-105" : "opacity-80 hover:opacity-100",
                    )}
                  >
                    {color === c.key && <Check className="h-5 w-5 text-white" strokeWidth={3} />}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="flex flex-col items-center">
            <div className={cn("mb-5 flex aspect-[4/3] w-full items-center justify-center rounded-3xl overflow-hidden opacity-90 transition-colors shadow-sm", selectedColor.swatch)}>
              {selectedSubject?.imageUrl ? (
                <img src={selectedSubject.imageUrl} alt="" className="h-24 w-24 rounded-full object-cover shadow-lg" />
              ) : (
                <span className="text-6xl drop-shadow-md">{selectedSubject?.emoji}</span>
              )}
            </div>
            <h2 className="text-lg font-bold text-foreground">{name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">この内容でフォルダを作成します</p>

            <dl className="mt-6 w-full space-y-2.5">
              <Row
                label="教科"
                value={
                  <span className="flex items-center gap-1.5">
                    {selectedSubject?.imageUrl ? (
                      <img src={selectedSubject.imageUrl} alt="" className="h-4 w-4 rounded-full object-cover" />
                    ) : (
                      selectedSubject?.emoji
                    )}
                    {selectedSubject?.name}
                  </span>
                }
              />
              <Row label="フォルダ名" value={name} />
              <Row
                label="カラー"
                value={
                  <span className="flex items-center gap-2">
                    <span className={cn("h-4 w-4 rounded-full", selectedColor.swatch)} />
                    {selectedColor.label}
                  </span>
                }
              />
            </dl>
          </section>
        )}
      </div>

      {/* 教科追加ポップアップ */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-xs rounded-3xl bg-card p-5 shadow-xl border border-border space-y-4">
            <h3 className="text-base font-bold text-foreground">新しい教科を追加</h3>

            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2">おすすめの教科</p>
              <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto">
                {PRESET_SUBJECT_NAMES.map((subjectName) => (
                  <button
                    key={subjectName}
                    onClick={() => setNewSubjectName(subjectName)}
                    className={cn(
                      "flex items-center gap-1 rounded-xl px-2.5 py-1 text-xs font-semibold transition-colors",
                      newSubjectName === subjectName
                        ? "bg-primary text-primary-foreground font-bold shadow-sm"
                        : "bg-accent text-foreground hover:bg-accent/80"
                    )}
                  >
                    <span>{subjectName}</span>
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-border/60" />

            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2">アイコンを選択（絵文字 または 画像）</p>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />

              <div className="flex items-center gap-2 overflow-x-auto py-1 px-0.5 mb-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className={cn(
                    "flex h-9 shrink-0 items-center gap-1.5 rounded-xl px-2.5 text-xs font-semibold transition-all active:scale-95 shadow-sm",
                    uploadedImage
                      ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-card"
                      : "bg-accent text-muted-foreground hover:bg-accent/80",
                  )}
                >
                  {uploadedImage ? (
                    <>
                      <img src={uploadedImage} alt="" className="h-5 w-5 rounded-full object-cover" />
                      <span>変更</span>
                    </>
                  ) : (
                    <>
                      <ImageIcon className="h-4 w-4" />
                      <span>画像</span>
                    </>
                  )}
                </button>

                <div className="h-5 w-px bg-border shrink-0 my-auto" />

                {EMOJI_OPTIONS.map((e) => {
                  const isSelected = !uploadedImage && selectedEmoji === e
                  return (
                    <button
                      key={e}
                      onClick={() => {
                        setUploadedImage(null)
                        setSelectedEmoji(e)
                      }}
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-lg transition-all active:scale-90",
                        isSelected
                          ? "bg-primary text-primary-foreground scale-110 shadow-md ring-2 ring-primary ring-offset-2 ring-offset-card"
                          : "bg-accent/60 hover:bg-accent text-foreground",
                      )}
                    >
                      {e}
                    </button>
                  )
                })}
              </div>

              <div className="flex items-center gap-2 mt-3">
                <input
                  type="text"
                  placeholder="教科名を入力"
                  value={newSubjectName}
                  onChange={(e) => setNewSubjectName(e.target.value)}
                  className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                onClick={() => {
                  setUploadedImage(null)
                  setIsAdding(false)
                }}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-accent"
              >
                キャンセル
              </button>
              <button
                onClick={handleAddSubject}
                disabled={!newSubjectName.trim()}
                className="rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-sm disabled:opacity-40"
              >
                追加
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer action */}
      <div className="pt-4">
        {step < 3 ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={step === 1 && !subject}
            className="w-full rounded-2xl bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-transform active:scale-[0.98] disabled:opacity-50"
          >
            {step === 1 ? "次へ" : "確認する"}
          </button>
        ) : (
          <button
            onClick={() => onNavigate("folders")}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-transform active:scale-[0.98]"
          >
            <PartyPopper className="h-5 w-5" />
            作成する
          </button>
        )}
      </div>
    </div>
  )
}

function Stepper({ step }: { step: number }) {
  return (
    <div className="flex items-center">
      {[1, 2, 3].map((n, i) => (
        <div key={n} className="flex flex-1 items-center last:flex-none">
          <span
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors",
              step >= n ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
            )}
          >
            {step > n ? <Check className="h-4 w-4" strokeWidth={3} /> : n}
          </span>
          {i < 2 && (
            <span className={cn("mx-2 h-1 flex-1 rounded-full transition-colors", step > n ? "bg-primary" : "bg-muted")} />
          )}
        </div>
      ))}
    </div>
  )
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-card px-4 py-3 shadow-sm">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="text-sm font-semibold text-foreground">{value}</dd>
    </div>
  )
}