import React, { useState } from 'react';
import { Play, Mic } from 'lucide-react';
import { SCENARIOS } from '../data/scenarios';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

const initials = (name: string) =>
  name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();

const PRACTICE_LABEL: Record<string, string> = {
  'prod-incident': 'Practice this incident',
  'code-review': 'Practice this review',
  'client-scope': 'Practice this negotiation',
  'team-conflict': 'Practice this conversation',
  'feature-prioritization': 'Practice this trade-off',
  'project-status-update': 'Practice this update',
};

const DIFFICULTY_TONE: Record<string, string> = {
  Easy: 'text-accent-emerald',
  Foundational: 'text-accent-emerald',
  Intermediate: 'text-accent-amber',
  Advanced: 'text-accent-rose',
};

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [demoInput, setDemoInput] = useState('');
  const [isDemoSpeaking, setIsDemoSpeaking] = useState(false);

  const handleDemoVoice = () => {
    setIsDemoSpeaking((prev) => !prev);
    if (!isDemoSpeaking) {
      setDemoInput('I will review active pg_stat_activity queries and isolate the table locks.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-text-main">

      {/* ================= HERO ================= */}
      <section className="pt-20 pb-20 md:pt-28 md:pb-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-[3.4rem] font-semibold tracking-tight leading-[1.1] mb-6">
              Practice real work before your first job.
            </h1>
            <p className="text-lg text-text-muted leading-relaxed mb-10 max-w-xl">
              Step into realistic workplace situations with managers, clients, and teammates. Make decisions under pressure, and get feedback tied to exactly what you said.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <button
                onClick={() => onNavigate('/scenarios')}
                className="px-6 py-3 rounded-md text-sm font-medium text-background bg-primary hover:bg-primary-hover transition-colors cursor-pointer"
              >
                Start practicing
              </button>
              <button
                onClick={() => onNavigate('/demo')}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-text-main hover:text-primary transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                Watch a simulation
              </button>
            </div>
          </div>

          {/* Realistic product window */}
          <div className="mt-16 max-w-4xl">
            <div className="rounded-lg border border-surface-border bg-surface shadow-sm overflow-hidden">

              <div className="h-11 bg-surface-subtle border-b border-surface-border px-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-surface-border" />
                    <div className="w-2.5 h-2.5 rounded-full bg-surface-border" />
                    <div className="w-2.5 h-2.5 rounded-full bg-surface-border" />
                  </div>
                  <span className="h-4 w-px bg-surface-border mx-1" />
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <span className="font-medium text-text-main">WorkSim</span>
                    <span className="text-text-dim">/</span>
                    <span>Production Incident</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-accent-emerald">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald" />
                  Live
                </div>
              </div>

              <div className="p-6 space-y-5">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-primary-muted flex items-center justify-center text-[10px] font-medium text-text-main shrink-0 mt-0.5">
                    PS
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-xs font-medium text-text-main">Priya Sharma</span>
                      <span className="text-[11px] text-text-dim">Engineering Manager</span>
                    </div>
                    <div className="border border-surface-border rounded-md p-3 text-sm text-text-main leading-relaxed">
                      Production is down and users can't log in. What will you do first?
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-[10px] font-medium text-background shrink-0 mt-0.5">
                    You
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-xs font-medium text-text-main">You</span>
                    </div>
                    <div className="bg-surface-subtle rounded-md p-3 text-sm text-text-main leading-relaxed">
                      I'll first inspect the cluster telemetry and APM logs to isolate whether this is a gateway timeout, memory exhaustion, or database connection saturation.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-primary-muted flex items-center justify-center text-[10px] font-medium text-text-main shrink-0 mt-0.5">
                    PS
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-xs font-medium text-text-main">Priya Sharma</span>
                      <span className="text-[11px] text-text-dim">Engineering Manager</span>
                    </div>
                    <div className="border border-surface-border rounded-md p-3 text-sm text-text-main leading-relaxed">
                      Good. The logs show PostgreSQL connection pool exhaustion — 300 of 300 connections active. How would you mitigate this right now?
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ================= SCENARIO LIBRARY ================= */}
      <section className="py-20 border-t border-surface-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-3">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight mb-2">
                Situations you'll actually face
              </h2>
              <p className="text-sm text-text-muted max-w-lg">
                Each one puts you opposite a specific person, with a specific problem, and no script to follow.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-surface-border border border-surface-border rounded-lg overflow-hidden">
            {SCENARIOS.map((s) => (
              <div key={s.id} className="bg-background p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-surface-subtle border border-surface-border flex items-center justify-center text-[10px] font-medium text-text-main shrink-0">
                        {initials(s.character.name)}
                      </div>
                      <div className="leading-tight">
                        <div className="text-xs font-medium text-text-main">{s.character.name}</div>
                        <div className="text-[11px] text-text-dim">{s.character.role}</div>
                      </div>
                    </div>
                    <span className={`text-[11px] font-medium mt-1 ${DIFFICULTY_TONE[s.difficulty] || 'text-text-dim'}`}>
                      {s.difficulty}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-text-main mb-2">{s.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed mb-4">
                    {s.description}
                  </p>
                </div>

                <button
                  onClick={() => onNavigate(`/scenarios/${s.id}`)}
                  className="w-full py-2.5 rounded-md text-sm font-medium text-text-main border border-surface-border hover:bg-surface-subtle transition-colors cursor-pointer"
                >
                  {PRACTICE_LABEL[s.id] || 'Practice this scenario'}
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-20 border-t border-surface-border bg-surface">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <h2 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight mb-12">
            Three stages, every time
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <div className="font-serif text-3xl text-text-dim mb-3">1</div>
              <h3 className="text-base font-semibold text-text-main mb-2">Choose a situation</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Pick a scenario from the library, or build one from a real job description.
              </p>
            </div>
            <div>
              <div className="font-serif text-3xl text-text-dim mb-3">2</div>
              <h3 className="text-base font-semibold text-text-main mb-2">Handle the conversation</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Talk or type, in real time, while the person you're speaking with reacts to your decisions.
              </p>
            </div>
            <div>
              <div className="font-serif text-3xl text-text-dim mb-3">3</div>
              <h3 className="text-base font-semibold text-text-main mb-2">Review your debrief</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                See your scores and the exact lines from the transcript that explain them.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ================= HOW IT ACTUALLY RESPONDS ================= */}
      <section className="py-20 border-t border-surface-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">

          <div>
            <h3 className="text-xl font-semibold text-text-main mb-3">
              The conversation changes based on what you say.
            </h3>
            <p className="text-sm text-text-muted leading-relaxed mb-6">
              The person you're speaking with reacts to your exact words. Guess, and they push for detail. Make excuses, and they ask for a plan instead.
            </p>
            <div className="border border-surface-border rounded-lg p-5 space-y-3 bg-surface">
              <div className="text-xs text-text-dim mb-1">You wrote</div>
              <div className="text-sm text-text-main border-l-2 border-surface-border pl-3">
                "We can probably finish tomorrow."
              </div>
              <div className="text-xs text-text-dim pt-2">The manager pushes back</div>
              <div className="text-sm text-text-main border-l-2 border-accent-amber pl-3">
                "Probably isn't a date. What's blocking you from confirming it?"
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-text-main mb-3">
              Every score points back to something you actually said.
            </h3>
            <p className="text-sm text-text-muted leading-relaxed mb-6">
              No generic advice. Each rating references a specific moment in your transcript — what worked, and what to change next time.
            </p>
            <div className="border border-surface-border rounded-lg p-5 space-y-3 bg-surface">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-text-dim">Communication</span>
                <span className="font-mono text-text-main">8.2 / 10</span>
              </div>
              <div className="text-sm text-text-main">
                <span className="text-accent-emerald font-medium">Worked: </span>
                You explained the connection pool bottleneck before proposing a restart.
              </div>
              <div className="text-sm text-text-main pt-1">
                <span className="text-accent-amber font-medium">Next time: </span>
                You escalated the blocked logins only after being asked twice.
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= INTERACTIVE TRY-IT ================= */}
      <section className="py-20 border-t border-surface-border bg-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
            Try answering Priya right now
          </h2>
          <p className="text-sm text-text-muted mb-8">
            Type a response, or speak it, to see how it works before you start a full scenario.
          </p>

          <div className="rounded-lg border border-surface-border bg-background p-5 text-left">
            <div className="text-xs text-text-dim mb-2">Priya Sharma · Engineering Manager</div>
            <div className="text-sm text-text-main border border-surface-border rounded-md p-3 mb-4">
              Production is down and users can't log in. What will you do first?
            </div>
            <div className="relative">
              <input
                type="text"
                value={demoInput}
                onChange={(e) => setDemoInput(e.target.value)}
                placeholder="I will check server logs to isolate the root cause..."
                className="w-full bg-background border border-surface-border rounded-md pl-4 pr-4 py-3 text-sm text-text-main placeholder-text-dim focus:outline-none focus:border-primary-light transition-colors"
              />
            </div>
            <div className="flex items-center justify-between mt-3">
              <button
                type="button"
                onClick={handleDemoVoice}
                className={`px-3 py-1.5 rounded-md border text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isDemoSpeaking ? 'bg-primary-muted border-primary-light text-text-main' : 'border-surface-border text-text-muted hover:text-text-main'
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
                {isDemoSpeaking ? 'Listening...' : 'Speak'}
              </button>
              <button
                onClick={() => onNavigate('/scenarios/prod-incident')}
                className="px-4 py-2 rounded-md text-xs font-medium text-background bg-primary hover:bg-primary-hover transition-colors cursor-pointer"
              >
                Continue in full scenario
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHO IT'S FOR ================= */}
      <section className="py-16 border-t border-surface-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-text-muted">
            <span className="text-text-dim">Built for</span>
            <span>students preparing for their first job</span>
            <span className="text-surface-border">·</span>
            <span>campus placement prep</span>
            <span className="text-surface-border">·</span>
            <span>behavioral interview practice</span>
            <span className="text-surface-border">·</span>
            <span>early-career engineers</span>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-24 border-t border-surface-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight mb-4 leading-tight">
            Your first job shouldn't be your first practice.
          </h2>
          <p className="text-base text-text-muted mb-8">
            Build confidence, composure, and ownership before the stakes are real.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('/scenarios')}
              className="px-7 py-3 rounded-md text-sm font-medium text-background bg-primary hover:bg-primary-hover transition-colors cursor-pointer"
            >
              Start your first simulation
            </button>
            <button
              onClick={() => onNavigate('/scenarios')}
              className="px-7 py-3 rounded-md text-sm font-medium text-text-main border border-surface-border hover:bg-surface-subtle transition-colors cursor-pointer"
            >
              Explore scenarios
            </button>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="mt-auto border-t border-surface-border py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-dim">
          <span className="font-serif text-text-main font-medium">WorkSim</span>
          <span>Practice real work before your first job.</span>
        </div>
      </footer>

    </div>
  );
};
