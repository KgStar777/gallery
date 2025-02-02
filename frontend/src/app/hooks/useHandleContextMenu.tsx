"use client"

import { useEffect } from "react";

export function useHandleContextMenu() {
  const handleContextMenuClick = (event: MouseEvent) => {
    const evt = event.target as HTMLElement;   
    if (evt && evt.tagName === "IMG") {
      event.preventDefault();
    }
  }

  useEffect(() => {
    document.addEventListener("contextmenu", handleContextMenuClick);

    return () => {
      document.removeEventListener("mousedown", handleContextMenuClick)
    }
  }, [])
}