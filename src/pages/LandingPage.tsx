import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Terminal, 
  Users, 
  GitFork, 
  Award, 
  ChevronRight, 
  Shield, 
  Play, 
  Sparkles, 
  Briefcase,
  AlertTriangle,
  Radio,
  Send,
  Mic,
  MicOff,
  Cpu,
  Layers,
  Flame,
  Check,
  TrendingUp,
  FileText,
  Clock,
  ArrowDown
} from 'lucide-react';
import { SCENARIOS } from '../data/scenarios';
import { Workplace3DCanvas } from '../components/Workplace3DCanvas';
import { StickyBoardSection } from '../components/StickyBoardSection';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  // Parallax mouse tracker
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHoveredPreview, setIsHoveredPreview] = useState(false);

  // Interactive Live Demo Preview State
  const [demoInput, setDemoInput] = useState('');
  const [isDemoSpeaking, setIsDemoSpeaking] = useState(false);
  const [demoStatus, setDemoStatus] = useState<'idle' | 'evaluating' | 'replied'>('idle');
  const [demoMessages, setDemoMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: "Production is down and users cannot log in. What will you do first?",
      time: "10:01 AM"
    }
  ]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleDemoSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const textToSend = demoInput.trim() || "I'll immediately check server APM telemetry and connection pools.";
    
    // Add user message
    setDemoMessages(prev => [
      ...prev,
      { sender: 'user', text: textToSend, time: '10:02 AM' }
    ]);
    setDemoInput('');
    setDemoStatus('evaluating');

    // Simulated AI reaction
    setTimeout(() => {
      const lower = textToSend.toLowerCase();
      let aiReply = "Good call. You pull up telemetry and discover PostgreSQL connection pool exhaustion (300/300 active connections). What is your next mitigation?";
      if (lower.includes('restart') || lower.includes('reboot')) {
        aiReply = "The server returns briefly, but 5 minutes later active sessions drop again. What root cause will you investigate now?";
      } else if (lower.includes('deploy') || lower.includes('release')) {
        aiReply = "Checking the deployment log shows commit v2.14.0 introduced unindexed analytics queries. How do you mitigate this?";
      }

      setDemoMessages(prev => [
        ...prev,
        { sender: 'ai', text: aiReply, time: '10:02 AM' }
      ]);
      setDemoStatus('replied');
    }, 1100);
  };

  const handleDemoVoice = () => {
    setIsDemoSpeaking(prev => !prev);
    if (!isDemoSpeaking) {
      setDemoInput("I will review active pg_stat_activity queries and isolate the table locks.");
    }
  };

  // Parallax offsets
  const shiftX = (mousePos.x - 0.5) * 16;
  const shiftY = (mousePos.y - 0.5) * 14;

  return (
    <div className="flex flex-col min-h-screen bg-background text-text-main overflow-x-hidden">
      
      {/* ======================================================== */}
      {/* 1. HERO SECTION WITH CINEMATIC 3D WORKPLACE ENVIRONMENT */}
      {/* ======================================================== */}
      <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 overflow-hidden border-b border-surface-border">
        
        {/* Background matte painting */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none transition-transform duration-1000 ease-out"
          style={{
            transform: `translate3d(${-shiftX * 0.35}px, ${-shiftY * 0.35}px, 0) scale(1.03)`
          }}
        >
          <img 
            src="/images/workspace_cinematic.jpg" 
            alt="Cinematic professional workplace environment"
            className="w-full h-full object-cover object-right md:object-[75%_center] opacity-40 mix-blend-luminosity filter contrast-125 brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D11] via-[#0B0D11]/92 to-[#0B0D11]/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D11] via-transparent to-[#0B0D11]/80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(99,102,241,0.12),transparent_60%)]" />
        </div>

        {/* Three.js 3D Workplace Canvas */}
        <div className="hidden md:block">
          <Workplace3DCanvas mouseX={mousePos.x} mouseY={mousePos.y} />
        </div>

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto pt-4 sm:pt-8">
            
            {/* Direct, clean product headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.14]">
              Practice real work <br />
              before your{' '}
              <span className="text-slate-100 underline decoration-primary decoration-2 underline-offset-8">
                first job.
              </span>
            </h1>

            {/* Subheading with breathing room */}
            <p className="text-lg sm:text-xl text-neutral-300 leading-relaxed mb-9 max-w-2xl mx-auto font-normal">
              Step into realistic workplace situations with managers, clients, and teammates. Make decisions, handle pressure, and get evidence-backed feedback on what you actually say.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
              <button 
                onClick={() => onNavigate('/scenarios')}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-lg text-sm font-semibold text-white bg-primary hover:bg-primary-hover shadow-lg transition-colors cursor-pointer"
              >
                <span>Start Practising →</span>
              </button>

              <button 
                onClick={() => onNavigate('/demo')}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-lg text-sm font-semibold text-text-main bg-surface border border-surface-border hover:bg-surface-subtle transition-colors cursor-pointer"
              >
                <Play className="w-4 h-4 mr-2 text-primary" />
                <span>Watch a Simulation</span>
              </button>
            </div>

            {/* Clean value points */}
            <div className="text-xs text-text-dim flex items-center justify-center gap-2.5">
              <span>Real situations</span>
              <span className="text-surface-border">•</span>
              <span>Dynamic responses</span>
              <span className="text-surface-border">•</span>
              <span>Evidence-based feedback</span>
            </div>

          </div>

          {/* REALISTIC WORKPLACE SOFTWARE APPLICATION WINDOW */}
          <div className="mt-14 md:mt-18 max-w-5xl mx-auto relative">
            
            <div className="rounded-lg border border-surface-border bg-surface shadow-2xl overflow-hidden">
              
              {/* Application Top Bar - resembles modern engineering workspace tooling */}
              <div className="h-11 bg-[#0E1117] border-b border-surface-border px-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-surface-border"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-surface-border"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-surface-border"></div>
                  </div>
                  <span className="h-4 w-px bg-surface-border mx-1"></span>
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <span className="font-semibold text-white">WorkSim</span>
                    <span className="text-text-dim">/</span>
                    <span>Scenario: Production Incident</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Live</span>
                </div>
              </div>

              {/* Application Body */}
              <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-surface-border bg-[#0B0D11]">
                
                {/* Left: Communication Stream */}
                <div className="lg:col-span-8 p-6 space-y-5">
                  
                  {/* Priya Sharma message */}
                  <div className="flex items-start gap-3.5">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256&h=256" 
                      alt="Priya Sharma" 
                      className="w-8 h-8 rounded-full border border-surface-border object-cover shrink-0 mt-0.5" 
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-xs font-semibold text-white">Priya Sharma</span>
                        <span className="text-[11px] text-text-dim">Engineering Manager</span>
                        <span className="text-[10px] text-text-dim font-mono ml-auto">10:01</span>
                      </div>
                      <div className="bg-surface border border-surface-border/80 rounded-md p-3.5 text-xs sm:text-sm text-text-main leading-relaxed">
                        “Production is down and users can't log in. What will you do first?”
                      </div>
                    </div>
                  </div>

                  {/* Candidate message */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary-light font-semibold text-xs shrink-0 mt-0.5">
                      You
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-xs font-semibold text-white">You</span>
                        <span className="text-[11px] text-text-dim">Candidate</span>
                        <span className="text-[10px] text-text-dim font-mono ml-auto">10:02</span>
                      </div>
                      <div className="bg-surface-subtle border border-surface-border/80 rounded-md p-3.5 text-xs sm:text-sm text-text-main leading-relaxed">
                        “I'll first inspect the cluster telemetry and APM logs to isolate whether this is gateway timeout, memory exhaustion, or database connection saturation.”
                      </div>
                    </div>
                  </div>

                  {/* Priya Sharma reaction */}
                  <div className="flex items-start gap-3.5">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256&h=256" 
                      alt="Priya Sharma" 
                      className="w-8 h-8 rounded-full border border-surface-border object-cover shrink-0 mt-0.5" 
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-xs font-semibold text-white">Priya Sharma</span>
                        <span className="text-[11px] text-text-dim">Engineering Manager</span>
                        <span className="text-[10px] text-text-dim font-mono ml-auto">10:02</span>
                      </div>
                      <div className="bg-surface border border-surface-border/80 rounded-md p-3.5 text-xs sm:text-sm text-text-main leading-relaxed">
                        “Good. The logs show PostgreSQL connection pool exhaustion (300/300 connections). How would you mitigate this right now?”
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right: Operational Context Sidebar */}
                <div className="lg:col-span-4 p-5 space-y-5 bg-[#0E1118]/80 text-xs">
                  
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-text-dim font-medium mb-2">
                      Incident Status
                    </div>
                    <div className="bg-surface rounded-md p-3 border border-surface-border space-y-1.5">
                      <div className="flex items-center gap-2 text-rose-400 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                        Production 504 errors
                      </div>
                      <div className="text-[11px] text-text-dim">Users blocked on login authentication</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="bg-surface p-2.5 rounded-md border border-surface-border">
                      <div className="text-text-dim uppercase tracking-wider text-[10px]">Severity</div>
                      <div className="font-semibold text-rose-400 mt-0.5">P0 — High</div>
                    </div>
                    <div className="bg-surface p-2.5 rounded-md border border-surface-border">
                      <div className="text-text-dim uppercase tracking-wider text-[10px]">Time Elapsed</div>
                      <div className="font-mono text-neutral-300 mt-0.5">10:02</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-text-dim font-medium mb-2">
                      Telemetry Note
                    </div>
                    <div className="bg-surface p-3 rounded-md border border-amber-500/20 text-neutral-300 text-[11px] leading-relaxed">
                      Active sessions pinned by unindexed analytics queries in release v2.14.0.
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-text-dim font-medium mb-2">
                      Evaluation Criteria
                    </div>
                    <div className="space-y-1.5 text-[11px] text-text-muted">
                      <div className="flex justify-between">
                        <span>Root Cause Isolation</span>
                        <span className="text-emerald-400 font-mono">Verified</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Incident Communication</span>
                        <span className="text-neutral-300 font-mono">In Progress</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. BEHIND THE IDEA / KEY FEATURES STICKY NOTE BOARD */}
      {/* ======================================================== */}
      <StickyBoardSection onNavigate={onNavigate} />

      {/* ======================================================== */}
      {/* 3. PRODUCT WORKFLOW (Horizontal Flow) */}
      {/* ======================================================== */}
      <section className="py-20 border-b border-surface-border bg-surface/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-wider text-text-dim font-medium">How It Functions</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight mt-1 mb-3">
              Not another chatbot. An actual workplace simulation.
            </h2>
            <p className="text-base text-text-muted">
              WorkSim puts you inside the situation with decisions and consequences.
            </p>
          </div>

          {/* Horizontal Product Workflow Visual */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5 relative">
            
            {/* Step 1 */}
            <div className="p-5 rounded-lg border border-surface-border bg-surface flex flex-col justify-between space-y-4 hover:border-surface-border/90 transition-colors">
              <div>
                <div className="text-xs text-text-dim font-medium mb-1">Step 01</div>
                <div className="text-base font-semibold text-white">Select Situation</div>
                <p className="text-xs text-text-muted mt-2 leading-relaxed">
                  Choose a high-stakes production incident, demanding client request, or team code review.
                </p>
              </div>
              <div className="pt-3 border-t border-surface-border/60 text-[11px] text-text-dim flex items-center justify-between">
                <span>Context Brief</span>
                <ChevronRight className="w-3.5 h-3.5 text-text-dim" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-lg border border-surface-border bg-surface flex flex-col justify-between space-y-4 hover:border-surface-border/90 transition-colors">
              <div>
                <div className="text-xs text-text-dim font-medium mb-1">Step 02</div>
                <div className="text-base font-semibold text-white">Live Conversation</div>
                <p className="text-xs text-text-muted mt-2 leading-relaxed">
                  Engage with an Engineering Manager, Client, or Senior Colleague under real workplace pressure.
                </p>
              </div>
              <div className="pt-3 border-t border-surface-border/60 text-[11px] text-text-dim flex items-center justify-between">
                <span>Voice or Text</span>
                <ChevronRight className="w-3.5 h-3.5 text-text-dim" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-lg border border-surface-border bg-surface flex flex-col justify-between space-y-4 hover:border-surface-border/90 transition-colors">
              <div>
                <div className="text-xs text-text-dim font-medium mb-1">Step 03</div>
                <div className="text-base font-semibold text-white">Your Decisions</div>
                <p className="text-xs text-text-muted mt-2 leading-relaxed">
                  Decisions yield actual consequences: hasty reboots fail again; sound diagnostics isolate root cause.
                </p>
              </div>
              <div className="pt-3 border-t border-surface-border/60 text-[11px] text-text-dim flex items-center justify-between">
                <span>Dynamic Reaction</span>
                <ChevronRight className="w-3.5 h-3.5 text-text-dim" />
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-5 rounded-lg border border-surface-border bg-surface flex flex-col justify-between space-y-4 hover:border-surface-border/90 transition-colors">
              <div>
                <div className="text-xs text-text-dim font-medium mb-1">Step 04</div>
                <div className="text-base font-semibold text-white">Evidence-Based Debrief</div>
                <p className="text-xs text-text-muted mt-2 leading-relaxed">
                  Every evaluation score links back to specific moments and quotes from what you said.
                </p>
              </div>
              <div className="pt-3 border-t border-surface-border/60 text-[11px] text-text-dim flex items-center justify-between">
                <span>Transcript Quotes</span>
                <ChevronRight className="w-3.5 h-3.5 text-text-dim" />
              </div>
            </div>

            {/* Step 5 */}
            <div className="p-5 rounded-lg border border-primary/30 bg-surface flex flex-col justify-between space-y-4">
              <div>
                <div className="text-xs text-primary-light font-medium mb-1">Step 05</div>
                <div className="text-base font-semibold text-white">Skill Improvement</div>
                <p className="text-xs text-text-muted mt-2 leading-relaxed">
                  See how your communication, ownership, and decision-making improve over multiple attempts.
                </p>
              </div>
              <div className="pt-3 border-t border-primary/20 text-[11px] text-emerald-400 flex items-center justify-between">
                <span>Progress Tracking</span>
                <Check className="w-3.5 h-3.5" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. REAL SITUATIONS (Catalog Preview) */}
      {/* ======================================================== */}
      <section className="py-24 border-b border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div>
              <span className="text-xs uppercase tracking-wider text-text-dim font-medium">Scenario Library</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mt-1">Real situations. Real workplace pressure.</h2>
              <p className="text-sm text-text-muted mt-2">Practice what the first week on the job actually feels like.</p>
            </div>
            <button 
              onClick={() => onNavigate('/scenarios')}
              className="mt-4 md:mt-0 text-sm font-medium text-primary-light hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              Explore all 6 scenarios
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* 1. Production Incident */}
            <div className="p-6 rounded-lg border border-surface-border bg-surface flex flex-col justify-between hover:border-surface-border/90 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3 text-xs text-text-muted">
                  <span>Priya Sharma • Engineering Manager</span>
                  <span className="text-amber-400 font-mono text-[11px]">Intermediate</span>
                </div>
                <h3 className="text-base font-semibold text-white mb-1">
                  Production Incident
                </h3>
                <div className="text-xs text-text-dim mb-3">Focus: Crisis mitigation + decision making</div>
                <div className="p-3 bg-surface-subtle rounded-md border border-surface-border/60 text-xs text-text-main italic mb-4">
                  “Production is down and users cannot log in. What do you check first?”
                </div>
              </div>
              <button 
                onClick={() => onNavigate('/scenarios/prod-incident')}
                className="w-full py-2.5 px-3 rounded-md text-xs font-medium text-white bg-surface-subtle border border-surface-border hover:bg-surface-hover hover:border-surface-border/90 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Practice Incident</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 2. Difficult Client */}
            <div className="p-6 rounded-lg border border-surface-border bg-surface flex flex-col justify-between hover:border-surface-border/90 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3 text-xs text-text-muted">
                  <span>Sarah Jenkins • Client Stakeholder</span>
                  <span className="text-amber-400 font-mono text-[11px]">Intermediate</span>
                </div>
                <h3 className="text-base font-semibold text-white mb-1">
                  Difficult Client
                </h3>
                <div className="text-xs text-text-dim mb-3">Focus: Communication + expectation management</div>
                <div className="p-3 bg-surface-subtle rounded-md border border-surface-border/60 text-xs text-text-main italic mb-4">
                  “The delivery is late. Walk me through what happened.”
                </div>
              </div>
              <button 
                onClick={() => onNavigate('/scenarios/client-scope')}
                className="w-full py-2.5 px-3 rounded-md text-xs font-medium text-white bg-surface-subtle border border-surface-border hover:bg-surface-hover hover:border-surface-border/90 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Practice Negotiation</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 3. Code Review */}
            <div className="p-6 rounded-lg border border-surface-border bg-surface flex flex-col justify-between hover:border-surface-border/90 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3 text-xs text-text-muted">
                  <span>David Kim • Staff Engineer</span>
                  <span className="text-emerald-400 font-mono text-[11px]">Foundational</span>
                </div>
                <h3 className="text-base font-semibold text-white mb-1">
                  Code Review
                </h3>
                <div className="text-xs text-text-dim mb-3">Focus: Technical reasoning + receiving feedback</div>
                <div className="p-3 bg-surface-subtle rounded-md border border-surface-border/60 text-xs text-text-main italic mb-4">
                  “Your reviewer strongly disagrees with your architectural approach.”
                </div>
              </div>
              <button 
                onClick={() => onNavigate('/scenarios/code-review')}
                className="w-full py-2.5 px-3 rounded-md text-xs font-medium text-white bg-surface-subtle border border-surface-border hover:bg-surface-hover hover:border-surface-border/90 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Practice Code Review</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 4. Team Conflict */}
            <div className="p-6 rounded-lg border border-surface-border bg-surface flex flex-col justify-between hover:border-surface-border/90 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3 text-xs text-text-muted">
                  <span>Marcus Chen • Teammate</span>
                  <span className="text-amber-400 font-mono text-[11px]">Intermediate</span>
                </div>
                <h3 className="text-base font-semibold text-white mb-1">
                  Team Conflict
                </h3>
                <div className="text-xs text-text-dim mb-3">Focus: Collaboration + conflict resolution</div>
                <div className="p-3 bg-surface-subtle rounded-md border border-surface-border/60 text-xs text-text-main italic mb-4">
                  “Your teammate thinks your architectural choice caused the delay.”
                </div>
              </div>
              <button 
                onClick={() => onNavigate('/scenarios/team-conflict')}
                className="w-full py-2.5 px-3 rounded-md text-xs font-medium text-white bg-surface-subtle border border-surface-border hover:bg-surface-hover hover:border-surface-border/90 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Practice De-escalation</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 5. Deadline Pressure */}
            <div className="p-6 rounded-lg border border-surface-border bg-surface flex flex-col justify-between hover:border-surface-border/90 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3 text-xs text-text-muted">
                  <span>Alex Rivera • VP Engineering</span>
                  <span className="text-amber-400 font-mono text-[11px]">Intermediate</span>
                </div>
                <h3 className="text-base font-semibold text-white mb-1">
                  Deadline Pressure
                </h3>
                <div className="text-xs text-text-dim mb-3">Focus: Prioritization + accountability</div>
                <div className="p-3 bg-surface-subtle rounded-md border border-surface-border/60 text-xs text-text-main italic mb-4">
                  “We have 60 engineer-days left. Cut scope or push the milestone date?”
                </div>
              </div>
              <button 
                onClick={() => onNavigate('/scenarios/feature-prioritization')}
                className="w-full py-2.5 px-3 rounded-md text-xs font-medium text-white bg-surface-subtle border border-surface-border hover:bg-surface-hover hover:border-surface-border/90 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Practice Prioritization</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 6. Stakeholder Meeting */}
            <div className="p-6 rounded-lg border border-surface-border bg-surface flex flex-col justify-between hover:border-surface-border/90 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3 text-xs text-text-muted">
                  <span>Elena Rostova • Head of Operations</span>
                  <span className="text-emerald-400 font-mono text-[11px]">Foundational</span>
                </div>
                <h3 className="text-base font-semibold text-white mb-1">
                  Stakeholder Meeting
                </h3>
                <div className="text-xs text-text-dim mb-3">Focus: Professional communication</div>
                <div className="p-3 bg-surface-subtle rounded-md border border-surface-border/60 text-xs text-text-main italic mb-4">
                  “Deliver the news that third-party latency is slipping the release.”
                </div>
              </div>
              <button 
                onClick={() => onNavigate('/scenarios/project-status-update')}
                className="w-full py-2.5 px-3 rounded-md text-xs font-medium text-white bg-surface-subtle border border-surface-border hover:bg-surface-hover hover:border-surface-border/90 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Practice Status Update</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. PRODUCT CAPABILITIES (Editorial Layout) */}
      {/* ======================================================== */}
      <section className="py-24 border-b border-surface-border bg-surface/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-16">
            <span className="text-xs uppercase tracking-wider text-text-dim font-medium">Simulation System</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight mt-1 mb-3">
              How WorkSim runs each scenario
            </h2>
            <p className="text-base text-text-muted">
              Designed around how real workplace decisions, conversations, and trade-offs happen.
            </p>
          </div>

          <div className="space-y-12">
            
            {/* 01 — Dynamic Conversations */}
            <div className="border-t border-surface-border pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-4 space-y-2">
                <span className="text-xs text-text-dim font-mono">01</span>
                <h3 className="text-xl font-semibold text-white">The situation changes based on what you say.</h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  The person you're speaking with reacts to your exact words. If you guess, they push for technical details. If you make excuses, they ask for a plan.
                </p>
              </div>
              
              <div className="lg:col-span-8 bg-[#0E1118] border border-surface-border rounded-lg p-5 space-y-3 text-xs">
                <div className="p-3 bg-surface rounded border border-surface-border space-y-1">
                  <div className="text-text-dim text-[11px]">When you say:</div>
                  <div className="text-white">“We can probably finish tomorrow.”</div>
                </div>
                <div className="flex items-center gap-2 pl-3 text-text-dim text-[11px]">
                  <ArrowDown className="w-3.5 h-3.5 text-primary" />
                  <span>The Engineering Manager pushes back:</span>
                </div>
                <div className="p-3 bg-surface-subtle border border-surface-border rounded text-text-main">
                  “Probably isn't a date. What exactly is blocking you from confirming the milestone?”
                </div>
              </div>
            </div>

            {/* 02 — Evidence-Based Feedback */}
            <div className="border-t border-surface-border pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-4 space-y-2">
                <span className="text-xs text-text-dim font-mono">02</span>
                <h3 className="text-xl font-semibold text-white">Every evaluation points back to something you actually said.</h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  No generic advice. Every score references exact moments from your conversation transcript, highlighting both effective choices and areas to improve.
                </p>
              </div>

              <div className="lg:col-span-8 bg-[#0E1118] border border-surface-border rounded-lg p-5 space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-surface-border pb-3">
                  <span className="text-xs text-white font-medium">Communication Rubric</span>
                  <span className="text-xs font-mono font-semibold text-emerald-400">
                    8.2 / 10
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="text-text-muted">
                    <span className="text-emerald-400 font-medium">Observed: </span>
                    “You clearly explained the database connection pool bottleneck before proposing a service restart.”
                  </div>
                  <div className="text-text-muted">
                    <span className="text-amber-400 font-medium">To improve: </span>
                    “You escalated the blocked customer logins only after your manager asked twice.”
                  </div>
                </div>
              </div>
            </div>

            {/* 03 — Voice Roleplay */}
            <div className="border-t border-surface-border pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-4 space-y-2">
                <span className="text-xs text-text-dim font-mono">03</span>
                <h3 className="text-xl font-semibold text-white">Talk naturally. Handle the conversation like you would in a real meeting.</h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  Switch between spoken conversation and text chat. Practice responding calmly when stakeholders interrupt or demand immediate clarity.
                </p>
              </div>

              <div className="lg:col-span-8 bg-[#0E1118] border border-surface-border rounded-lg p-5 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface border border-surface-border flex items-center justify-center text-primary-light">
                    <Mic className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-medium text-white">Spoken Response Active</div>
                    <div className="text-[11px] text-text-dim">Voice activity detection enabled</div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 h-8 px-4 bg-surface rounded border border-surface-border">
                  {[30, 65, 40, 85, 55, 35, 75, 90, 50, 65, 40, 55].map((h, i) => (
                    <div 
                      key={i} 
                      className="w-1 rounded-full bg-neutral-400" 
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>

                <div className="text-text-dim text-[11px]">
                  Natural turn-taking
                </div>
              </div>
            </div>

            {/* 04 — Job Description Custom Scenario */}
            <div className="border-t border-surface-border pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-4 space-y-2">
                <span className="text-xs text-text-dim font-mono">04</span>
                <h3 className="text-xl font-semibold text-white">Generate scenarios tailored to real job descriptions.</h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  Paste a job listing from LinkedIn or an application portal. WorkSim builds custom scenarios around the exact responsibilities of the role.
                </p>
              </div>

              <div className="lg:col-span-8 bg-[#0E1118] border border-surface-border rounded-lg p-5">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-3 bg-surface border border-surface-border rounded">
                    <div className="text-text-dim text-[10px]">Step 1</div>
                    <div className="text-white font-medium mt-1">Paste Job Description</div>
                  </div>
                  <div className="p-3 bg-surface border border-surface-border rounded">
                    <div className="text-text-dim text-[10px]">Step 2</div>
                    <div className="text-white font-medium mt-1">Key Responsibilities</div>
                  </div>
                  <div className="p-3 bg-surface border border-surface-border rounded">
                    <div className="text-text-dim text-[10px]">Step 3</div>
                    <div className="text-white font-medium mt-1">Custom Scenario</div>
                  </div>
                  <div className="p-3 bg-surface-subtle border border-surface-border rounded">
                    <div className="text-text-dim text-[10px]">Step 4</div>
                    <div className="text-white font-medium mt-1">Start Practice</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 05 — Progress Over Time */}
            <div className="border-t border-surface-border pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-4 space-y-2">
                <span className="text-xs text-text-dim font-mono">05</span>
                <h3 className="text-xl font-semibold text-white">See how your workplace skills improve over attempts.</h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  Track concrete metrics across communication, problem solving, ownership, and composure as you practice repeated attempts.
                </p>
              </div>

              <div className="lg:col-span-8 bg-[#0E1118] border border-surface-border rounded-lg p-5 space-y-4">
                <div className="grid grid-cols-3 gap-3 text-center text-xs">
                  <div className="p-3 bg-surface border border-surface-border rounded">
                    <span className="text-[11px] text-text-dim block mb-1">Attempt 01</span>
                    <span className="text-base font-semibold font-mono text-neutral-400">6.2 / 10</span>
                  </div>
                  <div className="p-3 bg-surface border border-surface-border rounded">
                    <span className="text-[11px] text-text-dim block mb-1">Attempt 02</span>
                    <span className="text-base font-semibold font-mono text-neutral-300">7.1 / 10</span>
                  </div>
                  <div className="p-3 bg-surface border border-surface-border rounded">
                    <span className="text-[11px] text-text-dim block mb-1">Attempt 03</span>
                    <span className="text-base font-semibold font-mono text-emerald-400">8.4 / 10</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-surface-border/60 text-xs text-text-muted">
                  <span className="text-emerald-400 font-mono">Communication: +1.6</span>
                  <span className="text-emerald-400 font-mono">Ownership: +1.8</span>
                  <span className="text-emerald-400 font-mono">Decision Making: +1.2</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. INTERACTIVE SIMULATION PREVIEW */}
      {/* ======================================================== */}
      <section className="py-24 border-b border-surface-border relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-wider text-text-dim font-medium">Interactive Demo</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight mt-1 mb-3">
              Try a response right now
            </h2>
            <p className="text-sm text-text-muted">
              Type or speak a response below to see how Priya reacts to your decisions.
            </p>
          </div>

          <div className="max-w-5xl mx-auto rounded-lg border border-surface-border bg-surface shadow-2xl overflow-hidden">
            
            {/* Simulation Header */}
            <div className="h-12 bg-[#0E1117] border-b border-surface-border px-5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256&h=256" 
                  alt="Priya Sharma" 
                  className="w-7 h-7 rounded-full border border-surface-border object-cover" 
                />
                <div>
                  <div className="text-xs font-semibold text-white">Priya Sharma <span className="font-normal text-text-dim">• Engineering Manager</span></div>
                </div>
              </div>

              <div className="text-xs text-text-dim">
                Elapsed: <span className="font-mono text-neutral-300">00:14</span>
              </div>
            </div>

            {/* Split Screen */}
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-surface-border bg-[#0B0D11]">
              
              {/* Left Chat */}
              <div className="lg:col-span-8 p-6 flex flex-col justify-between min-h-[380px] space-y-4">
                
                <div className="space-y-4 overflow-y-auto max-h-[260px] pr-2">
                  {demoMessages.map((msg, i) => (
                    <div 
                      key={i}
                      className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div className="text-[11px] text-text-dim mb-1">
                        {msg.sender === 'user' ? 'You' : 'Priya Sharma'} • {msg.time}
                      </div>
                      <div className={`p-3.5 rounded-md text-xs sm:text-sm leading-relaxed max-w-lg ${
                        msg.sender === 'user'
                          ? 'bg-surface-subtle border border-surface-border text-white'
                          : 'bg-surface border border-surface-border/80 text-text-main'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {demoStatus === 'evaluating' && (
                    <div className="text-xs text-text-dim flex items-center gap-2 pt-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      <span>Evaluating your response...</span>
                    </div>
                  )}
                </div>

                {/* Input form */}
                <form onSubmit={handleDemoSend} className="space-y-3 pt-4 border-t border-surface-border/60">
                  <div className="relative">
                    <input 
                      type="text"
                      value={demoInput}
                      onChange={(e) => setDemoInput(e.target.value)}
                      placeholder="Type your response... (e.g. 'I will check server logs to isolate root cause')"
                      className="w-full bg-[#0E1117] border border-surface-border rounded-md pl-4 pr-12 py-3 text-xs text-white placeholder-text-dim focus:outline-none focus:border-neutral-500 transition-colors"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleDemoVoice}
                      className={`px-3 py-1.5 rounded-md border text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                        isDemoSpeaking ? 'bg-primary/20 border-primary/40 text-primary-light' : 'bg-surface border-surface-border text-text-muted hover:text-white'
                      }`}
                    >
                      <Mic className="w-3.5 h-3.5" />
                      <span>{isDemoSpeaking ? 'Listening...' : 'Speak'}</span>
                    </button>

                    <button
                      type="submit"
                      disabled={demoStatus === 'evaluating'}
                      className="px-4 py-2 rounded-md text-xs font-medium text-white bg-primary hover:bg-primary-hover shadow-sm transition-colors flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                    >
                      <span>Send Response</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>

              </div>

              {/* Right Panel */}
              <div className="lg:col-span-4 p-5 space-y-5 bg-[#0E1118]/80 text-xs">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-text-dim font-medium mb-2">
                    Current Outage
                  </div>
                  <div className="bg-surface rounded-md p-3.5 border border-surface-border space-y-1.5">
                    <div className="flex items-center gap-2 text-rose-400 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                      Production 504 errors
                    </div>
                    <div className="text-[11px] text-text-dim">Severity: P0 • Affected: 2,400 active sessions</div>
                  </div>
                </div>

                <div>
                  <div className="text-[11px] uppercase tracking-wider text-text-dim font-medium mb-2">
                    Live Assessment
                  </div>
                  <div className="bg-surface rounded-md p-3 border border-surface-border space-y-2 text-[11px] text-text-muted">
                    <div className="flex items-center justify-between">
                      <span>Problem Solving</span>
                      <span className="text-emerald-400 font-mono">Live</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Technical Reasoning</span>
                      <span className="text-neutral-300 font-mono">Live</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. EVIDENCE DEBRIEF (What went well vs What to change) */}
      {/* ======================================================== */}
      <section className="py-24 border-b border-surface-border bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-wider text-text-dim font-medium">Debrief & Breakdown</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight mt-1 mb-3">
              Know exactly what to improve next time
            </h2>
            <p className="text-base text-text-muted">
              WorkSim explains the reasoning behind your score and highlights quotes from your conversation.
            </p>
          </div>

          <div className="max-w-5xl mx-auto rounded-lg border border-surface-border bg-surface p-6 sm:p-9 space-y-8 shadow-xl">
            
            {/* Top Bar: Overall Score + Rubric Bars */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-surface-border pb-8">
              
              <div className="md:col-span-4 p-6 bg-surface-subtle border border-surface-border rounded-lg text-center">
                <span className="text-xs uppercase tracking-wider text-text-dim block mb-1">Overall Score</span>
                <div className="text-4xl sm:text-5xl font-bold font-mono text-white">
                  82 <span className="text-lg text-text-dim font-normal">/ 100</span>
                </div>
                <div className="text-xs text-text-dim mt-2">WorkSim Workplace Rubric</div>
              </div>

              <div className="md:col-span-8 space-y-3">
                {[
                  { label: 'Communication', score: 8.4 },
                  { label: 'Problem Solving', score: 7.9 },
                  { label: 'Ownership', score: 8.7 },
                  { label: 'Decision Making', score: 7.6 },
                  { label: 'Professionalism', score: 9.1 },
                ].map((s, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-white font-medium">{s.label}</span>
                      <span className="text-text-muted font-mono">{s.score} / 10</span>
                    </div>
                    <div className="w-full bg-surface-subtle h-2 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: `${s.score * 10}%` }} />
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* What you did well vs What to improve */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-lg border border-surface-border bg-surface-subtle/50 space-y-3">
                <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  What You Did Well
                </div>
                <ul className="text-xs text-text-muted space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Stayed calm and methodical during high customer impact</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Inspected metrics and connection states before suggesting disruptive steps</span>
                  </li>
                </ul>
              </div>

              <div className="p-5 rounded-lg border border-surface-border bg-surface-subtle/50 space-y-3">
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  What to Improve
                </div>
                <ul className="text-xs text-text-muted space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">⚠</span>
                    <span>Escalate blockers proactively without waiting for repeated queries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">⚠</span>
                    <span>Focus on resolving the issue before debating team blame</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Evidence from Session */}
            <div className="p-5 rounded-lg border border-surface-border bg-surface-subtle/70 space-y-2">
              <div className="text-xs uppercase tracking-wider text-text-dim font-medium">
                Verbatim Evidence From Conversation
              </div>
              <div className="text-xs text-text-main italic">
                “You said: 'The backend team caused the delay.'”
              </div>
              <div className="text-xs text-text-muted pt-1">
                <span className="text-white font-medium">Suggested Adjustment: </span>
                Reframe communication around immediate mitigation rather than attributing blame during an active incident.
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 8. ADAPTIVE PROGRESSION */}
      {/* ======================================================== */}
      <section className="py-24 border-b border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-wider text-text-dim font-medium">Skill Trajectory</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight mt-1 mb-3">
              Every attempt changes what you practice next
            </h2>
            <p className="text-base text-text-muted">
              WorkSim tracks specific growth areas and recommends situations that challenge your weaknesses.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-lg border border-surface-border bg-surface space-y-4">
              <span className="text-xs text-text-dim">Attempt 01</span>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-text-muted">Communication</span>
                  <span className="text-white font-mono">62</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Ownership</span>
                  <span className="text-white font-mono">54</span>
                </div>
              </div>
              <div className="text-[11px] text-amber-400 bg-amber-500/10 p-2.5 rounded border border-amber-500/20">
                Identifies hesitation under pushback
              </div>
            </div>

            <div className="p-6 rounded-lg border border-surface-border bg-surface space-y-4">
              <span className="text-xs text-text-dim">Attempt 02</span>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-text-muted">Communication</span>
                  <span className="text-white font-mono">71</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Ownership</span>
                  <span className="text-white font-mono">68</span>
                </div>
              </div>
              <div className="text-[11px] text-text-muted bg-surface-subtle p-2.5 rounded border border-surface-border">
                Increases stakeholder skepticism
              </div>
            </div>

            <div className="p-6 rounded-lg border border-surface-border bg-surface space-y-4">
              <span className="text-xs text-text-dim">Attempt 03</span>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-text-muted">Communication</span>
                  <span className="text-emerald-400 font-mono font-semibold">82</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Ownership</span>
                  <span className="text-emerald-400 font-mono font-semibold">79</span>
                </div>
              </div>
              <div className="text-[11px] text-emerald-400 bg-emerald-500/10 p-2.5 rounded border border-emerald-500/20">
                Consistent ownership demonstrated
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 9. SIMPLE 3-STEP SECTION */}
      {/* ======================================================== */}
      <section className="py-24 border-b border-surface-border bg-surface/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-wider text-text-dim font-medium">How It Works</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mt-1 mb-3">Three stages for deliberate practice</h2>
            <p className="text-sm text-text-muted">
              Built to get you practicing realistic situations in under two minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-lg border border-surface-border bg-surface space-y-3">
              <div className="text-xs text-text-dim font-medium">01 • Initiate</div>
              <h3 className="text-lg font-semibold text-white">Choose a situation</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Pick a scenario from the library or create a custom simulation directly from a job description.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-surface-border bg-surface space-y-3">
              <div className="text-xs text-text-dim font-medium">02 • Conversation</div>
              <h3 className="text-lg font-semibold text-white">Handle the conversation</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Talk, negotiate, and decide in real time while your stakeholder reacts to your decisions.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-surface-border bg-surface space-y-3">
              <div className="text-xs text-text-dim font-medium">03 • Review</div>
              <h3 className="text-lg font-semibold text-white">Review your debrief</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Review your scores, exact transcript citations, and concrete guidance for your next attempt.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 10. DESIGNED FOR */}
      {/* ======================================================== */}
      <section className="py-16 border-b border-surface-border bg-surface/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <span className="text-xs uppercase tracking-wider text-text-dim font-medium">
              Designed For
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs text-text-muted">
            <span className="px-3.5 py-1.5 rounded-md border border-surface-border bg-surface">Students preparing for their first job</span>
            <span className="px-3.5 py-1.5 rounded-md border border-surface-border bg-surface">Campus placement prep</span>
            <span className="px-3.5 py-1.5 rounded-md border border-surface-border bg-surface">Behavioral interview preparation</span>
            <span className="px-3.5 py-1.5 rounded-md border border-surface-border bg-surface">Workplace communication</span>
            <span className="px-3.5 py-1.5 rounded-md border border-surface-border bg-surface">Early-career engineers & professionals</span>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 11. FINAL CTA */}
      {/* ======================================================== */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-5">
          
          <h2 className="text-3xl sm:text-5xl font-semibold text-white tracking-tight leading-tight">
            Your first job shouldn't be your first practice.
          </h2>

          <p className="text-base text-text-muted max-w-xl mx-auto">
            Build confidence, composure, and ownership before the stakes are real.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <button
              onClick={() => onNavigate('/scenarios')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-lg text-sm font-semibold text-white bg-primary hover:bg-primary-hover shadow-lg transition-colors cursor-pointer"
            >
              Start Your First Simulation →
            </button>
            <button
              onClick={() => onNavigate('/scenarios')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-lg text-sm font-semibold text-text-main bg-surface border border-surface-border hover:bg-surface-subtle transition-colors cursor-pointer"
            >
              Explore Scenarios
            </button>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* FOOTER */}
      {/* ======================================================== */}
      <footer className="mt-auto border-t border-surface-border bg-surface/40 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-dim">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-primary flex items-center justify-center text-white font-black text-[10px]">W</div>
            <span className="text-text-muted font-medium">WorkSim</span>
            <span>— Practice real work before your first job.</span>
          </div>
          <div>Professional AI Workplace Simulator</div>
        </div>
      </footer>

    </div>
  );
};
