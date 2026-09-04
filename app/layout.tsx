import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StudyBox — 学習フォルダ",
  description: "教科ごとに課題やノートを整理する学習管理アプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
