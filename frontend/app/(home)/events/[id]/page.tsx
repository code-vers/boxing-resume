'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getEventById } from '@/features/rankings/api/rankings.api';
import Image from 'next/image';

export default function EventDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['event', id],
    queryFn: () => getEventById(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <main className="bg-[#f1ede1] min-h-screen py-32 px-6 flex items-center justify-center">
        <p className="text-[#0a0a0a] font-['Bebas_Neue'] text-3xl uppercase tracking-widest animate-pulse">
          Loading Event Details...
        </p>
      </main>
    );
  }

  if (isError || !data?.data) {
    return (
      <main className="bg-[#f1ede1] min-h-screen py-32 px-6 flex flex-col items-center justify-center">
        <p className="text-[#d72322] font-['Bebas_Neue'] text-3xl uppercase tracking-widest mb-6">
          Event Not Found
        </p>
        <button 
          onClick={() => router.back()} 
          className="text-[#0a0a0a] font-medium border-b border-[#0a0a0a] hover:text-[#d72322] hover:border-[#d72322] transition-colors pb-1"
        >
          Go Back
        </button>
      </main>
    );
  }

  const event = data.data;
  const posterUrl = event.poster_image_url;
  const dateStr = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  let broadcasterStr = '';
  let isPPV = false;
  if (event.broadcast && event.broadcast.length > 0) {
     const types = event.broadcast[0].broadcasters.join(', ');
     if (types.toLowerCase().includes('ppv')) isPPV = true;
     broadcasterStr = types;
  }

  return (
    <main className="bg-[#f1ede1] min-h-screen pb-20">
      {/* Cinematic Header */}
      <section className="relative w-full h-[60vh] md:h-[75vh] bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
        {posterUrl ? (
          <>
            {/* Blurred Background */}
            <div className="absolute inset-0">
              <Image 
                src={posterUrl} 
                alt={event.title} 
                fill 
                quality={50} 
                unoptimized 
                className="object-cover opacity-20 blur-3xl scale-110" 
              />
            </div>
            {/* Centered Poster */}
            <div className="relative w-full h-full max-w-4xl mx-auto py-12 px-6 z-10 flex items-center justify-center">
              <Image 
                src={posterUrl} 
                alt={event.title} 
                fill 
                quality={100} 
                unoptimized 
                className="object-contain drop-shadow-2xl" 
              />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-6 z-10">
            <h1 className="text-5xl md:text-7xl font-['Bebas_Neue'] text-white uppercase tracking-wider mb-4">
              {event.title}
            </h1>
            <p className="text-white/70 text-lg md:text-xl font-medium tracking-wide">
              {dateStr}
            </p>
          </div>
        )}

        {/* Bottom Gradient Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#f1ede1] to-transparent z-20 pointer-events-none" />
        
        {/* Back Button Overlay */}
        <button 
          onClick={() => router.back()} 
          className="absolute top-8 left-6 md:left-12 z-30 flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
        >
          <span>←</span> <span className="text-sm font-medium tracking-wide">Back to Events</span>
        </button>
      </section>

      {/* Details Section */}
      <section className="relative z-30 max-w-5xl mx-auto px-6 -mt-16 md:-mt-24">
        <div className="bg-white border border-[#e8e2d8] rounded-xl shadow-xl overflow-hidden">
          
          {/* Main Info Header */}
          <div className="bg-[#0a0a0a] p-8 md:p-10 text-center">
            {isPPV && (
              <span className="inline-block bg-[#d72322] text-white text-[10px] font-bold tracking-widest px-4 py-1.5 rounded-full uppercase mb-6">
                Pay-Per-View Event
              </span>
            )}
            <h1 className="text-4xl md:text-6xl font-['Bebas_Neue'] text-white uppercase tracking-wide leading-tight mb-4">
              {event.title}
            </h1>
            <p className="text-[#a09c96] text-sm md:text-base font-medium tracking-widest uppercase flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
              <span>{dateStr}</span>
              <span className="hidden md:block">•</span>
              <span className="text-white">{event.venue || 'TBA'}</span>
            </p>
            {event.location && (
              <p className="text-[#a09c96] text-sm mt-2 font-medium">
                {event.location}
              </p>
            )}
          </div>

          {/* Grid Details */}
          <div className="p-8 md:p-12">
            <h3 className="text-2xl font-['Bebas_Neue'] text-[#0a0a0a] uppercase tracking-wide border-b border-[#e8e2d8] pb-4 mb-8">
              Event Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              
              {/* Broadcasters */}
              <div>
                <h4 className="text-xs font-bold text-[#857f78] uppercase tracking-widest mb-2">Broadcaster(s)</h4>
                <p className="text-lg font-medium text-[#0a0a0a]">
                  {broadcasterStr || 'TBA'}
                </p>
              </div>

              {/* Promoters */}
              <div>
                <h4 className="text-xs font-bold text-[#857f78] uppercase tracking-widest mb-2">Promoter</h4>
                <p className="text-lg font-medium text-[#0a0a0a]">
                  {event.promotion || 'TBA'}
                  {event.co_promotion && (
                    <span className="block text-sm text-[#555555] mt-1">Co-promoter: {event.co_promotion}</span>
                  )}
                </p>
              </div>

              {/* TV Announcers */}
              <div>
                <h4 className="text-xs font-bold text-[#857f78] uppercase tracking-widest mb-2">TV Announcers</h4>
                <p className="text-lg font-medium text-[#0a0a0a]">
                  {event.tv_announcers || 'TBA'}
                </p>
              </div>

              {/* Ring Announcer */}
              <div>
                <h4 className="text-xs font-bold text-[#857f78] uppercase tracking-widest mb-2">Ring Announcer</h4>
                <p className="text-lg font-medium text-[#0a0a0a]">
                  {event.ring_announcers || 'TBA'}
                </p>
              </div>

            </div>
            
            {/* Note about undercard */}
            <div className="mt-12 bg-[#f0ebe1] rounded-lg p-6 text-center border border-[#e8e2d8]">
               <p className="text-[#555555] text-sm font-medium">
                 Full fight card and undercard details will be updated as they become available.
               </p>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
