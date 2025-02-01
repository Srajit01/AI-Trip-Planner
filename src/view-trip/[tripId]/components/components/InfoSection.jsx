import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { FaShare } from "react-icons/fa";
import {GetplaceDetails} from '/src/service/GlobalApi'
import { PHOTO_REF_URL } from '@/service/GlobalApi';

function InfoSection({trip}) {


  const [photoUrl,setPhotoUrl]=useState();
  useEffect(()=>{
    trip&&GetPlacePhoto();
  },[trip])

  const GetPlacePhoto=async()=>{
    const data={
       textQuery:trip?.userSelection?.location?.label
    }
    const result=await GetplaceDetails(data).then(resp=>{
    console.log(resp.data.places[0].photos[3])
  
    const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
    setPhotoUrl(PhotoUrl);
  
    })
  }
  return (
    <div>
      <img src= {photoUrl?photoUrl:'Trv.jpg'} className='h-[400px] w-full object-cover rounded-xl' />
      <div className='flex justify-between text-center' >
      <div className='my-5 flex-col gap-2'>
      <h2 className='font-bold text-4xl mb-4'>{trip?.userSelection?.location?.label}</h2>

      <div className='flex gap-5'>
      <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-s md:text-md'> 📅 {trip.userSelection?.noOfDays}</h2>
      <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-s md:text-md'> 💰{trip.userSelection?.budget}</h2>
      <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-s md:text-md'> 🧳 No. of Traveller: {trip.userSelection?.traveller}</h2>
        
      </div>
      </div>
      <Button> <FaShare /> </Button>
    </div>
    </div>
  )
}

export default InfoSection
