
import React, { useState } from 'react';
import { MessageCircle, Mic, Send } from 'lucide-react';

const AICoachCard = () => {
  const [isListening, setIsListening] = useState(false);
  const [message, setMessage] = useState('');

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    // TODO: Implement voice recognition
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // TODO: Implement AI chat functionality
      console.log('Sending message:', message);
      setMessage('');
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
      
      <div className="relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask your AI Coach"
          className="w-full p-4 pr-20 bg-white/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder-gray-400"
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
          <button
            onClick={handleVoiceToggle}
            className={`p-2 rounded-xl transition-all duration-200 ${
              isListening 
                ? 'bg-red-500 text-white animate-pulse' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Mic size={16} />
          </button>
          
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="p-2 bg-primary text-white rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AICoachCard;
