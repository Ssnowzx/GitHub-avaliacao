import React from "react";
import { Language } from "../translations";
import LanguageSelector from "./LanguageSelector";

const GitHubIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-8 w-8 text-purple-400"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface HeaderProps {
  language: Language;
  setLanguage: (language: Language) => void;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage, title }) => {
  return (
    <header className="py-4 border-b border-gray-900">
      <div className="container mx-auto flex flex-col sm:flex-row justify-center sm:justify-between items-center px-4">
        <div className="flex flex-col items-center w-full">
          <div className="flex items-center justify-center w-full">
            <GitHubIcon />
            <h1 className="ml-4 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text text-center">
              {title}
            </h1>
          </div>
        </div>
        <div className="mt-4 sm:mt-0">
          <LanguageSelector
            selectedLanguage={language}
            onLanguageChange={setLanguage}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
