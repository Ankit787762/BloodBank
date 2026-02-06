import React from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { Heart, Droplet, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="w-full bg-white text-gray-800">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
     <section
  id="home"
  className="relative min-h-screen w-full flex flex-col justify-center items-center text-center px-6"
  style={{
    backgroundImage: "url('https://t3.ftcdn.net/jpg/13/77/75/90/240_F_1377759000_Ckl6omwl3ZalJs1t5dXzhIGHvGhyAF6t.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  {/* Overlay for transparency */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* Content */}
  <div className="relative z-10 flex flex-col items-center text-white">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="mb-6"
    >
      <Heart className="h-20 w-20 text-red-500 drop-shadow-lg" />
    </motion.div>

    <motion.h1
      className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-md leading-tight"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      Donate Blood, Save Lives
    </motion.h1>

    <motion.p
      className="text-lg md:text-xl max-w-3xl text-gray-200 drop-shadow-md"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      Every drop counts. Join us in creating a stronger, healthier tomorrow.
    </motion.p>
  </div>
</section>






      {/* Donor Information Section */}
      <motion.section
        id="tips"
        className="py-20 bg-gray-50 w-full"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900">
            Donor Information
          </h2>

          {/* ✅ Full-width equal-height grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full items-stretch">
            {/* Card 1 */}
            <div className="flex flex-col p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition group h-full">
              <div className="w-full h-52 overflow-hidden rounded-xl mb-4">
                <img
                  src="https://image.shutterstock.com/image-illustration/generic-3d-map-doctor-hospital-260nw-2077489207.jpg"
                  alt="Nearby Hospitals"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <h3 className="text-xl font-semibold text-red-600 mb-2">
                Find Nearby Hospitals & Camps
              </h3>
              <p className="text-gray-700 flex-grow">
                Easily locate nearby hospitals and blood donation camps whenever
                you want to contribute.
              </p>
              <button className="mt-6 px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                Explore
              </button>
            </div>

            {/* Card 2 */}
            <Link to="/who-can-donate" className="h-full">
              <div className="flex flex-col p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition group h-full">
                <div className="w-full h-52 overflow-hidden rounded-xl mb-4">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBnQalJ7H1Mj2EP_ZNkgIFOjlcXUNtTSe6yA&s"
                    alt="Who Can Donate"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold text-red-600 mb-2">
                  Who Can Donate?
                </h3>
                <p className="text-gray-700 flex-grow">
                  Learn about eligibility, age, weight, and health requirements
                  for donors.
                </p>
                <button className="mt-6 px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                  Learn More
                </button>
              </div>
            </Link>

            {/* Card 3 */}
            <Link to="/why-donate" className="h-full">
              <div className="flex flex-col p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition group h-full">
                <div className="w-full h-52 overflow-hidden rounded-xl mb-4">
                  <img
                    src="https://www.ameridisability.com/wp-content/uploads/2023/01/blood.jpg"
                    alt="Why Donate"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold text-red-600 mb-2">
                  Why Should You Donate?
                </h3>
                <p className="text-gray-700 flex-grow">
                  Discover the life-saving benefits of blood donation and its
                  impact on society.
                </p>
                <button className="mt-6 px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                  Read More
                </button>
              </div>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        className="py-20 bg-gray-50 w-full"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center px-6">
          <Droplet className="w-14 h-14 text-red-500 mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            About Us
          </h2>
          <p className="text-base md:text-lg max-w-3xl text-gray-700 mb-8">
            Our Blood Bank project connects donors with hospitals and patients
            in need. We make finding and donating blood simple, fast, and
            reliable. Join us to become part of a life-saving community.
          </p>

          {/* ✅ Mission and Vision cards updated like donor section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-10 items-stretch">
            <div className="flex flex-col p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition group h-full">
              <h3 className="text-xl font-semibold text-red-600 mb-2">
                Our Mission
              </h3>
              <p className="text-gray-700 flex-grow">
                To ensure blood is available anytime, anywhere during
                emergencies.
              </p>
            </div>
            <div className="flex flex-col p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition group h-full">
              <h3 className="text-xl font-semibold text-red-600 mb-2">
                Our Vision
              </h3>
              <p className="text-gray-700 flex-grow">
                A world where no life is lost due to lack of blood.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 text-gray-900 font-semibold">
            <div>
              <p className="text-3xl text-red-600">1200+</p>
              <span>Donors Registered</span>
            </div>
            <div>
              <p className="text-3xl text-red-600">50+</p>
              <span>Hospitals Connected</span>
            </div>
            <div>
              <p className="text-3xl text-red-600">300+</p>
              <span>Lives Saved</span>
            </div>
          </div>

          <Link to="/login">
            <button className="mt-8 px-6 py-3 bg-red-500 text-white rounded-2xl shadow hover:bg-red-600 transition">
              Join as Donor
            </button>
          </Link>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        id="contact"
        className="bg-black w-full py-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 text-white px-6">
          {/* Left */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Contact Info</h2>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-red-500" />
              <span>contact@bloodbank.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-red-500" />
              <span>+91 9876543210</span>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Our Location</h2>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-red-500" />
              <span>123, Red Street, New Delhi, India</span>
            </div>
            <p>
              Follow us on social media for updates and awareness campaigns.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-10 pt-6 text-center text-sm text-white">
          © 2025 BloodBank. All rights reserved.
        </div>
      </motion.footer>
    </div>
  );
}
