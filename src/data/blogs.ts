
export interface Blog {
  id: string;
  title: string;
  focus: string;
  category: string;
  mainDate: string;
  optionalEndDate?: string;
  summary: string;
  content: string;
}

export const blogs: Blog[] = [
  {
    id: "1",
    title: "Juggling Patterns in Geographic Landscapes",
    focus: "Research",
    category: "Geography",
    mainDate: "2024-03-15",
    summary: "Exploring how juggling patterns can be used to understand geographic distributions and spatial relationships.",
    content: "Full content of the blog post goes here..."
  },
  {
    id: "2",
    title: "The Art of Five Ball Cascade",
    focus: "Tutorial",
    category: "Juggling",
    mainDate: "2024-02-20",
    summary: "A step-by-step guide to mastering the five ball cascade, one of juggling's classic patterns.",
    content: "Full content of the blog post goes here..."
  },
  {
    id: "3",
    title: "Mapping Urban Spaces for Street Performance",
    focus: "Analysis",
    category: "Geography",
    mainDate: "2024-01-10",
    optionalEndDate: "2024-01-25",
    summary: "An analysis of optimal urban spaces for street performances based on foot traffic, acoustics, and spatial arrangement.",
    content: "Full content of the blog post goes here..."
  },
  {
    id: "4",
    title: "Juggling Workshop: Nordic Tour",
    focus: "Event",
    category: "Juggling",
    mainDate: "2023-11-05",
    optionalEndDate: "2023-12-10",
    summary: "Recap of the juggling workshops conducted across major Nordic cities during the winter tour.",
    content: "Full content of the blog post goes here..."
  },
  {
    id: "5",
    title: "Geographic Information Systems in Performance Art",
    focus: "Research",
    category: "Geography",
    mainDate: "2023-10-12",
    summary: "How GIS can be used to analyze and optimize performance art installations and events.",
    content: "Full content of the blog post goes here..."
  },
  {
    id: "6",
    title: "Contact Juggling and Spatial Awareness",
    focus: "Tutorial",
    category: "Juggling",
    mainDate: "2023-09-18",
    summary: "Techniques to improve spatial awareness through contact juggling exercises.",
    content: "Full content of the blog post goes here..."
  }
];

export const getAllFocusAreas = (): string[] => {
  const focuses = new Set(blogs.map(blog => blog.focus));
  return Array.from(focuses);
};

export const getAllCategories = (): string[] => {
  const categories = new Set(blogs.map(blog => blog.category));
  return Array.from(categories);
};
