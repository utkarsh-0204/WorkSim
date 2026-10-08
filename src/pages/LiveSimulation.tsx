import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Clock, 
  Mic, 
  MicOff, 
  PhoneOff, 
  Radio, 
  Info, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  Terminal, 
  Activity, 
  MessageSquare,
  AlertTriangle,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { Scenario, Message, ScenarioObjective, SimulationReport } from '../types';
import { AdaptiveSimulationEngine } from '../engine/simulationEngine';
import { Sidebar } from '../components/Navigation';

interface LiveSimulationProps {
  scenario: Scenario;
  onComplete: (report: SimulationReport) => void;
  onNavigate: (path: string) => void;
}

export const LiveSimulation: React.FC<LiveSimulationProps> = ({ scenario, onComplete, onNavigate }) => {
  // Session State
  const [engine] = useState(() => new AdaptiveSimulationEngine(scenario));
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [objectives, setObjectives] = useState<ScenarioObjective[]>(scenario.initialObjectives);
  const [discoveredInfo, setDiscoveredInfo] = useState<string[]>([]);
  const [currentSituation, setCurrentSituation] = useState<string[]>(scenario.initialSituationSummary);
  
  // Stage 3 Voice Mode State
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [waveformBars, setWaveformBars] = useState<number[]>([30, 60, 45, 90, 75, 40, 65, 80, 50, 70]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize initial message from AI
  useEffect(() => {
    const initialMsg: Message = {
      id: `msg-0`,
      sender: 'ai',
      senderName: scenario.character.name,
      text: scenario.initialMessage,
      timestamp: '10:01 AM',
      metadata: {
        decisionTag: 'Initial Inquiry'
      }
    };
    setMessages([initialMsg]);
  }, [scenario]);

  // Elapsed timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Voice waveform simulation when active
  useEffect(() => {
    if (!isVoiceMode) return;
    const interval = setInterval(() => {
      setWaveformBars(prev => prev.map(() => Math.floor(Math.random() * 80) + 15));
    }, 150);
    return () => clearInterval(interval);
  }, [isVoiceMode]);

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = (textToSend?: string) => {
    const content = (textToSend !== undefined ? textToSend : inputValue).trim();
    if (!content || isThinking) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      senderName: 'You (Candidate)',
      text: content,
      timestamp: timeStr,
    };

    const nextHistory = [...messages, userMessage];
    setMessages(nextHistory);
    setInputValue('');
    setIsThinking(true);

    // Dynamic AI reaction delay to feel natural
    setTimeout(() => {
      const turnResult = engine.processUserResponse(
        content,
        nextHistory,
        objectives,
        discoveredInfo,
        elapsedSeconds
      );

      const aiMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        senderName: scenario.character.name,
        text: turnResult.aiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        metadata: {
          isConsequence: !!turnResult.consequence,
          infoDiscovered: turnResult.newInformation,
          decisionTag: turnResult.decisionTag
        }
      };

      setMessages(prev => [...prev, aiMessage]);
      setObjectives(turnResult.updatedObjectives);

      if (turnResult.newInformation) {
        setDiscoveredInfo(prev => [...prev, turnResult.newInformation!]);
      }

      if (turnResult.consequence) {
        setCurrentSituation(prev => [turnResult.consequence!, ...prev]);
      }

      setIsThinking(false);

      // Check if simulation concluded
      if (turnResult.isComplete && turnResult.report) {
        setTimeout(() => {
          onComplete(turnResult.report!);
        }, 1800);
      }
    }, 1200);
  };

  // Quick Action Buttons
  const quickActions = [
    { label: 'Check server logs & metrics', text: 'I will first check the server logs, APM telemetry and database metrics to isolate where the 504 errors originate.' },
    { label: 'Ask team about recent deploys', text: 'Has the engineering team deployed any recent releases or database migrations in the last 30 minutes?' },
    { label: 'Restart the auth server', text: 'I want to restart the primary application server cluster immediately to clear stuck worker processes.' },
    { label: 'Broadcast incident status', text: 'Let us post a preliminary incident status update to the customer support channel while we debug.' },
  ];

  return (
    <div className="flex h-screen bg-background text-text-main overflow-hidden">
      
      {/* LEFT SIDEBAR (Desktop) */}
      <div className="hidden lg:block shrink-0">
        <Sidebar currentPath={`/simulation/${scenario.id}`} onNavigate={onNavigate} />
      </div>

      {/* CENTER & RIGHT COLUMNS */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOP STATUS BAR */}
        <header className="h-16 border-b border-surface-border bg-surface px-4 sm:px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-emerald animate-pulse"></span>
              <span className="font-mono text-xs font-semibold text-accent-emerald tracking-wide">
                LIVE SIMULATION
              </span>
            </div>
            <span className="text-surface-border">|</span>
            <span className="text-sm font-semibold text-white truncate max-w-xs sm:max-w-md">
              {scenario.title}
            </span>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Timer */}
            <div className="flex items-center space-x-1.5 px-3 py-1 rounded-md bg-surface-subtle border border-surface-border text-xs font-mono text-text-muted">
              <Clock className="w-3.5 h-3.5 text-text-dim" />
              <span>{formatTimer(elapsedSeconds)}</span>
            </div>

            {/* Voice Mode Toggle */}
            <button
              onClick={() => setIsVoiceMode(!isVoiceMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                isVoiceMode 
                  ? 'bg-accent-purple/20 border-accent-purple/40 text-accent-purple' 
                  : 'bg-surface-subtle border-surface-border text-text-muted hover:text-white'
              }`}
              title="Toggle Voice Mode"
            >
              <Radio className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Voice Mode</span>
            </button>
          </div>
        </header>

        {/* BODY (Split: Conversation Center, Context Right) */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* MAIN CONVERSATION AREA */}
          <div className="flex-1 flex flex-col bg-background relative min-w-0">
            
            {/* AI Character Header Banner */}
            <div className="border-b border-surface-border bg-surface/40 px-6 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img 
                    src={scenario.character.avatar} 
                    alt={scenario.character.name} 
                    className="w-9 h-9 rounded-full border border-surface-border object-cover" 
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-accent-emerald ring-2 ring-surface"></span>
                </div>
                <div>
                  <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                    {scenario.character.name}
                    <span className="text-[10px] font-normal text-text-dim">({scenario.character.role})</span>
                  </div>
                  <div className="text-[11px] text-text-dim flex items-center gap-1">
                    <span className="text-accent-emerald font-bold">●</span> Online & Evaluating Live Decisions
                  </div>
                </div>
              </div>

              {/* End early button */}
              <button
                onClick={() => {
                  const r = engine.processUserResponse("Wrap up session", messages, objectives, discoveredInfo, elapsedSeconds);
                  if (r.report) onComplete(r.report);
                }}
                className="text-xs text-text-dim hover:text-rose-400 font-mono transition-colors"
              >
                Conclude Early
              </button>
            </div>

            {/* STAGE 3 VOICE OVERLAY BANNER (if active) */}
            {isVoiceMode && (
              <div className="bg-surface-subtle/90 border-b border-surface-border px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary-light">
                    <Radio className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-white flex items-center gap-2">
                      Voice Workplace Call Active
                      <span className="text-[10px] text-accent-emerald font-mono bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        {isMicMuted ? 'Muted' : 'Listening...'}
                      </span>
                    </div>
                    <div className="text-[11px] text-text-dim">Simulating professional audio stream</div>
                  </div>
                </div>

                {/* Simulated Audio Waveform */}
                <div className="flex items-center gap-1 h-8 px-4 bg-black/40 rounded-lg border border-surface-border">
                  {waveformBars.map((height, idx) => (
                    <div 
                      key={idx} 
                      className={`w-1 rounded-full transition-all duration-150 ${isMicMuted ? 'bg-zinc-700' : 'bg-primary-light'}`}
                      style={{ height: isMicMuted ? '4px' : `${height}%` }}
                    />
                  ))}
                </div>

                {/* Voice Call Controls */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setIsMicMuted(!isMicMuted)}
                    className={`p-2 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                      isMicMuted ? 'bg-rose-500/20 border-rose-500/30 text-rose-400' : 'bg-surface border-surface-border text-white'
                    }`}
                  >
                    {isMicMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    <span>{isMicMuted ? 'Unmute' : 'Mute'}</span>
                  </button>

                  <button 
                    onClick={() => setIsVoiceMode(false)}
                    className="p-2 rounded-lg bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-medium flex items-center gap-1.5 hover:bg-red-600/30 transition-colors"
                  >
                    <PhoneOff className="w-4 h-4" />
                    <span>Switch to Text</span>
                  </button>
                </div>
              </div>
            )}

            {/* MESSAGES SCROLL AREA */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div 
                    key={msg.id}
                    className={`flex items-start gap-3.5 max-w-2xl ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
                  >
                    {/* Avatar */}
                    {!isUser ? (
                      <img 
                        src={scenario.character.avatar} 
                        alt={scenario.character.name} 
                        className="w-8 h-8 rounded-full border border-surface-border object-cover shrink-0 mt-0.5" 
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary-light font-semibold text-xs shrink-0 mt-0.5">
                        You
                      </div>
                    )}

                    {/* Bubble Content */}
                    <div className="flex flex-col space-y-1">
                      
                      {/* Sender & Timestamp */}
                      <div className={`flex items-center gap-2 text-[11px] ${isUser ? 'justify-end' : ''}`}>
                        <span className="font-medium text-white">{msg.senderName}</span>
                        <span className="text-text-dim font-mono">{msg.timestamp}</span>
                        {msg.metadata?.decisionTag && (
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-surface-subtle text-text-muted border border-surface-border">
                            {msg.metadata.decisionTag}
                          </span>
                        )}
                      </div>

                      {/* Text */}
                      <div className={`p-4 rounded-xl text-sm leading-relaxed whitespace-pre-line ${
                        isUser 
                          ? 'bg-primary/20 border border-primary/30 text-white rounded-tr-none' 
                          : 'bg-surface border border-surface-border text-text-main rounded-tl-none'
                      }`}>
                        {msg.text}
                      </div>

                      {/* Consequence badge if triggered */}
                      {msg.metadata?.isConsequence && (
                        <div className="flex items-center gap-1.5 text-[11px] font-mono text-accent-amber mt-1 bg-accent-amber/5 border border-accent-amber/20 px-2.5 py-1 rounded-md">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                          <span>Consequence: Scenario state updated dynamically</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* AI Thinking indicator */}
              {isThinking && (
                <div className="flex items-start gap-3.5 max-w-2xl">
                  <img 
                    src={scenario.character.avatar} 
                    alt={scenario.character.name} 
                    className="w-8 h-8 rounded-full border border-surface-border object-cover shrink-0 mt-0.5" 
                  />
                  <div className="bg-surface border border-surface-border rounded-xl rounded-tl-none p-4 flex items-center space-x-2">
                    <span className="text-xs text-text-dim font-mono">{scenario.character.name} is evaluating your decision</span>
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* QUICK ACTIONS ROW (Optional helper shortcuts) */}
            <div className="px-4 sm:px-6 py-2 border-t border-surface-border/60 bg-surface/30 overflow-x-auto flex gap-2 shrink-0">
              <span className="text-[10px] font-mono uppercase tracking-wider text-text-dim flex items-center shrink-0 mr-1">
                Quick Actions:
              </span>
              {quickActions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(action.text)}
                  disabled={isThinking}
                  className="shrink-0 text-xs text-text-muted bg-surface hover:text-white hover:bg-surface-subtle border border-surface-border px-2.5 py-1 rounded-md transition-colors disabled:opacity-50"
                >
                  {action.label}
                </button>
              ))}
            </div>

            {/* USER INPUT BOX */}
            <div className="p-4 sm:p-6 border-t border-surface-border bg-surface shrink-0">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-3"
              >
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your workplace response or decision..."
                    disabled={isThinking}
                    className="w-full bg-background border border-surface-border rounded-lg pl-4 pr-10 py-3 text-sm text-white placeholder-text-dim focus:outline-none focus:border-primary transition-colors disabled:opacity-60"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-text-dim">
                    Enter ↵
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!inputValue.trim() || isThinking}
                  className="px-5 py-3 rounded-lg text-sm font-semibold text-white bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <span>Send</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="mt-2 text-[11px] text-text-dim flex items-center justify-between">
                <span>The simulator analyzes your specific technical reasoning and decision consequences.</span>
                <span className="font-mono">Press Shift+Enter for new line</span>
              </div>
            </div>

          </div>

          {/* RIGHT CONTEXT PANEL */}
          <aside className="hidden md:flex w-80 lg:w-96 border-l border-surface-border bg-surface flex-col shrink-0 overflow-y-auto p-5 space-y-6">
            
            {/* CURRENT SITUATION */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-text-dim flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-primary" />
                  Current Situation
                </span>
                <span className="text-[10px] font-mono text-accent-emerald">Dynamic State</span>
              </div>
              <div className="bg-background/80 rounded-xl p-4 border border-surface-border space-y-2">
                {currentSituation.map((sit, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-text-muted leading-relaxed">
                    <span className="text-primary mt-1">•</span>
                    <span>{sit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* NEW INFORMATION / DISCOVERED FACTS */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-text-dim flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-accent-amber" />
                  Discovered Telemetry
                </span>
                <span className="text-[10px] font-mono text-text-dim">{discoveredInfo.length} items</span>
              </div>
              {discoveredInfo.length > 0 ? (
                <div className="space-y-2">
                  {discoveredInfo.map((info, idx) => (
                    <div 
                      key={idx} 
                      className="bg-accent-amber/5 border border-accent-amber/25 rounded-lg p-3 text-xs text-accent-amber leading-relaxed font-sans"
                    >
                      “{info}”
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-background/40 border border-surface-border rounded-lg p-4 text-center text-xs text-text-dim italic">
                  No new forensic telemetry uncovered yet. Investigate metrics or query the team.
                </div>
              )}
            </div>

            {/* OBJECTIVES TRACKER */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-text-dim flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent-emerald" />
                  Live Objectives
                </span>
                <span className="text-[10px] font-mono text-text-dim">
                  {objectives.filter(o => o.completed).length}/{objectives.length}
                </span>
              </div>
              <div className="bg-background/80 rounded-xl p-3 border border-surface-border space-y-2.5">
                {objectives.map((obj) => (
                  <div key={obj.id} className="flex items-start gap-2.5 text-xs">
                    {obj.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-accent-emerald shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="w-4 h-4 text-text-dim shrink-0 mt-0.5" />
                    )}
                    <span className={obj.completed ? 'text-white line-through opacity-80' : 'text-text-muted'}>
                      {obj.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CHARACTER CONTEXT BRIEF */}
            <div className="pt-2 border-t border-surface-border/80">
              <span className="text-[11px] font-mono uppercase tracking-wider text-text-dim block mb-2">
                Stakeholder Persona
              </span>
              <div className="bg-surface-subtle/50 rounded-xl p-3 border border-surface-border flex items-center gap-3">
                <img 
                  src={scenario.character.avatar} 
                  alt={scenario.character.name} 
                  className="w-10 h-10 rounded-full border border-surface-border object-cover" 
                />
                <div className="text-xs">
                  <div className="font-semibold text-white">{scenario.character.name}</div>
                  <div className="text-text-dim text-[11px]">{scenario.character.department}</div>
                  <p className="text-[10px] text-text-muted mt-1 leading-snug line-clamp-2">
                    {scenario.character.bio}
                  </p>
                </div>
              </div>
            </div>

          </aside>

        </div>

      </div>

    </div>
  );
};
