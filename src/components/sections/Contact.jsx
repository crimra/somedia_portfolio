import { motion } from 'framer-motion';
import { useState } from 'react';
import facebookIcon from '../../assets/facebook.png';
import instagramIcon from '../../assets/instagram.png';
import linkedinIcon from '../../assets/linkedin.png';

export const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique d'envoi du formulaire
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-white relative">
      {/* Contact Form */}
      <div className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Contactez <span className="text-primary">sOmedia</span>
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name:
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message:
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-primary transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Envoyer
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Footer with addresses and contact info */}
      <footer className="bg-primary text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Addresses */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Adresses</h3>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">POINTE-NOIRE :</h4>
                <p className="text-pink-100">
                  317 Avenue du Général Charles de Gaulle, face hôtel Migitel, Centre-Ville
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2">BRAZZAVILLE :</h4>
                <p className="text-pink-100">
                  Aéroport Maya-Maya, Mezzanine
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="text-right">
              <h3 className="text-2xl font-bold mb-6">Contacts</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-pink-100">
                    Téléphone: <span className="text-white font-semibold">+242 06 800 06 06</span>
                  </p>
                </div>
                
                <div>
                  <p className="text-pink-100">
                    E-mail: <a href="mailto:contact@somedia.cg" className="text-white font-semibold hover:underline">contact@somedia.cg</a>
                  </p>
                </div>

                {/* Social Icons */}
                <div className="flex justify-end space-x-4 mt-6">
                  <a 
                    href="https://www.facebook.com/somediacongo" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                  >
                    <img src={facebookIcon} alt="Facebook" className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://www.instagram.com/agence_somedia/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                  >
                    <img src={instagramIcon} alt="Instagram" className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/company/somediacg/posts/?feedView=all" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                  >
                    <img src={linkedinIcon} alt="LinkedIn" className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-pink-200/20 text-center">
            <p className="text-pink-100">
              ©2025 par <span className="text-white font-semibold">sOmedia</span>
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
};