import { BookOpen, Wrench, Download } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

const steps = [
  { label: 'Learn', icon: BookOpen },
  { label: 'Build', icon: Wrench },
  { label: 'Export', icon: Download },
];

export function StepIndicator({ currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <nav
      className="relative z-10 mx-auto flex w-full max-w-lg items-center justify-center gap-1 border-b border-line/10 bg-navy/80 py-5 backdrop-blur-sm sm:gap-2"
      aria-label="Build progress"
    >
      {steps.map((step, idx) => {
        const isActive = idx === currentStep;
        const isComplete = idx < currentStep;
        const Icon = step.icon;

        return (
          <div key={step.label} className="flex items-center">
            {idx > 0 && (
              <div
                className={`mx-3 h-[2px] w-10 rounded-full transition-colors duration-300 sm:mx-4 sm:w-16 ${
                  isComplete ? 'bg-orange' : 'bg-line/20'
                }`}
              />
            )}
            <button
              type="button"
              onClick={() => onStepClick(idx)}
              className={`flex min-h-[44px] cursor-pointer items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300 sm:px-6 sm:text-base ${
                isActive
                  ? 'bg-orange text-white shadow-lg shadow-orange/20'
                  : isComplete
                    ? 'bg-orange/15 text-orange hover:bg-orange/25'
                    : 'bg-line/10 text-stone hover:bg-line/15'
              }`}
              aria-current={isActive ? 'step' : undefined}
            >
              <Icon size={18} />
              <span>{step.label}</span>
            </button>
          </div>
        );
      })}
    </nav>
  );
}
