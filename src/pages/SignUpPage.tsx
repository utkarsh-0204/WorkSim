import React, { useState } from 'react';
import { ArrowLeft, Lock, Mail, User, ChevronRight, AlertCircle, ShieldCheck } from 'lucide-react';

interface SignUpPageProps {
  onNavigate: (path: string) => void;
}

export const SignUpPage: React.FC<SignUpPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Front-end validation
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please provide a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      // New users get ushered into the onboarding & scenario exploration
      onNavigate('/scenarios');
    }, 600);
  };

  const handleGoogleSignUp = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onNavigate('/scenarios');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background text-text-main flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-primary/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-md w-full mx-auto relative z-10 space-y-6">
        
        {/* Back Link */}
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-text-dim hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to WorkSim</span>
        </button>

        {/* Card */}
        <div className="rounded-2xl border border-surface-border bg-surface/90 backdrop-blur-xl p-8 sm:p-10 shadow-2xl space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-surface-subtle border border-surface-border flex items-center justify-center font-bold text-white shadow-inner mx-auto mb-3">
              <span className="text-primary font-black text-xl">W</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Create your account
            </h1>
            <p className="text-xs text-text-muted">
              Start practicing realistic workplace incidents with AI colleagues.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-text-dim mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-text-dim absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jordan Diaz"
                  className="w-full bg-background border border-surface-border rounded-lg pl-10 pr-4 py-2.5 text-xs text-white placeholder-text-dim focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-text-dim mb-1.5">
                Work / Academic Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-text-dim absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="candidate@university.edu"
                  className="w-full bg-background border border-surface-border rounded-lg pl-10 pr-4 py-2.5 text-xs text-white placeholder-text-dim focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-text-dim mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-text-dim absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-background border border-surface-border rounded-lg pl-10 pr-4 py-2.5 text-xs text-white placeholder-text-dim focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-text-dim mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-text-dim absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-background border border-surface-border rounded-lg pl-10 pr-4 py-2.5 text-xs text-white placeholder-text-dim focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold text-white bg-primary hover:bg-primary-hover transition-all flex items-center justify-center gap-1.5 shadow-md shadow-primary/20 disabled:opacity-60"
            >
              <span>{isSubmitting ? 'Creating Account...' : 'Create Account'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-surface-border w-full" />
            <span className="bg-surface px-3 text-[11px] font-mono text-text-dim shrink-0">
              OR
            </span>
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={isSubmitting}
            className="w-full py-2.5 px-4 rounded-lg text-xs font-medium text-white bg-surface-subtle border border-surface-border hover:bg-surface-hover hover:border-surface-border/80 transition-all flex items-center justify-center gap-2.5 shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Footer link */}
          <div className="text-center text-xs text-text-muted pt-2 border-t border-surface-border/60">
            <span>Already have an account? </span>
            <button
              onClick={() => onNavigate('/signin')}
              className="text-primary hover:text-primary-light font-medium transition-colors"
            >
              Sign In
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
