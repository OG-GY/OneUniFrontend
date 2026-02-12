"use client";

export default function Content() {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-[#2a2f91] relative overflow-hidden">
      {/* Abstract Color Shapes (Restrained, no gradients) */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -ml-48 -mb-48" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between p-16 w-full h-full text-white">

        <div className="flex flex-col gap-8 max-w-lg">
          <h1 className="font-bold text-5xl leading-[1.1] tracking-tight">
            Education infrastructure for the <span className="text-[#f6a21e]">next generation</span> of leaders.
          </h1>
          <p className="text-xl text-white/80 leading-relaxed font-medium">
            A unified platform for students, mentors, and institutions to connect, learn, and grow together.
          </p>

          <div className="flex flex-col gap-4 mt-8">
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 flex-shrink-0 rounded-full bg-white/10 flex items-center justify-center mt-1">
                <div className="w-2 h-2 bg-[#f6a21e] rounded-full" />
              </div>
              <p className="text-lg text-white/90">Centralized academic resources and guides</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 flex-shrink-0 rounded-full bg-white/10 flex items-center justify-center mt-1">
                <div className="w-2 h-2 bg-[#f6a21e] rounded-full" />
              </div>
              <p className="text-lg text-white/90">Direct connection with industry-leading mentors</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 flex-shrink-0 rounded-full bg-white/10 flex items-center justify-center mt-1">
                <div className="w-2 h-2 bg-[#f6a21e] rounded-full" />
              </div>
              <p className="text-lg text-white/90">Verified institutional representative access</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-12 border-t border-white/10 pt-10">
          <div>
            <p className="font-bold text-3xl">50K+</p>
            <p className="text-sm text-white/60 uppercase tracking-widest font-semibold mt-1">Students</p>
          </div>
          <div>
            <p className="font-bold text-3xl">200+</p>
            <p className="text-sm text-white/60 uppercase tracking-widest font-semibold mt-1">Universities</p>
          </div>
        </div>
      </div>
    </div>
  );
}
