import React from 'react';
import TimelineEvent from './TimelineEvent';

interface TimelineMarkerProps {
  status: 'pending' | 'active' | 'completed';
}

/**
 * TimelineMarker component displays a circle marker on the timeline
 * 
 * @param {string} status - Status of the marker (pending, active, completed)
 */
const TimelineMarker: React.FC<TimelineMarkerProps> = ({ status }) => {
  return (
    <div className="relative flex items-center justify-center">
      <div className={`h-4 w-4 rounded-full border-2 ${
        status === 'active' ? 'bg-blue-500 border-blue-500' :
        status === 'completed' ? 'bg-blue-200 border-blue-500' :
        'bg-white border-blue-200'
      }`}>
        {status === 'active' && (
          <div className="absolute inset-0 border-2 border-blue-200 rounded-full -m-2"></div>
        )}
      </div>
    </div>
  );
};

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  time: string;
  status: 'pending' | 'active' | 'completed';
  avatars?: Array<{src: string, alt: string}>;
  highlight?: boolean;
}

interface TimelineProps {
  events: TimelineEvent[];
}

/**
 * Timeline component displays a vertical timeline with events
 * 
 * @param {Array<TimelineEvent>} events - Array of events to display on timeline
 */
const Timeline: React.FC<TimelineProps> = ({ events }) => {
  return (
    <section className="relative">
      {/* Vertical line */}
      <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-blue-200 z-0"></div>
      
      {events.map((event, index) => (
        <div key={event.id} className="flex mb-6">
          <div className="mr-6 z-10">
            <TimelineMarker status={event.status} />
          </div>
          <div className="flex-1">
            <TimelineEvent
              title={event.title}
              description={event.description}
              time={event.time}
              avatars={event.avatars}
              highlight={event.highlight}
            />
          </div>
        </div>
      ))}
    </section>
  );
};

export default Timeline;