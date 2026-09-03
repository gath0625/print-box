export type SubjectColor = {
  key: string
  label: string
  swatch: string // tailwind bg class token
}

export const subjectColors: SubjectColor[] = [
  { key: "rose", label: "ローズ", swatch: "bg-[oklch(0.62_0.06_20)]" },
  { key: "sand", label: "サンド", swatch: "bg-[oklch(0.72_0.05_70)]" },
  { key: "sage", label: "セージ", swatch: "bg-[oklch(0.7_0.05_150)]" },
  { key: "sky", label: "スカイ", swatch: "bg-[oklch(0.68_0.05_240)]" },
  { key: "plum", label: "プラム", swatch: "bg-[oklch(0.55_0.06_320)]" },
]

export type Subject = {
  id: string
  name: string
  emoji: string
}

export const subjects: Subject[] = [
  { id: "jp", name: "国語", emoji: "📖" },
  { id: "math", name: "数学", emoji: "📐" },
  { id: "en", name: "英語", emoji: "🔤" },
  { id: "sci", name: "理科", emoji: "🧪" },
  { id: "soc", name: "社会", emoji: "🌏" },
  { id: "art", name: "美術", emoji: "🎨" },
]

export type Folder = {
  id: string
  name: string
  subjectId: string
  color: string
  itemCount: number
  favorite: boolean
}

export const folders: Folder[] = [
  { id: "f1", name: "国語", subjectId: "jp", color: "rose", itemCount: 12, favorite: true },
  { id: "f2", name: "数学", subjectId: "math", color: "sky", itemCount: 8, favorite: false },
  { id: "f3", name: "英語", subjectId: "en", color: "sage", itemCount: 5, favorite: true },
  { id: "f4", name: "化学", subjectId: "sci", color: "sand", itemCount: 9, favorite: false },
  { id: "f5", name: "地理", subjectId: "soc", color: "plum", itemCount: 3, favorite: false },
  { id: "f6", name: "美術", subjectId: "art", color: "rose", itemCount: 7, favorite: true },
]

export type Task = {
  id: string
  title: string
  folder: string
  due: string
  daysLeft: number
}

export const tasks: Task[] = [
  { id: "t1", title: "読書感想文の下書き", folder: "国語", due: "6/16", daysLeft: 2 },
  { id: "t2", title: "微分の演習プリント", folder: "数学 II", due: "6/18", daysLeft: 4 },
  { id: "t3", title: "英単語テスト範囲", folder: "英語 表現", due: "6/20", daysLeft: 6 },
]

export type SubFolder = {
  id: string
  name: string
  count: number
  tag: "all" | "new" | "hard"
}

export const detailFolders: SubFolder[] = [
  { id: "d1", name: "現代文 ノート", count: 6, tag: "new" },
  { id: "d2", name: "古典 単語帳", count: 4, tag: "hard" },
  { id: "d3", name: "漢字 テスト", count: 8, tag: "all" },
  { id: "d4", name: "小論文 メモ", count: 2, tag: "new" },
]
