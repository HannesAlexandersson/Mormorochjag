import Skeleton from './Skeleton'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import Typography from '../Typography/Typography'

interface PageTitleProps {
    children: ReactNode,
    className?: string,
    variant?: 'light' | 'dark',
  }


const title = cva('flex flex-col gap-4 break-words py-32', {
  variants: {
    variant: {
      light: 'text-white',
      dark: 'text-black',
    },
  },
  defaultVariants: {
    variant: 'dark',
  },
})

const PageTitle: React.FC<PageTitleProps> = ({ children, className, variant = 'dark', ...props } ) => {
  return (
    <Typography
      variant='h1'
      className={cn(title({ variant, className }))}
      {...props}
    >
      {children}      
    </Typography>
  )
}

export const PageTitleSkeleton = ({ dark = false }) => {
  return <Skeleton className={'my-32 h-20'} dark={dark} />
}

export default PageTitle