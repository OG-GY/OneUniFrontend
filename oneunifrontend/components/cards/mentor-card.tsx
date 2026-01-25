import { Mentor } from '@/lib/dummy-data';
import Button from '@/components/ui/button';
import { Star, School, Briefcase, Clock, MapPin } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

interface MentorCardProps {
  mentor: Mentor;
}

export function MentorCard({ mentor }: MentorCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col h-full">
      {/* Header / Cover (Gradient) */}
      <div className="h-24 bg-gradient-to-r from-primary/10 to-secondary/10 relative">
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-sm">
          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
          {mentor.averageRating} <span className="text-gray-400 font-normal">({mentor.totalSessions})</span>
        </div>
      </div>

      <div className="px-6 pb-6 flex-1 flex flex-col">
        {/* Avatar */}
        <div className="-mt-12 mb-4 relative">
          <div className="h-24 w-24 rounded-full border-4 border-white shadow-md bg-gray-50 overflow-hidden relative mx-auto md:mx-0">
             {mentor.user.profilePictureUrl ? (
                <Image 
                  src={mentor.user.profilePictureUrl} 
                  alt={mentor.user.fullName}
                  fill
                  className="object-cover"
                />
             ) : (
                <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-400 font-bold text-2xl">
                  {mentor.user.fullName.charAt(0)}
                </div>
             )}
          </div>
        </div>

        {/* Info */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
            {mentor.user.fullName}
          </h3>
          <p className="text-primary font-medium text-sm flex items-center justify-center md:justify-start gap-1 mt-1">
             <Briefcase className="h-3.5 w-3.5" />
             {mentor.designation}
          </p>
          <p className="text-gray-500 text-xs flex items-center justify-center md:justify-start gap-1 mt-1">
             <School className="h-3.5 w-3.5" />
             {mentor.currentInstitution}
          </p>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
          {mentor.specializations.slice(0, 3).map((spec, i) => (
            <Badge key={i} variant="secondary" className="bg-gray-100 text-gray-600 hover:bg-gray-200 font-normal text-xs border-0">
              {spec}
            </Badge>
          ))}
          {mentor.specializations.length > 3 && (
            <span className="text-xs text-gray-400 flex items-center">+{mentor.specializations.length - 3} more</span>
          )}
        </div>

        <div className="mt-4 mb-6">
           <p className="text-sm text-gray-600 line-clamp-2">
             {mentor.bio}
           </p>
        </div>

        {/* Footer / Actions */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">Rs. {mentor.hourlyRate}</span>
            <span className="text-xs text-gray-500">/hour</span>
          </div>
          <Button size="sm" className="bg-primary hover:bg-primary/90 shadow-minimal hover:shadow-minimal-hover">
            View Profile
          </Button>
        </div>
      </div>
    </div>
  );
}
