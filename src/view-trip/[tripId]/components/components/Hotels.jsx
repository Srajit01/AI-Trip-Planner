import React from 'react';
import HotelCarditem from './HotelCarditem';

function Hotels({ trip }) {
  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl">
      <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center underline">
        Hotel Recommendations
      </h2>

      <div className="flex flex-wrap -mx-4">
        {Array.isArray(trip?.tripData?.travelPlan?.hotelOptions) &&
          trip?.tripData?.travelPlan?.hotelOptions.map((hotel, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/3 px-4 mb-8 transition-transform transform hover:scale-105"
            >
              <HotelCarditem hotel={hotel} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Hotels;
