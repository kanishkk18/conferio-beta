"use client"

import React, { useState } from "react"

import DynamicIsland, {
  DynamicIslandProps,
} from "@/components/ui/DynamicIsland"

const DynamicIslandDemo = () => {
  const [view, setView] = useState<DynamicIslandProps["view"]>()

  return <DynamicIsland view={view} onViewChange={setView} />
}

export default DynamicIslandDemo
