'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import { createGlobalStore, type GlobalStore } from '@/app/stores/global-store'

export type GlobalStoreApi = ReturnType<typeof createGlobalStore>

export const GlobalStoreContext = createContext<GlobalStoreApi | undefined>(
  undefined,
)

export interface GlobalStoreApiProviderProps {
  children: ReactNode
}

export const GlobalStoreProvider = ({
  children,
}: GlobalStoreApiProviderProps) => {
  const storeRef = useRef<GlobalStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createGlobalStore()
  }

  return (
    <GlobalStoreContext.Provider value={storeRef.current}>
      {children}
    </GlobalStoreContext.Provider>
  )
}

export const useGlobalStore = <T,>(
  selector: (store: GlobalStore) => T,
): T => {
  const counterStoreContext = useContext(GlobalStoreContext)

  if (!counterStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`)
  }

  return useStore(counterStoreContext, selector)
}


// 'use client'

// import { type ReactNode, createContext, useRef, useContext } from 'react'
// import { useStore } from 'zustand'

// import { createInitState, type GlobalStore } from '@/app/stores/global-store'
// import { getAvailableLanguages } from '../services/imageService'

// export type GlobalStoreApi = ReturnType<typeof createInitState>

// export const GlobalStoreContext = createContext<GlobalStoreApi | undefined>(
//   undefined,
// )

// export interface GlobalStoreApiProviderProps {
//   children: ReactNode
// }

// export const GlobalStoreProvider = async ({
//   children,
// }: GlobalStoreApiProviderProps) => {

//   const l = await getAvailableLanguages();

//   console.log("l: ", l);

//   const storeRef = useRef<GlobalStoreApi>()
//   if (!storeRef.current) {
//     storeRef.current = createInitState(l)
//   }

//   return (
//     <GlobalStoreContext.Provider value={storeRef.current}>
//       {children}
//     </GlobalStoreContext.Provider>
//   )
// }

// export const useGlobalStore = <T,>(
//   selector: (store: GlobalStore) => T,
// ): T => {
//   const counterStoreContext = useContext(GlobalStoreContext)

//   if (!counterStoreContext) {
//     throw new Error(`useCounterStore must be used within CounterStoreProvider`)
//   }

//   return useStore(counterStoreContext, selector)
// }