"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  Sparkles, 
  User, 
  GraduationCap, 
  Award, 
  Users, 
  School, 
  FileText, 
  CheckCircle,
  ArrowLeft,
  ChevronRight
} from "lucide-react";
import { WelcomeStep } from "@/components/student/WelcomeScreen";
import { PersonalInfoStep } from "@/components/student/PersonalInfoStep";
import { AcademicBackgroundStep } from "@/components/student/AcademicBackgroundStep";
import { AdditionalQualificationsStep } from "@/components/student/AdditionalQualificationStep";
import { FamilyFinancialStep } from "@/components/student/GuardianInformationStep";
import { ProgramPreferenceStep } from "@/components/student/PreferenceStep";
import { DocumentUploadStep } from "@/components/student/DocumentUploadStep";
import { ReviewSubmitStep } from "@/components/student/ReviewSubmitStep";
import { ProfileData } from "@/lib/schemas/profile";
import clsx from "clsx";

const steps = [
  { id: 1, title: 'Welcome', icon: Sparkles, component: WelcomeStep },
  { id: 2, title: 'Personal', icon: User, component: PersonalInfoStep },
  { id: 3, title: 'Academic', icon: GraduationCap, component: AcademicBackgroundStep },
  { id: 4, title: 'Qualifications', icon: Award, component: AdditionalQualificationsStep },
  { id: 5, title: 'Family', icon: Users, component: FamilyFinancialStep },
  { id: 6, title: 'Programs', icon: School, component: ProgramPreferenceStep },
  { id: 7, title: 'Documents', icon: FileText, component: DocumentUploadStep },
  { id: 8, title: 'Review', icon: CheckCircle, component: ReviewSubmitStep },
];

export default function StudentOnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [maxStep, setMaxStep] = useState(1);
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: '',
    fatherName: '',
    cnic: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    email: '',
    photo: null,
    educations: [],
    hasDisability: 'no',
    disabilityType: '',
    isHafiz: 'no',
    sportsQuota: 'no',
    sportType: '',
    isOrphan: 'no',
    needsHostel: 'no',
    guardianRelation: '',
    guardianName: '',
    guardianPhone: '',
    guardianCNIC: '',
    permanentAddress: '',
    city: '',
    annualIncome: '',
    interestedCity: '',
    interests: [],
    shift: '',
    cnicDoc: null,
    cnicDocType: 'cnic',
    matricDoc: null,
    interDoc: null,
    interDocType: 'complete',
    domicileDoc: null,
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

  const updateData = (data: Partial<ProfileData>) => {
    setProfileData(prev => ({ ...prev, ...data }));
  };

  const CurrentStepComponent = steps[currentStep - 1]?.component;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Header - Simplified and Professional */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col pt-4 pb-4 gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white">
                <School size={18} />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg font-bold tracking-tight text-text-main leading-tight">OneUni</h1>
                <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Student Onboarding</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <div className="flex flex-col items-end">
                <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">Step {currentStep} of 8</span>
                <div className="w-32 h-1.5 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${(currentStep / steps.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Stepper Steps - Horizontal Scrollable */}
          <nav className="flex items-center gap-1.5 overflow-x-auto scrollbar-none -mx-4 px-4 md:mx-0 md:px-0">
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
                    <div className="mx-2 w-4 h-[1px] bg-slate-200 shrink-0" />
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              className="flex-1 bg-white p-6 md:p-12 lg:p-20 min-h-[calc(100vh-140px)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {CurrentStepComponent && (
                <CurrentStepComponent
                  data={profileData}
                  updateData={updateData}
                  onNext={handleNext}
                  onBack={handleBack}
                  onComplete={() => {
                      router.push('/student');
                  }}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Footer Controls */}
          {/* {currentStep > 1 && (
            <div className="mt-8 flex items-center justify-start">
               <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-text-main transition-colors px-4 py-2 hover:bg-slate-100 rounded-lg"
               >
                 <ArrowLeft size={16} />
                 Back to previous step
               </button>
            </div>
          )} */}
        </div>
      </main>
    </div>
  );
}
