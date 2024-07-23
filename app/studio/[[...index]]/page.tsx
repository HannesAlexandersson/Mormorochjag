"use client"

import config from '@/sanity.config';
import { NextStudio } from 'next-sanity/studio';

export default function studioPage(){

    return <NextStudio config={config} />
}