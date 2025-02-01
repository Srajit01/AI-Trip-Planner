import React, { useState, useEffect } from 'react';
import { GetplaceDetails } from '@/service/GlobalApi';
import { PHOTO_REF_URL } from '@/service/GlobalApi';
import { Link } from 'react-router-dom';

function HotelCarditem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: hotel?.hotelName, // Using hotel name to fetch photo
    };

    try {
      const result = await GetplaceDetails(data);
      const photoRef = result?.data?.places?.[0]?.photos?.[0]?.name; // Get the first photo reference
      if (photoRef) {
        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', photoRef);
        setPhotoUrl(PhotoUrl); // Update photo URL state
      } else {
        console.error('No photos available for this hotel.');
      }
    } catch (error) {
      console.error('Error fetching hotel image:', error);
    }
  };

  return (
    <Link
      to={
        'https://www.google.com/maps/search/?api=1&query=' +
        encodeURIComponent(hotel?.hotelAddress || '')
      }
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
      {/* Image Section */}
      <div className="relative h-52 overflow-hidden rounded-t-lg">
        <img
          src={photoUrl?photoUrl:'//Trv.jpg'} // Use fetched photo or fallback to default
          alt={hotel?.hotelName || 'Hotel Image'}
          className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
          onError={(e) => (e.target.src = '/Trv.jpg')} // Fallback image if API photo fails
        />
        <div className="absolute top-3 right-3 bg-white bg-opacity-75 px-3 py-1 rounded-full shadow-sm">
          <span className="text-yellow-500 font-medium">
            {hotel?.rating || 'N/A'} ⭐
          </span>
        </div>
      </div>
      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 truncate mb-3">
          {hotel?.hotelName || 'Hotel Name'}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
          {hotel?.description || 'No description available'}
        </p>

        <div className="space-y-2">
          <p className="text-sm flex justify-between items-center">
            <span className="text-gray-500">Price:</span>
            <span className="font-semibold text-green-600">
              {hotel?.price || 'N/A'}
            </span>
          </p>

          <p className="text-sm text-gray-500 truncate">
            <span className="font-medium">Address: </span>
            {hotel?.hotelAddress || 'N/A'}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default HotelCarditem;
