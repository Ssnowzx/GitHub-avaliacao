import React from 'react';
import { Language } from '../translations';

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onLanguageChange }) => {
  const languages: { key: Language; label: string }[] = [
    { key: 'en', label: 'EN' },
    { key: 'pt', label: 'PT' },
  ];

  return (
    <div className="flex items-center space-x-1 bg-gray-900 border border-gray-800 rounded-full p-1">
      {languages.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onLanguageChange(key)}
          className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors ${
            selectedLanguage === key
              ? 'bg-purple-600 text-white'
              : 'bg-transparent text-gray-400 hover:bg-gray-800'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;