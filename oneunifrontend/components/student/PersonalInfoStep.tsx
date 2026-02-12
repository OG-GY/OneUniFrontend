import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, User, CreditCard, Calendar, Phone, Mail, Camera } from 'lucide-react';
import { ProfileData } from '../../lib/schemas/profile';
import Input from '../ui/input';
import Select from '../ui/select';
import Button from '../ui/button';
import { ValidatePersonalInfo, InfoErrors } from '@/lib/validation/validate';

interface PersonalInfoStepProps {
  data: ProfileData;
  updateData: (data: Partial<ProfileData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function PersonalInfoStep({ data, updateData, onNext, onBack }: PersonalInfoStepProps) {
  const [errors, setErrors] = useState<InfoErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
    if (errors[name as keyof InfoErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    updateData({ photo: file });
  };

  const handleNext = () => {
    const newErrors = ValidatePersonalInfo(data);
    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((msg) => msg && msg.length);
    if (!hasErrors) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-text-main tracking-tight">Personal Information</h2>
        <p className="text-sm text-slate-500 font-medium">Please provide your details exactly as they appear on your government documents.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Form Side */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            <Input
              label="Full Name"
              name="fullName"
              value={data.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              leftIcon={<User size={18} />}
              error={errors.fullName}
            />

            <Input
              label="Father's Name"
              name="fatherName"
              value={data.fatherName}
              onChange={handleChange}
              placeholder="Father's Name"
              leftIcon={<User size={18} />}
              error={errors.fatherName}
            />

            <Input
              label="CNIC Number"
              name="cnic"
              value={data.cnic}
              onChange={handleChange}
              placeholder="12345-1234567-1"
              leftIcon={<CreditCard size={18} />}
              error={errors.cnic}
            />

            <Input
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={data.dateOfBirth}
              onChange={handleChange}
              leftIcon={<Calendar size={18} />}
              error={errors.dateOfBirth}
            />

            <Select
              label="Gender"
              name="gender"
              value={data.gender}
              onChange={handleChange as any}
              error={errors.gender}
              options={[
                { label: "Select Gender", value: "" },
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Other", value: "other" },
              ]}
              className="h-[54px]"
            />

            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              value={data.phone}
              onChange={handleChange}
              placeholder="03XX-XXXXXXX"
              leftIcon={<Phone size={18} />}
              error={errors.phone}
            />

            <div className="md:col-span-2">
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={data.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                leftIcon={<Mail size={18} />}
                error={errors.email}
              />
            </div>
          </div>
        </div>

        {/* Photo Upload Side */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          <div className="flex flex-col items-center gap-6 p-6 bg-slate-50 rounded-xl border border-slate-200">
            <div className="relative">
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center border-2 border-slate-200 overflow-hidden shadow-sm">
                {data.photo ? (
                  <img src={URL.createObjectURL(data.photo)} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={48} className="text-slate-200" />
                )}
              </div>
              <label className="absolute bottom-0 right-0 p-3 bg-primary text-white rounded-full cursor-pointer hover:bg-brand-blue-dark transition-all shadow-md">
                <Camera size={16} />
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>
            </div>
            <div className="text-center">
              <p className="font-bold text-text-main text-sm">Profile Photo</p>
              <p className="text-[11px] text-slate-500 mt-1 font-medium leading-relaxed">
                Upload a clear passport-size photo.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              onClick={handleNext}
              className="w-full h-12 rounded-lg text-sm font-bold shadow-sm"
              iconRight={<ChevronRight size={18} />}
            >
              Save & Continue
            </Button>
            
            <button
              onClick={onBack}
              className="w-full py-2 text-slate-500 hover:text-text-main text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <ChevronLeft size={14} />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}