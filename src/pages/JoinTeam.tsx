import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const JoinTeam = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-900 to-blue-800 flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="bg-white/90 rounded-3xl shadow-xl max-w-3xl w-full p-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6">
            Join the CDI SAKATA INX CORP. Team
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Ready to make your mark in the world of printing innovation? At CDI SAKATA INX CORP., we believe in empowering our people to grow, create, and lead. Explore our open positions and discover how you can be part of a global team shaping the future of ink technology.
          </p>
          <a
            href="mailto:careers@cdsakata.com"
            className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-full font-semibold shadow transition-all duration-300"
          >
            Apply Now
          </a>
          <div className="mt-10 text-left">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Why Work With Us?</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Innovative, collaborative, and inclusive culture</li>
              <li>Opportunities for global impact and career growth</li>
              <li>Commitment to sustainability and excellence</li>
              <li>Competitive benefits and professional development</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JoinTeam;