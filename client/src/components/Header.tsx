import React from 'react';
import logo from '../assets/logo.svg';

// Define the props type
interface HeaderProps {
  heading: string;
  description: string;
}

const Header: React.FC<HeaderProps> = ({ heading, description }) => {
  return (
    <div className="bg-gray-900 px-6 py-12 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <img
          alt="Logo"
          src={logo}
          className="mx-auto h-10 w-auto mb-10"
        />
        <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {heading}
        </h2>
        <p className="mt-8 text-pretty text-lg font-medium text-gray-400 sm:text-xl/8">
          {description}
        </p>
      </div>
    </div>
  );
}

export default Header;
