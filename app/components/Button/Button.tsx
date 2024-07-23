import { cn } from '@/lib/utils'
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
    'cursor-pointer outline-none rounded-full select-none transition duration-200 disabled:cursor-default disabled:brightness-50',
    {
      variants: {
        variant: {
          primary: 'bg-black text-white hover:bg-zinc-900',
          secondary: 'bg-white text-black hover:bg-zinc-50',
          'outlined-primary':
            'bg-transparent border-2 border-black text-black hover:bg-black hover:text-white',
          'outlined-secondary':
            'bg-transparent border-2 border-white text-white hover:bg-white hover:text-black',
        },
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



export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

   


const Button: React.FC<ButtonProps> = ({
    children,
    className,
    variant,
    size,
  ...props
}) => {

return (
    <button
      className={cn(buttonVariants({ size, variant, className }))}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button

   