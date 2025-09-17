import React, { useState } from 'react';

const SendIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="m22 2-7 20-4-9-9-4Z"/><path d="m22 2-11 11"/>
    </svg>
);

interface InputFormProps {
    onSubmit: (url: string) => void;
    isLoading: boolean;
    placeholder: string;
    buttonText: string;
    loadingText: string;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading, placeholder, buttonText, loadingText }) => {
    const [url, setUrl] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(url);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex items-center bg-gray-900 border border-gray-800 rounded-lg p-2 shadow-lg focus-within:ring-2 focus-within:ring-purple-500 transition-all">
                <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder={placeholder}
                    className="flex-grow bg-transparent text-white placeholder-gray-500 outline-none px-3 py-2 w-full min-w-0"
                    disabled={isLoading}
                    required
                />
                <button
                    type="submit"
                    disabled={isLoading || !url}
                    className="flex items-center justify-center bg-purple-600 text-white font-semibold rounded-md px-4 py-2 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                >
                    {isLoading ? loadingText : (
                        <>
                            <SendIcon />
                            <span className="ml-2 hidden sm:inline">{buttonText}</span>
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default InputForm;