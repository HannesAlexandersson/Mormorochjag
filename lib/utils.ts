import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(...inputs))

export const isBrowser = (): boolean => typeof window !== 'undefined'
