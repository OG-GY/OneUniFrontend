"use client";

import { useState } from 'react';
import { User, Mail, Phone, Camera, ChevronRight, Briefcase, School, Award, Sparkles } from 'lucide-react';
import { MentorProfileData } from '@/lib/schemas/mentor';
import { ValidateMentorPersonalInfo, ValidateMentorProfessional } from '@/lib/validation/mentor';
import Input from '../ui/input';
import Select from '../ui/select';
import Button from '../ui/button';

interface ProfileSetupStepProps {
  data: MentorProfileData;
  updateData: (data: Partial<MentorProfileData>) => void;
  onNext: () => void;
}

export function ProfileSetupStep({ data, updateData, onNext }: ProfileSetupStepProps) {
  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    updateData({ photo: file });
  };

  const handleNext = () => {
    const personalErrors = ValidateMentorPersonalInfo(data);
    const professionalErrors = ValidateMentorProfessional(data);
    const allErrors = { ...personalErrors, ...professionalErrors };
    
    setErrors(allErrors);
    if (Object.keys(allErrors).length === 0) onNext();
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 rounded-md border border-primary/10 w-fit">
          <Sparkles size={14} className="text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Expert Onboarding</span>
        </div>
        <h2 className="text-3xl font-bold text-text-main tracking-tight leading-tight">Create your Professional Profile</h2>
        <p className="text-base text-slate-500 font-medium max-w-3xl">Introduce yourself to the community. Your professional background helps students find the right expert.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-8 flex flex-col gap-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            <Input
              label="Full Name"
              name="fullName"
              value={data.fullName}
              onChange={handleChange}
              placeholder="Ex: Dr. Zainab Ahmed"
              leftIcon={<User size={18} />}
              error={errors.fullName}
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              value={data.email}
              onChange={handleChange}
              placeholder="zainab@example.com"
              leftIcon={<Mail size={18} />}
              error={errors.email}
            />

            <Input
                label="Contact Number"
                name="phone"
                type="tel"
                value={data.phone}
                onChange={handleChange}
                placeholder="03XX-XXXXXXX"
                leftIcon={<Phone size={18} />}
                error={errors.phone}
            />

            <Select
                label="Current Position"
                name="position"
                value={data.position}
                onChange={handleChange}
                error={errors.position}
                options={[
                { label: "Student", value: "Student" },
                { label: "Teacher / Professor", value: "Teacher" },
                { label: "Administration", value: "Administration" },
                { label: "Industry Employee", value: "Employee" },
                ]}
            />

            <Input
                label="Company / Institute Name"
                name="institution"
                value={data.institution}
                onChange={handleChange}
                placeholder="Ex: NUST, Google, FAST"
                leftIcon={<School size={18} />}
                error={errors.institution}
            />

            <Input
                label="Years of Experience"
                name="experienceYears"
                type="number"
                value={data.experienceYears}
                onChange={handleChange}
                placeholder="Ex: 5"
                leftIcon={<Award size={18} />}
                error={errors.experienceYears}
            />

            <div className="md:col-span-2">
                <label className="block text-sm font-bold text-text-body mb-2 ml-1">
                Professional Bio
                </label>
                <textarea
                name="bio"
                value={data.bio}
                onChange={handleChange}
                rows={3}
                placeholder="Briefly describe your expertise and how you can help students..."
                className="w-full bg-white border border-slate-200 rounded-xl p-4 text-sm font-medium focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all placeholder:text-slate-400"
                />
                {errors.bio && <p className="text-xs text-red-500 font-bold mt-1 ml-1">{errors.bio}</p>}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-8">
          <div className="flex flex-col items-center gap-6 p-8 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm/5">
            <div className="relative">
              <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center border-4 border-white shadow-md overflow-hidden ring-1 ring-slate-100">
                {data.photo ? (
                  <img src={URL.createObjectURL(data.photo)} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={64} className="text-slate-200" />
                )}
              </div>
              <label className="absolute bottom-2 right-2 p-3 bg-primary text-white rounded-full cursor-pointer hover:scale-105 transition-all shadow-lg">
                <Camera size={18} />
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>
            </div>
            <div className="text-center">
              <p className="font-bold text-text-main text-sm">Professional Photo</p>
              <p className="text-[11px] text-slate-500 mt-1 font-medium leading-relaxed">
                Clear headshots increase trust by 40%.
              </p>
            </div>
          </div>

          <Button
            onClick={handleNext}
            className="w-full h-14 rounded-xl text-md font-bold shadow-lg shadow-primary/10"
            iconRight={<ChevronRight size={20} />}
          >
            Configure Mentorship
          </Button>
        </div>
      </div>
    </div>
  );
}
