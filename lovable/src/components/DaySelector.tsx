
import React from 'react';
import { cn } from '@/lib/utils';

interface DayProps {
  day: string;
  date: number;
  isSelected?: boolean;
  onSelect: () => void;
}

/**
 * Day component represents a single day in the day selector
 * 
 * @param {string} day - Three letter abbreviation of day name
 * @param {number} date - The date number
 * @param {boolean} isSelected - Whether this day is currently selected
 * @param {() => void} onSelect - Function to call when this day is selected
 */
const Day: React.FC<DayProps> = ({ day, date, isSelected = false, onSelect }) => {
  return (
    <button
      onClick={onSelect}
      className="flex flex-col items-center"
    >
      <span className={cn(
        "text-sm font-medium mb-1",
        isSelected ? "text-blue-500" : "text-gray-500"
      )}>
        {day}
      </span>
      <span className={cn(
        "text-lg",
        isSelected ? "text-blue-500 font-bold" : ""
      )}>
        {date}
      </span>
      {isSelected && (
        <span className="h-1 w-1 bg-blue-500 rounded-full mt-1" />
      )}
    </button>
  );
};

interface DaySelectorProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

/**
 * DaySelector component displays a horizontal list of days for selection
 * 
 * @param {Date} selectedDate - The currently selected date
 * @param {(date: Date) => void} onSelectDate - Function to call when a date is selected
 */
const DaySelector: React.FC<DaySelectorProps> = ({ selectedDate, onSelectDate }) => {
  // Generate array of 7 dates starting from 3 days before selected date
  const dates = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() - 3 + i);
    return date;
  });

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <nav className="flex justify-between mb-8 px-2">
      {dates.map((date, i) => (
        <Day
          key={i}
          day={dayNames[date.getDay()]}
          date={date.getDate()}
          isSelected={date.toDateString() === selectedDate.toDateString()}
          onSelect={() => onSelectDate(date)}
        />
      ))}
    </nav>
  );
};

export default DaySelector;