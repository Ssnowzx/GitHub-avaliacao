import React from 'react';

const XCircleIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 mr-3 flex-shrink-0">
        <circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>
    </svg>
);

interface ErrorMessageProps {
    message: string;
    title: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, title }) => {
    return (
        <div className="bg-red-900/30 border border-red-600 text-red-300 px-4 py-3 rounded-lg relative my-4 flex items-center animate-fade-in" role="alert">
            <XCircleIcon />
            <div>
                <strong className="font-bold">{title} </strong>
                <span className="block sm:inline ml-1">{message}</span>
            </div>
        </div>
    );
};

export default ErrorMessage;