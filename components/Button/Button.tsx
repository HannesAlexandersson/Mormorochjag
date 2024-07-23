import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import Slot from '@/components/Slot/Slot'
import React, { ReactNode, HTMLAttributes, ButtonHTMLAttributes } from 'react'



// first we define the base classes for the button
const buttonVariants = cva(
  'cursor-pointer outline-none rounded-full select-none transition duration-200 disabled:cursor-default disabled:brightness-50',
  {
    //then we define the variants
    variants: {
      variant: {
        primary: 'bg-black text-white hover:bg-zinc-900',
        secondary: 'bg-white text-black hover:bg-zinc-50',
        'outlined-primary':
          'bg-transparent border-2 border-black text-black hover:bg-black hover:text-white',
        'outlined-secondary':
          'bg-transparent border-2 border-white text-white hover:bg-white hover:text-black',
      },
      //then we define the sizes
      size: {
        sm: 'px-4 py-2 text-sm font-medium',
        md: 'px-4 py-3 text-base font-medium',
        lg: 'px-4 py-3 text-lg font-medium',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
    variant?: string;
    size?: string;
    asChild?: boolean;
  }
  
  const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant,
  size,
  asChild = false,
  ...props
}) => {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      className={cn(buttonVariants({ size, variant, className }))}
      {...props}
    >
      {children}
    </Comp>
  )
}

export default Button