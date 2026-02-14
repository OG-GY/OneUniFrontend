import { useState } from 'react';
import { CheckCircle, ShieldCheck, FileText, ChevronLeft } from 'lucide-react';
import { MentorProfileData } from '@/lib/schemas/mentor';
import Button from '../ui/button';
import clsx from 'clsx';

interface MentorReviewStepProps {
  data: MentorProfileData;
  updateData: (data: Partial<MentorProfileData>) => void;
  onNext: () => void;
  onBack: () => void;
  onComplete: () => void;
}

export function MentorReviewStep({ data, onBack, onComplete }: MentorReviewStepProps) {
  const [isAgreed, setIsAgreed] = useState(false);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-text-main tracking-tight">Final Review & Submission</h2>
        <p className="text-sm text-slate-500 font-medium">Verify your information before joining the expert network.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 flex flex-col gap-8">
          {/* Summary Card */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
               <h3 className="font-bold text-sm text-text-main">Profile Overview</h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              <ReviewItem label="Full Name" value={data.fullName} />
              <ReviewItem label="Position" value={data.position} />
              <ReviewItem label="Institution" value={data.institution} />
              <ReviewItem label="Experience" value={`${data.experienceYears} Years`} />
              <div className="md:col-span-2">
                <ReviewItem label="Guidance Areas" value={data.guidanceTopics?.join(", ")} />
              </div>
              <div className="md:col-span-2">
                <ReviewItem label="Bio" value={data.bio} />
              </div>
              <div className="md:col-span-2">
                <ReviewItem label="Schedule" value={`${data.availableDays?.join(", ")} (${data.timeRangeStart} - ${data.timeRangeEnd})`} />
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 bg-primary/5 rounded-2xl border border-primary/10">
            <div className="pt-1">
              <input 
                type="checkbox" 
                id="agree"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer" 
              />
            </div>
            <label htmlFor="agree" className="text-sm text-slate-600 font-medium cursor-pointer leading-relaxed">
              I confirm that all information provided is accurate and authentic. I understand that my profile will be subject to a verification process before being visible to students.
            </label>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-emerald-600">
              <ShieldCheck size={20} />
              <span className="font-bold text-sm">Trust & Security</span>
            </div>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Your sensitive documents (CNIC/Degree) are encrypted and only accessible by authorized university representatives for verification purposes.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <Button
              onClick={onComplete}
              disabled={!isAgreed}
              size="lg"
              className={clsx(
                "w-full h-14 rounded-xl text-md font-bold shadow-xl shadow-primary/20",
                !isAgreed && "opacity-50 cursor-not-allowed grayscale"
              )}
              iconRight={<CheckCircle size={20} />}
            >
              Submit Profile
            </Button>
            
            <button
              onClick={onBack}
              className="py-3 text-slate-400 hover:text-text-main text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <ChevronLeft size={16} />
              Back to edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewItem({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{label}</span>
      <span className="text-sm font-semibold text-text-main">{value || "Not provided"}</span>
    </div>
  );
}
