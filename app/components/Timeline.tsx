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
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>

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

// Example usage component (you can remove this if not needed)
export function TimelineExample() {
  const sampleEvents: TimelineEvent[] = [
    {
      id: '1',
      title: '線上報名、繳費',
      duration: '10/01 09:00 - 10/08 24:00',
      description: '開放線上報名系統申請',
    },
    {
      id: '2',
      title: '上傳應繳交資料',
      duration: '10/01 09:00 - 10/09 17:00',
      description: '紙本郵寄需於截止日 17:00 前送達',
    },
    {
      id: '3',
      title: '初審結果公布',
      duration: '2025/03/15',
      description: '公布初審通過名單',
    },
    {
      id: '4',
      title: '面試階段',
      duration: '2025/04/01 - 04/05',
      description: '進行口試或實作測驗',
    },
    {
      id: '5',
      title: '最終結果公布',
      duration: '2025/04/15',
      description: '公布最終錄取結果',
    },
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-8 text-center">招生時程</h2>
      <Timeline events={sampleEvents} />
    </div>
  );
}
