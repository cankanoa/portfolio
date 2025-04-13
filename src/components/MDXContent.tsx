
import React from 'react';
import { Link } from 'react-router-dom';

// Define props for custom components
interface CustomLinkProps {
  href: string;
  children: React.ReactNode;
}

// Custom components for MDX content
const CustomLink = ({ href, children }: CustomLinkProps) => {
  const isInternal = href.startsWith('/');
  
  if (isInternal) {
    return <Link to={href} className="text-primary hover:underline">{children}</Link>;
  }
  
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
      {children}
    </a>
  );
};

interface MDXContentProps {
  content: string;
}

const MDXContent: React.FC<MDXContentProps> = ({ content }) => {
  return (
    <div className="prose prose-invert max-w-none">
      {/* In a real implementation, this would use an MDX renderer library */}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default MDXContent;
