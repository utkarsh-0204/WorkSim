import React from 'react';
import { 
  Compass, 
  BarChart2, 
  FileText, 
  User, 
  Sparkles,
  ShieldCheck,
  ChevronRight,
  HelpCircle
} from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-surface-border/70 bg-background/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div 
          onClick={() => onNavigate('/')} 
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-lg bg-surface border border-surface-border flex items-center justify-center font-bold text-white shadow-inner group-hover:border-primary/50 transition-colors">
            <span className="text-primary font-black tracking-tighter text-lg">W</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-white tracking-tight text-base">
              WorkSim
            </span>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          <button 
            onClick={() => onNavigate('/')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              currentPath === '/' 
                ? 'text-white bg-surface-subtle' 
                : 'text-text-muted hover:text-white hover:bg-surface-subtle/50'
            }`}
          >
            Home
          </button>
          <button 
            onClick={() => onNavigate('/scenarios')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              currentPath.startsWith('/scenarios') 
                ? 'text-white bg-surface-subtle' 
                : 'text-text-muted hover:text-white hover:bg-surface-subtle/50'
            }`}
          >
            Scenarios
          </button>
          <button 
            onClick={() => onNavigate('/how-it-works')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              currentPath === '/how-it-works' 
                ? 'text-white bg-surface-subtle' 
                : 'text-text-muted hover:text-white hover:bg-surface-subtle/50'
            }`}
          >
            How It Works
          </button>
          <button 
            onClick={() => onNavigate('/progress')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              currentPath === '/progress' 
                ? 'text-white bg-surface-subtle' 
                : 'text-text-muted hover:text-white hover:bg-surface-subtle/50'
            }`}
          >
            My Progress
          </button>
          <button 
            onClick={() => onNavigate('/generate-scenario')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              currentPath === '/ai-generator' || currentPath === '/generate-scenario' 
                ? 'text-primary-light bg-primary/10 border border-primary/30' 
                : 'text-text-muted hover:text-primary-light hover:bg-surface-subtle/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>AI Generator</span>
          </button>
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => onNavigate('/signin')}
            className="hidden sm:inline-flex text-sm text-text-muted hover:text-white font-medium px-3 py-1.5 transition-colors"
          >
            Sign In
          </button>
          <button 
            onClick={() => onNavigate('/signup')}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-hover shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/40 group"
          >
            <span>Get Started</span>
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </header>
  );
};

export const Sidebar: React.FC<{ currentPath: string; onNavigate: (path: string) => void }> = ({ currentPath, onNavigate }) => {
  return (
    <aside className="w-64 border-r border-surface-border bg-surface flex flex-col justify-between shrink-0 min-h-screen">
      <div>
        {/* Logo */}
        <div 
          onClick={() => onNavigate('/')}
          className="p-5 border-b border-surface-border flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-background border border-surface-border flex items-center justify-center font-bold text-white group-hover:border-primary/50 transition-colors">
            <span className="text-primary font-black">W</span>
          </div>
          <div>
            <div className="font-semibold text-white tracking-tight text-sm">WorkSim</div>
            <div className="text-[11px] text-text-dim">Workplace Simulator</div>
          </div>
        </div>

        {/* Links */}
        <nav className="p-3 space-y-1">
          <button 
            onClick={() => onNavigate('/')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              currentPath === '/' ? 'bg-surface-subtle text-white font-semibold' : 'text-text-muted hover:text-white hover:bg-surface-subtle/50'
            }`}
          >
            <Compass className="w-4 h-4" />
            Home
          </button>

          <button 
            onClick={() => onNavigate('/scenarios')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              currentPath.startsWith('/scenarios') ? 'bg-surface-subtle text-white font-semibold' : 'text-text-muted hover:text-white hover:bg-surface-subtle/50'
            }`}
          >
            <Compass className="w-4 h-4 text-primary" />
            Scenarios
          </button>

          <button 
            onClick={() => onNavigate('/progress')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              currentPath === '/progress' ? 'bg-surface-subtle text-white font-semibold' : 'text-text-muted hover:text-white hover:bg-surface-subtle/50'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            My Progress
          </button>

          <button 
            onClick={() => onNavigate('/reports/rep-sample')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              currentPath.startsWith('/reports') ? 'bg-surface-subtle text-white font-semibold' : 'text-text-muted hover:text-white hover:bg-surface-subtle/50'
            }`}
          >
            <FileText className="w-4 h-4" />
            Evaluation Reports
          </button>

          <button 
            onClick={() => onNavigate('/generate-scenario')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              currentPath === '/generate-scenario' ? 'bg-surface-subtle text-primary font-semibold' : 'text-text-muted hover:text-primary hover:bg-surface-subtle/50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-accent-purple" />
            AI Generator
          </button>

          <button 
            onClick={() => onNavigate('/fair-evaluation')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              currentPath === '/fair-evaluation' ? 'bg-surface-subtle text-white font-semibold' : 'text-text-muted hover:text-white hover:bg-surface-subtle/50'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Fair Evaluation
          </button>
        </nav>
      </div>

      {/* User profile bottom */}
      <div className="p-4 border-t border-surface-border bg-surface-subtle/40">
        <div 
          onClick={() => onNavigate('/profile')}
          className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary-light font-semibold text-xs">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-white truncate">Jordan Diaz</div>
            <div className="text-[11px] text-text-dim truncate">Associate Software Engineer</div>
          </div>
          <User className="w-4 h-4 text-text-dim" />
        </div>
      </div>
    </aside>
  );
};
