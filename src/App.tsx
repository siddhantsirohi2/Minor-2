import React, { useState, useEffect } from 'react';
import { Send, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';

// Define the questions array
const QUESTIONS = [
  "What is your name?",
  "How old are you?",
  "What are your interests or hobbies?",
  "How are you feeling right now? (e.g., Happy, Sad, Excited, Tired)",
  "What kind of story are you in the mood for? (e.g., Adventure, Mystery, Romance)"
];

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [answer, setAnswer] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [animation, setAnimation] = useState(false);

  // Handle form submission
  const submitAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) return;

    // Save the response
    setResponses(prev => ({
      ...prev,
      [QUESTIONS[currentQuestionIndex]]: answer
    }));

    // Trigger animation
    setAnimation(true);

    // Move to next question after animation
    setTimeout(() => {
      setAnswer('');
      if (currentQuestionIndex >= QUESTIONS.length - 1) {
        setIsComplete(true);
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
      }
      setAnimation(false);
    }, 400);
  };

  // Calculate progress percentage
  const progressPercentage = ((currentQuestionIndex) / QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 p-6 text-white">
          <h1 className="text-2xl font-bold">Interactive Questionnaire</h1>
          <p className="text-indigo-100 mt-1">Share your thoughts with us</p>

          {/* Progress bar */}
          <div className="mt-4 h-2 w-full bg-indigo-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-300 transition-all duration-500 ease-in-out"
              style={{ width: `${isComplete ? 100 : progressPercentage}%` }}
            ></div>
          </div>
          <div className="mt-2 text-sm text-indigo-200">
            Question {isComplete ? QUESTIONS.length : currentQuestionIndex + 1} of {QUESTIONS.length}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isComplete ? (
            <form onSubmit={submitAnswer} className={`transition-opacity duration-300 ${animation ? 'opacity-0' : 'opacity-100'}`}>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {QUESTIONS[currentQuestionIndex]}
              </h2>
              <div className="relative">
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full p-4 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  placeholder="Your answer here..."
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors disabled:opacity-50"
                  disabled={!answer.trim()}
                >
                  {currentQuestionIndex < QUESTIONS.length - 1 ? (
                    <ArrowRight size={20} />
                  ) : (
                    <Send size={20} />
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8 space-y-6 animate-fade-in">
              <div className="flex justify-center">
                <div className="bg-green-100 p-4 rounded-full">
                  <CheckCircle size={48} className="text-green-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Thank You!</h2>
              <p className="text-gray-600">Your responses have been recorded.</p>

              <div className="mt-8 p-4 bg-indigo-50 rounded-lg text-left">
                <h3 className="font-medium text-indigo-800 mb-2 flex items-center">
                  <Sparkles size={16} className="mr-2" />
                  Your Responses
                </h3>
                <div className="space-y-2">
                  {Object.entries(responses).map(([question, answer], index) => (
                    <div key={index} className="text-sm">
                      <p className="font-medium text-gray-700">{question}</p>
                      <p className="text-gray-600 ml-4">{answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setCurrentQuestionIndex(0);
                  setResponses({});
                  setIsComplete(false);
                }}
                className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Start Over
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;