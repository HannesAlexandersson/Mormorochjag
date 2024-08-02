import React from 'react';
import Typography from '../Typography/Typography';
import Image from 'next/image';
import Link from 'next/link';
import {PortableTextComponents} from '@portabletext/react'

const renderText = (children: any[]) => {
    return children.map((child: any) => {
      if (child._type === 'span') {
        // Handle inline styles
        let text = child.text || '';
        if (child.marks?.includes('strong')) {
          text = <strong>{text}</strong>;
        }
        if (child.marks?.includes('em')) {
          text = <em>{text}</em>;
        }
        if (child.marks?.includes('underline')) {
          text = <u>{text}</u>;
        }
        return text;
      }
      return null;
    });
  };
  
  const blockComponents = (props: any) => {
    // Log props to debug
    console.log('Block Component Props:', props);
  
    // Access 'value' from props
    const { value } = props;
  
    // Ensure value exists and has properties
    const style = value?.style || 'normal';
    const children = value?.children || [];
  
    // Log the children to see if they contain the expected content
    console.log('Children:', children);
  
    // Render the text content with inline styles
    const textContent = renderText(children);
  
    switch (style) {
      case 'h1':
        return <Typography variant="h1">{textContent}</Typography>;
      case 'h2':
        return <Typography variant="h2">{textContent}</Typography>;
      case 'h3':
        return <Typography variant="h3">{textContent}</Typography>;
      case 'h4':
        return <Typography variant="h4">{textContent}</Typography>;
      case 'blockquote':
        return (
          <blockquote className="pl-4 border-l-4 border-gray-500 italic my-4">
            {textContent}
          </blockquote>
        );
      case 'normal':
      default:
        return <Typography variant="p">{textContent}</Typography>;
    }
  };

  const listComponents = {
    bullet: ({ children }: any) => <ul className="list-disc pl-6 mt-2">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-6 mt-2">{children}</ol>,
  };
  
  const listItemComponents = {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
    // Add custom styles or components for different list item types here
  };
  
  const serializers = {
    types: {
      block: blockComponents,
      image: (props: any) => {
        const { asset, alt, caption } = props.node || {}; // Ensure props.node is defined
        return (
          <div className="my-4">
            {asset?.url && (
              <Image src={asset.url} alt={alt || 'Image'} fill={true} />
            )}
            {caption && (
              <p className="text-sm text-gray-600">{caption}</p>
            )}
          </div>
        );
      },
      list: {
        // Ex. 1: customizing common list types
        bullet: ({children} : {children: any}) => <ul className="mt-xl">{children}</ul>,
        number: ({children} : {children: any}) => <ol className="mt-lg">{children}</ol>,
    
        // Ex. 2: rendering custom lists
        checkmarks: ({children} : {children: any}) => <ol className="m-auto text-lg">{children}</ol>,
      },
    },
    marks: {
      strong: ({ children }: any) => <strong className="font-bold">{children}</strong>,
      em: ({ children }: any) => <em className="italic">{children}</em>,
     
      link: ({value, children}: {value: any, children: any}) => {
        const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
        return (
          <Link href={value?.href} target={target} >
            {children}
          </Link>
        )
      },
      underline: ({ children }: any) => <u>{children}</u>,
      // Add other marks like underline if needed
    },
  };
  
  export default serializers;

  /*
 link: ({ children, mark }: any) => (
        <Link href={mark.href} className="text-blue-600 underline">
          {children}
        </Link>
      ),
  */