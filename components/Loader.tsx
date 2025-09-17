import React from 'react';

interface LoaderProps {
    message: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
    return (
        <div className="flex flex-col justify-center items-center py-10 animate-fade-in">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
            <p className="mt-4 text-gray-400">{message}</p>
        </div>
    );
};

export default Loader;