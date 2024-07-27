import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import dynamicIconImports from 'lucide-react/dynamicIconImports';

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(...inputs))

export const isBrowser = (): boolean => typeof window !== 'undefined'


export const isValidIcon = (name: string): name is keyof typeof dynamicIconImports => {
    return name in dynamicIconImports;
  };

export const randomBgColor = (): string => {
    const colors = [
        'bg-annika-blue',        
        'bg-annika-lightGreen',
        'bg-annika-darkGreen',
        'bg-annika-cream',
        'bg-annika-orange',        
      ];
      return colors[Math.floor(Math.random() * colors.length)];
}

interface dateProps extends Date {
  date: string | number | Date
}

export const displayDate: React.FC<dateProps> = date => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Maj',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Okt',
    'Nov',
    'Dec',
  ]

  const newDate = new Date(date)
  const year = newDate.getFullYear()
  const month = months[newDate.getMonth()]
  const day = newDate.getDate()

  return `${year} ${month} ${day}`
}