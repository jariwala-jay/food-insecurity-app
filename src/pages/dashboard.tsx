import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { UserCircleIcon, CogIcon, LogoutIcon } from '@heroicons/react/solid';

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true); // Loading state to prevent premature redirection

  useEffect(() => {
    // Check if authToken exists in localStorage
    const authToken = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');

    if (!authToken || !userId) {
      // Redirect to login if no token or userId
      router.push('/login');
    } else {
      // Fetch user profile from the backend
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
          // Redirect to login on fetch error
          router.push('/login');
          setLoading(false);
        });
    }
  }, [router]);

  const handleLogout = () => {
    // Clear user data and redirect to login
    localStorage.removeItem('userId');
    localStorage.removeItem('authToken');
    router.push('/login');
  };

  const navigateToInventory = () => {
    router.push('/inventory-management');
  };

  const navigateToProfile = () => {
    router.push('/profile');
  };

  if (loading) {
    // Show a loading spinner or message while waiting for user data
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-800">Loading...</p>
      </div>
    );
  }

  if (!user) {
    // If user data is not available after loading, redirect or show an error
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold">Food Precision Rx</h1>

          {/* Profile Menu */}
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center space-x-2">
              <UserCircleIcon className="h-8 w-8 text-white" />
              <span className="text-white font-medium">{user.name}</span>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md ring-1 ring-black ring-opacity-5">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={navigateToProfile}
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                    >
                      <UserCircleIcon className="h-5 w-5 mr-2" />
                      Profile
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                    >
                      <LogoutIcon className="h-5 w-5 mr-2" />
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Welcome, {user.name}!
        </h2>
        <p className="text-gray-600 mt-2">
          Here’s your dashboard. Use the options below to navigate.
        </p>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <button
            onClick={navigateToInventory}
            className="bg-green-500 text-white rounded-lg shadow-md px-6 py-4 text-lg font-semibold hover:bg-green-600"
          >
            Manage Inventory
          </button>
          <button
            onClick={navigateToProfile}
            className="bg-blue-500 text-white rounded-lg shadow-md px-6 py-4 text-lg font-semibold hover:bg-blue-600"
          >
            View Profile
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
