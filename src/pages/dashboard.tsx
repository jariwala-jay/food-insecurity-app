import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { UserCircleIcon, CogIcon, LogoutIcon } from '@heroicons/react/solid';
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIconM from "@mui/icons-material/Logout";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CloseIcon from '@mui/icons-material/Close';
import Profile from '@/pages/profile';
import Inventory from '@/pages/inventory-management';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true); // Loading state to prevent premature redirection
  const [error, setError] = useState('');
  const [section, setSection] = useState('home'); // Section state to switch between sections
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar visibility
  const [currentUser, setCurrentUser] = useState(null);
  const [activeSection, setActiveSection] = useState("home");
  const [activeTab, setActiveTab] = useState('preferences'); // State for active tab

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

  const handleSectionClick = (section) => {
    setSection(section);
    setActiveSection(section);
    setSidebarOpen(false); // Close the sidebar when a section is selected
  };

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
    <div className="flex relative  h-full min-h-screen bg-[#f9f4f1]">
      {/* Header 
      <header className="bg-blue-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold">Food Precision Rx</h1>

          
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
      </header> */}
      
      {/* Side Bar */}
      <aside
          className={`fixed z-50  inset-y-0 border-r-2 border-gray-200  left-0 transform ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0 lg:static"
          } transition-transform duration-300 ease-in-out w-64 bg-white p-6 lg:relative`}
        >
          <div className="flex items-center justify-center mb-8">
            <img
              src="/logo-transperant.png"
              alt="RoomieHub logo"
              className="mb-4 lg:block hidden min-w-[300px]"
            />
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <CloseIcon className="h-6 w-6 text-black" />
            </button>
          </div>
          <nav className="h-[82vh] relative">
            <ul className="space-y-2">
              <li
                className={`flex items-center space-x-2 p-2 pl-4 rounded-md  cursor-pointer ${
                  activeSection === "home" ? "font-semibold bg-[#c3e66e]  " : "hover:bg-gray-200"
                }`}
                onClick={() => handleSectionClick("home")}
              >
                <span>
                  {activeSection === "home" ? (
                    <HomeIcon
                      sx={{ fontSize: 30 }}
                      className="text-[#333231] text-xl"
                    />
                  ) : (
                    <HomeOutlinedIcon
                      sx={{ fontSize: 30 }}
                      className="text-[#333231] text-xl"
                    />
                  )}
                </span>
                <span
                  className={`text-[#333231] text-xl ${
                    activeSection === "home" ? "font-semibold" : "font-medium"
                  }`}
                >
                  Home
                </span>
              </li>
              <li
                className={`flex items-center space-x-2 p-2 pl-4 rounded-md  cursor-pointer ${
                  activeSection === "manageInventory" ? "font-semibold bg-[#c3e66e]  " : "hover:bg-gray-200"
                }`}
                onClick={() => handleSectionClick("manageInventory")}
              >
                <span className=''>
                  {activeSection === "manageInventory" ? (
                    <LocalGroceryStoreIcon
                      sx={{ fontSize: 30, fontWeight: "bold" }}
                      className="text-[#333231] text-xl"
                    />
                  ) : (
                    <LocalGroceryStoreOutlinedIcon
                      sx={{ fontSize: 30 }}
                      className="text-[#333231] text-xl"
                    />
                  )}
                </span>
                <span
                  className={`text-[#333231] text-xl ${
                    activeSection === "manageInventory"
                      ? "font-semibold"
                      : "font-medium"
                  }`}
                >
                 Inventory
                </span>
              </li>
              <li
                className={`flex items-center space-x-2 p-2 rounded-md pl-4 cursor-pointer ${
                  activeSection === "profile" ? "font-semibold bg-[#c3e66e]  " : "hover:bg-gray-200"
                }`}
                onClick={() => handleSectionClick("profile")}
              >
                <span>
                  {activeSection === "profile" ? (
                    <PersonIcon
                      sx={{ fontSize: 30 }}
                      className="text-[#333231] text-xl"
                    />
                  ) : (
                    <PersonOutlineOutlinedIcon
                      sx={{ fontSize: 30 }}
                      className="text-[#333231] text-xl"
                    />
                  )}
                </span>
                <span
                  className={`text-[#333231] text-xl ${
                    activeSection === "profile"
                      ? "font-semibold"
                      : "font-medium"
                  }`}
                >
                  Profile
                </span>
              </li>
              
              <li
                className={`flex items-center space-x-2 p-2 rounded-md pl-4  cursor-pointer ${
                  activeSection === "chat" ? "font-semibold bg-[#c3e66e]  " : "hover:bg-gray-200"
                }`}
                onClick={() => handleSectionClick("chat")}
              >
                <span>
                  {activeSection === "chat" ? (
                    <InsertChartIcon
                      sx={{ fontSize: 30 }}
                      className="text-[#333231] text-xl"
                    />
                  ) : (
                    <InsertChartOutlinedIcon
                      sx={{ fontSize: 30 }}
                      className="text-[#333231] text-xl"
                    />
                  )}
                </span>
                <span
                  className={`text-[#333231] text-xl ${
                    activeSection === "chat" ? "font-semibold" : "font-medium"
                  }`}
                >
                  Progress
                </span>
              </li>
              <li
                className={`flex items-center space-x-2 p-2  rounded-xl pl-4  cursor-pointer ${
                  activeSection === "settings" ? "font-semibold bg-[#c3e66e] " : "hover:bg-gray-200"
                }`}
                onClick={() => handleSectionClick("settings")}
              >
                <span>
                  {activeSection === "settings" ? (
                    <FastfoodIcon
                      sx={{ fontSize: 30 }}
                      className="text-[#333231] text-xl"
                    />
                  ) : (
                    <FastfoodOutlinedIcon
                      sx={{ fontSize: 30 }}
                      className="text-[#333231] text-xl"
                    />
                  )}
                </span>
                <span
                  className={`text-[#333231] text-xl ${
                    activeSection === "settings"
                      ? "font-semibold"
                      : "font-medium"
                  }`}
                >
                  Food Diary
                </span>
              </li>
              <li
                className="flex absolute bottom-5 items-center space-x-2 w-[95%] rounded-md cursor-pointer"
                onClick={handleLogout}
              >
                <div className="flex items-center justify-center w-full py-2 bg-[#f9a157] transition-colors duration-300 text-white rounded-xl">
                  <span>
                    <LogoutIconM className="text-white" />
                  </span>
                  <span className="text-[#ffffff] text-center font-semibold text-xl">
                    Logout
                  </span>
                </div>
              </li>
            </ul>
          </nav>
        </aside>

      {/* Main Content */}
      <div className="flex-1 items-center md:p-6 md:pl-0  md:pt-0 lg:mt-0 mt-[3.4rem]">
        {section==="home" && (
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
      )}
      {section==='profile' && (
        <Profile/>
      )}
      {section==='manageInventory' && (
        <Inventory/>
      )}
    </div>
    </div>
  );
};

export default Dashboard;
