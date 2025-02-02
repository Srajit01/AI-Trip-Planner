import React, { useState, useEffect } from 'react';
import { Ticket, Star, Navigation } from 'lucide-react';

function PlaceCardItem({ place, fetchImages, timeSlot }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      const fetchedImages = await fetchImages();
      setImages(fetchedImages || []);
    };
    loadImages();
  }, [fetchImages]);

  return (
    <div className="border rounded-lg p-4 shadow-md transition-transform duration-300 hover:shadow-xl hover:scale-105">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          {images.length > 0 ? (
            <div className="relative w-full h-48 overflow-hidden rounded-lg">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={place.placeName}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                  style={{ opacity: index === 0 ? 1 : 0 }}
                />
              ))}
            </div>
          ) : (
            <img
              src="/Trv.jpg"
              alt={place.placeName}
              className="w-full h-48 object-cover rounded-lg"
            />
          )}
        </div>

       
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-3 text-gray-800">
            {place.placeName}
          </h3>

          <p className="text-gray-600 mb-4 leading-relaxed">
            {place.placeDetails}
          </p>

          <p className="text-gray-700 mb-3">
            <strong>Suggested Time:</strong> {timeSlot}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-gray-700">
              <Ticket className="w-4 h-4 text-blue-500" />
              <span className="font-medium">Ticket:</span> {place.ticketPricing}
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <Navigation className="w-4 h-4 text-blue-500" />
              <span className="font-medium">Travel Time:</span> {place.timeToTravel}
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="font-medium">Rating:</span> {place.rating}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceCardItem;
