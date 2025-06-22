import { ReactNode } from 'react';

export interface Avatar {
    src: string;
    label: string;
}

export interface CTA {
    ctaIcon: ReactNode;
    ctaText: string;
    ctaLink: string;
}

export interface Badge {
    color: string;
}

export interface Project {
    id: string;
    category: string;
    description: string;
    title: string;
    src: string;
    cta: CTA;
    badge: Badge;
    date: string;
    avatars: Avatar[];
    content: () => JSX.Element;
} 