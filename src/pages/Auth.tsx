import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('login');

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Signup form state
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    age: '',
    gender: '',
    diabetesType: '',
    diagnosisYear: '',
    height: '',
    weight: '',
    weightUnit: 'kg'
  });

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/dashboard');
      }
    };
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });

      if (error) throw error;

      toast({
        title: "Welcome back!",
        description: "You have been successfully logged in.",
      });

      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to log in",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (signupData.password.length < 6) {
      toast({
        title: "Error", 
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: signupData.email,
        password: signupData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: {
            name: signupData.name,
            phone: signupData.phone,
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        // Create profile with additional data
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            user_id: data.user.id,
            name: signupData.name,
            phone: signupData.phone,
            age: parseInt(signupData.age),
            gender: signupData.gender,
            diabetes_type: signupData.diabetesType,
            diagnosis_year: parseInt(signupData.diagnosisYear),
            height: parseInt(signupData.height),
            weight: parseFloat(signupData.weight),
            weight_unit: signupData.weightUnit,
          });

        if (profileError) {
          console.error('Profile creation error:', profileError);
        }

        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create account",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          {/* App Logo */}
          <div className="mb-6">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 899.33 202.69"
              className="w-48 h-auto mx-auto"
            >
              <path 
                fill="hsl(var(--primary))" 
                d="M158.53,20.47h0c7.99,0,14.47,6.48,14.47,14.47V183.23c0,7.99-6.48,14.47-14.47,14.47h-1.05c-7.99,0-14.47-6.48-14.47-14.47V36c0-8.57,6.95-15.52,15.52-15.52Z"
              />
              <path 
                fill="hsl(var(--primary))" 
                d="M249.48,197.71c-16.64,0-29.62-4.88-38.93-14.65-9.31-9.77-13.97-23.36-13.97-40.76v-58.12c0-7.99,6.48-14.47,14.47-14.47h1.05c7.99,0,14.47,6.48,14.47,14.47v59.26c0,8.24,1.98,14.66,5.95,19.23,3.97,4.58,9.54,6.87,16.72,6.87h12.09c7.99,0,14.47-6.48,14.47-14.47V84.18c0-7.99,6.48-14.47,14.47-14.47h1.05c7.99,0,14.47,6.48,14.47,14.47v99.06c0,7.99-6.48,14.47-14.47,14.47h-41.86Z"
              />
              <path 
                fill="hsl(var(--primary))" 
                d="M389.62,198.85c-9.62,0-18.4-1.6-26.33-4.81-7.94-3.21-14.77-7.67-20.49-13.4s-10.19-12.59-13.4-20.61c-3.21-8.01-4.81-16.83-4.81-26.45s1.6-18.43,4.81-26.45c3.21-8.01,7.67-14.88,13.4-20.61s12.55-10.15,20.49-13.28c7.94-3.13,16.72-4.69,26.33-4.69,11.3,0,21.49,2.21,30.57,6.64,3.44,1.68,6.65,3.63,9.62,5.86,7.61,5.7,7.66,17.12,.18,23l-.51,.4c-5.32,4.19-12.76,3.94-18.03-.3-1.48-1.19-3.07-2.25-4.77-3.19-5.12-2.82-10.88-4.24-17.29-4.24-5.04,0-9.7,.92-13.97,2.75-4.28,1.83-7.98,4.39-11.11,7.67-3.13,3.28-5.54,7.18-7.21,11.68-1.68,4.5-2.52,9.5-2.52,15s.84,10.27,2.52,14.77c1.68,4.5,4.08,8.4,7.21,11.68,3.13,3.28,6.79,5.84,10.99,7.67,4.2,1.83,8.82,2.75,13.85,2.75,6.41,0,12.21-1.45,17.4-4.35,1.73-.97,3.34-2.04,4.83-3.23,5.27-4.2,12.67-4.41,17.97-.24l.62,.49c7.47,5.88,7.43,17.29-.18,23-2.97,2.23-6.18,4.18-9.62,5.86-9.08,4.43-19.27,6.64-30.57,6.64Z"
              />
              <path 
                fill="hsl(var(--primary))" 
                d="M514.42,198.85c-9.47,0-18.13-1.6-25.99-4.81-7.86-3.21-14.62-7.67-20.27-13.4-5.65-5.72-10.04-12.55-13.17-20.49-3.13-7.94-4.69-16.72-4.69-26.33s1.56-18.43,4.69-26.45c3.13-8.01,7.52-14.88,13.17-20.61,5.65-5.72,12.4-10.19,20.27-13.4,7.86-3.21,16.52-4.81,25.99-4.81s18.13,1.6,25.99,4.81c7.86,3.21,14.62,7.67,20.27,13.4,5.65,5.72,10.04,12.59,13.17,20.61,3.13,8.01,4.69,16.83,4.69,26.45s-1.57,18.4-4.69,26.33c-3.13,7.94-7.52,14.77-13.17,20.49-5.65,5.72-12.4,10.19-20.27,13.4-7.86,3.21-16.53,4.81-25.99,4.81Zm0-28.17c4.88,0,9.42-.92,13.62-2.75,4.2-1.83,7.82-4.35,10.88-7.56,3.05-3.21,5.42-7.06,7.1-11.56,1.68-4.5,2.52-9.5,2.52-15s-.84-10.53-2.52-15.11c-1.68-4.58-4.05-8.47-7.1-11.68-3.06-3.21-6.68-5.72-10.88-7.56-4.2-1.83-8.74-2.75-13.62-2.75s-9.43,.92-13.62,2.75c-4.2,1.83-7.83,4.35-10.88,7.56-3.06,3.21-5.42,7.1-7.1,11.68-1.68,4.58-2.52,9.62-2.52,15.11s.84,10.5,2.52,15c1.68,4.5,4.04,8.36,7.1,11.56,3.05,3.21,6.68,5.72,10.88,7.56,4.2,1.83,8.74,2.75,13.62,2.75Z"
              />
              <path 
                fill="hsl(var(--primary))" 
                d="M602.62,70.7h0c6.5,0,12.2,4.33,13.94,10.6l22.78,81.97c.95,3.4,5.77,3.4,6.71,0l22.78-81.97c1.74-6.26,7.44-10.6,13.94-10.6h.03c9.55,0,16.48,9.08,13.96,18.29l-23.71,86.61c-3.73,13.64-16.13,23.1-30.27,23.1h0c-14.12,0-26.51-9.43-30.26-23.05l-23.87-86.64c-2.54-9.21,4.39-18.32,13.95-18.32Z"
              />
              <path 
                fill="hsl(var(--primary))" 
                d="M737.67,56.65c-4.89,0-8.89-1.6-12.02-4.81-3.13-3.21-4.69-7.1-4.69-11.68s1.56-8.47,4.69-11.68c3.13-3.21,7.13-4.81,12.02-4.81s8.62,1.6,11.68,4.81c3.05,3.21,4.58,7.1,4.58,11.68s-1.53,8.47-4.58,11.68c-3.06,3.21-6.95,4.81-11.68,4.81Zm-.64,13.05h1.05c7.99,0,14.47,6.48,14.47,14.47v99.06c0,7.99-6.48,14.47-14.47,14.47h-1.05c-7.99,0-14.47-6.48-14.47-14.47V84.18c0-7.99,6.48-14.47,14.47-14.47Z"
              />
              <path 
                fill="hsl(var(--primary))" 
                d="M835.21,197.71c-9.47,0-18.13-1.56-25.99-4.69-7.86-3.13-14.62-7.52-20.26-13.17-5.65-5.65-10.04-12.4-13.17-20.26-3.13-7.86-4.69-16.52-4.69-25.99s1.56-18.43,4.69-26.45c3.13-8.01,7.52-14.88,13.17-20.61,5.65-5.72,12.4-10.15,20.26-13.28,7.86-3.13,16.52-4.69,25.99-4.69s18.13,1.57,25.99,4.69c7.86,3.13,14.62,7.56,20.26,13.28,5.65,5.72,10.04,12.59,13.17,20.61,3.13,8.01,4.69,16.83,4.69,26.45v49.64c0,7.99-6.48,14.47-14.47,14.47h-49.64Zm19.65-28.17c7.99,0,14.47-6.48,14.47-14.47v-21.48c0-5.34-.84-10.26-2.52-14.77-1.68-4.5-4.05-8.39-7.1-11.68-3.05-3.28-6.64-5.84-10.76-7.67-4.12-1.83-8.7-2.75-13.74-2.75s-9.62,.92-13.74,2.75c-4.12,1.83-7.71,4.39-10.76,7.67-3.06,3.28-5.42,7.18-7.1,11.68-1.68,4.5-2.52,9.43-2.52,14.77s.84,10.23,2.52,14.65c1.68,4.43,4.01,8.21,6.98,11.33,2.98,3.13,6.56,5.57,10.76,7.33,4.2,1.76,8.82,2.63,13.85,2.63h19.65Z"
              />
              <path 
                fill="hsl(var(--primary))" 
                d="M79.34,168.57c-5.27,3.97-11.79,5.96-19.58,5.96-4.58,0-8.74-.69-12.48-2.06-3.74-1.38-6.95-3.32-9.61-5.84-2.68-2.52-4.74-5.54-6.19-9.05s-2.17-7.33-2.17-11.45c0-7.32,2.29-13.89,6.87-19.69,7.63,3.82,16.48,5.73,26.56,5.73,8.24,0,15.76-1.34,22.55-4.01,6.79-2.67,12.63-6.41,17.52-11.22,4.88-4.81,8.66-10.61,11.34-17.4,1.33-3.4,2.33-7,3-10.79,.67-3.8,1-7.8,1-12,0-8.09-1.83-15.74-5.1-22.58-.02-.05-.05-.1-.07-.15-4.11-9.01-10.56-16.34-17.11-23.66-8.03-8.97-17.45-16.8-24.83-26.45-4-5.22-11.91-5.22-15.95-.03-4.48,5.75-9.7,10.84-14.76,16.08-6.25,6.47-12.49,12.93-18.15,19.96-4.55,4.58-8.08,10.03-10.62,16.34-2.67,6.64-4.01,13.93-4.01,21.87,0,5.8,.73,11.25,2.18,16.37,1.45,5.11,3.47,9.81,6.07,14.08-4.89,5.19-8.74,11.11-11.57,17.75-2.82,6.64-4.23,13.85-4.23,21.64s1.41,14.99,4.23,21.63c2.83,6.64,6.87,12.4,12.14,17.29s11.6,8.74,19.01,11.57c7.4,2.82,15.6,4.23,24.61,4.23,8.09,0,15.53-1.14,22.33-3.43,6.79-2.29,12.78-5.58,17.97-9.85s9.35-9.54,12.48-15.8c.03-.06,.06-.13,.09-.19,4.81-9.72-2.47-21.1-13.32-21.1h-.21c-5.63,0-10.91,3.09-13.32,8.18-1.49,3.15-3.71,5.84-6.68,8.07ZM38.13,61.57c3.7-5.03,8-9.47,12.3-13.92,3.19-3.3,6.49-6.5,9.2-10.23,1.84-2.52,5.57-2.45,7.39,.08,4.28,5.95,10.01,10.63,14.85,16.03,3.94,4.41,7.82,8.82,10.11,14.37,4.31,10.45,2.46,22.25-4.78,31-11.72,14.16-32.97,14.35-45.98,1.86-11.05-10.61-11.54-27.71-3.09-39.19Zm42.09,32.32c2.12-4.68,5.48-14.76,1.88-26.18-.28-.87,.95-1.4,1.39-.6,3.76,6.89,7.01,17.86-2.34,27.4-.44,.45-1.19-.05-.93-.62Z"
              />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-foreground mb-2">Glucovia</h1>
          <p className="text-muted-foreground">Your Diabetes Management Companion</p>
        </div>

        <Card className="w-full">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <CardHeader>
                <CardTitle>Welcome back</CardTitle>
                <CardDescription>Enter your credentials to access your account</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="loginEmail">Email</Label>
                    <Input
                      id="loginEmail"
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                      required
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="loginPassword">Password</Label>
                    <Input
                      id="loginPassword"
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      required
                      placeholder="Enter your password"
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    Sign In
                  </Button>
                </form>
              </CardContent>
            </TabsContent>

            <TabsContent value="signup">
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>Fill in your information to get started</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signupEmail">Email</Label>
                      <Input
                        id="signupEmail"
                        type="email"
                        value={signupData.email}
                        onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                        required
                        placeholder="Email"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signupName">Full Name</Label>
                      <Input
                        id="signupName"
                        value={signupData.name}
                        onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                        required
                        placeholder="Full Name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signupPhone">Phone Number</Label>
                    <Input
                      id="signupPhone"
                      value={signupData.phone}
                      onChange={(e) => setSignupData({...signupData, phone: e.target.value})}
                      required
                      placeholder="Phone Number"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signupPassword">Password</Label>
                      <Input
                        id="signupPassword"
                        type="password"
                        value={signupData.password}
                        onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                        required
                        placeholder="Password"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={signupData.confirmPassword}
                        onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                        required
                        placeholder="Confirm Password"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signupAge">Age</Label>
                      <Input
                        id="signupAge"
                        type="number"
                        value={signupData.age}
                        onChange={(e) => setSignupData({...signupData, age: e.target.value})}
                        required
                        placeholder="Age"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signupGender">Gender</Label>
                      <select
                        id="signupGender"
                        value={signupData.gender}
                        onChange={(e) => setSignupData({...signupData, gender: e.target.value})}
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="diabetesType">Diabetes Type</Label>
                      <select
                        id="diabetesType"
                        value={signupData.diabetesType}
                        onChange={(e) => setSignupData({...signupData, diabetesType: e.target.value})}
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">Select Type</option>
                        <option value="type1">Type 1</option>
                        <option value="type2">Type 2</option>
                        <option value="gestational">Gestational</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="diagnosisYear">Diagnosis Year</Label>
                      <Input
                        id="diagnosisYear"
                        type="number"
                        value={signupData.diagnosisYear}
                        onChange={(e) => setSignupData({...signupData, diagnosisYear: e.target.value})}
                        required
                        placeholder="Year"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signupHeight">Height (cm)</Label>
                      <Input
                        id="signupHeight"
                        type="number"
                        value={signupData.height}
                        onChange={(e) => setSignupData({...signupData, height: e.target.value})}
                        required
                        placeholder="Height"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signupWeight">Weight</Label>
                      <Input
                        id="signupWeight"
                        type="number"
                        step="0.1"
                        value={signupData.weight}
                        onChange={(e) => setSignupData({...signupData, weight: e.target.value})}
                        required
                        placeholder="Weight"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weightUnit">Unit</Label>
                      <select
                        id="weightUnit"
                        value={signupData.weightUnit}
                        onChange={(e) => setSignupData({...signupData, weightUnit: e.target.value})}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="kg">kg</option>
                        <option value="lbs">lbs</option>
                      </select>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    Create Account
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Auth;