import { db } from '@/service/firebaseconfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import InfoSection from './[tripId]/components/components/InfoSection';
import Hotels from './[tripId]/components/components/Hotels';
import PlacesToVisit from './[tripId]/components/components/PlacesToVisit';
import Footer from './[tripId]/components/components/Footer';

function Viewtrip() {
  const { tripId } = useParams();
  console.log(tripId,"Tid");
  const [trip, setTrip] = useState([]); 

  useEffect(() => {
    tripId&&GetTripData();
  }, [tripId]);

  // Fetch trip data from Firestore
  const GetTripData = async () => {
    const docRef = doc(db, 'AITrips', tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document:', docSnap.data());
      setTrip(docSnap.data()); // Corrected this line
    } else {
      console.log('No such document!');
      toast('No Trip Found!');
    }
  };

  if (!trip) return <div>Loading...</div>; 

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      {/* Information Section */}
      <InfoSection trip={trip} />
      {/* Recommended Hotels */}
       <Hotels trip={trip}/>
      {/* Daily Plan */}
      <PlacesToVisit trip={trip}/>
      {/* Footer */}
      <Footer trip={trip} />


    </div>
  );
}

export default Viewtrip;
