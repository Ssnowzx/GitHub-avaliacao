import React, { useState, useCallback } from "react";
import Header from "./components/Header";
import InputForm from "./components/InputForm";
import AnalysisDisplay from "./components/AnalysisDisplay";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import StarRating from "./components/StarRating";
import ReadmeDisplay from "./components/ReadmeDisplay";
import {
  analyzeGitHubProfile,
  generateProfileReadme,
} from "./services/geminiService";
import { translations, Language } from "./translations";

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>("pt");
  const [analysis, setAnalysis] = useState<string>("");
  const [starRating, setStarRating] = useState<number>(0);
  const [ratingJustification, setRatingJustification] = useState<string>("");
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [readmeContent, setReadmeContent] = useState<string>("");
  const [isReadmeLoading, setIsReadmeLoading] = useState<boolean>(false);
  const [readmeError, setReadmeError] = useState<string | null>(null);

  const [originalAnalysis, setOriginalAnalysis] = useState<string>("");
  const [analysisForReadme, setAnalysisForReadme] = useState<string>("");

  const t = translations[language];

  // Título customizado
  const customTitle = "GitHub Profile Analyzer";

  const handleAnalysis = useCallback(
    async (url: string) => {
      if (!url) {
        setError(t.errorEnterUrl);
        return;
      }

      try {
        const parsedUrl = new URL(url);
        if (
          parsedUrl.hostname !== "github.com" ||
          parsedUrl.pathname.split("/").filter(Boolean).length !== 1
        ) {
          setError(t.errorInvalidUrl);
          return;
        }
      } catch (_) {
        setError(t.errorInvalidUrlFormat);
        return;
      }

      setIsLoading(true);
      setError(null);
      setAnalysis("");
      setStarRating(0);
      setRatingJustification("");
      setTechnologies([]);
      setReadmeContent("");
      setReadmeError(null);

      try {
        const result = await analyzeGitHubProfile(url, language);
        setOriginalAnalysis(result); // Mantém o markdown completo para exibição
        setAnalysisForReadme(result); // Usado apenas para gerar o README

        // Extract star rating and justification
        const ratingMatch = result.match(
          /RATING:\s*(\d)\/5\s*(?:\(([^)]+)\))?/
        );
        if (ratingMatch && ratingMatch[1]) {
          setStarRating(parseInt(ratingMatch[1], 10));
          if (ratingMatch[2]) {
            setRatingJustification(ratingMatch[2]);
          }
          setAnalysis(
            result.replace(/RATING:\s*\d\/5\s*(?:\([^)]+\))?/, "").trim()
          );
        }

        // Extract technologies
        const techMatch = result.match(/TECHS:\s*\[([^\]]+)\]/i);
        if (techMatch && techMatch[1]) {
          setTechnologies(
            techMatch[1].split(",").map((tech) => tech.trim().toLowerCase())
          );
          setAnalysis((prev) =>
            prev.replace(/TECHS:\s*\[[^\]]+\]\s*/i, "").trim()
          );
        }
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError(t.errorUnknown);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [language, t]
  );

  const handleGenerateReadme = useCallback(async () => {
    if (!analysisForReadme) return;

    setIsReadmeLoading(true);
    setReadmeError(null);
    setReadmeContent("");

    try {
      const readme = await generateProfileReadme(analysisForReadme, language);
      setReadmeContent(readme);
    } catch (e) {
      if (e instanceof Error) {
        setReadmeError(e.message);
      } else {
        setReadmeError(t.errorReadme);
      }
    } finally {
      setIsReadmeLoading(false);
    }
  }, [analysisForReadme, language, t]);

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      <Header
        language={language}
        setLanguage={setLanguage}
        title={customTitle}
      />
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-gray-400 mb-8 text-lg">{t.subtitle}</p>
          <InputForm
            onSubmit={handleAnalysis}
            isLoading={isLoading}
            placeholder={t.placeholder}
            buttonText={t.buttonAnalyze}
            loadingText={t.buttonAnalyzing}
          />
          {isLoading && <Loader message={t.loaderAnalyzing} />}
          {error && <ErrorMessage message={error} title={t.errorTitle} />}

          {originalAnalysis && !isLoading && (
            <div className="space-y-8 animate-fade-in">
              {starRating > 0 && (
                <StarRating
                  rating={starRating}
                  technologies={technologies}
                  title={t.overallRating}
                  justification={ratingJustification}
                />
              )}
              <AnalysisDisplay content={originalAnalysis} />

              <div className="text-center pt-4">
                <h2 className="text-xl md:text-2xl font-semibold mb-4">
                  {t.readmeTitle}
                </h2>
                <p className="text-gray-400 mb-6">{t.readmeDescription}</p>
                <button
                  onClick={handleGenerateReadme}
                  disabled={isReadmeLoading}
                  className="bg-purple-600 text-white font-semibold rounded-lg px-8 py-3 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all transform hover:scale-105"
                >
                  {isReadmeLoading ? t.buttonGenerating : t.buttonGenerate}
                </button>
              </div>

              {isReadmeLoading && <Loader message={t.loaderGenerating} />}
              {readmeError && (
                <ErrorMessage message={readmeError} title={t.errorTitle} />
              )}
              {readmeContent && !isReadmeLoading && (
                <ReadmeDisplay
                  content={readmeContent}
                  copyText={t.copyButton}
                  copiedText={t.copiedButton}
                />
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
