'use client'

import { useCallback, useState } from 'react'
import { IQuote } from '../(list)/page'

export function useFavQuotes() {
  const [favQuotes, setFavQuotes] = useState<IQuote[]>([]) // 즐겨찾기의 상태를 만듦.
  const [RTFavQuotes, setRTFavQuotes] = useState<IQuote[]>([]) // 실시간 즐겨찾기의 상태를 만듦.

  const storedFav = useCallback(() => {
    if (typeof window !== 'undefined') {
      const storQuotes = Object.values(localStorage) // 로컬 스토리지에 저장된 명언을 가져옴.
        .map((storQuote) => JSON.parse(storQuote))
        .filter(
          (storQuote: IQuote) => storQuote.quote && storQuote.author
        ) as IQuote[]
      return storQuotes
    }
  }, [])

  const loadFavorite = useCallback(() => {
    // 로컬 스토리지에 저장된 명언을 즐겨찾기 명언으로 로드함.
    if (typeof window !== 'undefined') {
      const storQuotes = storedFav()
      setFavQuotes(storQuotes!)
    }
  }, [storedFav])

  const RTLoadFavorite = useCallback(() => {
    // 로컬 스토리지에 저장된 명언을 실시간 즐겨찾기 명언으로 로드함.
    if (typeof window !== 'undefined') {
      const storQuotes = storedFav()
      setRTFavQuotes(storQuotes!)
    }
  }, [storedFav])

  const addFavorite = useCallback(
    (quoteObj: IQuote) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(quoteObj.quote, JSON.stringify(quoteObj)) // 로컬 스토리지에 키를 quote으로, 밸류를 quoteObj으로 하여 추가함.
        loadFavorite()
      }
    },
    [loadFavorite]
  )

  const removeFavorite = useCallback(
    (quote: string) => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(quote) // 로컬 스토리지에서 키가 quote인 명언을 삭제함.
        loadFavorite()
      }
    },
    [loadFavorite]
  )

  const RTRemoveFavorite = useCallback(
    (quote: string) => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(quote)
        RTLoadFavorite()
      }
    },
    [RTLoadFavorite]
  )

  return {
    favQuotes,
    RTFavQuotes,
    loadFavorite,
    RTLoadFavorite,
    addFavorite,
    removeFavorite,
    RTRemoveFavorite,
  }
}
