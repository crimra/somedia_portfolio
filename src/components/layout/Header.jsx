import { motion } from 'framer-motion';
import logo from '../../assets/logo.png';
import facebookIcon from '../../assets/facebook.png';
import instagramIcon from '../../assets/instagram.png';
import linkedinIcon from '../../assets/linkedin.png';

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div>
          <img src={logo} alt="Logo sOmedia" className="h-8 w-auto" />
        </div>
        
        {/* Social Icons */}
        <div className="flex space-x-4">
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
    </header>
  );
};