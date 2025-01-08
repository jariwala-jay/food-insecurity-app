"use client";

import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-blue-100 to-white py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
                Food Precision Rx
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8">
                Personalized Recipe Recommendations for Food Pantry Users
              </p>
              <Link href="/registrationform">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-500 text-white font-semibold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-blue-600 transition duration-300"
                >
                  Get Started
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Set Your Preferences",
                  description:
                    "Let us know about your dietary needs and health conditions.",
                  image: "/preference.png",
                },
                {
                  title: "Input Your Ingredients",
                  description: "Tell us what you have in your pantry.",
                  image: "/ingredients.png",
                },
                {
                  title: "Get Personalized Recipes",
                  description:
                    "Receive tailored recipe recommendations that make the most of your ingredients.",
                  image: "/recipe.png",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="bg-white rounded-lg shadow-lg p-6 text-center"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={200}
                    height={200}
                    className="mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-blue-50 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
              Why Choose Food Precision Rx?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                "Personalized recipe suggestions based on your available ingredients",
                "Support for various medical conditions and dietary restrictions",
                "Nutrient analysis to help you meet your daily nutritional goals",
                "Family-friendly recipes adaptable for various household sizes",
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center bg-white rounded-lg shadow p-6"
                >
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-blue-500 rounded-full p-3">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-700">{feature}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
