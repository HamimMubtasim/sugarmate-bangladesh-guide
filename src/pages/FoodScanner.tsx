
import React, { useState, useRef } from 'react';
import { Camera, X, Flashlight, FlashlightOff, RotateCw, Check, Plus } from 'lucide-react';
import Header from '@/components/Layout/Header';
import BottomNavigation from '@/components/Layout/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface NutritionData {
  name: string;
  brand: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  fiber: number;
  sodium: number;
  barcode: string;
  image_url: string;
}

const FoodScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [cameraFacing, setCameraFacing] = useState<'user' | 'environment'>('environment');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showNutritionDialog, setShowNutritionDialog] = useState(false);
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(null);
  const [portionPercentage, setPortionPercentage] = useState([100]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { user } = useAuth();
  const { toast } = useToast();

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

  const capturePhoto = async () => {
    if (!videoRef.current) return;
    
    setIsAnalyzing(true);
    
    try {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        
        // Convert to base64
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        
        // Analyze with AI
        const { data, error } = await supabase.functions.invoke('analyze-food', {
          body: { image: imageData }
        });

        if (error) {
          throw new Error(error.message);
        }

        if (data.nutrition) {
          setNutritionData(data.nutrition);
          setShowNutritionDialog(true);
          toast({
            title: "Food Detected!",
            description: `Found: ${data.nutrition.name}`,
          });
        } else {
          toast({
            title: "No food detected",
            description: data.error || "Please try again with a clearer image.",
            variant: "destructive"
          });
        }
        
        stopCamera();
      }
    } catch (error) {
      console.error('Error analyzing food:', error);
      toast({
        title: "Analysis failed",
        description: "Please try again with a better image of food.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const logFood = async () => {
    if (!nutritionData || !user) return;

    try {
      const { error } = await supabase
        .from('food_logs')
        .insert({
          user_id: user.id,
          food_name: nutritionData.name,
          brand: nutritionData.brand,
          portion_percentage: portionPercentage[0],
          calories_per_100g: nutritionData.calories,
          carbs_per_100g: nutritionData.carbs,
          protein_per_100g: nutritionData.protein,
          fat_per_100g: nutritionData.fat,
          fiber_per_100g: nutritionData.fiber,
          sodium_per_100g: nutritionData.sodium,
          barcode: nutritionData.barcode,
          image_url: nutritionData.image_url,
        });

      if (error) throw error;

      toast({
        title: "Food logged successfully!",
        description: `Added ${nutritionData.name} to your food diary.`,
      });

      setShowNutritionDialog(false);
      setNutritionData(null);
      setPortionPercentage([100]);
    } catch (error) {
      console.error('Error logging food:', error);
      toast({
        title: "Failed to log food",
        description: "Please try again.",
        variant: "destructive"
      });
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
                      <Flashlight size={24} className="text-white" />
                    ) : (
                      <FlashlightOff size={24} className="text-white" />
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

      {/* Nutrition Info Dialog */}
      <Dialog open={showNutritionDialog} onOpenChange={setShowNutritionDialog}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle>Food Detected!</DialogTitle>
          </DialogHeader>
          
          {nutritionData && (
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{nutritionData.name}</CardTitle>
                  {nutritionData.brand && (
                    <p className="text-sm text-muted-foreground">{nutritionData.brand}</p>
                  )}
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-muted rounded-lg p-3">
                      <p className="font-medium text-primary">Calories</p>
                      <p className="text-lg font-bold">{nutritionData.calories}</p>
                      <p className="text-xs text-muted-foreground">per 100g</p>
                    </div>
                    <div className="bg-muted rounded-lg p-3">
                      <p className="font-medium text-blue-600">Carbs</p>
                      <p className="text-lg font-bold">{nutritionData.carbs}g</p>
                      <p className="text-xs text-muted-foreground">per 100g</p>
                    </div>
                    <div className="bg-muted rounded-lg p-3">
                      <p className="font-medium text-green-600">Protein</p>
                      <p className="text-lg font-bold">{nutritionData.protein}g</p>
                      <p className="text-xs text-muted-foreground">per 100g</p>
                    </div>
                    <div className="bg-muted rounded-lg p-3">
                      <p className="font-medium text-yellow-600">Fat</p>
                      <p className="text-lg font-bold">{nutritionData.fat}g</p>
                      <p className="text-xs text-muted-foreground">per 100g</p>
                    </div>
                  </div>

                  <div className="space-y-3 mt-6">
                    <Label>Portion Size: {portionPercentage[0]}%</Label>
                    <Slider
                      value={portionPercentage}
                      onValueChange={setPortionPercentage}
                      max={200}
                      min={25}
                      step={25}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>25%</span>
                      <span>100%</span>
                      <span>200%</span>
                    </div>
                  </div>

                  <div className="bg-primary/10 rounded-lg p-3 space-y-1">
                    <p className="text-sm font-medium">Your portion will contain:</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <span>Calories: {Math.round(nutritionData.calories * portionPercentage[0] / 100)}</span>
                      <span>Carbs: {Math.round(nutritionData.carbs * portionPercentage[0] / 100)}g</span>
                      <span>Protein: {Math.round(nutritionData.protein * portionPercentage[0] / 100)}g</span>
                      <span>Fat: {Math.round(nutritionData.fat * portionPercentage[0] / 100)}g</span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowNutritionDialog(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={logFood}
                      className="flex-1"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Log Food
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Loading overlay when analyzing */}
      {isAnalyzing && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">Analyzing Food...</h3>
            <p className="text-muted-foreground">Please wait while we identify your food</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodScanner;
