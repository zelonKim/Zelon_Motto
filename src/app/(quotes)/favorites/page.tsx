'use client'

import { useFavQuotes } from '../hooks/use-favorite-quotes'
import { QuoteCard } from '../components/quote-card'
import { useEffect } from 'react'

export default function FavQuotesPage() {
  const { RTFavQuotes, RTLoadFavorite } = useFavQuotes()

  useEffect(() => {
    RTLoadFavorite()
  }, [])

  return (
    <div>
      <h1
        className={
          'mt-40 mb-4 text-2xl text-red-400 font-bold  texttext-secondary-foreground'
        }
      >
        I like this motto :D
      </h1>

      <ul>
        <form>
          {RTFavQuotes &&
            RTFavQuotes.map((quote, index) => (
              <QuoteCard
                key={index}
                quote={quote.quote}
                author={quote.author}
                RTFavPage={true}
              />
            ))}
        </form>
      </ul>
    </div>
  )
}
