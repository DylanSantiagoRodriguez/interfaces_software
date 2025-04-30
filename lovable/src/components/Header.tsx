import React from 'react';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  date: Date;
}

/**
 * Header component displays the current date and "Today" heading
 * 
 * @param {Date} date - The current date to display
 */
const Header: React.FC<HeaderProps> = ({ date }) => {
  // Format date as "Month Day, Year"
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <header className="mb-6 flex justify-between items-center">
      <div>
        <p className="text-gray-500 dark:text-gray-900 mb-1">{formattedDate}</p>
        <h1 className="text-4xl font-bold dark:text-gray-900">Today</h1>
      </div>
      <ThemeToggle />
    </header>
  );
};

export default Header;
