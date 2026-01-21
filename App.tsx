import React, { useState, useEffect, useCallback } from 'react';
import { getSyllabus, APP_NAME, UI_TEXT, GLOSSARY_ITEMS } from './constants';
import { DayPlan, FlashcardData, Language, User } from './types';
import { generateFlashcards } from './services/geminiService';
import Flashcard from './components/Flashcard';
import ProgressBar from './components/ProgressBar';
import { CheckCircle, Lock, ArrowLeft, ChevronRight, ChevronLeft, GraduationCap, Sparkles, Languages, Moon, Sun, Book, Search, X, LogOut, User as UserIcon, ArrowRight } from 'lucide-react';

// Helper to persist state
const loadProgress = (username: string | null) => {
  if (!username) return [];
  const saved = localStorage.getItem(`togaf_progress_${username}`);
  return saved ? JSON.parse(saved) : [];
};

const loadSettings = (): { lang: Language, theme: 'light' | 'dark' } => {
    const saved = localStorage.getItem('togaf_settings');
    if (saved) return JSON.parse(saved);
    return { lang: 'en', theme: 'light' };
}

const loadUser = (): User | null => {
    const saved = localStorage.getItem('togaf_current_user');
    return saved ? JSON.parse(saved) : null;
}

const App: React.FC = () => {
  // Settings State
  const [settings, setSettings] = useState(loadSettings());

  // User State - Initialize from local storage immediately
  const [user, setUser] = useState<User | null>(() => loadUser());

  // Navigation State
  const [view, setView] = useState<'DASHBOARD' | 'LEARNING' | 'GLOSSARY'>('DASHBOARD');
  const [selectedDay, setSelectedDay] = useState<DayPlan | null>(null);

  
  // Progress State - Lazy initialization based on the user loaded above
  // This guarantees that if a user exists on load, their progress is available immediately without waiting for useEffect
  const [completedDays, setCompletedDays] = useState<number[]>(() => {
    const initialUser = loadUser();
    return loadProgress(initialUser?.username || null);
  });

  // Learning Content State
  const [cards, setCards] = useState<FlashcardData[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Glossary State
  const [searchTerm, setSearchTerm] = useState('');

  // Login Input State
  const [usernameInput, setUsernameInput] = useState('');

  // Text helpers
  const t = UI_TEXT[settings.lang];
  const syllabus = getSyllabus(settings.lang);

  // Effects

  // Effect to load progress when switching users (logging in/out) during the session
  useEffect(() => {
    if (user) {
        setCompletedDays(loadProgress(user.username));
    } else {
        setCompletedDays([]);
    }
  }, [user]); // Only runs when the user object actually changes identity

  // Effect to save progress whenever it changes
  useEffect(() => {
    if (user) {
        localStorage.setItem(`togaf_progress_${user.username}`, JSON.stringify(completedDays));
    }
  }, [completedDays, user]);

  useEffect(() => {
    localStorage.setItem('togaf_settings', JSON.stringify(settings));
    if (settings.theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
  }, [settings]);

  // Handlers
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameInput.trim()) return;
    
    const newUser: User = { username: usernameInput.trim().toLowerCase(), name: usernameInput.trim() }; // Basic user object
    setUser(newUser);
    localStorage.setItem('togaf_current_user', JSON.stringify(newUser));
    // The useEffect [user] will trigger next to load this user's progress
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('togaf_current_user');
    setView('DASHBOARD');
    setSelectedDay(null);
  };

  const toggleLanguage = () => {
    setSettings(prev => ({ ...prev, lang: prev.lang === 'en' ? 'zh' : 'en' }));
  };

  const toggleTheme = () => {
    setSettings(prev => ({ ...prev, theme: prev.theme === 'light' ? 'dark' : 'light' }));
  };

  const handleDaySelect = useCallback(async (day: DayPlan) => {
    setSelectedDay(day);
    setView('LEARNING');
    setLoading(true);
    setError(null);
    setCards([]);
    setCurrentCardIndex(0);

    try {
      const generatedCards = await generateFlashcards(day.title, day.keyConcepts, day.day, settings.lang);
      setCards(generatedCards);
    } catch (err) {
      setError(UI_TEXT[settings.lang].errorTitle + ". " + UI_TEXT[settings.lang].errorAction);
    } finally {
      setLoading(false);
    }
  }, [settings.lang]);

  const handleBackToDashboard = () => {
    setView('DASHBOARD');
    setSelectedDay(null);
    setSearchTerm('');
  };

  const handleCompleteDay = () => {
    if (selectedDay && !completedDays.includes(selectedDay.day)) {
      setCompletedDays([...completedDays, selectedDay.day]);
    }
    handleBackToDashboard();
  };

  const nextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
    }
  };

  // Render Login View
  if (!user) {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col justify-center items-center p-4 transition-colors">
            <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 flex flex-col items-center">
                {/* Logo Section */}
                <div className="mb-6 bg-slate-900 dark:bg-black p-4 rounded-2xl shadow-lg shadow-blue-900/10 border border-slate-800 ring-1 ring-white/10 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent" />
                    <GraduationCap className="text-blue-50 w-12 h-12 relative z-10" strokeWidth={1.5} />
                </div>

                <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">{APP_NAME}</h1>
                <p className="text-slate-500 dark:text-slate-400 text-center mb-8 px-4">{t.loginDesc}</p>

                <form onSubmit={handleLogin} className="w-full">
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            {t.enterName}
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <UserIcon className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                type="text"
                                value={usernameInput}
                                onChange={(e) => setUsernameInput(e.target.value)}
                                placeholder={t.usernamePlaceholder}
                                className="block w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-600 rounded-lg leading-5 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-togaf-500 focus:border-togaf-500 transition-colors"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-togaf-600 hover:bg-togaf-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
                    >
                        {t.loginBtn}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700 w-full flex justify-between items-center text-sm">
                     <button 
                        onClick={toggleLanguage}
                        className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors flex items-center gap-1"
                    >
                        <Languages className="w-4 h-4" />
                        {settings.lang === 'en' ? "中文" : "English"}
                    </button>
                    <button 
                        onClick={toggleTheme}
                        className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors flex items-center gap-1"
                    >
                        {settings.theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                        {settings.theme === 'light' ? "Dark Mode" : "Light Mode"}
                    </button>
                </div>
            </div>
        </div>
    );
  }

  // Render Dashboard
  if (view === 'DASHBOARD') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col transition-colors">
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10 shadow-sm transition-colors">
          <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
                {/* Logo */}
                <div className="bg-slate-900 dark:bg-black p-2.5 rounded-xl shadow-lg shadow-blue-900/10 border border-slate-800 ring-1 ring-white/10 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <GraduationCap className="text-blue-50 w-6 h-6 relative z-10" strokeWidth={2} />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-slate-800 dark:text-white leading-none tracking-tight">{APP_NAME}</h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">{t.subtitle}</p>
                </div>
            </div>
            
            <div className="flex items-center gap-2 md:gap-4">
                <div className="hidden md:block w-40 mr-2">
                     <ProgressBar total={30} completed={completedDays.length} lang={settings.lang} />
                </div>
                
                {/* Header Actions */}
                <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>

                 <button 
                    onClick={() => setView('GLOSSARY')}
                    className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    title={t.viewGlossary}
                >
                    <Book className="w-5 h-5" />
                    <span className="sr-only">{t.viewGlossary}</span>
                </button>
                <button 
                    onClick={toggleLanguage}
                    className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    title={settings.lang === 'en' ? "Switch to Chinese" : "切换到英文"}
                >
                    <Languages className="w-5 h-5" />
                </button>
                <button 
                    onClick={toggleTheme}
                    className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    title="Toggle Theme"
                >
                    {settings.theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </button>
                
                <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>

                <div className="flex items-center gap-3 pl-1">
                    <span className="hidden lg:block text-sm font-medium text-slate-700 dark:text-slate-200">
                        {t.welcome}, {user.name || user.username}
                    </span>
                    <button
                        onClick={handleLogout}
                        className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors"
                        title={t.logout}
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </div>
          </div>
        </header>

        <main className="flex-grow max-w-5xl mx-auto px-4 py-8 w-full">
            
          <div className="mb-8 md:hidden">
             <div className="flex justify-between items-center mb-4">
                 <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                     {t.welcome}, {user.name || user.username}
                 </span>
             </div>
             <ProgressBar total={30} completed={completedDays.length} lang={settings.lang} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {syllabus.map((dayPlan) => {
              const isCompleted = completedDays.includes(dayPlan.day);
              // Simple unlock logic
              const isLocked = false; 

              return (
                <div 
                  key={dayPlan.day}
                  onClick={() => !isLocked && handleDaySelect(dayPlan)}
                  className={`
                    relative rounded-xl p-6 border transition-all duration-200
                    flex flex-col justify-between min-h-[200px]
                    ${isLocked 
                        ? 'bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 cursor-not-allowed opacity-70' 
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:-translate-y-1 cursor-pointer hover:border-togaf-200 dark:hover:border-togaf-700'
                    }
                    ${isCompleted ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-900/30' : ''}
                  `}
                >
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <span className={`
                        text-xs font-bold px-2 py-1 rounded uppercase tracking-wider
                        ${isCompleted 
                            ? 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-300' 
                            : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'}
                      `}>
                         {settings.lang === 'zh' ? `${t.day} ${dayPlan.day} ${t.daySuffix}` : `${t.day} ${dayPlan.day}`}
                      </span>
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />
                      ) : isLocked ? (
                        <Lock className="w-5 h-5 text-slate-400" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-slate-200 dark:border-slate-600" />
                      )}
                    </div>
                    
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">{dayPlan.title}</h3>
                    <p className="text-xs text-togaf-600 dark:text-togaf-400 font-medium mb-3">{dayPlan.phase}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">{dayPlan.description}</p>
                  </div>

                  {!isLocked && (
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
                        <span className="text-xs text-slate-400 dark:text-slate-500">{dayPlan.keyConcepts.length} {t.keyConcepts}</span>
                        <span className="text-togaf-600 dark:text-togaf-400 text-sm font-medium group-hover:underline">{t.start} &rarr;</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </main>
      </div>
    );
  }

  // Render Glossary View
  if (view === 'GLOSSARY') {
    const filteredGlossary = GLOSSARY_ITEMS.filter(item => {
        const term = settings.lang === 'zh' ? item.termZh : item.termEn;
        const def = settings.lang === 'zh' ? item.defZh : item.defEn;
        const query = searchTerm.toLowerCase();
        return term.toLowerCase().includes(query) || def.toLowerCase().includes(query);
    });

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col transition-colors">
            <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10 shadow-sm transition-colors">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                    <button 
                        onClick={handleBackToDashboard}
                        className="flex items-center text-slate-600 dark:text-slate-300 hover:text-togaf-600 dark:hover:text-togaf-400 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        <span className="font-medium hidden sm:inline">{t.backToPlan}</span>
                    </button>
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                        <Book className="w-5 h-5 text-togaf-600" />
                        {t.glossary}
                    </h2>
                    <div className="flex gap-2">
                         <button 
                            onClick={toggleLanguage}
                            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            title={settings.lang === 'en' ? "Switch to Chinese" : "切换到英文"}
                        >
                            <Languages className="w-5 h-5" />
                        </button>
                         <button 
                            onClick={toggleTheme}
                            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            title="Toggle Theme"
                        >
                            {settings.theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-grow max-w-4xl mx-auto px-4 py-8 w-full">
                {/* Search Bar */}
                <div className="relative mb-8">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={t.searchPlaceholder}
                        className="block w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-600 rounded-lg leading-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-togaf-500 focus:border-togaf-500 transition-colors shadow-sm"
                    />
                    {searchTerm && (
                        <button 
                            onClick={() => setSearchTerm('')}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    )}
                </div>

                {/* Glossary List */}
                <div className="grid grid-cols-1 gap-4">
                    {filteredGlossary.length > 0 ? (
                        filteredGlossary.map((item) => (
                            <div key={item.id} className="bg-white dark:bg-slate-800 rounded-lg p-5 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="text-lg font-bold text-togaf-700 dark:text-togaf-400 mb-2">
                                    {settings.lang === 'zh' ? item.termZh : item.termEn}
                                </h3>
                                {settings.lang === 'zh' && (
                                    <p className="text-xs text-slate-400 dark:text-slate-500 mb-2 font-mono">
                                        {item.termEn}
                                    </p>
                                )}
                                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                    {settings.lang === 'zh' ? item.defZh : item.defEn}
                                </p>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-slate-500 dark:text-slate-400 text-lg">{t.noResults}</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
  }

  // Render Learning View
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col items-center transition-colors">
      <nav className="w-full bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-4 shadow-sm transition-colors">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
            <button 
                onClick={handleBackToDashboard}
                className="flex items-center text-slate-600 dark:text-slate-300 hover:text-togaf-600 dark:hover:text-togaf-400 transition-colors"
            >
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span className="font-medium hidden sm:inline">{t.backToPlan}</span>
            </button>
            <div className="text-center">
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                    {settings.lang === 'zh' ? `${t.day} ${selectedDay?.day} ${t.daySuffix}: ${selectedDay?.title}` : `${t.day} ${selectedDay?.day}: ${selectedDay?.title}`}
                </h2>
            </div>
            
            <div className="flex gap-2">
                 <button 
                    onClick={toggleLanguage}
                    className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                    <Languages className="w-5 h-5" />
                </button>
                 <button 
                    onClick={toggleTheme}
                    className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                    {settings.theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </button>
            </div>
        </div>
      </nav>

      <main className="flex-grow w-full max-w-3xl px-4 py-8 flex flex-col items-center justify-start">
        
        {loading ? (
           <div className="flex flex-col items-center justify-center h-96 animate-pulse">
              <Sparkles className="w-12 h-12 text-togaf-400 mb-4 animate-spin-slow" />
              <p className="text-lg font-medium text-slate-600 dark:text-slate-300">{t.generating}</p>
              <p className="text-sm text-slate-400 dark:text-slate-500 mt-2">{t.generatingSub}</p>
           </div>
        ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-lg text-center border border-red-100 dark:border-red-900/50">
                <p>{error}</p>
                <button onClick={() => selectedDay && handleDaySelect(selectedDay)} className="mt-4 px-4 py-2 bg-red-100 dark:bg-red-900/40 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors">{t.retry}</button>
            </div>
        ) : (
            <div className="w-full flex flex-col items-center">
                {/* Progress dots */}
                <div className="flex gap-2 mb-4">
                    {cards.map((_, idx) => (
                        <div 
                            key={idx} 
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                idx === currentCardIndex ? 'w-8 bg-togaf-600 dark:bg-togaf-500' : 'w-2 bg-slate-300 dark:bg-slate-600'
                            }`}
                        />
                    ))}
                </div>

                <Flashcard data={cards[currentCardIndex]} lang={settings.lang} />

                <div className="flex items-center justify-between w-full max-w-md mt-6 px-4">
                    <button 
                        onClick={prevCard}
                        disabled={currentCardIndex === 0}
                        className="p-3 rounded-full bg-white dark:bg-slate-800 shadow text-slate-600 dark:text-slate-300 disabled:opacity-30 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-togaf-600 dark:hover:text-togaf-400 transition-all"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    
                    <span className="text-slate-400 dark:text-slate-500 text-sm font-medium">
                        {currentCardIndex + 1} / {cards.length}
                    </span>

                    <button 
                        onClick={nextCard}
                        disabled={currentCardIndex === cards.length - 1}
                        className="p-3 rounded-full bg-white dark:bg-slate-800 shadow text-slate-600 dark:text-slate-300 disabled:opacity-30 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-togaf-600 dark:hover:text-togaf-400 transition-all"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                <div className="mt-12 border-t border-slate-200 dark:border-slate-700 pt-8 w-full max-w-md flex flex-col items-center">
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 text-center">
                        {t.finishedStudying}
                    </p>
                    <button 
                        onClick={handleCompleteDay}
                        className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg shadow-green-200 dark:shadow-none"
                    >
                        <CheckCircle className="w-5 h-5" />
                        {settings.lang === 'zh' ? `${t.markComplete}` : `${t.markComplete} ${selectedDay?.day}`}
                    </button>
                </div>
            </div>
        )}
      </main>
    </div>
  );
};

export default App;