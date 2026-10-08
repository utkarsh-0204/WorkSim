import React from 'react';
import { CheckCircle2, Mail, Briefcase, ArrowRight } from 'lucide-react';
import { getProgressData } from '../utils/storage';

interface ProfilePageProps {
  onNavigate: (path: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const progress = getProgressData();

  return (
    <div className="min-h-screen bg-background text-text-main py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Profile Card Header */}
        <div className="rounded-2xl border border-surface-border bg-surface p-8 shadow-xl flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-primary to-accent-purple border border-primary/40 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              JD
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-accent-emerald border-2 border-surface flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-white"></span>
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h1 className="text-2xl font-bold text-white">Jordan Diaz</h1>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary-light">
                Candidate ID: #WS-8291
              </span>
            </div>
            <p className="text-sm text-text-muted">Early-Career Software Engineer • College Senior</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-text-dim">
              <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> jordan.diaz@university.edu</span>
              <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> Target: Backend / Fullstack</span>
            </div>
          </div>
        </div>

        {/* STATS OVERVIEW */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl border border-surface-border bg-surface text-center">
            <span className="text-xs font-mono uppercase text-text-dim block mb-1">Total Simulations</span>
            <span className="text-2xl font-bold font-mono text-white">{progress.scenariosCompleted}</span>
          </div>
          <div className="p-5 rounded-xl border border-surface-border bg-surface text-center">
            <span className="text-xs font-mono uppercase text-text-dim block mb-1">Average Rating</span>
            <span className="text-2xl font-bold font-mono text-emerald-400">{progress.averageScore}/10</span>
          </div>
          <div className="p-5 rounded-xl border border-surface-border bg-surface text-center">
            <span className="text-xs font-mono uppercase text-text-dim block mb-1">Hours Practised</span>
            <span className="text-2xl font-bold font-mono text-white">{progress.hoursPractised} hrs</span>
          </div>
          <div className="p-5 rounded-xl border border-surface-border bg-surface text-center">
            <span className="text-xs font-mono uppercase text-text-dim block mb-1">Readiness Score</span>
            <span className="text-2xl font-bold font-mono text-primary-light">84%</span>
          </div>
        </div>

        {/* VERIFIED SKILLS BADGES */}
        <div className="rounded-2xl border border-surface-border bg-surface p-6 sm:p-8 space-y-4">
          <h2 className="text-lg font-semibold text-white">WorkSim Verified Credentials</h2>
          <p className="text-xs text-text-muted">
            These competency credentials are only awarded upon passing adaptive workplace scenarios with evidence-backed ratings above 8.0/10.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-surface-subtle border border-surface-border flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">P0 Incident Mitigation (Level II)</div>
                <div className="text-xs text-text-dim mt-0.5">Verified on Production Incident • Dec 2024</div>
                <div className="text-[11px] text-text-muted mt-1.5">Evidence: Isolated PostgreSQL connection exhaustion and orchestrated rollback under 15 mins.</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface-subtle border border-surface-border flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Constructive Code Review Consensus</div>
                <div className="text-xs text-text-dim mt-0.5">Verified on PR #482 Discussion</div>
                <div className="text-[11px] text-text-muted mt-1.5">Evidence: Identified N+1 loop and tenant authorization leak without confrontational language.</div>
              </div>
            </div>
          </div>
        </div>

        {/* QUICK NAVIGATION */}
        <div className="flex justify-between items-center pt-2">
          <button
            onClick={() => onNavigate('/progress')}
            className="text-xs text-primary hover:text-primary-light font-medium transition-colors"
          >
            ← View Full Progression Charts
          </button>
          <button
            onClick={() => onNavigate('/scenarios')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-primary hover:bg-primary-hover shadow-sm transition-colors"
          >
            <span>Practice Another Scenario</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
