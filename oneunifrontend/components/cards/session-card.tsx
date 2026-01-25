import { MentorshipSession } from '@/lib/dummy-data';
import Button from '@/components/ui/button';
import { Calendar, Clock, Video, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface SessionCardProps {
  session: MentorshipSession;
  showPeer?: boolean; // Show the other person (mentor for student, student for mentor)
  role: 'mentor' | 'student';
}

export function SessionCard({ session, showPeer = true, role }: SessionCardProps) {
  const peer = role === 'mentor' ? session.student : session.mentor;
  // If peer is mentor (MockMentor), access .user for profile pic. If peer is user, access directly.
  const peerImage = role === 'student' && session.mentor 
    ? session.mentor.user.profilePictureUrl 
    : (session.student?.profilePictureUrl);
    
  const peerName = role === 'student' && session.mentor
    ? session.mentor.user.fullName
    : (session.student?.fullName);

  const isUpcoming = new Date(session.scheduledAt) > new Date();
  
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Session Info */}
        <div className="flex items-start gap-4">
          <div className="flex flex-col items-center justify-center w-14 h-14 bg-primary/5 rounded-lg text-primary shrink-0">
            <span className="text-xs font-bold uppercase">{new Date(session.scheduledAt).toLocaleString('default', { month: 'short' })}</span>
            <span className="text-xl font-bold">{new Date(session.scheduledAt).getDate()}</span>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 line-clamp-1">{session.topic}</h4>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span>
                  {new Date(session.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
                  {' '}({session.durationMinutes} min)
                </span>
              </div>
              
              <div className="flex items-center gap-1.5">
                <div className={cn(
                  "w-1.5 h-1.5 rounded-full", 
                  session.sessionType === 'paid' ? "bg-emerald-500" : "bg-blue-500"
                )} />
                <span className="capitalize">{session.sessionType} Session</span>
              </div>
            </div>

            {showPeer && peer && (
              <div className="flex items-center gap-2 mt-3">
                <div className="h-6 w-6 rounded-full bg-gray-200 overflow-hidden relative">
                   {peerImage ? (
                      <Image 
                        src={peerImage} 
                        alt={peerName || 'User'}
                        fill
                        className="object-cover"
                      />
                   ) : (
                     <User className="h-4 w-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400"/>
                   )}
                </div>
                <span className="text-sm text-gray-600">with <span className="font-medium text-gray-900">{peerName}</span></span>
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2 self-start md:self-center w-full md:w-auto mt-2 md:mt-0">
          {session.status === 'scheduled' && (
            <Button size="sm" className="w-full md:w-auto bg-primary hover:bg-primary/90">
              <Video className="h-4 w-4 mr-2" />
              Join Call
            </Button>
          )}
          {session.status === 'completed' && (
             <Button variant="outline" size="sm" className="w-full md:w-auto">
               View Notes
             </Button>
          )}
        </div>
      </div>
    </div>
  );
}
