import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function MyTrips() {
    const [userTrips, setUserTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTrips();
    }, []);
    const fetchTrips = async () => {
      try {
           let trips = localStorage.getItem("userTrips");
           trips = trips ? JSON.parse(trips) : [];
           setUserTrips(trips);
          setLoading(false)
          } catch (e) {
              console.error("Error fetching user trip details from local storage:", e);
               setError("Failed to fetch trips");
              setLoading(false);
          }
    }
    return (
        <div className="min-h-screen bg-gray-100 py-6">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">My Trips</h2>
                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto"></div>
                        <p className="text-gray-600 mt-4">Loading your Trips...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-12">
                        <p className="text-red-600 text-lg">{error}</p>
                    </div>
                ) : (
                  <>
                    {userTrips.length === 0 ? (
                        <p className="text-gray-600">No trips found.</p>
                    ) : (
                      <ul className="space-y-4">
                            {userTrips.map((trip, index) => (
                                <li key={index} className="p-4 border border-gray-300 rounded-lg hover:shadow-md transition-shadow duration-300 bg-gray-50">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{trip.city}</h3>
                                    <div className="flex gap-2 text-gray-600">
                                        <span><strong>Check-in:</strong> {trip.checkIn}</span>
                                        <span><strong>Check-out:</strong> {trip.checkOut}</span>
                                    </div>
                                       {trip.paxRooms && (
                                       <div className="flex gap-2">
                                            {trip.paxRooms.map((room, index) => (
                                                  <div key={index} className="text-gray-600">
                                                       <span>Adults: {room.Adults}</span>, <span>Child: {room.Child}</span>
                                                   </div>
                                             ))}
                                          </div>
                                        )}
                                </li>
                            ))}
                        </ul>
                    )}
                       <div className="mt-8 text-center">
                        <p className="text-gray-700 font-medium">
                        Powered by TBO Holidays for all your bookings
                        </p>
                            <a href="https://www.tboholidays.com/" target="_blank" rel="noopener noreferrer" className="inline-block mt-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                                Visit TBO Holidays
                            </a>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default MyTrips;