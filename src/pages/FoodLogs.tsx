import React, { useState, useEffect } from 'react';
import { Calendar, Clock, TrendingDown, TrendingUp } from 'lucide-react';
import Header from '@/components/Layout/Header';
import BottomNavigation from '@/components/Layout/BottomNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface FoodLog {
  id: string;
  food_name: string;
  brand: string;
  portion_percentage: number;
  actual_calories: number;
  actual_carbs: number;
  actual_protein: number;
  actual_fat: number;
  logged_at: string;
}

const FoodLogs = () => {
  const [foodLogs, setFoodLogs] = useState<FoodLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchFoodLogs();
    }
  }, [user]);

  const fetchFoodLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('food_logs')
        .select('*')
        .eq('user_id', user?.id)
        .order('logged_at', { ascending: false });

      if (error) throw error;
      setFoodLogs(data || []);
    } catch (error) {
      console.error('Error fetching food logs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTodaysStats = () => {
    const today = new Date().toDateString();
    const todaysLogs = foodLogs.filter(log => 
      new Date(log.logged_at).toDateString() === today
    );

    return {
      totalCalories: todaysLogs.reduce((sum, log) => sum + log.actual_calories, 0),
      totalCarbs: todaysLogs.reduce((sum, log) => sum + log.actual_carbs, 0),
      totalProtein: todaysLogs.reduce((sum, log) => sum + log.actual_protein, 0),
      totalFat: todaysLogs.reduce((sum, log) => sum + log.actual_fat, 0),
      itemsLogged: todaysLogs.length,
    };
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const stats = getTodaysStats();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Food Logs" subtitle="Track your nutrition" />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Food Logs" subtitle="Track your nutrition" />
      
      <div className="px-6 pt-6 pb-24 space-y-6">
        {/* Today's Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Today's Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary/10 rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-primary">{Math.round(stats.totalCalories)}</p>
                <p className="text-sm text-muted-foreground">Calories</p>
              </div>
              <div className="bg-blue-50 rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">{Math.round(stats.totalCarbs)}g</p>
                <p className="text-sm text-muted-foreground">Carbs</p>
              </div>
              <div className="bg-green-50 rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-green-600">{Math.round(stats.totalProtein)}g</p>
                <p className="text-sm text-muted-foreground">Protein</p>
              </div>
              <div className="bg-yellow-50 rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-yellow-600">{Math.round(stats.totalFat)}g</p>
                <p className="text-sm text-muted-foreground">Fat</p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                {stats.itemsLogged} food items logged today
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Food Log List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Recent Logs</h3>
          
          {foodLogs.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No food logs yet</h3>
                <p className="text-muted-foreground">Start scanning food to track your nutrition!</p>
              </CardContent>
            </Card>
          ) : (
            foodLogs.map((log) => (
              <Card key={log.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-800">{log.food_name}</h4>
                        {log.brand && (
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded-lg text-gray-600">
                            {log.brand}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {formatTime(log.logged_at)}
                        </div>
                        <span>•</span>
                        <span>{formatDate(log.logged_at)}</span>
                        <span>•</span>
                        <span>{log.portion_percentage}% portion</span>
                      </div>

                      <div className="grid grid-cols-4 gap-3 text-sm">
                        <div className="text-center p-2 bg-primary/5 rounded-lg">
                          <p className="font-semibold text-primary">{Math.round(log.actual_calories)}</p>
                          <p className="text-xs text-muted-foreground">Cal</p>
                        </div>
                        <div className="text-center p-2 bg-blue-50 rounded-lg">
                          <p className="font-semibold text-blue-600">{Math.round(log.actual_carbs)}g</p>
                          <p className="text-xs text-muted-foreground">Carbs</p>
                        </div>
                        <div className="text-center p-2 bg-green-50 rounded-lg">
                          <p className="font-semibold text-green-600">{Math.round(log.actual_protein)}g</p>
                          <p className="text-xs text-muted-foreground">Protein</p>
                        </div>
                        <div className="text-center p-2 bg-yellow-50 rounded-lg">
                          <p className="font-semibold text-yellow-600">{Math.round(log.actual_fat)}g</p>
                          <p className="text-xs text-muted-foreground">Fat</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default FoodLogs;