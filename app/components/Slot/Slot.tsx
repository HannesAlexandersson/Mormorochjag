import React, { forwardRef, ReactNode, ForwardRefRenderFunction } from 'react'
import { cn } from '@/lib/utils'

interface SlotProps {
    children: ReactNode
    className?: string
    [key: string]: any
}

const Slot: ForwardRefRenderFunction<any, SlotProps> = ({ children, ...props }, ref) => {
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

    if (React.Children.count(children) > 1) {
        React.Children.only(null)
    }

    return null
}

Slot.displayName = 'Slot'

export default forwardRef(Slot)
