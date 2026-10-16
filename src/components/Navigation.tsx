import React from 'react';
import {
  Compass,
  BarChart2,
  FileText,
  User,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

const NAV_LINKS = [
  { path: '/', label: 'Home', match: (p: string) => p === '/' },
  { path: '/scenarios', label: 'Scenarios', match: (p: string) => p.startsWith('/scenarios') },
  { path: '/how-it-works', label: 'How it works', match: (p: string) => p === '/how-it-works' },
  { path: '/progress', label: 'My progress', match: (p: string) => p === '/progress' },
  { path: '/generate-scenario', label: 'Build a scenario', match: (p: string) => p === '/ai-generator' || p === '/generate-scenario' },
];

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 border-b border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Brand */}
        <button
          onClick={() => onNavigate('/')}
          className="flex items-baseline gap-2 cursor-pointer"
        >
          <span className="font-serif text-xl font-semibold text-text-main tracking-tight">
            WorkSim
          </span>
        </button>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => {
            const active = link.match(currentPath);
            return (
              <button
                key={link.path}
                onClick={() => onNavigate(link.path)}
                className={`relative py-1.5 text-sm transition-colors cursor-pointer ${
                  active ? 'text-text-main font-medium' : 'text-text-muted hover:text-text-main'
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-primary" />
                )}
              </button>
            );
          })}
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center gap-5">
          <button
            onClick={() => onNavigate('/signin')}
            className="hidden sm:inline-flex text-sm text-text-muted hover:text-text-main font-medium transition-colors cursor-pointer"
          >
            Sign in
          </button>
          <button
            onClick={() => onNavigate('/signup')}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-background bg-primary hover:bg-primary-hover transition-colors cursor-pointer"
          >
            Get started
          </button>
        </div>

      </div>
    </header>
  );
};

const SIDEBAR_LINKS = [
  { path: '/', label: 'Home', icon: Compass, match: (p: string) => p === '/' },
  { path: '/scenarios', label: 'Scenarios', icon: Compass, match: (p: string) => p.startsWith('/scenarios') },
  { path: '/progress', label: 'My progress', icon: BarChart2, match: (p: string) => p === '/progress' },
  { path: '/reports/rep-sample', label: 'Evaluation reports', icon: FileText, match: (p: string) => p.startsWith('/reports') },
  { path: '/generate-scenario', label: 'Build a scenario', icon: Sparkles, match: (p: string) => p === '/generate-scenario' },
  { path: '/fair-evaluation', label: 'Fair evaluation', icon: ShieldCheck, match: (p: string) => p === '/fair-evaluation' },
];

export const Sidebar: React.FC<{ currentPath: string; onNavigate: (path: string) => void }> = ({ currentPath, onNavigate }) => {
  return (
    <aside className="w-64 border-r border-surface-border bg-surface flex flex-col justify-between shrink-0 min-h-screen">
      <div>
        {/* Logo */}
        <button
          onClick={() => onNavigate('/')}
          className="w-full p-5 border-b border-surface-border flex items-baseline gap-2 cursor-pointer text-left"
        >
          <span className="font-serif text-lg font-semibold text-text-main tracking-tight">WorkSim</span>
        </button>

        {/* Links */}
        <nav className="p-3 space-y-0.5">
          {SIDEBAR_LINKS.map((link) => {
            const active = link.match(currentPath);
            const Icon = link.icon;
            return (
              <button
                key={link.path}
                onClick={() => onNavigate(link.path)}
                className={`w-full flex items-center gap-3 pl-3 pr-3 py-2.5 rounded-md text-sm transition-colors border-l-2 cursor-pointer ${
                  active
                    ? 'border-primary bg-surface-subtle text-text-main font-medium'
                    : 'border-transparent text-text-muted hover:text-text-main hover:bg-surface-subtle/60'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {link.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User profile bottom */}
      <div className="p-4 border-t border-surface-border">
        <button
          onClick={() => onNavigate('/profile')}
          className="w-full flex items-center gap-3 cursor-pointer text-left"
        >
          <div className="w-9 h-9 rounded-full bg-primary-muted flex items-center justify-center text-text-main font-medium text-xs shrink-0">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-text-main truncate">Jordan Diaz</div>
            <div className="text-[11px] text-text-dim truncate">Associate Software Engineer</div>
          </div>
          <User className="w-4 h-4 text-text-dim shrink-0" />
        </button>
      </div>
    </aside>
  );
};
