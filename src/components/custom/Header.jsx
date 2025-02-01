import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { User, PlusCircle, Map } from 'lucide-react';

function Header() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Check if user details exist in localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.email) {
      setIsSignedIn(true);
      setUserName(storedUser.name || "User"); // Default to "User" if name is not available
    }
  }, []);

  return (
    <header
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md"
      style={{
        backgroundImage: "url('https://wallpaperaccess.com/full/1431622.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <img src="/Tbo.jpg" alt="TBO Logo" className="h-24 w-auto object-contain" />
          </div>

          {/* Buttons Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isSignedIn ? (
              <>
                {/* Greeting */}
                <span className="text-gray-700 font-medium">
                  Welcome, {userName}!
                </span>
                
                {/* Create Trip Button */}
                <Button className="bg-green-600 hover:bg-green-700">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Trip
                </Button>

                {/* My Trips Button */}
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Map className="h-4 w-4 mr-2" />
                  My Trips
                </Button>
              </>
            ) : (
              <Button className="bg-blue-600 hover:bg-blue-700">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
