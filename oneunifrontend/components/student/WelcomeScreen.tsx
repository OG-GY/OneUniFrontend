import { motion } from 'framer-motion';
import { ChevronRight, FileText, CheckCircle, Shield, Sparkles, Clock } from 'lucide-react';
import Button from '../ui/button';

interface WelcomeStepProps {
  onNext: () => void;
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  const checklistItems = [
    "Identity Verification (CNIC/B-Form)",
    "Educational Certificates (Matric/Inter)",
    "Parental/Guardian Information",
    "Digital Scans of Documents"
  ];

  return (
    <div className="flex flex-col gap-10">
      {/* Title Section */}
      <div className="flex flex-col gap-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-md border border-slate-200 w-fit">
          <Sparkles size={14} className="text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">Admission Portal 2025</span>
        </div>
        
        <h1 className="text-3xl font-bold text-text-main tracking-tight leading-tight">
          Redesign your academic career.
        </h1>
        
        <p className="text-base text-slate-600 leading-relaxed">
          Follow the step-by-step process below to complete your university admission application. All your data is saved as you progress.
        </p>
      </div>

      {/* Main Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Checklist Section */}
        <div className="flex flex-col gap-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Preparation Checklist
          </h3>
          <div className="flex flex-col gap-4">
            {checklistItems.map((text, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-md bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 border border-emerald-100">
                  <CheckCircle size={12} />
                </div>
                <span className="text-sm font-medium text-slate-700">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Info Highlights */}
        <div className="grid grid-cols-1 gap-4">
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-slate-200 shadow-sm text-primary">
               <Clock size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-text-main">Estimated Duration</p>
              <p className="text-xs text-slate-500 font-medium">Approximately 15 minutes</p>
            </div>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-slate-200 shadow-sm text-primary">
               <Shield size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-text-main">Data Security</p>
              <p className="text-xs text-slate-500 font-medium">Encrypted and protected portal</p>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Action */}
      <div className="mt-4 pt-8 border-t border-slate-100">
        <Button
          onClick={onNext}
          size="lg"
          variant="primary"
          className="h-12 px-8 rounded-lg text-sm font-bold"
          iconRight={<ChevronRight size={18} />}
        >
          Start Application
        </Button>
        <p className="mt-4 text-[10px] text-slate-400 font-medium">
           By continuing, you agree to the university's terms and privacy policies.
        </p>
      </div>
    </div>
  );
}
