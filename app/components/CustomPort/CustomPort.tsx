import React from 'react';
import Typography from '../Typography/Typography';
import Image from 'next/image';
import Link from 'next/link';
import {PortableTextComponents} from '@portabletext/react'
import exp from 'constants';

/*
normal: ({children}: any) => {
            if (children.length === 1 && children[0] === '') {
              return <br />
            }
            return <Typography variant="p">{children}</Typography> 
        },
*/

const components: PortableTextComponents = {
    types: {

    },
    block: {
        h1: ({children}) => <Typography variant='h1'>{children}</Typography>,
        h2: ({children}) => <Typography variant="h2">{children}</Typography>,
        h3: ({children}) => <Typography variant="h3">{children}</Typography>,
        h4: ({children}) => <Typography variant="h4">{children}</Typography>,
        h5: ({children}) => <Typography variant="h5">{children}</Typography>,
        h6: ({children}) => <Typography variant="h6">{children}</Typography>,
        blockquote: ({children}) => <blockquote className="border-l-purple-500">{children}</blockquote>,
        normal: ({children}) => <Typography variant="p" className='mb-2'>{children}</Typography>,
    },
    marks: {
        // Ex. 1: custom renderer for the em / italics decorator
        em: ({children}) => <em className="text-gray-600 font-semibold">{children}</em>,
        strong: ({children}) => <strong className="text-gray-800 font-bold">{children}</strong>,
        underline: ({children}) => <u className="text-gray-800">{children}</u>,
    
        // Ex. 2: rendering a custom `link` annotation
        link: ({value, children}) => {
          const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
          return (
            <Link href={value?.href} target={target} className='underline text-annika-blue hover:text-annika-lightGreen visited:text-annika-lightGreen' >
              {children}
            </Link>
          )
        },
      },
      list:  {
        // Ex. 1: customizing common list types
        bullet: ({children}) => <ul >{children}</ul>,
        number: ({children}) => <ol >{children}</ol>,
    
        // Ex. 2: rendering custom lists
        checkmarks: ({children}) => <ol className="m-auto text-lg">{children}</ol>,
      },
      listItem: {
        // Ex. 1: customizing common list types
        bullet: ({children}) => <li style={{listStyleType: 'disclosure-closed'}}>{children}</li>,
        number: ({ children }) => <li className='list-decimal '>{children}</li>,
        // Ex. 2: rendering custom list items
        checkmarks: ({children}) => <li>✅ {children}</li>,
      },
}
export default components;