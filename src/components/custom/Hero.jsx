import React from 'react';
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/723240/pexels-photo-723240.jpeg?cs=srgb&dl=flight-dawn-sky-723240.jpg&fm=jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8 w-full">
        <div className="space-y-8">
          {/* Left Column */}
          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-white">
            <span className="text-blue-400">Discover</span> the New World with
            <br />
            Your Personal Assistance
          </h1>
          <p className="text-xl text-gray-200 max-w-lg mx-auto">
            Embark on unforgettable journeys with personalized guidance at your fingertips. 
            Experience travel like never before.
          </p>
          <div className="flex justify-center gap-4">
            <Link to={'/create-trip'}>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Get Started
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
