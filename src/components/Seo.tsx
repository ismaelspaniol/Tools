import { useEffect } from 'react';

interface SeoProps {
  title: string;
  description: string;
}

export function Seo({ title, description }: SeoProps) {
  useEffect(() => {
    document.title = `${title} | Tools`;

    const selector = 'meta[name="description"]';
    let element = document.head.querySelector<HTMLMetaElement>(selector);

    if (!element) {
      element = document.createElement('meta');
      element.name = 'description';
      document.head.appendChild(element);
    }

    element.content = description;
  }, [description, title]);

  return null;
}
