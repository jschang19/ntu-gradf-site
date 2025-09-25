import React from 'react';

interface TimelineEvent {
  id: string;
  title: string;
  duration: string;
  icon?: React.ReactNode;
  description?: string;
}

interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export default function Timeline({ events, className = '' }: TimelineProps) {
  return (
    <div className={`w-full ${className}`}>
      {/* Desktop horizontal layout (lg and up) */}
      <div className="hidden md:block">
        <div className="relative pt-6">
          {/* Horizontal line - positioned to go through center of nodes */}
          <div className="absolute top-10 left-4 right-4 h-0.5 bg-gray-300 z-0"></div>
          {/* Events container */}
          <div className="flex items-start relative">
            {events.map((event, _index) => (
              <div key={event.id} className="group flex-1 flex flex-col items-center relative hover:translate-y-[3px] transition-all duration-300">
                {/* Event dot/icon */}
                <div className="size-8 bg-[#933244] rounded-full flex items-center justify-center mb-4 relative z-30 text-white group-hover:scale-120 transition-all duration-300">
                  {event.icon}
                </div>

                {/* Event content */}
                <div className="text-center px-2">
                  <div className="text-sm font-semibold text-gray-900 mb-1">
                    {event.title}
                  </div>
                  <div className="text-xs text-gray-600 mb-1">
                    {event.duration}
                  </div>
                  {event.description && (
                    <div className="text-xs text-gray-500">
                      {event.description}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile/tablet vertical layout (below lg) */}
      <div className="md:hidden">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-gray-300"></div>

          {/* Events container */}
          <div className="space-y-8">
            {events.map((event, _index) => (
              <div key={event.id} className="flex items-start relative">
                {/* Event dot/icon */}
                <div className="w-8 h-8 bg-[#933244] rounded-full flex items-center justify-center relative z-10 flex-shrink-0 text-white">
                  {event.icon}
                </div>

                {/* Event content */}
                <div className="ml-6 flex-1">
                  <div className="text-base font-semibold text-gray-900 mb-1">
                    {event.title}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    {event.duration}
                  </div>
                  {event.description && (
                    <div className="text-sm text-gray-500">
                      {event.description}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
