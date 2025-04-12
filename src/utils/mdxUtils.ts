
import { promises as fs } from 'fs';
import path from 'path';

export interface BlogMeta {
  id: string;
  title: string;
  category: string;
  mainDate: string;
  optionalEndDate?: string;
  summary: string;
  slug: string;
}

export async function getBlogFileNames(): Promise<string[]> {
  try {
    // In production, this would read from the filesystem
    // For this demo, we'll return our known files
    return [
      'juggling-patterns-in-geographic-landscapes.mdx',
      'art-of-five-ball-cascade.mdx',
      'mapping-urban-spaces-for-street-performance.mdx',
      'juggling-workshop-nordic-tour.mdx',
      'geographic-information-systems-in-performance-art.mdx',
      'contact-juggling-and-spatial-awareness.mdx',
    ];
  } catch (error) {
    console.error('Error getting blog filenames:', error);
    return [];
  }
}

export function createSlugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/g, '')  // Remove punctuation
    .replace(/\s+/g, '-');    // Replace spaces with hyphens
}

// For client-side rendering, we'll use our existing blog data
// In a real app with server rendering, you would parse the MDX files
export function getAllBlogMeta(): BlogMeta[] {
  return [
    {
      id: "1",
      title: "Juggling Patterns in Geographic Landscapes",
      category: "Geography",
      mainDate: "2024-03-15",
      summary: "Exploring how juggling patterns can be used to understand geographic distributions and spatial relationships.",
      slug: "juggling-patterns-in-geographic-landscapes"
    },
    {
      id: "2",
      title: "The Art of Five Ball Cascade",
      category: "Juggling",
      mainDate: "2024-02-20",
      summary: "A step-by-step guide to mastering the five ball cascade, one of juggling's classic patterns.",
      slug: "art-of-five-ball-cascade"
    },
    {
      id: "3",
      title: "Mapping Urban Spaces for Street Performance",
      category: "Geography",
      mainDate: "2024-01-10",
      optionalEndDate: "2024-01-25",
      summary: "An analysis of optimal urban spaces for street performances based on foot traffic, acoustics, and spatial arrangement.",
      slug: "mapping-urban-spaces-for-street-performance"
    },
    {
      id: "4",
      title: "Juggling Workshop: Nordic Tour",
      category: "Juggling",
      mainDate: "2023-11-05",
      optionalEndDate: "2023-12-10",
      summary: "Recap of the juggling workshops conducted across major Nordic cities during the winter tour.",
      slug: "juggling-workshop-nordic-tour"
    },
    {
      id: "5",
      title: "Geographic Information Systems in Performance Art",
      category: "Geography",
      mainDate: "2023-10-12",
      summary: "How GIS can be used to analyze and optimize performance art installations and events.",
      slug: "geographic-information-systems-in-performance-art"
    },
    {
      id: "6",
      title: "Contact Juggling and Spatial Awareness",
      category: "Juggling",
      mainDate: "2023-09-18",
      summary: "Techniques to improve spatial awareness through contact juggling exercises.",
      slug: "contact-juggling-and-spatial-awareness"
    }
  ].map(blog => ({
    ...blog,
    slug: createSlugFromTitle(blog.title)
  }));
}

export function getBlogMetaBySlug(slug: string): BlogMeta | undefined {
  return getAllBlogMeta().find(blog => blog.slug === slug);
}

export function getAllCategories(): string[] {
  const categories = new Set(getAllBlogMeta().map(blog => blog.category));
  return Array.from(categories);
}
