import { PropsWithChildren } from 'react'
import Image from 'next/image'
import { Markazi_Text } from 'next/font/google'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '젤론 모토',
  description: '젤론 모토에서 당신의 좌우명을 찾아보세요',
}

const markaziText = Markazi_Text({
  subsets: ['latin'],
  weight: '600',
})

export default function QuotesLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <header
        className={
          'bg-blue-50  container fixed rounded-full shadow-md mt-5 ml-5 left-0 top-0 z-50 bg-background py-7 pl-10 pr-10'
        }
      >
        <section className={' flex items-center justify-between '}>
          <Link href={'/'} className={'inline-flex items-center gap-2'}>
            <Image
              className="rounded-xl mr-1"
              src={'/greek.avif'}
              alt={'logo'}
              width={50}
              height={50}
            />
            <h2
              className={cn(
                markaziText.className,
                'text-3xl lg:text-4xl font-bold hover:bg-blue-100 rounded-xl p-1'
              )}
            >
              Zelon Motto
            </h2>
          </Link>
          <Link
            className={
              'animate-pulse-once hover:bg-red-100 bg-red-50 font-semibold italic text-red-500 border-2 border-red-300 shadow-lg rounded-2xl px-3 py-2 '
            }
            href={'/favorites'}
          >
            My Like
          </Link>
        </section>
      </header>
      <main className={'mt-32'}>{children}</main>
    </div>
  )
}
