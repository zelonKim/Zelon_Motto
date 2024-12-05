'use client'

import React, { useState, useEffect, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { HeartIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFavQuotes } from '../hooks/use-favorite-quotes'
import { Markazi_Text } from 'next/font/google'

const markaziText = Markazi_Text({
  subsets: ['latin'],
  weight: '400',
})

export interface QuoteCardProps {
  quote: string
  author: string
  RTFavPage?: boolean
}

export function QuoteCard({
  className,
  quote,
  author,
  RTFavPage,
  ...props
}: QuoteCardProps & HTMLAttributes<HTMLDivElement>) {
  const [fav, setFav] = useState(false)

  useEffect(() => {
    const starQuote = localStorage.getItem(quote) // 로컬 스토리지에서 키가 quote인 명언을 불러옴.
    if (starQuote) {
      // 해당 명언이 존재할 경우,
      setFav(true) // 이미 즐겨찾기된 명언으로 저장해줌.
    }
  }, [quote])

  const { addFavorite, removeFavorite, RTRemoveFavorite } = useFavQuotes()

  const onClick = () => {
    setFav((prevFav) => {
      if (!prevFav) {
        addFavorite({ quote, author })
      } else if (RTFavPage) {
        RTRemoveFavorite(quote)
      } else {
        removeFavorite(quote)
      }
      return !prevFav
    })
  }

  return (
    <main className={cn('relative p-5 border-b', className)} {...props}>
      <div className={cn(markaziText.className)}>
        <p className={'text-2xl text-blue-500 italic'}>{quote}</p>
        <small className={'text-lg text-blue-400'}>- {author} -</small>
      </div>
      <Button
        className="absolute right-2 top-2 p-3 rounded-2xl hover:bg-red-100"
        onClick={onClick}
        variant="ghost"
      >
        {fav ? (
          <HeartIcon
            className={' animate-ping-once'}
            fill={'#FF5050'}
            stroke={'#FF5050'}
          />
        ) : (
          <HeartIcon fill={'transparent'} className={'text-gray-400'} />
        )}
      </Button>
    </main>
  )
}
