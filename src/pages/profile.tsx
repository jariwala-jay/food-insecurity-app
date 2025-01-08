import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface User {
  name: string;
  email: string;
  familyStatus: string;
  age: number;
  weight: number;
  heightFeet: number;
  heightInch: number;
  gender: string;
  cookingExperience: string;
  dietPreference: string[];
  cuisineLikings: string[];
  medicalConditions: string[];
  otherMedicalCondition: string;
  allergies: string[];
  otherAllergy: string;
}

const Profile: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');

    if (!authToken || !userId) {
      // Redirect to login if no token or userId
      router.push('/login');
    } else {
      // Fetch user profile from backend
      fetch(`/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`, // Include the token in the request
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching user data:', err);
          router.push('/login');
          setLoading(false);
        });
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-800">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null; // Prevent rendering if user data isn't available
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold">Profile</h1>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow-md font-semibold hover:bg-gray-100"
          >
            Back to Dashboard
          </button>
        </div>
      </header>

      {/* Profile Details */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name and Email */}
            <div>
              <h3 className="text-gray-600 font-medium">Name:</h3>
              <p className="text-gray-800">{user.name}</p>
            </div>
            <div>
              <h3 className="text-gray-600 font-medium">Email:</h3>
              <p className="text-gray-800">{user.email}</p>
            </div>

            {/* Family Status and Gender */}
            <div>
              <h3 className="text-gray-600 font-medium">Family Status:</h3>
              <p className="text-gray-800">{user.familyStatus}</p>
            </div>
            <div>
              <h3 className="text-gray-600 font-medium">Gender:</h3>
              <p className="text-gray-800">{user.gender}</p>
            </div>

            {/* Age, Height, Weight */}
            <div>
              <h3 className="text-gray-600 font-medium">Age:</h3>
              <p className="text-gray-800">{user.age}</p>
            </div>
            <div>
              <h3 className="text-gray-600 font-medium">Height:</h3>
              <p className="text-gray-800">
                {user.heightFeet} ft {user.heightInch} in
              </p>
            </div>
            <div>
              <h3 className="text-gray-600 font-medium">Weight:</h3>
              <p className="text-gray-800">{user.weight} kg</p>
            </div>

            {/* Cooking Experience */}
            <div>
              <h3 className="text-gray-600 font-medium">Cooking Experience:</h3>
              <p className="text-gray-800">{user.cookingExperience}</p>
            </div>

            {/* Diet Preferences and Cuisine Likings */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-gray-600 font-medium">Diet Preferences:</h3>
              <p className="text-gray-800">{user.dietPreference.join(', ') || 'None'}</p>
            </div>
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-gray-600 font-medium">Cuisine Likings:</h3>
              <p className="text-gray-800">{user.cuisineLikings.join(', ') || 'None'}</p>
            </div>

            {/* Medical Conditions */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-gray-600 font-medium">Medical Conditions:</h3>
              <p className="text-gray-800">
                {user.medicalConditions.length
                  ? user.medicalConditions.join(', ')
                  : 'None'}
              </p>
              {user.otherMedicalCondition && (
                <p className="text-gray-800 mt-1">
                  Other: {user.otherMedicalCondition}
                </p>
              )}
            </div>

            {/* Allergies */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-gray-600 font-medium">Allergies:</h3>
              <p className="text-gray-800">
                {user.allergies.length ? user.allergies.join(', ') : 'None'}
              </p>
              {user.otherAllergy && (
                <p className="text-gray-800 mt-1">Other: {user.otherAllergy}</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
