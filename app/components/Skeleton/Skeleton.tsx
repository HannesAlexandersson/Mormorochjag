import { cn } from '@/lib/utils'
import React from 'react'

interface SkeletonProps {
    className?: string
    dark?: boolean
    }

const Skeleton: React.FC<SkeletonProps> = ({ className, dark = false, ...props }) => {
  return (
    <div
      className={cn(
        'h-full w-full animate-pulse rounded-lg bg-zinc-100',
        { 'bg-zinc-800': dark },
        className,
      )}
      {...props}
    />
  )
}

export default Skeleton