import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navigation';
import { LandingPage } from './pages/LandingPage';
import { ScenariosPage } from './pages/ScenariosPage';
import { ScenarioBrief } from './pages/ScenarioBrief';
import { LiveSimulation } from './pages/LiveSimulation';
import { SimulationComplete } from './pages/SimulationComplete';
import { ProgressPage } from './pages/ProgressPage';
import { GenerateScenarioPage } from './pages/GenerateScenarioPage';
import { FairEvaluationPage } from './pages/FairEvaluationPage';
import { ProfilePage } from './pages/ProfilePage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { DemoSimulationPage } from './pages/DemoSimulationPage';
import { SCENARIOS } from './data/scenarios';
import { Scenario, SimulationReport } from './types';
import { saveReport, getSavedReports } from './utils/storage';

export function App() {
  // Sync with browser URL pathname so back/forward and refresh always work
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [activeScenario, setActiveScenario] = useState<Scenario>(SCENARIOS[0]);
  const [currentReport, setCurrentReport] = useState<SimulationReport | null>(null);

  // Synchronize browser history and popstate
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/';
      setCurrentPath(path);

      if (path.startsWith('/scenarios/')) {
        const scenarioId = path.split('/')[2];
        const found = SCENARIOS.find(s => s.id === scenarioId);
        if (found) setActiveScenario(found);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Set active scenario from URL on initial load if applicable
  useEffect(() => {
    const path = window.location.pathname || '/';
    if (path.startsWith('/scenarios/')) {
      const scenarioId = path.split('/')[2];
      const found = SCENARIOS.find(s => s.id === scenarioId);
      if (found) setActiveScenario(found);
    }
  }, []);

  // Set default report from sample if none exists
  useEffect(() => {
    const saved = getSavedReports();
    const keys = Object.keys(saved);
    if (keys.length > 0) {
      setCurrentReport(saved[keys[keys.length - 1]]);
    }
  }, []);

  const handleNavigate = (path: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Push state to browser history so refresh and back buttons work
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);

    // If navigating to scenario brief
    if (path.startsWith('/scenarios/')) {
      const scenarioId = path.split('/')[2];
      const found = SCENARIOS.find(s => s.id === scenarioId);
      if (found) setActiveScenario(found);
    }
  };

  const handleStartSimulation = (scenario?: Scenario) => {
    if (scenario) {
      setActiveScenario(scenario);
    }
    const target = `/simulation/${scenario?.id || activeScenario.id}`;
    if (window.location.pathname !== target) {
      window.history.pushState({}, '', target);
    }
    setCurrentPath(target);
  };

  const handleSimulationComplete = (report: SimulationReport) => {
    saveReport(report);
    setCurrentReport(report);
    const target = `/simulation/${report.scenarioId}/complete`;
    if (window.location.pathname !== target) {
      window.history.pushState({}, '', target);
    }
    setCurrentPath(target);
  };

  const handleRetrySimulation = () => {
    const target = `/simulation/${activeScenario.id}`;
    if (window.location.pathname !== target) {
      window.history.pushState({}, '', target);
    }
    setCurrentPath(target);
  };

  // Render view depending on currentPath
  const renderContent = () => {
    // 1. Landing Page
    if (currentPath === '/') {
      return <LandingPage onNavigate={handleNavigate} />;
    }

    // 2. Sign In Page /signin
    if (currentPath === '/signin') {
      return <SignInPage onNavigate={handleNavigate} />;
    }

    // 3. Sign Up Page /signup
    if (currentPath === '/signup') {
      return <SignUpPage onNavigate={handleNavigate} />;
    }

    // 4. Watch a Simulation /demo
    if (currentPath === '/demo') {
      return <DemoSimulationPage onNavigate={handleNavigate} />;
    }

    // 5. Scenario Discovery
    if (currentPath === '/scenarios') {
      return <ScenariosPage onNavigate={handleNavigate} />;
    }

    // 6. Scenario Brief /scenarios/:id
    if (currentPath.startsWith('/scenarios/')) {
      const scenarioId = currentPath.split('/')[2];
      const scenario = SCENARIOS.find(s => s.id === scenarioId) || activeScenario;
      return (
        <ScenarioBrief
          scenario={scenario}
          onStart={() => handleStartSimulation(scenario)}
          onBack={() => handleNavigate('/scenarios')}
        />
      );
    }

    // 7. Live Simulation /simulation/:id
    if (currentPath.startsWith('/simulation/') && !currentPath.endsWith('/complete')) {
      return (
        <LiveSimulation
          scenario={activeScenario}
          onComplete={handleSimulationComplete}
          onNavigate={handleNavigate}
        />
      );
    }

    // 8. Simulation Complete /simulation/:id/complete OR /reports/:id
    if (currentPath.endsWith('/complete') || currentPath.startsWith('/reports/')) {
      if (currentReport) {
        return (
          <SimulationComplete
            report={currentReport}
            onNavigate={handleNavigate}
            onRetry={handleRetrySimulation}
          />
        );
      } else {
        return (
          <div className="min-h-screen bg-background text-text-main flex flex-col items-center justify-center p-6 text-center">
            <h2 className="text-xl font-bold mb-2">No Active Report Found</h2>
            <p className="text-xs text-text-muted mb-6">Complete a simulation to view your personalized evidence debrief.</p>
            <button
              onClick={() => handleNavigate('/scenarios/prod-incident')}
              className="px-4 py-2 bg-primary text-background rounded-md text-sm font-medium"
            >
              Start Production Incident
            </button>
          </div>
        );
      }
    }

    // 9. My Progress /progress
    if (currentPath === '/progress') {
      return <ProgressPage onNavigate={handleNavigate} />;
    }

    // 10. AI Generator /ai-generator OR /generate-scenario
    if (currentPath === '/ai-generator' || currentPath === '/generate-scenario') {
      return (
        <GenerateScenarioPage
          onStartGenerated={(scenario) => {
            setActiveScenario(scenario);
            handleStartSimulation(scenario);
          }}
          onNavigate={handleNavigate}
        />
      );
    }

    // 11. Fair Evaluation Info / How It Works
    if (currentPath === '/fair-evaluation' || currentPath === '/how-it-works') {
      return <FairEvaluationPage onNavigate={handleNavigate} />;
    }

    // 12. Candidate Profile
    if (currentPath === '/profile') {
      return <ProfilePage onNavigate={handleNavigate} />;
    }

    // Fallback: Default to LandingPage
    return <LandingPage onNavigate={handleNavigate} />;
  };

  // Don't show top navbar inside the active live simulation screen for focused workplace immersion
  const isSimulationActive = currentPath.startsWith('/simulation/') && !currentPath.endsWith('/complete');

  return (
    <div className="min-h-screen bg-background text-text-main selection:bg-primary/15 selection:text-text-main">
      {!isSimulationActive && (
        <Navbar currentPath={currentPath} onNavigate={handleNavigate} />
      )}
      <main>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
