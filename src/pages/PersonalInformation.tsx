import React, { useState, useEffect } from 'react';
import { ArrowLeft, User, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '@/components/Layout/Header';

const PersonalInformation = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    healthcare_provider_contact: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        setProfile({
          name: data.name || '',
          age: data.age?.toString() || '',
          gender: data.gender || '',
          phone: data.phone || '',
          healthcare_provider_contact: data.healthcare_provider_contact || ''
        });
      }
    };

    fetchProfile();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: profile.name,
          age: profile.age ? parseInt(profile.age) : null,
          gender: profile.gender,
          phone: profile.phone,
          healthcare_provider_contact: profile.healthcare_provider_contact,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your personal information has been updated.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Personal Information"
        subtitle="Manage your personal details"
        showNotifications={false}
        showSettings={false}
      />
      
      <div className="px-6 pt-6 pb-24 space-y-6">
        <button 
          onClick={() => navigate('/profile')}
          className="flex items-center space-x-2 text-primary"
        >
          <ArrowLeft size={20} />
          <span>Back to Profile</span>
        </button>

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <User size={24} className="text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Basic Information</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-gray-600">Full Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="mt-1"
                placeholder="Enter your full name"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age" className="text-sm font-medium text-gray-600">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={profile.age}
                  onChange={(e) => setProfile({...profile, age: e.target.value})}
                  className="mt-1"
                  placeholder="Enter your age"
                />
              </div>
              
              <div>
                <Label htmlFor="gender" className="text-sm font-medium text-gray-600">Gender</Label>
                <select
                  id="gender"
                  value={profile.gender}
                  onChange={(e) => setProfile({...profile, gender: e.target.value})}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-1"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="phone" className="text-sm font-medium text-gray-600">Phone</Label>
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                className="mt-1"
                placeholder="Enter your phone number"
              />
            </div>
            
            <div>
              <Label htmlFor="emergency" className="text-sm font-medium text-gray-600">Emergency Contact</Label>
              <Input
                id="emergency"
                value={profile.healthcare_provider_contact}
                onChange={(e) => setProfile({...profile, healthcare_provider_contact: e.target.value})}
                className="mt-1"
                placeholder="Enter emergency contact number"
              />
            </div>

            <Button 
              onClick={handleSave} 
              disabled={loading}
              className="w-full mt-6"
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;