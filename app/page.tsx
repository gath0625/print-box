"use client"



import { useState } from "react"

import { BottomNav, type Screen } from "@/components/study/bottom-nav"

import { HomeScreen } from "@/components/study/home-screen"

import { FoldersScreen } from "@/components/study/folders-screen"

import { CreateWizard } from "@/components/study/create-wizard"

import { FolderDetailScreen } from "@/components/study/folder-detail-screen"

import { CameraScreen } from "@/components/study/camera-screen"

import { SettingsScreen } from "@/components/study/settings-screen"



export default function Page() {

  const [screen, setScreen] = useState<Screen>("home")



  return (

    <main className="flex min-h-dvh items-center justify-center bg-muted p-0 sm:p-6">

      {/* iPhone 14/15 Pro frame */}

      <div className="relative h-dvh w-full overflow-hidden bg-background sm:h-[844px] sm:w-[390px] sm:rounded-[3rem] sm:border-8 sm:border-[oklch(0.28_0.01_25)] sm:shadow-2xl">

        {/* notch */}

        <div className="pointer-events-none absolute left-1/2 top-0 z-30 hidden h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-[oklch(0.28_0.01_25)] sm:block" />



        {/* scrollable screen area */}

        <div className="h-full overflow-y-auto">

          {screen === "home" && <HomeScreen onNavigate={setScreen} />}

          {screen === "folders" && <FoldersScreen onNavigate={setScreen} />}

          {screen === "create" && <CreateWizard onNavigate={setScreen} />}

          {screen === "detail" && <FolderDetailScreen onNavigate={setScreen} />}

          {screen === "camera" && <CameraScreen onNavigate={setScreen} />}

          {screen === "settings" && <SettingsScreen />}

        </div>



        <BottomNav active={screen} onNavigate={setScreen} />

      </div>

    </main>

  )

}