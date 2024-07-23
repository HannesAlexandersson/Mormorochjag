import { cn } from '@/lib/utils'
import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'

// Define an interface for the props
interface SlotProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

// Define the Slot component with forwardRef
const Slot = forwardRef<HTMLDivElement, SlotProps>(({ children, ...props }, ref) => {
  // If children is valid clone children and merge props
  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      ...children.props,
      style: {
        ...props.style,
        ...children.props.style,
      },
      className: cn(props.className, children.props.className),
      ref,
    })
  }

  // Throw error if there is more than one child
  if (React.Children.count(children) > 1) {
    React.Children.only(null)
  }

  return null
})

// Set display name for debugging purposes
Slot.displayName = 'Slot'

export default Slot