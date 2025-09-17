import React, { useState } from 'react';

const ClipboardIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
    </svg>
);

const CheckIcon: React.FC = () => (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);


interface ReadmeDisplayProps {
  content: string;
  copyText: string;
  copiedText: string;
}

const ReadmeDisplay: React.FC<ReadmeDisplayProps> = ({ content, copyText, copiedText }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-xl animate-fade-in mt-8">
        <div className="flex justify-between items-center p-4 border-b border-gray-800">
            <h3 className="font-semibold text-lg text-purple-300">Generated README.md</h3>
            <button
                onClick={handleCopy}
                className={`flex items-center text-sm font-semibold rounded-md px-3 py-2 transition-colors ${
                    isCopied 
                    ? 'bg-green-600/20 text-green-400'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
            >
                {isCopied ? <CheckIcon /> : <ClipboardIcon />}
                {isCopied ? copiedText : copyText}
            </button>
        </div>
        <pre className="p-4 text-sm text-gray-300 whitespace-pre-wrap overflow-x-auto">
            <code className="font-mono">{content}</code>
        </pre>
    </div>
  );
};

export default ReadmeDisplay;