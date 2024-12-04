'use client'

import { useEffect, useRef, useState } from 'react'
import { getQuotes } from '../utils/getQuotes'
import { QuoteCard } from './quote-card'

interface IQuote {
  id: number
  quote: string
  author: string
}

export function InfiniteScroll() {
  const [scroll, setScroll] = useState<number>(10) // 스크롤 수의 상태를 만듦.
  const [quotes, setQuotes] = useState<IQuote[]>([]) // 명언의 상태를 만듦.

  const trigger = useRef<HTMLSpanElement>(null) // span요소를 참조하는 트리거를 만듦.

  useEffect(() => {
    const observer = new IntersectionObserver( // 관찰자 객체를 생성함.
      async (entries: IntersectionObserverEntry[]) => {
        const element = entries[0] // 관찰하는 요소에 대한 정보를 가져옴.

        if (element.isIntersecting) {
          // 관찰하는 요소가 화면에 보일 경우,
          setScroll((prevScroll) => prevScroll + 50) // 스크롤 수를 50만큼 증가시킴.
        }
      },
      {
        rootMargin: '500px 0px', // 트리거가 화면에 500px 전후로 보이도록 조정함.
        threshold: 0.1, // 10% 이상이 보일 때 위의 콜백함수 실행함.
      }
    )

    if (trigger.current) {
      // 현재 트리거 요소가 존재할 경우,
      observer.observe(trigger.current) // 해당 요소를 관찰함.
    }

    return () => {
      // 컴포넌트가 언마운트 될 때,
      observer.disconnect() // 관찰을 해제함.
    }
  }, [])

  useEffect(() => {
    const getMoreQuotes = async () => {
      try {
        const { quotes: newQuotes } = await getQuotes(scroll, 10) // 10개를 건너뛰고, 스크롤 수만큼 새로운 명언을 더 가져옴.

        setQuotes((prevQuotes) => {
          const uniqQuotes = newQuotes.filter(
            // 중복된 명언을 필터링함.
            (newQuote: IQuote) =>
              !prevQuotes.some(
                (prevQuote) => prevQuote.quote === newQuote.quote
              )
          ) // 새롭게 더 가져온 명언이 이전에 존재하는 명언과 같지 않을 경우에만, 상태에 저장함.
          return [...prevQuotes, ...uniqQuotes]
        })
      } catch (error) {
        console.error('명언을 가져오는데 에러가 발생했습니다. ', error)
      }
    }

    getMoreQuotes()
  }, [scroll]) // 스크롤 값이 바뀔 때마다 새로운 명언을 더 가져옴.

  return (
    <>
      {quotes &&
        quotes.map((quote: IQuote) => (
          <QuoteCard key={quote.id} quote={quote.quote} author={quote.author} />
        ))}

      <span
        ref={trigger} // 트리거 요소로 지정함.
        style={{
          display: 'block',
          height: '10px',
        }}
      />
    </>
  )
}
