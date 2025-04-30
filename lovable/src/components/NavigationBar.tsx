import React from 'react';
import { Clock, User, Plus } from 'lucide-react';

/**
 * NavigationBar component displays the bottom navigation with icons
 */
const NavigationBar: React.FC = () => {
  return (
    <nav className="fixed bottom-6 left-0 right-0 mx-auto flex justify-center">
      <div className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg">
        <button className="p-4 text-blue-500 dark:text-blue-400">
          <Clock size={24} />
          <span className="sr-only">Schedule</span>
        </button>
        
        <button className="p-4 bg-blue-500 dark:bg-blue-600 rounded-full mx-4 text-white shadow-lg transform transition-transform hover:scale-105">
          <Plus size={24} />
          <span className="sr-only">Add event</span>
        </button>
        
        <button className="p-4 text-gray-400 dark:text-gray-500">
          <User size={24} />
          <span className="sr-only">Profile</span>
        </button>
      </div>
    </nav>
  );
};

export default NavigationBar;