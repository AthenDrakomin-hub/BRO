import React, { useState, useEffect, useRef } from 'react';
import type { Project, ChatMessage } from '../types';
import ProgressBar from './ui/ProgressBar';
import DonationForm from './DonationForm';
import { GoogleGenAI, Chat } from '@google/genai';
import { LoaderIcon, PaperPlaneIcon, LockClosedIcon, TwitterIcon, FacebookIcon, LinkedInIcon } from './ui/Icons';
import { useLanguage } from '../contexts/LanguageContext';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isChatUnlocked, setIsChatUnlocked] = useState(false);
  const { language, t } = useLanguage();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const donationFormRef = useRef<HTMLDivElement>(null);

  const projectTranslation = project.translations[language] || project.translations.en;
  const percentage = Math.round((project.raised / project.goal) * 100);

  useEffect(() => {
    const initChat = async () => {
      try {
        const API_KEY = process.env.API_KEY;
        if (!API_KEY) {
          console.warn("Gemini API key not found.");
          setMessages([{ role: 'model', text: "AI Assistant is not available: API key not configured." }]);
          return;
        }
        const ai = new GoogleGenAI({ apiKey: API_KEY });
        const currentProjectTranslation = project.translations[language] || project.translations.en;
        const systemInstruction = `You are a helpful and knowledgeable assistant for a humanitarian aid organization. Your goal is to answer questions about a specific project based *only* on the following context. Do not invent information. Be concise, friendly, and encouraging. If asked about something outside the context, politely state that you can only answer questions about the project described. Project Context: "${currentProjectTranslation.longDescription}"`;
        
        const newChat = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: { systemInstruction },
        });
        
        setChat(newChat);
        setMessages([{ role: 'model', text: t('chat_intro_message') }]);
      } catch (error) {
        console.error("Failed to initialize chat:", error);
        setMessages([{ role: 'model', text: "Sorry, the AI assistant could not be initialized." }]);
      }
    };
    initChat();
  }, [project, language, t]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isChatLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || !chat || isChatLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: userInput };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsChatLoading(true);

    try {
      const response = await chat.sendMessage({ message: userInput });
      const modelMessage: ChatMessage = { role: 'model', text: response.text };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error("Error sending message to Gemini:", error);
      const errorMessage: ChatMessage = { role: 'model', text: "Sorry, I encountered an error. Please try again." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleUnlockChat = () => {
    setIsChatUnlocked(true);
  };

  const handleShare = (platform: 'twitter' | 'facebook' | 'linkedin') => {
    const url = window.location.href;
    const text = `Support "${projectTranslation.title}" with Aide Sans Frontières! See how you can help:`;
    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(text);
    let shareUrl = '';

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
    }
  };


  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <img className="w-full h-64 md:h-80 object-cover" src={project.imageUrl} alt={projectTranslation.title} loading="lazy" />
        <div className="p-6 md:p-8">
          <p className="text-sm font-semibold text-red-600 uppercase tracking-wide mb-2">{project.category}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{projectTranslation.title}</h2>
          
          <div className="my-6">
            <div className="flex justify-between items-end text-lg font-medium text-gray-700 mb-2">
              <span className="font-bold text-red-600">${project.raised.toLocaleString()}</span>
              <span className="text-sm">{t('raised_of')} ${project.goal.toLocaleString()} {t('goal')}</span>
            </div>
            <ProgressBar percentage={percentage} height="h-4" />
          </div>

          <div className="my-8 text-center border-t border-b py-6">
            <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">Share this project</h4>
            <div className="flex justify-center space-x-6">
                <button onClick={() => handleShare('twitter')} className="text-gray-500 hover:text-blue-400 transition-colors" aria-label="Share on Twitter">
                    <TwitterIcon className="w-8 h-8" />
                </button>
                <button onClick={() => handleShare('facebook')} className="text-gray-500 hover:text-blue-600 transition-colors" aria-label="Share on Facebook">
                    <FacebookIcon className="w-8 h-8" />
                </button>
                <button onClick={() => handleShare('linkedin')} className="text-gray-500 hover:text-blue-700 transition-colors" aria-label="Share on LinkedIn">
                    <LinkedInIcon className="w-8 h-8" />
                </button>
            </div>
          </div>
          
          <div className="prose max-w-none text-gray-700">
            <p>{projectTranslation.longDescription}</p>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg border">
            <h4 className="font-bold text-lg text-gray-800 mb-4 text-center">{t('ai_chat_title')}</h4>
            <div ref={chatContainerRef} className="relative bg-white rounded-md shadow-inner h-80 overflow-y-auto p-4 space-y-4">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                <span className="text-gray-200 text-5xl font-bold opacity-50 select-none -rotate-12">
                    Borderless Intelligence
                </span>
              </div>
              {messages.map((msg, index) => (
                <div key={index} className={`relative flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg text-sm whitespace-pre-wrap ${msg.role === 'user' ? 'bg-red-600 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isChatLoading && (
                <div className="relative flex justify-start">
                  <div className="bg-gray-200 text-gray-800 p-3 rounded-lg rounded-bl-none">
                    <div className="flex items-center justify-center space-x-1">
                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {isChatUnlocked ? (
              <form onSubmit={handleSendMessage} className="mt-4 flex items-center space-x-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder={t('chat_placeholder')}
                  disabled={isChatLoading || !chat}
                  className="w-full p-2.5 rounded-md border-gray-300 focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100 transition"
                  aria-label="Chat input"
                />
                <button type="submit" disabled={isChatLoading || !chat || !userInput.trim()} className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 disabled:bg-red-300 transition-all duration-200 transform hover:scale-110 active:scale-100 disabled:scale-100 flex-shrink-0">
                  <PaperPlaneIcon className="w-5 h-5" />
                </button>
              </form>
            ) : (
               <div className="mt-4 relative">
                <div className="absolute inset-0 bg-gray-100/70 backdrop-blur-sm rounded-md z-10 flex flex-col items-center justify-center text-center p-4">
                    <LockClosedIcon className="w-8 h-8 text-gray-500 mb-2" />
                    <p className="font-semibold text-gray-700 mb-3">{t('chat_unlock_prompt')}</p>
                    <button 
                        onClick={handleUnlockChat}
                        className="bg-red-600 text-white font-bold py-2 px-5 rounded-md hover:bg-red-700 transition-colors"
                    >
                        {t('chat_unlock_button')}
                    </button>
                </div>
                <div className="flex items-center space-x-2" aria-hidden="true">
                    <input type="text" disabled className="w-full p-2.5 rounded-md border-gray-300 bg-gray-100" placeholder={t('chat_placeholder')} />
                    <button type="submit" disabled className="bg-red-300 text-white p-3 rounded-full flex-shrink-0">
                        <PaperPlaneIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
            )}
          </div>

          <div ref={donationFormRef} className="mt-10 pt-8 border-t">
            <DonationForm 
                projectTitle={projectTranslation.title}
                onDonationSuccess={handleUnlockChat}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;