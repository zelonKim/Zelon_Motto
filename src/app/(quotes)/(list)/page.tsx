import { getQuotes } from '../utils/getQuotes'
import { QuoteCard } from '../components/quote-card'
import { InfiniteScroll } from '../components/infinite-scroll'

export interface IQuote {
  id?: number
  quote: string
  author: string
}

export default async function QuotesPage() {
  const { quotes } = await getQuotes(10) // 처음 화면에 기본 명언 10개를 불러옴.

  return (
    <>
      {quotes &&
        quotes.map((quote: IQuote) => (
          <QuoteCard key={quote.id} quote={quote.quote} author={quote.author} />
        ))}
      <div>
        <InfiniteScroll />
      </div>
    </>
  )
}
