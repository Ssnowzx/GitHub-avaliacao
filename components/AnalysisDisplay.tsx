import React, { useEffect, useRef } from 'react';

// This is a global from the CDN script in index.html
declare var marked: {
    parse(markdown: string): string;
};

interface AnalysisDisplayProps {
    content: string;
}

const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ content }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const parsedHtml = marked.parse(content);

    useEffect(() => {
        if (containerRef.current) {
            // Add classes for styling the parsed markdown
            containerRef.current.querySelectorAll('h1').forEach(el => el.classList.add('text-2xl', 'md:text-3xl', 'font-bold', 'mt-6', 'mb-4', 'pb-2', 'border-b', 'border-gray-600'));
            containerRef.current.querySelectorAll('h2').forEach(el => el.classList.add('text-xl', 'md:text-2xl', 'font-semibold', 'mt-6', 'mb-3', 'pb-1', 'border-b', 'border-gray-700'));
            containerRef.current.querySelectorAll('h3').forEach(el => el.classList.add('text-lg', 'font-semibold', 'mt-5', 'mb-2', 'text-purple-300'));
            containerRef.current.querySelectorAll('ul').forEach(el => el.classList.add('list-disc', 'list-inside', 'space-y-2', 'pl-4', 'mb-4'));
            containerRef.current.querySelectorAll('ol').forEach(el => el.classList.add('list-decimal', 'list-inside', 'space-y-2', 'pl-4', 'mb-4'));
            containerRef.current.querySelectorAll('li').forEach(el => el.classList.add('text-gray-300'));
            containerRef.current.querySelectorAll('p').forEach(el => el.classList.add('mb-4', 'text-gray-300'));
            containerRef.current.querySelectorAll('code').forEach(el => el.classList.add('bg-gray-700', 'text-purple-300', 'px-2', 'py-1', 'rounded', 'text-sm', 'font-mono'));
            containerRef.current.querySelectorAll('strong').forEach(el => el.classList.add('text-purple-400', 'font-semibold'));
        }
    }, [content]);

    return (
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 sm:p-6 shadow-xl animate-fade-in">
             <div
                ref={containerRef}
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: parsedHtml }}
            />
        </div>
    );
};

export default AnalysisDisplay;