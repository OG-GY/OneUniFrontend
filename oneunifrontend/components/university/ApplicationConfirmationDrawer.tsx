"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  User, 
  FileText, 
  CheckCircle2, 
  ClipboardCheck, 
  ChevronRight, 
  Calendar,
  ShieldCheck,
  AlertCircle,
  GraduationCap
} from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/button";

interface ApplicationConfirmationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  programName: string;
  universityName: string;
}

const STEPS = [
  { id: 1, label: "Personal Info", icon: User },
  { id: 2, label: "Test Scores", icon: ClipboardCheck },
  { id: 3, label: "Documents", icon: FileText },
  { id: 4, label: "Select Intake", icon: Calendar },
];

export function ApplicationConfirmationDrawer({ 
  isOpen, 
  onClose, 
  programName,
  universityName 
}: ApplicationConfirmationDrawerProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedIntake, setSelectedIntake] = useState("Fall 2025");

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
    else {
      // Final Submission logic here
      alert("Application Submitted Successfully!");
      onClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-full max-w-xl bg-white shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Application Confirmation</h2>
                <p className="text-xs font-semibold text-primary uppercase tracking-wider mt-0.5">{programName} • {universityName}</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2.5 hover:bg-slate-50 rounded-xl text-slate-400 transition-all border border-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Stepper Progress (Top Horizontal) */}
            <div className="px-8 py-6 bg-white border-b border-slate-100 shrink-0">
              <div className="flex items-center justify-between relative">
                {/* Background Track Line */}
                <div className="absolute top-4 left-0 right-0 h-0.5 bg-slate-100 -z-10 rounded-full" />
                
                {/* Active/Completed Line */}
                <motion.div 
                   className="absolute top-4 left-0 h-0.5 bg-primary -z-10 rounded-full"
                   initial={{ width: 0 }}
                   animate={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                   transition={{ duration: 0.3 }}
                />

                {STEPS.map((step) => {
                  const isActive = currentStep === step.id;
                  const isCompleted = currentStep > step.id;
                  return (
                    <div key={step.id} className="flex flex-col items-center gap-2 relative z-10 bg-white px-2">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                        isActive ? "border-primary text-primary bg-white" : 
                        isCompleted ? "bg-primary border-primary text-white" : "border-slate-100 bg-white text-slate-300"
                      )}>
                        {isCompleted ? <CheckCircle2 size={16} /> : <step.icon size={16} />}
                      </div>
                      <span className={cn(
                        "text-[9px] font-bold uppercase tracking-widest bg-white px-1",
                        isActive ? "text-primary" : "text-slate-400"
                      )}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8 lg:p-10 custom-scrollbar">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 mb-6">
                        <div className="flex gap-3 items-center text-primary mb-2">
                          <User size={20} />
                          <h3 className="font-bold">Personal Profile Verification</h3>
                        </div>
                        <p className="text-sm text-slate-600">Please confirm your identity details from your profile.</p>
                      </div>

                      <div className="grid gap-4">
                        <InfoItem label="Full Name" value="Zaid bin Shaukat" />
                        <InfoItem label="Primary Email" value="zaid@example.com" />
                        <InfoItem label="Phone Number" value="+92 300 1234567" />
                        <InfoItem label="Current Address" value="H-13, Islamabad, Pakistan" />
                      </div>
                      
                      <div className="mt-8 flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <ShieldCheck className="text-emerald-500" />
                        <p className="text-xs font-medium text-slate-500 italic">This data is automatically synced with your global profile settings.</p>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-6">
                       <div className="p-4 bg-secondary/10 rounded-2xl border border-secondary/20 mb-6">
                        <div className="flex gap-3 items-center text-secondary-foreground mb-2">
                          <ClipboardCheck size={20} />
                          <h3 className="font-bold">Test Scores & Academics</h3>
                        </div>
                        <p className="text-sm text-slate-600">Ensure your academic records meet the program eligibility.</p>
                      </div>

                      <div className="grid gap-4">
                        <ScoreCard label="Matric / O-Level" percentage="92.4%" status="Verified" />
                        <ScoreCard label="FSc / A-Level" percentage="88.0%" status="Verified" />
                        <ScoreCard label="Entrance Test (NET)" score="148/200" status="Applied" />
                      </div>

                      <div className="p-4 bg-orange-50 rounded-xl border border-orange-100 flex gap-3">
                        <AlertCircle className="text-orange-500 shrink-0" size={18} />
                        <p className="text-xs text-orange-700 leading-relaxed font-medium">
                          These scores will be used for your merit calculation. If you have updated scores, please change them in your academic profile first.
                        </p>
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <FileText size={20} className="text-primary" />
                        Digital Documents
                      </h3>
                      
                      <div className="grid gap-3">
                        <DocItem name="NIC_Front_Copy.pdf" size="1.2 MB" />
                        <DocItem name="NIC_Back_Copy.pdf" size="0.9 MB" />
                        <DocItem name="Matric_Transcript.pdf" size="2.4 MB" />
                        <DocItem name="Inter_Transcript.pdf" size="2.6 MB" />
                        <DocItem name="Passport_Photo.jpg" size="0.5 MB" />
                      </div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="space-y-8">
                      <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Calendar className="text-primary" size={32} />
                        </div>
                        <h3 className="text-xl font-bold">Select Admission Intake</h3>
                        <p className="text-slate-500 text-sm mt-1">When do you plan to start your studies?</p>
                      </div>

                      <div className="grid gap-4">
                        {["Fall 2025", "Spring 2026"].map((intake) => (
                          <button
                            key={intake}
                            onClick={() => setSelectedIntake(intake)}
                            className={cn(
                              "w-full p-6 text-left rounded-2xl border-2 transition-all flex items-center justify-between",
                              selectedIntake === intake 
                                ? "border-primary bg-primary/5 ring-4 ring-primary/5" 
                                : "border-slate-100 bg-white hover:border-slate-200"
                            )}
                          >
                            <div>
                              <p className="font-extrabold text-slate-900">{intake}</p>
                              <p className="text-xs text-slate-400 font-medium">Open for Applications</p>
                            </div>
                            {selectedIntake === intake && <CheckCircle2 className="text-primary" size={24} />}
                          </button>
                        ))}
                      </div>

                      <div className="pt-10 border-t border-slate-100">
                        <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                          By clicking "Final Submit", you authorize {universityName} to process your application and verify your documents. 
                          An application fee may be required to proceed further.
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex gap-4">
              <Button 
                variant="outline" 
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex-1 py-4 border-slate-200"
              >
                Previous
              </Button>
              <Button 
                onClick={nextStep}
                className="flex-[2] py-4 shadow-xl shadow-primary/20"
              >
                {currentStep === 4 ? "Final Submit Application" : "Continue to Next Step"}
                {currentStep !== 4 && <ChevronRight size={18} className="ml-2" />}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// --- SUB COMPONENTS ---

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
      <span className="text-base font-bold text-slate-800">{value}</span>
    </div>
  );
}

function ScoreCard({ label, percentage, score, status }: any) {
  return (
    <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
      <div>
        <h4 className="font-bold text-slate-900 text-sm">{label}</h4>
        <div className="flex gap-4 mt-1">
          <span className="text-xs font-bold text-primary">{percentage || score}</span>
          <span className="text-[10px] font-black uppercase text-emerald-500 flex items-center gap-1">
            <CheckCircle2 size={10} /> {status}
          </span>
        </div>
      </div>
      <Button variant="link" className="p-0 h-auto text-[10px] font-black text-slate-400 hover:text-primary uppercase tracking-widest">
        Details
      </Button>
    </div>
  );
}

function DocItem({ name, size }: { name: string; size: string }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:border-primary/20 transition-all cursor-pointer group">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
          <FileText size={20} />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900">{name}</p>
          <p className="text-xs text-slate-400 font-medium">{size}</p>
        </div>
      </div>
      <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center border border-emerald-100">
        <CheckCircle2 size={16} />
      </div>
    </div>
  );
}
