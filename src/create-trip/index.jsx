import React, { useState } from 'react';
import GooglePlaceAutocomplete from 'react-google-places-autocomplete';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { doc, setDoc } from "firebase/firestore";
import axios from 'axios';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription } from "@/components/ui/dialog";
import { toast } from 'sonner';
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from '@/constants/options';
import { chatSession } from '@/service/AiModel';
import { db } from '@/service/firebaseconfig';

// Validation constants
const MAX_TRIP_DAYS = 9;

function CreateTrip() {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateFormData = () => {
    const { noOfDays, location, budget, traveller } = formData;
    
    if (!location || !budget || !traveller) {
      toast.error("Please fill in all required fields");
      return false;
    }

    if (noOfDays > MAX_TRIP_DAYS) {
      toast.error(`Trip duration cannot exceed ${MAX_TRIP_DAYS} days`);
      return false;
    }

    return true;
  };

  const handleInputChange = (name, value) => {
    if (name === 'noOfDays' && value > MAX_TRIP_DAYS) {
      toast.warning(`Trip duration cannot exceed ${MAX_TRIP_DAYS} days`);
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const login = useGoogleLogin({
    clientId: import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID,
    onSuccess: getUserProfile,
    onError: (error) => {
      console.error('Login Error:', error);
      toast.error('Failed to sign in with Google');
    },
  });

  async function getUserProfile(tokenInfo) {
    try {
      const { data } = await axios.get(
        'https://www.googleapis.com/oauth2/v1/userinfo',
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: 'application/json',
          },
        }
      );

      localStorage.setItem('user', JSON.stringify(data));
      setIsDialogOpen(false);
      onGenerateTrip();
    } catch (error) {
      console.error('Error fetching user profile:', error);
      toast.error('Failed to fetch user profile');
    }
  }

  const generateAIPrompt = () => {
    const { location, noOfDays, traveller, budget } = formData;
    return AI_PROMPT
      .replace(/\{locaton\}/g, location?.label)
      .replace(/\{totalDays\}/g, noOfDays)
      .replace(/\{traveller\}/g, traveller)
      .replace(/\{budget\}/g, budget);
  };

  const onGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setIsDialogOpen(true);
      return;
    }

    if (!validateFormData()) return;

    try {
      setIsLoading(true);
      const result = await chatSession.sendMessage(generateAIPrompt());
      await saveAiTrip(result?.response?.text());
    } catch (error) {
      console.error('Error generating trip:', error);
      toast.error('Failed to generate trip plan');
    } finally {
      setIsLoading(false);
    }
  };

  const saveAiTrip = async (tripData) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const docId = Date.now().toString();
      
      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: JSON.parse(tripData),
        userEmail: user?.email,
        id: docId,
        createdAt: new Date().toISOString(),
      });

      navigate(`/view-trip/${docId}`);
      toast.success('Trip plan generated successfully!');
    } catch (error) {
      console.error('Error saving trip:', error);
      toast.error('Failed to save trip plan');
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-400 to-green-300 p-10 rounded-lg shadow-xl">
      <header className="text-center text-Black mb-10">
        <h1 className="text-5xl font-bold leading-tight">Plan Your Dream Journey 🏕️🌴</h1>
        <p className="text-xl">Create your perfect trip with our AI-powered Trip Planner. Just tell us your preferences, and we'll handle the rest! ❤️</p>
      </header>

      <main className="space-y-12">
       
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-black">Destination</h2>
          <GooglePlaceAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              value: place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange('location', v);
              },
              placeholder: "Where would you like to go?",
              className: "w-full p-3 rounded-md text-black shadow-md"
            }}
          />
        </section>

   
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-balck">Trip Duration</h2>
          <Input
            placeholder={`Enter number of days (max ${MAX_TRIP_DAYS})`}
            type="number"
            min="1"
            max={MAX_TRIP_DAYS}
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
            className="max-w-xs p-3 rounded-md shadow-md"
          />
        </section>

     
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-black">Budget Range</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SelectBudgetOptions.map((item) => (
              <div
                key={item.title}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-6 rounded-xl transition-all duration-300 ease-in-out 
                  ${formData?.budget === item.title
                    ? 'border-2 border-primary shadow-lg bg-primary/10'
                    : 'border border-gray-200 hover:border-primary/50 hover:shadow-md'
                  } cursor-pointer`}
              >
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="font-bold text-xl mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-black">Travel Style</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SelectTravelsList.map((item) => (
              <div
                key={item.title}
                onClick={() => handleInputChange('traveller', item.people)}
                className={`p-6 rounded-xl transition-all duration-300 ease-in-out 
                  ${formData?.traveller === item.people
                    ? 'border-2 border-primary shadow-lg bg-primary/10'
                    : 'border border-gray-200 hover:border-primary/50 hover:shadow-md'
                  } cursor-pointer`}
              >
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="font-bold text-xl mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

       
        <div className="flex justify-center pt-8">
          <Button
            size="lg"
            disabled={isLoading}
            onClick={onGenerateTrip}
            className="min-w-[200px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600"
          >
            {isLoading ? (
              <>
                <AiOutlineLoading3Quarters className="mr-2 h-5 w-5 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Trip Plan'
            )}
          </Button>
        </div>
      </main>

      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md bg-gradient-to-r from-indigo-500 to-purple-600">
          <DialogDescription className="text-center space-y-6 text-white">
            <img
              src="/Voy.jpg"
              alt="Login"
              className="mx-auto rounded-lg max-w-[200px]"
            />
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome to Trip Planner</h2>
              <p className="text-gray-200">Sign in securely with Google to create your personalized trip plan</p>
            </div>
            <Button
              onClick={() => login()}
              className="w-full flex items-center justify-center gap-3 py-6 bg-white text-black hover:bg-gray-200"
            >
              <FcGoogle className="h-6 w-6" />
              Continue with Google
            </Button>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;