
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Simulate splash screen delay
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigate('/dashboard');
      } else {
        navigate('/onboarding');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, isAuthenticated]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="text-center">
        {/* App Logo */}
        <div className="mb-8">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 118.15 202.69"
            className="w-32 h-auto mx-auto"
          >
            <path 
              fill="white" 
              d="M79.34,168.57c-5.27,3.97-11.79,5.96-19.58,5.96-4.58,0-8.74-.69-12.48-2.06-3.74-1.38-6.95-3.32-9.61-5.84-2.68-2.52-4.74-5.54-6.19-9.05s-2.17-7.33-2.17-11.45c0-7.32,2.29-13.89,6.87-19.69,7.63,3.82,16.48,5.73,26.56,5.73,8.24,0,15.76-1.34,22.55-4.01,6.79-2.67,12.63-6.41,17.52-11.22,4.88-4.81,8.66-10.61,11.34-17.4,1.33-3.4,2.33-7,3-10.79,.67-3.8,1-7.8,1-12,0-8.09-1.83-15.74-5.1-22.58-.02-.05-.05-.1-.07-.15-4.11-9.01-10.56-16.34-17.11-23.66-8.03-8.97-17.45-16.8-24.83-26.45-4-5.22-11.91-5.22-15.95-.03-4.48,5.75-9.7,10.84-14.76,16.08-6.25,6.47-12.49,12.93-18.15,19.96-4.55,4.58-8.08,10.03-10.62,16.34-2.67,6.64-4.01,13.93-4.01,21.87,0,5.8,.73,11.25,2.18,16.37,1.45,5.11,3.47,9.81,6.07,14.08-4.89,5.19-8.74,11.11-11.57,17.75-2.82,6.64-4.23,13.85-4.23,21.64s1.41,14.99,4.23,21.63c2.83,6.64,6.87,12.4,12.14,17.29s11.6,8.74,19.01,11.57c7.4,2.82,15.6,4.23,24.61,4.23,8.09,0,15.53-1.14,22.33-3.43,6.79-2.29,12.78-5.58,17.97-9.85s9.35-9.54,12.48-15.8c.03-.06,.06-.13,.09-.19,4.81-9.72-2.47-21.1-13.32-21.1h-.21c-5.63,0-10.91,3.09-13.32,8.18-1.49,3.15-3.71,5.84-6.68,8.07ZM38.13,61.57c3.7-5.03,8-9.47,12.3-13.92,3.19-3.3,6.49-6.5,9.2-10.23,1.84-2.52,5.57-2.45,7.39,.08,4.28,5.95,10.01,10.63,14.85,16.03,3.94,4.41,7.82,8.82,10.11,14.37,4.31,10.45,2.46,22.25-4.78,31-11.72,14.16-32.97,14.35-45.98,1.86-11.05-10.61-11.54-27.71-3.09-39.19Zm42.09,32.32c2.12-4.68,5.48-14.76,1.88-26.18-.28-.87,.95-1.4,1.39-.6,3.76,6.89,7.01,17.86-2.34,27.4-.44,.45-1.19-.05-.93-.62Z"
            />
          </svg>
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-4">SugarMate</h1>
        <p className="text-xl text-white/90 mb-8">Your Diabetes Companion</p>
        
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default Index;
