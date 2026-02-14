"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  User, 
  Settings, 
  CheckCircle,
  School
} from "lucide-react";

// Consolidated steps
import { ProfileSetupStep } from "@/components/mentor/ProfileSetupStep";
import { MentorshipSettingsStep } from "@/components/mentor/MentorshipSettingsStep";
import { MentorReviewStep } from "@/components/mentor/MentorReviewStep";

import { MentorProfileData } from "@/lib/schemas/mentor";
import clsx from "clsx";

const steps = [
  { id: 1, title: 'Profile Setup', icon: User, component: ProfileSetupStep },
  { id: 2, title: 'Mentorship Settings', icon: Settings, component: MentorshipSettingsStep },
  { id: 3, title: 'Final Review', icon: CheckCircle, component: MentorReviewStep },
];

export default function MentorOnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [maxStep, setMaxStep] = useState(1);
  const [profileData, setProfileData] = useState<MentorProfileData>({
    fullName: '',
    email: '',
    phone: '',
    position: 'Student', 
    institution: '',
    experienceYears: '',
    bio: '',
    photo: null,
    guidanceTopics: [],
    availableDays: [],
    timeRangeStart: '09:00',
    timeRangeEnd: '17:00',
    cnicFront: null,
    degreeDoc: null,
  });

  const handleNext = () => {
    if (currentStep < steps.length) {
      const next = currentStep + 1;
      setCurrentStep(next);
      if (next > maxStep) setMaxStep(next);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStepClick = (stepId: number) => {
    if (stepId <= maxStep) {
      setCurrentStep(stepId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const updateData = (data: Partial<MentorProfileData>) => {
    setProfileData(prev => ({ ...prev, ...data }));
  };

  const CurrentStepComponent = steps[currentStep - 1]?.component;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col pt-4 pb-4 gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white">
                <School size={18} />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg font-bold tracking-tight text-text-main leading-tight">OneUni</h1>
                <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Expert Fast-Track Onboarding</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <div className="flex flex-col items-end">
                <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">Phase {currentStep} of 3</span>
                <div className="w-32 h-1.5 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${(currentStep / steps.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Stepper */}
          <nav className="flex items-center gap-4 overflow-x-auto scrollbar-none">
            {steps.map((step, idx) => {
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;
              const isLocked = step.id > maxStep;

              return (
                <div key={step.id} className="flex items-center flex-shrink-0">
                  <button
                    onClick={() => handleStepClick(step.id)}
                    disabled={isLocked}
                    className={clsx(
                      "flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all",
                      isActive ? "bg-primary text-white border-primary" :
                      isCompleted ? "bg-slate-50 text-emerald-600 border-slate-200 hover:bg-slate-100" :
                      isLocked ? "bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed" :
                      "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                    )}
                  >
                    {isCompleted ? <CheckCircle size={14} /> : <step.icon size={14} />}
                    <span className="whitespace-nowrap">{step.title}</span>
                  </button>
                  {idx !== steps.length - 1 && (
                    <div className="ml-4 w-8 h-[2px] bg-slate-100 shrink-0" />
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen bg-slate-50/20">
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              className="flex-1 p-6 md:p-12 lg:p-20 min-h-[calc(100vh-160px)]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="max-w-7xl mx-auto">
                {CurrentStepComponent && (
                  <CurrentStepComponent
                    data={profileData}
                    updateData={updateData}
                    onNext={handleNext}
                    onBack={handleBack}
                    onComplete={() => {
                        router.push('/mentor');
                    }}
                  />
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
