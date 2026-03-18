import { useState, useCallback, useEffect, useRef } from 'react';
import { BlueprintGrid } from './components/BlueprintGrid';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { StepIndicator } from './components/StepIndicator';
import { Hero } from './components/Hero';
import { LearnPanel } from './components/LearnPanel';
import { BuilderForm } from './components/BuilderForm';
import { SkillPreview } from './components/SkillPreview';
import { ExportPanel } from './components/ExportPanel';
import { EmailGate } from './components/EmailGate';
import { presets, type SkillFormData } from './lib/presets';

const GATE_KEY = 'ob1_skill_builder_access_v1';

interface GateUser {
  name: string;
  email: string;
  company: string;
}

function getStoredAccess(): GateUser | null {
  try {
    const raw = localStorage.getItem(GATE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as GateUser;
  } catch {
    return null;
  }
}

function App() {
  const [gateUser, setGateUser] = useState<GateUser | null>(() => getStoredAccess());
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<SkillFormData>({ ...presets[0].data });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [mobileTab, setMobileTab] = useState<'form' | 'preview'>('form');
  const buildRef = useRef<HTMLDivElement>(null);

  const handleGateAccess = useCallback((userData: GateUser) => {
    try {
      localStorage.setItem(GATE_KEY, JSON.stringify(userData));
    } catch {
      // Storage unavailable — still allow access
    }
    setGateUser(userData);
  }, []);

  const handleStartBuilding = useCallback(() => {
    setCurrentStep(1);
  }, []);

  useEffect(() => {
    if (currentStep === 1 && buildRef.current) {
      buildRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentStep]);

  function handleStepClick(step: number) {
    if (step === 2) {
      // Validate before export
      const newErrors: Record<string, boolean> = {};
      if (!formData.name.trim()) newErrors.name = true;
      if (!formData.description.trim()) newErrors.description = true;
      if (!formData.trigger.trim()) newErrors.trigger = true;
      if (!formData.instructions.some((i) => i.trim())) newErrors.instructions = true;
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setCurrentStep(1);
        return;
      }
      setErrors({});
    }
    setCurrentStep(step);
  }

  function handleFormChange(data: SkillFormData) {
    setFormData(data);
    // Clear errors as user types
    const newErrors = { ...errors };
    if (data.name.trim()) delete newErrors.name;
    if (data.description.trim()) delete newErrors.description;
    if (data.trigger.trim()) delete newErrors.trigger;
    if (data.instructions.some((i) => i.trim())) delete newErrors.instructions;
    setErrors(newErrors);
  }

  return (
    <>
      {!gateUser && <EmailGate onAccess={handleGateAccess} />}
      <BlueprintGrid />
      <Header />
      <StepIndicator currentStep={currentStep} onStepClick={handleStepClick} />

      <main className="relative z-10 flex-1">
        {/* Step 0: Learn */}
        {currentStep === 0 && (
          <div>
            <Hero onStartBuilding={handleStartBuilding} />
            <LearnPanel />
          </div>
        )}

        {/* Step 1: Build */}
        {currentStep === 1 && (
          <div ref={buildRef} className="px-5 pt-6 pb-16 sm:px-8 sm:pt-8">
            <div className="mx-auto max-w-6xl">
              {/* Mobile tab switcher */}
              <div className="mb-4 flex gap-2 lg:hidden">
                <button
                  type="button"
                  onClick={() => setMobileTab('form')}
                  className={`flex-1 cursor-pointer rounded-md py-2 text-sm font-semibold transition-colors duration-150 ${
                    mobileTab === 'form'
                      ? 'bg-orange text-white'
                      : 'bg-parchment/10 text-parchment'
                  }`}
                >
                  Form
                </button>
                <button
                  type="button"
                  onClick={() => setMobileTab('preview')}
                  className={`flex-1 cursor-pointer rounded-md py-2 text-sm font-semibold transition-colors duration-150 ${
                    mobileTab === 'preview'
                      ? 'bg-orange text-white'
                      : 'bg-parchment/10 text-parchment'
                  }`}
                >
                  Preview
                </button>
              </div>

              <div className="grid gap-8 lg:grid-cols-2">
                {/* Left: Form */}
                <div className={`${mobileTab === 'preview' ? 'hidden lg:block' : ''}`}>
                  <BuilderForm
                    formData={formData}
                    onChange={handleFormChange}
                    errors={errors}
                  />
                  <div className="mt-8">
                    <button
                      type="button"
                      onClick={() => handleStepClick(2)}
                      className="ob1-btn-primary w-full cursor-pointer py-4 text-lg"
                    >
                      Export Skill
                    </button>
                  </div>
                </div>

                {/* Right: Preview */}
                <div className={`${mobileTab === 'form' ? 'hidden lg:block' : ''} lg:sticky lg:top-4 lg:self-start`}>
                  <SkillPreview formData={formData} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Export */}
        {currentStep === 2 && <ExportPanel formData={formData} />}
      </main>

      <Footer />
    </>
  );
}

export default App;
