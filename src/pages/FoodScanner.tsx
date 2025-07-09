
import React, { useState, useRef } from 'react';
import { Camera, X, FlashOn, FlashOff, RotateCw } from 'lucide-react';
import Header from '@/components/Layout/Header';
import BottomNavigation from '@/components/Layout/BottomNavigation';

const FoodScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [cameraFacing, setCameraFacing] = useState<'user' | 'environment'>('environment');
  const videoRef = useRef<HTMLVideoElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: cameraFacing,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsScanning(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        
        // TODO: Send image to AI processing
        console.log('Photo captured for AI analysis');
        
        // Stop camera after capture
        stopCamera();
      }
    }
  };

  const switchCamera = () => {
    setCameraFacing(prev => prev === 'user' ? 'environment' : 'user');
    if (isScanning) {
      stopCamera();
      setTimeout(startCamera, 100);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Header 
        title="Food Scanner"
        subtitle="Point camera at food to analyze"
        showSettings={false}
        showNotifications={false}
      />
      
      <div className="relative h-[calc(100vh-180px)]">
        {!isScanning ? (
          <div className="flex flex-col items-center justify-center h-full text-white px-6">
            <div className="p-8 bg-white/10 rounded-3xl backdrop-blur-sm mb-6">
              <Camera size={64} className="text-white" />
            </div>
            
            <h2 className="text-2xl font-bold mb-4">AI Food Analysis</h2>
            <p className="text-center text-gray-300 mb-8 leading-relaxed">
              Use your camera to scan food and get instant nutritional information 
              including carbohydrates, calories, and glucose impact predictions.
            </p>
            
            <button
              onClick={startCamera}
              className="bg-primary text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:bg-primary/90 transition-all duration-200"
            >
              Start Camera
            </button>
            
            <div className="mt-8 p-4 bg-red-500/20 rounded-2xl border border-red-500/30">
              <p className="text-red-300 text-sm text-center">
                ⚠️ This is an experimental feature for informational purposes only. 
                Always consult healthcare professionals for medical decisions.
              </p>
            </div>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            
            {/* Camera Controls Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Top Controls */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-auto">
                <button
                  onClick={stopCamera}
                  className="p-3 bg-black/50 rounded-2xl backdrop-blur-sm"
                >
                  <X size={24} className="text-white" />
                </button>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => setFlashEnabled(!flashEnabled)}
                    className={`p-3 rounded-2xl backdrop-blur-sm ${
                      flashEnabled ? 'bg-primary' : 'bg-black/50'
                    }`}
                  >
                    {flashEnabled ? (
                      <FlashOn size={24} className="text-white" />
                    ) : (
                      <FlashOff size={24} className="text-white" />
                    )}
                  </button>
                  
                  <button
                    onClick={switchCamera}
                    className="p-3 bg-black/50 rounded-2xl backdrop-blur-sm"
                  >
                    <RotateCw size={24} className="text-white" />
                  </button>
                </div>
              </div>
              
              {/* Center Focus Area */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 border-2 border-white/50 rounded-3xl relative">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-2xl" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-2xl" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-2xl" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-2xl" />
                </div>
              </div>
              
              {/* Bottom Controls */}
              <div className="absolute bottom-8 left-4 right-4 pointer-events-auto">
                <div className="flex justify-center items-center">
                  <button
                    onClick={capturePhoto}
                    className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-200"
                  >
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                      <Camera size={32} className="text-white" />
                    </div>
                  </button>
                </div>
                
                <p className="text-white text-center mt-4 text-sm">
                  Position food within the frame and tap to analyze
                </p>
              </div>
            </div>
          </>
        )}
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default FoodScanner;
