import { motion } from 'framer-motion';
import { useState } from 'react';

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
    console.log('Form submitted:', formData);
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
                    e-mail: <a href="mailto:contact@somedia.cg" className="text-white font-semibold hover:underline">contact@somedia.cg</a>
                  </p>
                </div>

                {/* Social Icons */}
                <div className="flex justify-end space-x-4 mt-6">
                  <a href="#" className="text-white hover:text-pink-200 transition-colors duration-200">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-white hover:text-pink-200 transition-colors duration-200">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.219-.359-1.219c0-1.142.662-1.994 1.488-1.994.219 0 .52.16.52.72 0 .219-.141.659-.219 1.018-.199.839.42 1.529 1.246 1.529 1.496 0 2.646-1.576 2.646-3.855 0-2.014-1.446-3.42-3.51-3.42-2.393 0-3.795 1.794-3.795 3.654 0 .72.277 1.49.623 1.909.07.08.08.15.059.23-.067.28-.215.873-.246.995-.04.16-.13.19-.3.12C5.96 15.01 5.1 13.73 5.1 11.99c0-2.646 1.921-5.077 5.536-5.077 2.905 0 5.16 2.067 5.16 4.837 0 2.885-1.817 5.207-4.34 5.207-.847 0-1.646-.44-1.916-.968 0 0-.42 1.598-.522 1.998-.188.72-.695 1.616-1.036 2.165C8.845 19.84 10.405 20 12.017 20c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-white hover:text-pink-200 transition-colors duration-200">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
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