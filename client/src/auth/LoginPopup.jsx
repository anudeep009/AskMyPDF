import { useState } from 'react';
import { X } from 'lucide-react';

export default function LoginPopup({ isOpen, onClose }) {
  const handleGoogleLogin = () => {
    try {
      console.log('Logging in with Google');
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ease-in-out"
          onClick={onClose}
          aria-hidden="true"
        >
          <div
            className="bg-[#1f2433] rounded-lg shadow-xl w-96 p-6 relative"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              aria-label="Close login popup"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-white mb-6">Login</h2>
            <p className="text-gray-300 mb-6">Sign in to your account using Google</p>
            <button
              onClick={handleGoogleLogin}
              className="w-full bg-white text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-gray-100 transition-colors flex items-center justify-center"
              aria-label="Continue with Google"
            >
              <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>
          </div>
        </div>
      )}
    </>
  );
}