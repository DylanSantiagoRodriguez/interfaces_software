"use client";

import React, { useState } from 'react';
import Header from '../components/Header';
import DaySelector from '../components/DaySelector';
import Timeline from '../components/Timeline';
import NavigationBar from '../components/NavigationBar';

// Sample data for timeline events
const sampleEvents = [
  {
    id: '1',
    title: 'Wakeup',
    description: 'Early wakeup from bed and fresh',
    time: '7:00 AM',
    status: 'completed' as const,
  },
  {
    id: '2',
    title: 'Morning Exercise',
    description: '4 types of exercise',
    time: '8:00 AM',
    status: 'completed' as const,
  },
  {
    id: '3',
    title: 'Meeting',
    description: 'Zoom call, Discuss team task for the day',
    time: '9:00 AM',
    status: 'active' as const,
    highlight: true,
    avatars: [
      { src: 'https://i.pravatar.cc/150?img=1', alt: 'Team member 1' },
      { src: 'https://i.pravatar.cc/150?img=2', alt: 'Team member 2' },
      { src: 'https://i.pravatar.cc/150?img=3', alt: 'Team member 3' },
      { src: 'https://i.pravatar.cc/150?img=4', alt: 'Team member 4' },
    ]
  },
  {
    id: '4',
    title: 'Breakfast',
    description: 'Morning breakfast with bread, banana egg bowl and tea.',
    time: '10:00 AM',
    status: 'pending' as const,
  },
];

const Index: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2020, 4, 5)); // May 5, 2020 to match the image

  return (
    <main className="min-h-screen bg-gray-500 dark:bg-gray-900 flex justify-center">
      <div className="w-full max-w-md bg-white dark:text-gray-900 min-h-screen shadow-lg rounded-3xl overflow-hidden relative">
        <div className="p-6 pb-24">
          <Header date={currentDate} />
          <DaySelector selectedDate={currentDate} onSelectDate={setCurrentDate} />
          <Timeline events={sampleEvents} />
        </div>
        <NavigationBar />
      </div>
    </main>
  );
};

export default Index;
