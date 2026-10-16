import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw, 
  Clock, 
  FileText, 
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Share2
} from 'lucide-react';
import { SimulationReport } from '../types';

interface SimulationCompleteProps {
  report: SimulationReport;
  onNavigate: (path: string) => void;
  onRetry: () => void;
}

export const SimulationComplete: React.FC<SimulationCompleteProps> = ({ report, onNavigate, onRetry }) => {
  const [activeTab, setActiveTab] = useState<'debrief' | 'transcript'>('debrief');
  const [highlightedTime, setHighlightedTime] = useState<string | null>(null);

  const getScoreColor = (score: number) => {
    if (score >= 8.5) return 'text-accent-emerald';
    if (score >= 7.0) return 'text-primary-light';
    if (score >= 5.5) return 'text-accent-amber';
    return 'text-accent-rose';
  };

  const getBarColor = (score: number) => {
    if (score >= 8.5) return 'bg-accent-emerald';
    if (score >= 7.0) return 'bg-primary';
    if (score >= 5.5) return 'bg-accent-amber';
    return 'bg-accent-rose';
  };

  const rubricScores = [
    { label: 'Problem Solving', score: report.scores.problemSolving },
    { label: 'Communication', score: report.scores.communication },
    { label: 'Technical Reasoning', score: report.scores.technicalReasoning },
    { label: 'Decision Making', score: report.scores.decisionMaking },
    { label: 'Proactiveness', score: report.scores.proactiveness },
  ];

  return (
    <div className="min-h-screen bg-background text-text-main py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* TOP COMPLETION BANNER */}
        <div className="rounded-lg border border-surface-border bg-surface p-8 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs text-accent-emerald font-medium mb-3">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Simulation complete
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-text-main tracking-tight">
                {report.scenarioTitle}
              </h1>
              <p className="text-sm text-text-muted mt-1.5 flex items-center gap-3">
                <span>Evaluator: {report.characterName}</span>
                <span className="text-surface-border">•</span>
                <span className="flex items-center gap-1 font-mono text-text-dim text-xs">
                  <Clock className="w-3.5 h-3.5" />
                  {report.durationMinutes} min session
                </span>
              </p>
            </div>

            {/* Overall Performance score badge */}
            <div className="bg-surface-subtle border border-surface-border rounded-lg p-5 text-center min-w-[180px]">
              <span className="text-xs text-text-dim block mb-1">
                Overall performance
              </span>
              <div className="font-serif text-4xl font-semibold tracking-tight text-text-main flex items-baseline justify-center gap-1">
                <span className={getScoreColor(report.overallScore)}>{report.overallScore}</span>
                <span className="text-lg text-text-dim font-normal">/ 10</span>
              </div>
              <div className="text-[11px] text-text-dim mt-1">
                Evidence-Anchored Rubric
              </div>
            </div>
          </div>

          {/* Decision Path Summary */}
          <div className="mt-6 pt-6 border-t border-surface-border flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-text-muted">
              <span className="text-text-dim">Decision path taken: </span>
              <span className="text-text-main font-medium">{report.decisionPathSummary}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onRetry}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md text-xs font-medium text-text-main bg-surface-subtle border border-surface-border hover:bg-surface-hover transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Retry Scenario
              </button>
              <button
                onClick={() => onNavigate('/progress')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-semibold text-background bg-primary hover:bg-primary-hover shadow-sm transition-colors"
              >
                View My Progress
              </button>
            </div>
          </div>
        </div>

        {/* TABS: DEBRIEF vs CONVERSATION TRANSCRIPT */}
        <div className="flex items-center space-x-2 border-b border-surface-border pb-1">
          <button
            onClick={() => setActiveTab('debrief')}
            className={`px-4 py-2.5 rounded-md text-sm font-semibold transition-colors flex items-center gap-2 ${
              activeTab === 'debrief'
                ? 'bg-surface text-text-main border border-surface-border'
                : 'text-text-muted hover:text-text-main'
            }`}
          >
            <Award className="w-4 h-4 text-primary" />
            Evidence-Based Rubric
          </button>

          <button
            onClick={() => setActiveTab('transcript')}
            className={`px-4 py-2.5 rounded-md text-sm font-semibold transition-colors flex items-center gap-2 ${
              activeTab === 'transcript'
                ? 'bg-surface text-text-main border border-surface-border'
                : 'text-text-muted hover:text-text-main'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-text-dim" />
            Conversation Transcript ({report.transcript.length} turns)
          </button>
        </div>

        {/* TAB 1: EVIDENCE-BASED RUBRIC & DEBRIEF */}
        {activeTab === 'debrief' && (
          <div className="space-y-8">
            
            {/* HORIZONTAL RUBRIC PROGRESS BARS */}
            <div className="rounded-lg border border-surface-border bg-surface p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-text-main">Core Competency Breakdown</h2>
                <span className="text-xs font-mono text-text-dim">Standardized Rubric Scale: 0–10</span>
              </div>

              <div className="space-y-5">
                {rubricScores.map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-medium text-text-main">{item.label}</span>
                      <span className={`font-mono font-bold ${getScoreColor(item.score)}`}>
                        {item.score.toFixed(1)} / 10
                      </span>
                    </div>
                    <div className="w-full bg-surface-subtle h-2.5 rounded-full overflow-hidden border border-surface-border/40">
                      <div 
                        className={`h-full rounded-full transition-all duration-700 ${getBarColor(item.score)}`} 
                        style={{ width: `${item.score * 10}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DETAILED EVIDENCE CARDS (Grounded in Conversation) */}
            <div className="rounded-lg border border-surface-border bg-surface p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-text-main">Specific Session Evidence</h2>
                  <p className="text-xs text-text-muted mt-0.5">
                    Every score is supported by timestamped actions from your actual conversation.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-primary-light">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified quotations
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {report.rubricDetails.map((point, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-lg border border-surface-border bg-surface-subtle flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-text-main">
                          {point.category}
                        </span>
                        <span className={`text-xs font-mono font-bold ${getScoreColor(point.score)}`}>
                          {point.score.toFixed(1)} / 10
                        </span>
                      </div>

                      <div className="text-xs text-text-muted leading-relaxed">
                        <span className="font-semibold text-text-main">Evidence: </span>
                        “{point.evidence}”
                      </div>
                    </div>

                    {point.evidenceTimestamp && (
                      <div className="pt-2 border-t border-surface-border flex items-center justify-between text-[11px] font-mono text-text-dim">
                        <span>Timestamp: {point.evidenceTimestamp}</span>
                        <button
                          onClick={() => {
                            setActiveTab('transcript');
                            setHighlightedTime(point.evidenceTimestamp!);
                          }}
                          className="text-primary hover:text-primary-light transition-colors"
                        >
                          View in Transcript
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* STRENGTHS & AREAS TO IMPROVE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Strengths */}
              <div className="rounded-lg border border-surface-border bg-surface p-6 sm:p-7 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-accent-emerald/10 border border-accent-emerald/30 flex items-center justify-center text-accent-emerald">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-text-main">Demonstrated Strengths</h3>
                </div>

                <ul className="space-y-3">
                  {report.strengths.map((str, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-text-muted leading-relaxed">
                      <span className="text-accent-emerald font-bold shrink-0">✓</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Areas to improve */}
              <div className="rounded-lg border border-surface-border bg-surface p-6 sm:p-7 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-accent-amber/10 border border-accent-amber/30 flex items-center justify-center text-accent-amber">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-text-main">Areas to Improve</h3>
                </div>

                <ul className="space-y-3">
                  {report.areasToImprove.map((area, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-text-muted leading-relaxed">
                      <span className="text-accent-amber font-bold shrink-0">⚠</span>
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* NEXT ATTEMPT STRATEGY CARD */}
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <span className="text-xs text-primary font-semibold block mb-1">
                  Next attempt strategy
                </span>
                <p className="text-sm text-text-main max-w-2xl leading-relaxed">
                  “{report.nextAttemptAdvice}”
                </p>
              </div>

              <button
                onClick={() => onNavigate('/scenarios')}
                className="shrink-0 px-5 py-3 rounded-md text-xs font-semibold text-background bg-primary hover:bg-primary-hover shadow-sm transition-all flex items-center gap-2"
              >
                <span>Practice Recommended Scenario</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* TAB 2: FULL CONVERSATION TRANSCRIPT WITH TIMESTAMPS */}
        {activeTab === 'transcript' && (
          <div className="rounded-lg border border-surface-border bg-surface p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-surface-border pb-4">
              <div>
                <h2 className="text-lg font-semibold text-text-main">Full Session Transcript</h2>
                <p className="text-xs text-text-muted mt-0.5">
                  Complete chronological dialogue between you and {report.characterName}.
                </p>
              </div>
              <span className="text-xs font-mono text-text-dim">
                Scenario ID: {report.scenarioId}
              </span>
            </div>

            <div className="space-y-4">
              {report.transcript.map((msg, idx) => {
                const isUser = msg.sender === 'user';
                const isHighlighted = highlightedTime && msg.timestamp.includes(highlightedTime);

                return (
                  <div 
                    key={idx}
                    className={`p-4 rounded-lg border transition-all ${
                      isHighlighted 
                        ? 'border-primary bg-primary/10 ring-1 ring-primary' 
                        : 'border-surface-border bg-surface-subtle/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold ${isUser ? 'text-primary-light' : 'text-text-main'}`}>
                          {msg.senderName}
                        </span>
                        {msg.metadata?.decisionTag && (
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-background text-text-dim border border-surface-border">
                            {msg.metadata.decisionTag}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono text-text-dim">{msg.timestamp}</span>
                    </div>

                    <p className="text-xs text-text-main leading-relaxed whitespace-pre-line">
                      {msg.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
