import { createStore } from 'zustand/vanilla'
import { createContext } from 'react'
// import { getAvailableLanguages } from '../services/imageService';
import { headers } from 'next/headers';
import { getProprityLanguages } from '../utils/getProprityLanguages';

export type GlobalState = {
  lang: string;
  availableLangs: string[];
}

export type GlobalActions = {
  setLanguage: (newLang: string) => void
}

export type GlobalStore = GlobalState & GlobalActions

export const defaultInitState: GlobalState = {
    lang: "en",
    // lang: getLang(),
    availableLangs: ["en", "ru"]
}

export const createGlobalStore = (
  initState: GlobalState = defaultInitState,
) => {
  return createStore<GlobalStore>()((set) => ({
    ...initState,
    setLanguage: (newLang: string) => set((state) => ({ lang: newLang })),
    setAvailableLanguages: (newLangs: string[]) => set((state) => ({ availableLangs: newLangs })),
  }))
}

// export type GlobalState = {
//   lang: string;
//   availableLangs: string[];
// }

// export type GlobalActions = {
//   setLanguage: (newLang: string) => void
//   setAvailableLanguages: (newLangs: string[]) => void
// }

// export type GlobalStore = GlobalState & GlobalActions
// // GlobalState
// export const createInitState = (initProps: Partial<GlobalStore>) => {
//   const DEFAULT_PROPS = {
//     lang: "en",
//     availableLangs: ["en", "ru"]
//   }

//   return createStore<GlobalStore>()((set) => ({
//     ...DEFAULT_PROPS,
//     ...initProps,
//     setLanguage: (newLang: string) => set((state) => ({ lang: newLang })),
//     setAvailableLanguages: (newLangs: string[]) => set((state) => ({ availableLangs: newLangs })),
//   }))
// }

// export const BearContext = createContext<GlobalState | null>(null)