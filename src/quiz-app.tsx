import React, { useState, useEffect } from "react";

// Sample quiz data
const quizData = [
  {
    id: 1,
    question: "Wartość funkcji sinus dla kąta 30° wynosi:",
    answers: ["0.5", "0.866", "1", "0"],
    correctAnswer: 0,
  },
  {
    id: 2,
    question: "Wartość funkcji cosinus dla kąta 60° wynosi:",
    answers: ["0.5", "0.866", "1", "0"],
    correctAnswer: 0,
  },
];

const Views = {
  SPLASH: "splash",
  HOME: "home",
  QUIZ: "quiz",
  RESULTS: "results",
};

// Updated Splash Screen Component with Progress Bar
const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const SPLASH_DURATION = 4000; // 2 seconds
  const UPDATE_INTERVAL = 20; // Update every 20ms

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, SPLASH_DURATION);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 * UPDATE_INTERVAL) / SPLASH_DURATION;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, UPDATE_INTERVAL);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="text-center mb-8">
        <div className="w-32 h-32 mb-6 mx-auto">
          <svg viewBox="0 0 100 100" className="w-full h-full text-blue-600">
            <polygon
              points="10,90 10,10 90,90"
              fill="currentColor"
              className="animate-pulse"
            />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Matematyczny Quiz
        </h1>
        <p className="text-gray-600 mb-8">Poznaj funkcje trygonometryczne</p>

        <div className="w-64 h-2 bg-blue-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-200 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

// Home Screen Component
const HomeScreen = ({ onStartQuiz }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Funkcje trygonometryczne kąta ostrego
      </h1>
      <button
        onClick={onStartQuiz}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Przejdź do quizu
      </button>
    </div>
  );
};

// Quiz Component
const Quiz = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswer = (answerIndex) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);
    const newUserAnswers = [...userAnswers, answerIndex];
    setUserAnswers(newUserAnswers);

    setTimeout(() => {
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        onComplete(newUserAnswers);
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-8 text-center">
        {quizData[currentQuestion].question}
      </h2>
      <div className="grid grid-cols-1 gap-4 w-full max-w-md">
        {quizData[currentQuestion].answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            disabled={selectedAnswer !== null}
            className={`p-4 text-left rounded-lg transition-colors ${
              selectedAnswer === null
                ? "bg-white hover:bg-gray-100"
                : selectedAnswer === index
                ? index === quizData[currentQuestion].correctAnswer
                  ? "bg-green-200"
                  : "bg-red-200"
                : "bg-white opacity-50"
            }`}
          >
            <span className="font-semibold">
              {String.fromCharCode(65 + index)}.
            </span>{" "}
            {answer}
          </button>
        ))}
      </div>
      <div className="mt-4 text-gray-600">
        Pytanie {currentQuestion + 1} z {quizData.length}
      </div>
    </div>
  );
};

// Results Component
const Results = ({ userAnswers, onReturnHome }) => {
  const calculateScore = () => {
    return quizData.reduce((score, question, index) => {
      return score + (userAnswers[index] === question.correctAnswer ? 1 : 0);
    }, 0);
  };

  const score = calculateScore();
  const percentage = Math.round((score / quizData.length) * 100);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Wyniki quizu</h2>
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <p className="text-xl text-center mb-2">
            Zdobyte punkty: {score}/{quizData.length}
          </p>
          <p className="text-xl text-center text-blue-600 font-bold">
            Wynik: {percentage}%
          </p>
        </div>

        <div className="space-y-4">
          {quizData.map((question, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
              <p className="font-semibold mb-2">{question.question}</p>
              <div className="space-y-2">
                {question.answers.map((answer, answerIndex) => (
                  <div
                    key={answerIndex}
                    className={`p-2 rounded ${
                      answerIndex === question.correctAnswer
                        ? "bg-green-100"
                        : userAnswers[index] === answerIndex
                        ? "bg-red-100"
                        : "bg-gray-50"
                    }`}
                  >
                    <span className="font-semibold">
                      {String.fromCharCode(65 + answerIndex)}.
                    </span>{" "}
                    {answer}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onReturnHome}
          className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full"
        >
          Powrót do strony głównej
        </button>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentView, setCurrentView] = useState(Views.SPLASH);
  const [userAnswers, setUserAnswers] = useState([]);

  const handleSplashComplete = () => setCurrentView(Views.HOME);
  const handleStartQuiz = () => setCurrentView(Views.QUIZ);
  const handleQuizComplete = (answers) => {
    setUserAnswers(answers);
    setCurrentView(Views.RESULTS);
  };
  const handleReturnHome = () => {
    setUserAnswers([]);
    setCurrentView(Views.HOME);
  };

  return (
    <div>
      {currentView === Views.SPLASH && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}
      {currentView === Views.HOME && (
        <HomeScreen onStartQuiz={handleStartQuiz} />
      )}
      {currentView === Views.QUIZ && <Quiz onComplete={handleQuizComplete} />}
      {currentView === Views.RESULTS && (
        <Results userAnswers={userAnswers} onReturnHome={handleReturnHome} />
      )}
    </div>
  );
};

export default App;
