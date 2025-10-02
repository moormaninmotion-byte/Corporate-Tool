import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Tab } from './types';
import { JARGONATOR_ICON, TRANSLATOR_ICON, EXPLAINER_ICON, HR_SHIELD_ICON, LOADING_MESSAGES } from './constants';
import { callGeminiAPI } from './services/geminiService';

// --- HELPER & UI COMPONENTS (Defined outside App to prevent re-renders) ---

interface PanelProps {
  onApiCall: (systemPrompt: string, userQuery: string, button: HTMLButtonElement | null) => void;
}

const JargonatorPanel: React.FC<PanelProps> = ({ onApiCall }) => {
  const [jargon, setJargon] = useState('');
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (!jargon.trim()) {
      alert("Please enter a technical term or jargon.");
      return;
    }
    const systemPrompt = `You are a jaded but witty corporate comedian AI. Your job is to take a user's business jargon and turn it into a setup/punchline joke. The setup should sound like a genuine question from a pointless meeting. The punchline should be short, sharp, and cynical. The entire response should be two lines.

Generate a response with ONLY the following structure:
**Setup:** [The setup question]
**Punchline:** [The punchline]`;
    const userQuery = `Generate a satirical joke based on the term: "${jargon}"`;
    onApiCall(systemPrompt, userQuery, buttonRef.current);
  };
  
  return (
    <div>
      <header className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">The Jargonator 5000</h1>
        <p className="text-gray-600">Enter a buzzword. Get a revolutionary project idea. Instantly.</p>
      </header>
      <main>
        <div className="min-h-[11rem]">
          <textarea 
            value={jargon}
            onChange={(e) => setJargon(e.target.value)}
            placeholder="e.g., 'Synergy', 'Leverage'"
            className="w-full p-4 rounded-md border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
            rows={3}
          />
        </div>
        <button ref={buttonRef} onClick={handleClick} className="bg-black text-white font-bold py-3 px-6 rounded-md border-2 border-black hover:bg-gray-800 transition-colors w-full mt-4 flex items-center justify-center">
          Generate
        </button>
      </main>
    </div>
  );
};

const TranslatorPanel: React.FC<PanelProps> = ({ onApiCall }) => {
  const [jargon, setJargon] = useState('');
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (!jargon.trim()) {
        alert("Please paste some corporate text to translate.");
        return;
    }
    const systemPrompt = `You are the "Corporate BS Translator." Your job is to take corporate jargon and translate it into simple, brutally honest English. Be cynical, direct, and expose the underlying meaninglessness. Format the output with a "What they said:" section (quoting the original text) and a "What they meant:" section (your translation).`;
    const userQuery = `Translate the following corporate text: "${jargon}"`;
    onApiCall(systemPrompt, userQuery, buttonRef.current);
  };

  return (
    <div>
      <header className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Corporate BS Translator</h1>
        <p className="text-gray-600">Paste in that jargon-filled email. Find out what they *really* mean.</p>
      </header>
      <main>
        <div className="min-h-[11rem]">
          <textarea 
            value={jargon}
            onChange={(e) => setJargon(e.target.value)}
            className="w-full p-4 rounded-md border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
            rows={6} 
            placeholder="Paste your corporate-speak here..."></textarea>
        </div>
        <button ref={buttonRef} onClick={handleClick} className="bg-black text-white font-bold py-3 px-6 rounded-md border-2 border-black hover:bg-gray-800 transition-colors w-full mt-4 flex items-center justify-center">
          ✨ Translate the BS
        </button>
      </main>
    </div>
  );
};

const ExplainerPanel: React.FC<PanelProps> = ({ onApiCall }) => {
    const [buzzword, setBuzzword] = useState('');
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = () => {
        if (!buzzword.trim()) {
            alert("Please enter a buzzword to explain.");
            return;
        }
        const systemPrompt = `You are a cynical corporate lexicographer. Your job is to define business buzzwords. For each term, provide a "Standard Definition" (the official, sanitized meaning) and a "Real Definition" (the brutally honest, cynical truth). Keep the definitions concise and witty.`;
        const userQuery = `Define the buzzword: "${buzzword}"`;
        onApiCall(systemPrompt, userQuery, buttonRef.current);
    };

    return (
        <div>
            <header className="text-center mb-6">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Buzzword Explainer</h1>
                <p className="text-gray-600">Find out what that buzzword *actually* means. Or doesn't.</p>
            </header>
            <main>
                <div className="min-h-[11rem]">
                    <textarea
                        value={buzzword}
                        onChange={(e) => setBuzzword(e.target.value)}
                        placeholder="e.g., 'Circle Back', 'Low-Hanging Fruit'"
                        className="w-full p-4 rounded-md border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                        rows={3}
                    />
                </div>
                <button ref={buttonRef} onClick={handleClick} className="bg-black text-white font-bold py-3 px-6 rounded-md border-2 border-black hover:bg-gray-800 transition-colors w-full mt-4 flex items-center justify-center">
                    Explain
                </button>
            </main>
        </div>
    );
};

const HrShieldPanel: React.FC<PanelProps> = ({ onApiCall }) => {
    const [rant, setRant] = useState('');
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = () => {
        if (!rant.trim()) {
            alert("Please enter the text you want to make corporate-friendly.");
            return;
        }
        const systemPrompt = `You are an expert HR communications professional and a master of corporate-speak, known as 'HR Shield'. Your task is to take a user's potentially blunt, unfiltered, or inappropriate message and rewrite it into a polite, professional, and HR-approved version that is safe for any corporate environment. The goal is to express the original intent clearly but diplomatically, removing any negativity, profanity, or unprofessional language. The final output should be a single, polished paragraph.`;
        const userQuery = `Please rewrite the following message to be corporate-friendly: "${rant}"`;
        onApiCall(systemPrompt, userQuery, buttonRef.current);
    };

    return (
        <div>
            <header className="text-center mb-6">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">HR Shield</h1>
                <p className="text-gray-600">Translate your unfiltered thoughts into HR-approved corporate speak.</p>
            </header>
            <main>
                <div className="min-h-[11rem]">
                  <textarea 
                      value={rant}
                      onChange={(e) => setRant(e.target.value)}
                      className="w-full p-4 rounded-md border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                      rows={6} placeholder="Type what you *really* want to say..."></textarea>
                </div>
                <button ref={buttonRef} onClick={handleClick} className="bg-black text-white font-bold py-3 px-6 rounded-md border-2 border-black hover:bg-gray-800 transition-colors w-full mt-4 flex items-center justify-center">
                    Make it Corporate
                </button>
            </main>
        </div>
    );
};

interface ResultDisplayProps {
  isLoading: boolean;
  output: string | null;
  error: string | null;
  activeTab: Tab;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ isLoading, output, error, activeTab }) => {
  const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGES[0]);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingMessage(LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const formatOutput = (text: string, tab: Tab): string => {
    switch (tab) {
      case Tab.Jargonator:
        return text
          .replace(/\*\*(Setup:)\*\* (.*)/g, '<p class="text-gray-600 text-lg mb-3">"$2"</p>')
          .replace(/\*\*(Punchline:)\*\* (.*)/g, '<p class="text-2xl font-bold text-black">$2</p>')
          .replace(/\n/g, '<br>');
      case Tab.Translator:
        return text
          .replace(/What they said:/gi, '<strong class="font-bold text-gray-500">What they said:</strong>')
          .replace(/What they meant:/gi, '<strong class="font-bold text-black mt-4 block">What they meant:</strong>')
          .replace(/\n/g, '<br>');
      case Tab.Explainer:
        return text
          .replace(/Standard Definition:/gi, '<strong class="font-bold text-gray-500">Standard Definition:</strong>')
          .replace(/Real Definition:/gi, '<strong class="font-bold text-black mt-4 block">Real Definition:</strong>')
          .replace(/\n/g, '<br>');
      case Tab.HrShield:
        return `<p class="text-lg">${text}</p>`;
      default:
        return text;
    }
  };

  if (!isLoading && !output && !error) return null;

  return (
    <div className="mt-6">
      {isLoading && (
        <div className="text-center my-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
          <p className="mt-2 text-gray-600">{loadingMessage}</p>
        </div>
      )}
      {error && (
         <div className="mt-4 text-center">
            <div className="bg-red-100 border-2 border-red-500 text-red-700 px-4 py-3 rounded-md">
                <strong className="font-bold">Heads up! </strong>
                <span className="block sm:inline">{error}</span>
            </div>
        </div>
      )}
      {output && !isLoading && (
        <div className="bg-gray-50 p-6 rounded-lg border-2 border-black mt-4 whitespace-pre-wrap"
             dangerouslySetInnerHTML={{ __html: formatOutput(output, activeTab) }} />
      )}
    </div>
  );
};

// --- MAIN APP COMPONENT ---

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Jargonator);
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, answer: '' });
  const lastCallTime = useRef<number>(0);
  const COOLDOWN = 5000; // 5 seconds

  const generateCaptcha = useCallback(() => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setCaptcha({ num1, num2, answer: '' });
  }, []);

  useEffect(() => {
    generateCaptcha();
  }, [generateCaptcha]);
  
  const handleApiCall = useCallback(async (systemPrompt: string, userQuery: string, button: HTMLButtonElement | null) => {
    // 1. CAPTCHA Check
    const expectedAnswer = captcha.num1 + captcha.num2;
    if (parseInt(captcha.answer, 10) !== expectedAnswer) {
      setError("Incorrect CAPTCHA answer. Please try again.");
      generateCaptcha();
      return;
    }
    
    // 2. Cooldown Check
    const now = Date.now();
    if (now - lastCallTime.current < COOLDOWN) {
        const timeLeft = Math.ceil((COOLDOWN - (now - lastCallTime.current)) / 1000);
        setError(`Please wait ${timeLeft} more seconds before making another request.`);
        return;
    }
    
    lastCallTime.current = now;
    setIsLoading(true);
    setOutput(null);
    setError(null);
    const originalButtonHTML = button?.innerHTML;
    if (button) {
      button.disabled = true;
      button.innerHTML = `<div class="inline-block animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>Thinking...`;
    }
    
    try {
        const result = await callGeminiAPI(systemPrompt, userQuery);
        setOutput(result);
    } catch (e: any) {
        setError(e.message || 'An unexpected error occurred.');
    } finally {
        setIsLoading(false);
        generateCaptcha(); // Generate new captcha for the next turn
        if (button) {
          button.disabled = false;
          button.innerHTML = originalButtonHTML || '';
        }
    }
  }, [captcha.answer, captcha.num1, captcha.num2, generateCaptcha]);

  const tabs = [
    { id: Tab.Jargonator, icon: JARGONATOR_ICON, label: 'Jargonator' },
    { id: Tab.Translator, icon: TRANSLATOR_ICON, label: 'Translator' },
    { id: Tab.Explainer, icon: EXPLAINER_ICON, label: 'Explainer' },
    { id: Tab.HrShield, icon: HR_SHIELD_ICON, label: 'HR Shield' },
  ];

  const renderPanel = () => {
    switch (activeTab) {
      case Tab.Jargonator:
        return <JargonatorPanel onApiCall={handleApiCall} />;
      case Tab.Translator:
        return <TranslatorPanel onApiCall={handleApiCall} />;
      case Tab.Explainer:
        return <ExplainerPanel onApiCall={handleApiCall} />;
      case Tab.HrShield:
        return <HrShieldPanel onApiCall={handleApiCall} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        
        <header className="text-center my-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Satirical Corporate Toolkit</h1>
            <p className="text-gray-600 mt-2 text-lg">Your AI-Powered Bullshit Assistant</p>
        </header>

        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border-2 border-black">
          <nav className="mb-6">
            <ul className="flex flex-wrap justify-center border-2 border-black rounded-md p-1 bg-gray-50">
              {tabs.map(tab => (
                <li key={tab.id} className="flex-grow">
                  <button
                    onClick={() => { setOutput(null); setError(null); setActiveTab(tab.id); }}
                    className={`w-full flex items-center justify-center gap-2 px-3 py-2.5 text-sm md:text-base font-bold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${activeTab === tab.id ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-200'}`}
                    aria-current={activeTab === tab.id ? 'page' : undefined}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="panel-content">
            {renderPanel()}
          </div>
          
          <div className="mt-6 border-t-2 border-dashed border-gray-300 pt-6">
            <label htmlFor="captcha" className="font-bold text-center block mb-2">Anti-Bot Check: What is {captcha.num1} + {captcha.num2}?</label>
            <input 
              id="captcha" 
              type="number"
              value={captcha.answer}
              onChange={(e) => setCaptcha(prev => ({...prev, answer: e.target.value}))}
              className="w-full max-w-xs mx-auto block px-4 py-2 text-center rounded-md border-2 border-black focus:outline-none focus:ring-2 focus:ring-black" 
              placeholder="Your answer"
            />
          </div>

          <ResultDisplay isLoading={isLoading} output={output} error={error} activeTab={activeTab} />
        </div>
        
        <footer className="text-center text-sm text-gray-500 mt-8 py-4">
          <p>Built with the Gemini API. Not responsible for any promotions you get.</p>
        </footer>

      </div>
    </div>
  );
};

export default App;
