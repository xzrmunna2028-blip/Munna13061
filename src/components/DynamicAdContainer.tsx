import React, { useEffect, useRef } from 'react';

interface DynamicAdContainerProps {
  html: string;
}

export default function DynamicAdContainer({ html }: DynamicAdContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!html || !containerRef.current) return;

    containerRef.current.innerHTML = '';

    // Clean space and create a range contextual fragment
    const range = document.createRange();
    const fragment = range.createContextualFragment(html);

    // Collect all script nodes and recreate them step-by-step
    // Standard innerHTML excludes scripts, so we manually trigger them
    const scripts = Array.from(fragment.querySelectorAll('script'));
    scripts.forEach((oldScript) => {
      const newScript = document.createElement('script');
      
      // Copy attributes
      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });
      
      // Copy inner script contents
      newScript.textContent = oldScript.textContent;
      
      // Replace
      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });

    containerRef.current.appendChild(fragment);
  }, [html]);

  if (!html) return null;

  return (
    <div 
      ref={containerRef} 
      className="w-full flex justify-center items-center overflow-hidden my-4 min-h-[50px] bg-transparent relative z-20 self-center" 
    />
  );
}
