import React from 'react';
import { ArrowLeft, Play, Clock, Award, Shield, CheckCircle2, ChevronRight } from 'lucide-react';
import { SCENARIOS } from '../data/scenarios';

interface DemoSimulationPageProps {
  onNavigate: (path: string) => void;
}

export const DemoSimulationPage: React.FC<DemoSimulationPageProps> = ({ onNavigate }) => {
  const prodScenario = SCENARIOS[0];

  return (
    <div className="min-h-screen bg-background text-text-main py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Navigation back */}
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-text-dim hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to WorkSim</span>
        </button>

        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-surface-border bg-surface text-xs font-mono font-medium text-text-muted mb-4">
            <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse"></span>
            LIVE DEMO SIMULATION
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
            Watch a Workplace Simulation
          </h1>
          <p className="text-sm text-text-muted">
            See how WorkSim tests candidate decisions with Priya Sharma during an active P0 Production Outage.
          </p>
        </div>

        {/* Demo Video / Simulation Showcase Container */}
        <div className="rounded-2xl border border-surface-border bg-surface overflow-hidden shadow-2xl">
          
          {/* Window Bar */}
          <div className="h-10 bg-surface-subtle border-b border-surface-border px-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              <span className="ml-2 text-xs font-mono text-text-dim">Production Incident — Walkthrough Demo</span>
            </div>
            <div className="text-[11px] font-mono text-emerald-400">
              Interactive Mode Ready
            </div>
          </div>

          {/* Interactive Guided Breakdown */}
          <div className="p-6 sm:p-8 space-y-6 bg-[#0E1118]">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-surface rounded-xl border border-surface-border space-y-2">
                <span className="text-[10px] font-mono uppercase text-text-dim block">Stage 1: The Alert</span>
                <p className="text-xs text-text-muted">
                  Manager pings you with 504 gateway failures. You choose between guessing a server reboot vs systematically checking APM logs.
                </p>
              </div>

              <div className="p-4 bg-surface rounded-xl border border-surface-border space-y-2">
                <span className="text-[10px] font-mono uppercase text-text-dim block">Stage 2: The Consequence</span>
                <p className="text-xs text-text-muted">
                  Database connections are pinned. The AI dynamically adapts: hasty reboots fail again; diagnostic queries reveal release v2.14.0 locks.
                </p>
              </div>

              <div className="p-4 bg-surface rounded-xl border border-surface-border space-y-2">
                <span className="text-[10px] font-mono uppercase text-text-dim block">Stage 3: Evidence Debrief</span>
                <p className="text-xs text-text-muted">
                  System produces an evidence-grounded rubric linking your 8.8/10 score directly to exact session quotes and timestamps.
                </p>
              </div>
            </div>

            {/* Launch Banner */}
            <div className="p-6 rounded-xl border border-primary/30 bg-primary/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-sm font-semibold text-white">
                  Experience this Production Incident live yourself
                </div>
                <div className="text-xs text-text-muted">
                  Full 20-minute simulation with live branching decisions and candidate rubric debrief.
                </div>
              </div>

              <button
                onClick={() => onNavigate(`/simulation/${prodScenario.id}`)}
                className="px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-primary hover:bg-primary-hover shadow-md transition-all flex items-center gap-1.5 shrink-0"
              >
                <span>Launch Interactive Simulation</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

        {/* More Scenarios Link */}
        <div className="flex items-center justify-between text-xs text-text-dim pt-4">
          <span>Looking for code reviews or client discussions?</span>
          <button
            onClick={() => onNavigate('/scenarios')}
            className="text-primary hover:text-primary-light font-medium transition-colors"
          >
            Explore All Scenarios →
          </button>
        </div>

      </div>
    </div>
  );
};
