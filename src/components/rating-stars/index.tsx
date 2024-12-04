import { type HTMLAttributes } from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface RatingStarsProps {
  rating: number
}

export function RatingStars({
  className,
  rating,
  ...props
}: RatingStarsProps & HTMLAttributes<HTMLDivElement>) {
  return (
    <main className={cn('flex items-center gap-1', className)} {...props}>
      {Array.from({ length: 5 }).map((_, index) => {
        const color = rating >= index + 1 ? '#FFD700' : '#C4C4C4'
        return <Star key={index} fill={color} stroke={color} />
      })}
    </main>
  )
}
