import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import dynamicIconImports from 'lucide-react/dynamicIconImports';

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(...inputs))

export const isBrowser = (): boolean => typeof window !== 'undefined'


export const isValidIcon = (name: string): name is keyof typeof dynamicIconImports => {
    return name in dynamicIconImports;
  };