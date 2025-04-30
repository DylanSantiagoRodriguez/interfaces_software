import React from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps {
  src: string;
  alt: string;
}

/**
 * Avatar component displays a user's profile image
 * 
 * @param {string} src - Image source URL
 * @param {string} alt - Alternative text for the image
 */
const Avatar: React.FC<AvatarProps> = ({ src, alt }) => {
  return (
    <img 
      src={src} 
      alt={alt} 
      className="h-8 w-8 rounded-full border-2 border-white"
    />
  );
};

interface TimelineEventProps {
  title: string;
  description: string;
  time: string;
  status?: 'pending' | 'active' | 'completed';
  avatars?: Array<{src: string, alt: string}>;
  highlight?: boolean;
}

/**
 * TimelineEvent component displays a single event in the timeline
 * 
 * @param {string} title - Event title
 * @param {string} description - Event description
 * @param {string} time - Formatted time string (e.g., "9:00 AM")
 * @param {string} status - Event status (pending, active, completed)
 * @param {Array} avatars - List of avatars to display
 * @param {boolean} highlight - Whether to highlight this event
 */
const TimelineEvent: React.FC<TimelineEventProps> = ({ 
  title, 
  description, 
  time, 
  status = 'pending',
  avatars = [],
  highlight = false
}) => {
  return (
    <article className={cn(
      "rounded-xl p-4 flex justify-between items-center mb-4",
      highlight ? "bg-blue-500 text-white" : "bg-gray-100"
    )}>
      <div className="flex-1">
        <h3 className="font-medium text-lg">{title}</h3>
        <p className={cn(
          "text-sm",
          highlight ? "text-blue-100" : "text-gray-500"
        )}>
          {description}
        </p>
        
        {avatars.length > 0 && (
          <div className="flex mt-2 space-x-[-0.5rem]">
            {avatars.map((avatar, i) => (
              <Avatar key={i} src={avatar.src} alt={avatar.alt} />
            ))}
          </div>
        )}
      </div>
      <div className="text-right">
        <span className={cn(
          "font-medium",
          highlight ? "text-white" : "text-gray-500"
        )}>
          {time}
        </span>
        
        {highlight && (
          <button className="ml-4 bg-white bg-opacity-20 p-2 rounded-lg">
            <span className="sr-only">More options</span>
            <div className="flex items-center justify-center">
              <div className="h-1 w-1 rounded-full bg-white mx-0.5"></div>
              <div className="h-1 w-1 rounded-full bg-white mx-0.5"></div>
              <div className="h-1 w-1 rounded-full bg-white mx-0.5"></div>
            </div>
          </button>
        )}
      </div>
    </article>
  );
};

export default TimelineEvent;