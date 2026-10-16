import React, { useState } from 'react';
import {
  Sparkles,
  Cpu,
  User,
  CheckCircle2,
} from 'lucide-react';
import { Scenario } from '../types';

interface GenerateScenarioPageProps {
  onStartGenerated: (scenario: Scenario) => void;
  onNavigate: (path: string) => void;
}

const SAMPLE_JOB_DESCRIPTIONS = [
  {
    title: 'Software Engineer — Backend (Fintech API)',
    text: `Job Description:
Senior / Mid-level Backend Engineer at Stripe.
Responsibilities:
- Build high-throughput distributed transaction ingestion pipelines in Go and Java.
- Manage PostgreSQL replication latency and distributed Redis cache invalidation.
- Respond to P0 API latency spikes and maintain 99.999% SLA during black swan volume surges.
- Conduct cross-team incident post-mortems and enforce zero-downtime database migrations.`
  },
  {
    title: 'Associate Product Manager — B2B SaaS',
    text: `Job Description:
Associate Product Manager at Datadog.
Responsibilities:
- Prioritize product roadmap between enterprise compliance security asks and core developer UX.
- Interface directly with Fortune 500 VP of Infrastructure stakeholders to define requirement scopes.
- Handle difficult trade-off negotiations when delivery timelines are threatened by technical debt.`
  }
];

export const GenerateScenarioPage: React.FC<GenerateScenarioPageProps> = ({ onStartGenerated, onNavigate }) => {
  const [jobDescription, setJobDescription] = useState(SAMPLE_JOB_DESCRIPTIONS[0].text);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScenario, setGeneratedScenario] = useState<Scenario | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);

    // Simulate AI parsing JD & synthesizing high-fidelity workplace scenario
    setTimeout(() => {
      const isBackend = jobDescription.toLowerCase().includes('backend') || jobDescription.toLowerCase().includes('engineer') || jobDescription.toLowerCase().includes('api');

      const newScenario: Scenario = isBackend ? {
        id: `gen-${Date.now()}`,
        title: 'P0 API Latency Degradation After Release',
        category: 'Software Engineering',
        role: 'Backend Systems Engineer',
        difficulty: 'Intermediate',
        duration: '20–25 min',
        description: 'Your payment ingestion API latency has spiked from 45ms to 1,800ms right after a new database migration. Investigate with your Tech Lead and mitigate customer timeouts.',
        situation: 'The international checkout API is returning 504 gateway timeouts for European banking gateways. Median response latency jumped to 1.8 seconds. Your engineering manager Marcus is asking for an immediate status report.',
        character: {
          id: 'marcus-techlead',
          name: 'Marcus Vance',
          role: 'Principal Backend Architect',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256&h=256',
          department: 'Core Infrastructure',
          bio: 'Data systems specialist. Demands metrics-driven investigation rather than speculative guessing.'
        },
        evaluationCriteria: [
          'Diagnostic Method (distributed trace analysis)',
          'Root Cause Isolation (index omission vs thread pool deadlock)',
          'Clear Incident Communication to Leadership',
          'Safe Rollback Execution'
        ],
        initialObjectives: [
          { id: 'gen-1', text: 'Inspect APM telemetry & trace spans', completed: false },
          { id: 'gen-2', text: 'Identify missing B-Tree composite index', completed: false },
          { id: 'gen-3', text: 'Execute zero-downtime hotfix or rollback', completed: false }
        ],
        initialSituationSummary: [
          'P0 Latency spike: 1,800ms median on /v1/payments/process.',
          'Release v3.8.1 was deployed 14 minutes ago.',
          'Marcus Vance is awaiting your diagnostic breakdown.'
        ],
        initialMessage: "Hey, APM alerts just paged us: our payment webhook latency jumped to 1.8 seconds right after release v3.8.1. Checkout drop-offs are climbing. What metrics are you pulling up first?"
      } : {
        id: `gen-${Date.now()}`,
        title: 'Executive Stakeholder Feature Conflict',
        category: 'Product',
        role: 'Associate Product Manager',
        difficulty: 'Intermediate',
        duration: '20–25 min',
        description: 'Two enterprise clients demand conflicting customization architectures on your platform 2 weeks before general release. Clarify requirements and reach an agreement.',
        situation: 'Acme Corp demands single-tenant private encryption, while Beta Global requires multi-tenant instant sync. Engineering can only deliver one architecture by Q4 cut-off.',
        character: {
          id: 'katherine-stakeholder',
          name: 'Katherine Hall',
          role: 'Head of Strategic Partnerships',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256&h=256',
          department: 'Executive Leadership',
          bio: 'Pragmatic executive partner who expects balanced trade-off matrices.'
        },
        evaluationCriteria: [
          'Stakeholder De-escalation',
          'Value-Driven Prioritization Matrix',
          'Clear Written Documentation'
        ],
        initialObjectives: [
          { id: 'gen-1', text: 'De-escalate client tension', completed: false },
          { id: 'gen-2', text: 'Formulate dual-phase roadmap proposal', completed: false }
        ],
        initialSituationSummary: [
          'Two enterprise accounts deadlocked over architectural approach.',
          'Engineering bandwidth locked at 40 developer-days.'
        ],
        initialMessage: "Both Acme and Beta Global are threatening to cancel their renewals if their specific architecture isn't the primary release next month. What is your proposed compromise?"
      };

      setGeneratedScenario(newScenario);
      setIsGenerating(false);
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-background text-text-main py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Title */}
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs text-text-dim mb-3">
            <Sparkles className="w-3.5 h-3.5 text-accent-purple" />
            AI Generator · Custom workplace scenario engine
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-text-main tracking-tight">
            Generate a Workplace Scenario
          </h1>
          <p className="text-sm text-text-muted mt-2">
            Paste any real Job Description from LinkedIn, Indeed, or company careers pages. WorkSim analyzes the required skills and automatically creates a realistic workplace incident for you to practice.
          </p>
        </div>

        {/* Input Box */}
        <div className="rounded-lg border border-surface-border bg-surface p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs text-text-dim">
              Target job description
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-text-dim">Quick sample:</span>
              <button
                onClick={() => setJobDescription(SAMPLE_JOB_DESCRIPTIONS[0].text)}
                className="text-xs text-primary hover:text-primary-light transition-colors cursor-pointer"
              >
                Backend Engineer
              </button>
              <span className="text-text-dim">·</span>
              <button
                onClick={() => setJobDescription(SAMPLE_JOB_DESCRIPTIONS[1].text)}
                className="text-xs text-primary hover:text-primary-light transition-colors cursor-pointer"
              >
                Product Manager
              </button>
            </div>
          </div>

          <textarea
            rows={8}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste complete job description requirements here..."
            className="w-full bg-surface-subtle border border-surface-border rounded-md p-4 text-xs text-text-main placeholder-text-dim focus:outline-none focus:border-primary-light transition-colors leading-relaxed"
          />

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !jobDescription.trim()}
            className="w-full py-3.5 rounded-md text-sm font-semibold text-background bg-primary hover:bg-primary-hover disabled:opacity-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            {isGenerating ? (
              <>
                <Cpu className="w-4 h-4 animate-spin" />
                <span>Analyzing JD & generating roleplay scenario...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Tailored Scenario</span>
              </>
            )}
          </button>
        </div>

        {/* GENERATED SCENARIO PREVIEW */}
        {generatedScenario && (
          <div className="rounded-lg border border-surface-border bg-surface p-6 sm:p-8 space-y-6 shadow-sm animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <span className="text-xs px-2.5 py-1 rounded bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20">
                Generated from job description
              </span>
              <span className="text-xs text-text-dim">
                Estimated: {generatedScenario.duration}
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-text-main mb-2">{generatedScenario.title}</h2>
              <p className="text-xs text-text-muted leading-relaxed">{generatedScenario.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-md bg-surface-subtle border border-surface-border">
                <span className="text-xs text-text-dim block mb-2">
                  Generated persona
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary-muted border border-surface-border flex items-center justify-center text-[11px] font-medium text-text-main shrink-0">
                    {generatedScenario.character.name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-text-main">{generatedScenario.character.name}</div>
                    <div className="text-[11px] text-text-dim">{generatedScenario.character.role}</div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-md bg-surface-subtle border border-surface-border">
                <span className="text-xs text-text-dim block mb-2">
                  Role evaluated
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-md bg-accent-purple/10 border border-accent-purple/30 flex items-center justify-center text-accent-purple">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-text-main">{generatedScenario.role}</div>
                    <div className="text-[11px] text-text-dim">{generatedScenario.category}</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <span className="text-xs text-text-dim block mb-2">
                Evaluated competencies
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {generatedScenario.evaluationCriteria.map((crit, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-text-muted bg-background p-2.5 rounded-md border border-surface-border">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent-emerald shrink-0" />
                    <span>{crit}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onStartGenerated(generatedScenario)}
              className="w-full py-3.5 px-4 rounded-md text-sm font-semibold text-background bg-primary hover:bg-primary-hover transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Launch Generated Simulation</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
