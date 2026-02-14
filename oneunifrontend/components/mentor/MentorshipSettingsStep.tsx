"use client";

import { useState } from 'react';
import { BookOpen, Check, Clock, ChevronRight, ChevronLeft } from 'lucide-react';
import { MentorProfileData } from '@/lib/schemas/mentor';
import { ValidateMentorGuidance, ValidateMentorAvailability } from '@/lib/validation/mentor';
import Button from '../ui/button';
import Input from '../ui/input';
import clsx from 'clsx';

interface MentorshipSettingsStepProps {
  data: MentorProfileData;
  updateData: (data: Partial<MentorProfileData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const TOPICS = [
  { id: "Admission", title: "Admission Support", desc: "Strategy and application help." },
  { id: "University Selection", title: "University Selection", desc: "Finding the perfect fit." },
  { id: "General Guidance", title: "General Guidance", desc: "Daily student life & culture." },
  { id: "Career Counseling", title: "Career Counseling", desc: "Post-grad job market paths." },
  { id: "Technical Skills", title: "Technical Skills", desc: "Code, Design, or Engineering." },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function MentorshipSettingsStep({ data, updateData, onNext, onBack }: MentorshipSettingsStepProps) {
  const [errors, setErrors] = useState<any>({});

  const toggleTopic = (topicId: string) => {
    const current = data.guidanceTopics || [];
    if (current.includes(topicId)) {
      updateData({ guidanceTopics: current.filter(t => t !== topicId) });
    } else {
      updateData({ guidanceTopics: [...current, topicId] });
    }
    setErrors((prev: any) => ({ ...prev, guidanceTopics: "" }));
  };

  const toggleDay = (day: string) => {
    const current = data.availableDays || [];
    if (current.includes(day)) {
      updateData({ availableDays: current.filter(d => d !== day) });
    } else {
      updateData({ availableDays: [...current, day] });
    }
    setErrors((prev: any) => ({ ...prev, availableDays: "" }));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
  };

  const handleNext = () => {
    const guidanceErrors = ValidateMentorGuidance(data);
    const availabilityErrors = ValidateMentorAvailability(data);
    const allErrors = { ...guidanceErrors, ...availabilityErrors };
    
    setErrors(allErrors);
    if (Object.keys(allErrors).length === 0) onNext();
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold text-text-main tracking-tight">Mentorship Settings</h2>
        <p className="text-base text-slate-500 font-medium">Define your boundaries and areas of expertise.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Guidance Topics */}
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="text-sm font-bold text-text-main uppercase tracking-widest mb-1">Expertise Areas</h3>
            <p className="text-xs text-slate-400 font-medium mb-4">Select at least one specialization.</p>
          </div>
          
          <div className="flex flex-col gap-3">
            {TOPICS.map((topic) => {
              const isSelected = data.guidanceTopics?.includes(topic.id);
              return (
                <button
                  key={topic.id}
                  onClick={() => toggleTopic(topic.id)}
                  className={clsx(
                    "p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between group",
                    isSelected 
                      ? "bg-primary border-primary shadow-md shadow-primary/10" 
                      : "bg-white border-slate-100 hover:border-slate-200"
                  )}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className={clsx(
                      "font-bold text-sm",
                      isSelected ? "text-white" : "text-text-main"
                    )}>
                      {topic.title}
                    </span>
                    <p className={clsx(
                      "text-[10px] font-medium",
                      isSelected ? "text-white/80" : "text-slate-400"
                    )}>
                      {topic.desc}
                    </p>
                  </div>
                  {isSelected && <Check size={16} className="text-white shrink-0" />}
                </button>
              )
            })}
          </div>
          {errors.guidanceTopics && <p className="text-xs text-red-500 font-bold ml-1">{errors.guidanceTopics}</p>}
        </div>

        {/* Right: Availability */}
        <div className="flex flex-col gap-8 bg-slate-50/50 p-8 rounded-3xl border border-slate-100">
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-sm font-bold text-text-main uppercase tracking-widest mb-1 flex items-center gap-2">
                <Clock size={16} className="text-primary" />
                Your Schedule
              </h3>
              <p className="text-xs text-slate-400 font-medium font-medium">When students can book sessions with you.</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {DAYS.map((day) => {
                const isSelected = data.availableDays?.includes(day);
                return (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={clsx(
                      "w-[54px] h-[54px] rounded-xl border-2 text-xs font-bold transition-all flex items-center justify-center",
                      isSelected 
                        ? "bg-primary text-white border-primary" 
                        : "bg-white border-slate-200 text-slate-400 hover:border-slate-300"
                    )}
                  >
                    {day}
                  </button>
                )
              })}
            </div>
            {errors.availableDays && <p className="text-xs text-red-500 font-bold">{errors.availableDays}</p>}

            <div className="grid grid-cols-2 gap-4 items-end mt-2">
              <Input
                label="Start Time"
                name="timeRangeStart"
                type="time"
                value={data.timeRangeStart}
                onChange={handleTimeChange}
              />
              <Input
                label="End Time"
                name="timeRangeEnd"
                type="time"
                value={data.timeRangeEnd}
                onChange={handleTimeChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-10 border-t border-slate-100">
        <Button
          onClick={handleNext}
          className="h-14 px-12 rounded-xl text-md font-bold shadow-xl shadow-primary/10"
          iconRight={<ChevronRight size={20} />}
        >
          Final Review
        </Button>
        
        <button
          onClick={onBack}
          className="py-3 px-8 text-slate-500 hover:text-text-main text-sm font-bold transition-colors flex items-center gap-2"
        >
          <ChevronLeft size={16} />
          Back
        </button>
      </div>
    </div>
  );
}
