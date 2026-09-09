import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'it';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    if (saved === 'en' || saved === 'it') return saved;
    const browserLang = navigator.language.split('-')[0];
    return browserLang === 'it' ? 'it' : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  // Translation function helper
  const t = (key: string) => {
    const keys = key.split('.');
    let current: any = translations[language];
    
    for (const k of keys) {
      if (current[k] === undefined) {
        console.warn(`Translation key not found: ${key} for language: ${language}`);
        return key;
      }
      current = current[k];
    }
    
    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Simple translation object
const translations: Record<Language, any> = {
  en: {
    nav: {
      home: 'Home',
      pricing: 'Pricing',
      about: 'About',
      getStarted: 'Get Started',
      signIn: 'Sign In',
      signOut: 'Sign Out'
    },
    premium: {
      audioBriefing: 'AI Audio Briefing',
      generateAudio: 'Generate Audio',
      playing: 'Playing Briefing...',
      statusReady: 'Status: Ready to stream',
      stopBriefing: 'Stop Briefing',
      playBriefing: 'Play Audio Briefing',
      stop: 'Stop',
      download: 'Download Audio',
      premiumOnly: 'Premium Feature',
      upgrade: 'Upgrade to Pro to unlock high-quality AI voice briefings.',
      flashcards: 'AI Flashcards',
      generateFlashcards: 'Generate Flashcards',
      studyFlashcards: 'Study Flashcards',
      masterContent: 'Master this content',
      masterDesc: 'Generate interactive flashcards to test your knowledge and retain information faster.',
      front: 'Front',
      back: 'Back',
      next: 'Next Card',
      previous: 'Previous Card',
      flip: 'Flip Card',
      done: 'Finish Session'
    },
    hero: {
      integration: 'New: Gemini 3.0 Integration',
      title: 'Insights at the',
      titleBlue: 'speed of thought.',
      subtitle: 'Instant Insights',
      description: 'Transform complex information into instant insights. The ultimate tool for modern learners and researchers.',
      inputPlaceholder: 'Paste text or URL here...',
      analyzeBtn: 'Analyze Now',
      analyzing: 'Analyzing...',
      text: 'Text',
      url: 'URL',
      features: {
        badge: 'Core Features',
        speed: 'Ultra Fast',
        speedDesc: 'Get summaries in seconds.',
        precision: 'AI Precision',
        precisionDesc: 'Extract the core essence.',
        design: 'Elegant UI',
        designDesc: 'Crafted for focus.'
      }
    },
    results: {
      summary: 'Core Summary',
      coreInsights: 'Core Insights',
      concepts: 'Key Concepts',
      keyTakeaways: 'Key Takeaways',
      noConcepts: 'No concepts extracted',
      copy: 'Copy',
      copied: 'Copied!',
      error: 'Analysis Error',
      placeholder: 'Your summary will appear here after analysis...',
      ready: 'ready'
    },
    pricing: {
      title: 'Simple Pricing',
      subtitle: 'Choose the plan that fits your study needs.',
      monthly: 'monthly',
      getStarted: 'Get Started',
      popular: 'Most Popular',
      plans: {
        free: {
          name: 'Free',
          features: ['5 analyses per day', 'Basic summary', 'Key concepts', 'Web app access']
        },
        pro: {
          name: 'Pro',
          features: ['Unlimited analyses', 'Advanced AI models', 'Browser extension', 'Priority support', 'History sync']
        },
        team: {
          name: 'Team',
          features: ['Everything in Pro', 'Collaborative library', 'Shared annotations', 'API access', 'Dedicated manager']
        }
      }
    },
    about: {
      title: 'About StudyFlow AI',
      subtitle: 'We are on a mission to make learning faster and more efficient.',
      mission: 'Our Mission',
      missionDesc: 'In a world of information overload, we help you find what matters most. StudyFlow AI was built to empower students and professionals to digest complex content instantly.',
      values: {
        speed: 'Speed',
        speedDesc: 'Time is the most valuable asset.',
        clarity: 'Clarity',
        clarityDesc: 'Complexity is the enemy of understanding.',
        accessibility: 'Accessibility',
        accessibilityDesc: 'Knowledge should be available to everyone.'
      },
      cta: 'Ready to transform your study routine?',
      ctaBtn: 'Try it for free'
    },
    auth: {
      welcome: 'Welcome Back',
      subtitle: 'Sign in to save your progress and access your library.',
      google: 'Sign in with Google',
      email: 'Sign in with Email',
      noAccount: "Don't have an account?",
      signUp: 'Sign Up'
    },
    legal: {
      privacy: {
        title: 'Privacy Policy',
        subtitle: 'Your privacy is our priority. Learn how we protect and manage your data in compliance with GDPR.',
        badge: 'Legal Compliance',
        sections: [
          {
            title: '1. Data Collection',
            content: 'We collect information that you provide directly to us when you create an account, use our services, or communicate with us. This includes account information, content data, and usage data.'
          },
          {
            title: '2. How We Use Your Data',
            content: 'In accordance with GDPR Article 6, we process your data to provide services, improve our application, and ensure security.'
          },
          {
            title: '3. Your Rights (GDPR)',
            content: 'Under GDPR, you have the right to access, rectification, erasure, and data portability. Contact us at privacy@studyflow.ai to exercise these rights.'
          }
        ],
        retention: 'Data Retention',
        retentionDesc: 'We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected.',
        updated: 'Last updated: March 10, 2026'
      },
      cookies: {
        title: 'Cookie Policy',
        subtitle: 'Learn how we use cookies and similar technologies to enhance your experience on StudyFlow AI.',
        badge: 'Cookie Usage',
        sections: [
          {
            title: '1. What are Cookies?',
            content: 'Cookies are small text files stored on your device. We only place non-essential cookies if you have provided explicit consent.'
          },
          {
            title: '2. Types of Cookies',
            content: 'We use strictly necessary, performance, and functionality cookies to ensure the best experience.'
          },
          {
            title: '3. Managing Preferences',
            content: 'You can control or delete cookies through your browser settings. Note that some functionalities may be limited.'
          }
        ],
        contact: 'Contact Us',
        contactDesc: 'If you have any questions about our use of cookies, please email us at privacy@studyflow.ai.',
        updated: 'Last updated: March 10, 2026'
      }
    }
  },
  it: {
    nav: {
      home: 'Home',
      pricing: 'Prezzi',
      about: 'Chi Siamo',
      getStarted: 'Inizia',
      signIn: 'Accedi',
      signOut: 'Esci'
    },
    premium: {
      audioBriefing: 'Briefing Audio AI',
      generateAudio: 'Genera Audio',
      playing: 'Riproduzione Briefing...',
      statusReady: 'Stato: Pronto per lo streaming',
      stopBriefing: 'Ferma Briefing',
      playBriefing: 'Riproduci Briefing Audio',
      stop: 'Ferma',
      download: 'Scarica Audio',
      premiumOnly: 'Funzione Premium',
      upgrade: 'Passa a Pro per sbloccare i briefing con voce AI di alta qualità.',
      flashcards: 'Flashcard AI',
      generateFlashcards: 'Genera Flashcard',
      studyFlashcards: 'Studia Flashcard',
      masterContent: 'Padroneggia questo contenuto',
      masterDesc: 'Genera flashcard interattive per testare le tue conoscenze e memorizzare le informazioni più velocemente.',
      front: 'Fronte',
      back: 'Retro',
      next: 'Prossima',
      previous: 'Precedente',
      flip: 'Gira Carta',
      done: 'Termina Sessione'
    },
    hero: {
      integration: 'Nuovo: Integrazione Gemini 3.0',
      title: 'Insight alla',
      titleBlue: 'velocità del pensiero.',
      subtitle: 'Approfondimenti Istantanei',
      description: 'Trasforma informazioni complesse in approfondimenti istantanei. Lo strumento definitivo per studenti e ricercatori moderni.',
      inputPlaceholder: 'Incolla qui il testo o l\'URL...',
      analyzeBtn: 'Analizza Ora',
      analyzing: 'Analisi in corso...',
      text: 'Testo',
      url: 'URL',
      features: {
        badge: 'Funzionalità Core',
        speed: 'Ultra Veloce',
        speedDesc: 'Ottieni riassunti in pochi secondi.',
        precision: 'Precisione AI',
        precisionDesc: 'Estrai l\'essenza principale.',
        design: 'UI Elegante',
        designDesc: 'Progettata per la concentrazione.'
      }
    },
    results: {
      summary: 'Riassunto Principale',
      coreInsights: 'Insight Fondamentali',
      concepts: 'Concetti Chiave',
      keyTakeaways: 'Punti Salienti',
      noConcepts: 'Nessun concetto estratto',
      copy: 'Copia',
      copied: 'Copiato!',
      error: 'Errore di Analisi',
      placeholder: 'Il tuo riassunto apparirà qui dopo l\'analisi...',
      ready: 'pronte'
    },
    pricing: {
      title: 'Prezzi Semplici',
      subtitle: 'Scegli il piano più adatto alle tue esigenze di studio.',
      monthly: 'al mese',
      getStarted: 'Inizia Ora',
      popular: 'Più Popolare',
      plans: {
        free: {
          name: 'Gratis',
          features: ['5 analisi al giorno', 'Riassunto base', 'Concetti chiave', 'Accesso web app']
        },
        pro: {
          name: 'Pro',
          features: ['Analisi illimitate', 'Modelli AI avanzati', 'Estensione browser', 'Supporto prioritario', 'Sincronizzazione cronologia']
        },
        team: {
          name: 'Team',
          features: ['Tutto nel Pro', 'Libreria collaborativa', 'Annotazioni condivise', 'Accesso API', 'Manager dedicato']
        }
      }
    },
    about: {
      title: 'Su StudyFlow AI',
      subtitle: 'La nostra missione è rendere l\'apprendimento più veloce ed efficiente.',
      mission: 'La Nostra Missione',
      missionDesc: 'In un mondo sovraccarico di informazioni, ti aiutiamo a trovare ciò che conta di più. StudyFlow AI è stato creato per permettere a studenti e professionisti di digerire contenuti complessi istantaneamente.',
      values: {
        speed: 'Velocità',
        speedDesc: 'Il tempo è la risorsa più preziosa.',
        clarity: 'Chiarezza',
        clarityDesc: 'La complessità è nemica della comprensione.',
        accessibility: 'Accessibilità',
        accessibilityDesc: 'La conoscenza dovrebbe essere disponibile per tutti.'
      },
      cta: 'Pronto a trasformare la tua routine di studio?',
      ctaBtn: 'Provalo gratis'
    },
    auth: {
      welcome: 'Bentornato',
      subtitle: 'Accedi per salvare i tuoi progressi e accedere alla tua libreria.',
      google: 'Accedi con Google',
      email: 'Accedi con Email',
      noAccount: "Non hai un account?",
      signUp: 'Registrati'
    },
    legal: {
      privacy: {
        title: 'Informativa sulla Privacy',
        subtitle: 'La tua privacy è la nostra priorità. Scopri come proteggiamo e gestiamo i tuoi dati in conformità con il GDPR.',
        badge: 'Conformità Legale',
        sections: [
          {
            title: '1. Raccolta dei Dati',
            content: 'Raccogliamo le informazioni che ci fornisci direttamente quando crei un account, utilizzi i nostri servizi o comunichi con noi. Ciò include dati dell\'account, dati dei contenuti e dati di utilizzo.'
          },
          {
            title: '2. Come Utilizziamo i Tuoi Dati',
            content: 'In conformità con l\'Articolo 6 del GDPR, trattiamo i tuoi dati per fornire servizi, migliorare la nostra applicazione e garantire la sicurezza.'
          },
          {
            title: '3. I Tuoi Diritti (GDPR)',
            content: 'Ai sensi del GDPR, hai il diritto di accesso, rettifica, cancellazione e portabilità dei dati. Contattaci a privacy@studyflow.ai per esercitare questi diritti.'
          }
        ],
        retention: 'Conservazione dei Dati',
        retentionDesc: 'Conserviamo i tuoi dati personali solo per il tempo necessario a soddisfare le finalità per cui sono stati raccolti.',
        updated: 'Ultimo aggiornamento: 10 Marzo 2026'
      },
      cookies: {
        title: 'Informativa sui Cookie',
        subtitle: 'Scopri come utilizziamo i cookie e tecnologie simili per migliorare la tua esperienza su StudyFlow AI.',
        badge: 'Utilizzo dei Cookie',
        sections: [
          {
            title: '1. Cosa sono i Cookie?',
            content: 'I cookie sono piccoli file di testo memorizzati sul tuo dispositivo. Utilizziamo cookie non essenziali solo se hai fornito il tuo consenso esplicito.'
          },
          {
            title: '2. Tipi di Cookie',
            content: 'Utilizziamo cookie strettamente necessari, di prestazione e di funzionalità per garantire la migliore esperienza possibile.'
          },
          {
            title: '3. Gestione delle Preferenze',
            content: 'Puoi controllare o eliminare i cookie tramite le impostazioni del tuo browser. Tieni presente che alcune funzionalità potrebbero essere limitate.'
          }
        ],
        contact: 'Contattaci',
        contactDesc: 'Se hai domande sul nostro utilizzo dei cookie, inviaci un\'e-mail a privacy@studyflow.ai.',
        updated: 'Ultimo aggiornamento: 10 Marzo 2026'
      }
    }
  }
};
