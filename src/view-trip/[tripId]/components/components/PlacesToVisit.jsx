import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Ticket, Star, Navigation } from 'lucide-react';
import { GetplaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import PlaceCardItem from './PlaceCardItem';

const timeSlots = ["9 AM - 12 PM", "2 PM - 5 PM", "After 5 PM"];

const PlacesToVisit = ({ trip }) => {
  const itinerary = trip?.tripData?.travelPlan?.itinerary || {};

  const sortedDays = Object.entries(itinerary).sort(([dayA], [dayB]) => {
    const dayNumA = parseInt(dayA.replace("day", ""), 10);
    const dayNumB = parseInt(dayB.replace("day", ""), 10);
    return dayNumA - dayNumB;
  });

  const fetchPlaceImages = async (placeName) => {
    const data = {
      textQuery: placeName,
    };
    try {
      const result = await GetplaceDetails(data);
      return result?.data?.places?.[0]?.photos?.map(photo =>
        PHOTO_REF_URL.replace('{NAME}', photo.name)
      );
    } catch (error) {
      console.error(`Error fetching images for ${placeName}:`, error);
      return [];
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Your Travel Itinerary
      </h1>

      <div className="grid gap-8">
        {sortedDays.map(([day, details], index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg shadow-md bg-white"
          >
            {/* Day Section */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4">
              <h2 className="text-2xl font-bold text-white capitalize">
                {day.replace("day", "Day ")}
              </h2>
              <div className="text-white/90 mt-2 flex flex-wrap gap-4">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Theme: {details.dayTheme}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Best Time: {details.bestTimeToVisit}
                </span>
              </div>
            </div>

            {/* Places Section */}
            <div className="p-6 space-y-8">
              {details.places.map((place, placeIndex) => (
                <PlaceCardItem
                  key={placeIndex}
                  place={place}
                  fetchImages={() => fetchPlaceImages(place.placeName)}
                  timeSlot={timeSlots[placeIndex % timeSlots.length]}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacesToVisit;
