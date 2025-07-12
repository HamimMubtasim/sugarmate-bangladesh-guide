
import React, { useState } from 'react';
import { MessageCircle, Mic, Send, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const AICoachCard = () => {
  const [isListening, setIsListening] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');
  const { user } = useAuth();

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    // TODO: Implement voice recognition
  };

  const handleSendMessage = async () => {
    if (message.trim() && user) {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.functions.invoke('ai-coach', {
          body: { 
            prompt: message,
            userId: user.id 
          }
        });

        if (error) throw error;
        
        setResponse(data.response);
        setMessage('');
      } catch (error) {
        console.error('Error getting AI response:', error);
        setResponse('Sorry, I could not process your request at this time.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl border border-primary/20 shadow-lg">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-3 bg-primary/10 rounded-2xl">
          <MessageCircle size={24} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">AI Health Coach</h3>
          <p className="text-sm text-gray-600">Get personalized health insights</p>
        </div>
      </div>
      
      {response && (
        <div className="mb-4 p-4 bg-white/70 border border-gray-200 rounded-2xl">
          <p className="text-sm text-gray-700">{response}</p>
        </div>
      )}
      
      <div className="relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask your AI Coach"
          className="w-full p-4 pr-20 bg-white/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder-gray-400"
          onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
          disabled={isLoading}
        />
        
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
          <button
            onClick={handleVoiceToggle}
            className={`p-2 rounded-xl transition-all duration-200 ${
              isListening 
                ? 'bg-red-500 text-white animate-pulse' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            disabled={isLoading}
          >
            <Mic size={16} />
          </button>
          
          <button
            onClick={handleSendMessage}
            disabled={!message.trim() || isLoading}
            className="p-2 bg-primary text-white rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AICoachCard;
