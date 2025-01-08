import React, { useState, useEffect } from "react";
import glowneImage from "./img/glowny.png";
import sinusImage from "./img/sinus.png";
import cosinusImage from "./img/cosinus.png";
import tangensImage from "./img/tangens.png";
import cotangensImage from "./img/cotangens.png";
import przykladImage from "./img/przyklad.png";

// Sample quiz data
const quizData = [
  {
    id: 1,
    question: "Cosinus kąta ostrego zawsze jest dodatni:",
    answers: ["Prawda", "Fałsz"],
    correctAnswer: 0,
  },
  {
    id: 2,
    question:
      "Która funkcja trygonometryczna kąta jest stosunkiem przyprostokątnej leżącej przy kącie do przeciwprostokątnej:",
    answers: ["Cotangens", "Tangens", "Cosinus", "Sinus"],
    correctAnswer: 2,
  },
  {
    id: 3,
    question: "Która z funkcji trygonometrycznych jest odwrotnością tangensa:",
    answers: ["Cotangens", "Arcus tangens", "Sinus", "Cosinus"],
    correctAnswer: 0,
  },
  {
    id: 4,
    question:
      "Dla kąta ostrego alfa α, który z poniższych stosunków opisuje funkcję cotangens (cot)?",
    answers: [
      "przyprostokątna przy kącie α / przeciwprostokątna",
      "przyprostokątna naprzeciw kąta α / przeciwprostokątna α",
      "przyprostokątna naprzeciw kąta α / przyprostokątna przy kącie α",
      "przyprostokątna przy kącie α / przyprostokątna naprzeciw kąta α",
    ],
    correctAnswer: 3,
  },
  {
    id: 5,
    question:
      "Jeśli sin α = 0,6, to jaką wartość ma cos α, zakładając, że α jest kątem ostrym:",
    answers: ["0,4", "0,7", "0,8", "0,5"],
    correctAnswer: 2,
  },
  {
    id: 6,
    question: "Co to jest sinus kąta ostrego w trójkącie prostokątnym:",
    answers: [
      "Stosunek przeciwprostokątnej do przyprostokątnej naprzeciw kąta ostrego",
      "Stosunek przyprostokątnej naprzeciw kąta ostrego do przeciwprostokątnej",
      "Stosunek przeciwprostokątnej do kąta",
      "Stosunek przyprostokątnej do kąta",
    ],
    correctAnswer: 1,
  },
  {
    id: 7,
    question: "Jaka jest funkcja trygonometryczna kąta prostego?",
    answers: ["Sinus", "Tangens", "Cosinus", "Żadna z powyższych"],
    correctAnswer: 3,
  },
  {
    id: 8,
    question:
      "Która funkcja trygonometryczna to stosunek przeciwprostokątnej do przyprostokątnej?",
    answers: ["Sinus", "Tangens", "Cosinus", "Cosecans"],
    correctAnswer: 4,
  },
  {
    id: 9,
    question: "W trójkącie prostokątnym sinus kąta ostrego to:",
    answers: ["a/c", "b/c", "b/a", "c/a"],
    correctAnswer: 2,
  },
  {
    id: 10,
    question: "Cosinus kąta ostrego w trójkącie prostokątnym to:",
    answers: ["b/a", "a/c", "b/c", "a/b"],
    correctAnswer: 2,
  },
  {
    id: 11,
    question: "Tangens kąta ostrego w trójkącie prostokątnym to:",
    answers: ["a/b", "b/a", "b/c", "c/a"],
    correctAnswer: 2,
  },
  {
    id: 12,
    question:
      "Która z poniższych funkcji trygonometrycznych jest odwrotnością tangensa?",
    answers: ["Cotangens", "Cosinus", "Sinus", "Cosecans"],
    correctAnswer: 1,
  },
  {
    id: 13,
    question: "Ile wynosi sinus kąta ( 45° )?",
    answers: ["1", "0.5", "√2 /2", "0.707"],
    correctAnswer: 3,
  },
  {
    id: 14,
    question: "Jaką wartość przyjmuje cosinus kąta ( 90°)?",
    answers: ["1", "0", "0.5", "-1"],
    correctAnswer: 2,
  },
  {
    id: 15,
    question: "Tangens kąta 0° jest równy:",
    answers: ["0", "1", "∞", "Nie istnieje"],
    correctAnswer: 1,
  },
  {
    id: 16,
    question: "Cotangens kąta ( 90° ) jest równy:",
    answers: ["0", "1", "∞", "Nie istnieje"],
    correctAnswer: 4,
  },
  {
    id: 17,
    question:
      "Która z poniższych funkcji przyjmuje wartości większe niż 1 w trójkącie prostokątnym?",
    answers: ["Sinus", "Cosinus", "Tangens", "Żadna z powyższych"],
    correctAnswer: 3,
  },
  {
    id: 18,
    question: "Jeśli sinus kąta wynosi √3 /2, to ile wynosi cosinus tego kąta?",
    answers: ["1/2", "√2/2", "√3/2", "1"],
    correctAnswer: 1,
  },
  {
    id: 19,
    question: "Jeżeli tangens kąta wynosi 1, to kąt wynosi:",
    answers: ["0°", "30°", "45°", "60°"],
    correctAnswer: 3,
  },
];

const Views = {
  SPLASH: "splash",
  HOME: "home",
  THEORY: "theory",
  QUIZ: "quiz",
  RESULTS: "results",
};

// Updated Splash Screen Component with Progress Bar
const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const SPLASH_DURATION = 3000; // 2 seconds
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
const HomeScreen = ({ onStartQuiz, onShowTheory }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Funkcje trygonometryczne kąta ostrego
      </h1>
      <div className="flex flex-col gap-4 w-full max-w-md">
        <button
          onClick={onShowTheory}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Teoria
        </button>
        <button
          onClick={onStartQuiz}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Przejdź do quizu
        </button>
      </div>
    </div>
  );
};

const Theory = ({ onReturnHome }) => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          {" "}
          <h1 className="text-2xl font-bold mb-6">
            Funkcje trygonometryczne kąta ostrego
          </h1>
          <p className="mb-4">
            Rozważmy trójkąt prostokątny, w którym przyprostokątne mają długości
            a i b, a przeciwprostokątna ma długość c. Zaznaczmy w tym trójkącie
            jeden z kątów ostrych, oznaczmy go jako α. Na podstawie tego rysunku
            możemy określić funkcje trygonometryczne kąta α.
          </p>
          <br />
          <img
            src={glowneImage}
            alt="Rysunek trójkąta prostokątnego"
            className="w-80 h-auto rounded-lg shadow-md mx-auto"
          />
          <br />
          <br />
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">
                Podstawowe funkcje trygonometryczne:
              </h2>
              <div className="space-y-4 pl-4">
                <div>
                  <p className="font-semibold">1. Sinus kąta ostrego α:</p>
                  <p className="pl-4">sin(α) = a/c</p>
                  <p className="text-sm text-gray-600 pl-4">
                    gdzie a to długość przyprostokątnej naprzeciwko kąta α, a c
                    to długość przeciwprostokątnej.
                  </p>
                </div>

                <div>
                  <p className="font-semibold">2. Cosinus kąta ostrego α:</p>
                  <p className="pl-4">cos(α) = b/c</p>
                  <p className="text-sm text-gray-600 pl-4">
                    gdzie b to długość przyprostokątnej przy kącie α, a c to
                    długość przeciwprostokątnej.
                  </p>
                </div>

                <div>
                  <p className="font-semibold">3. Tangens kąta ostrego α:</p>
                  <p className="pl-4">tan(α) = a/b</p>
                  <p className="text-sm text-gray-600 pl-4">
                    gdzie a to długość przyprostokątnej naprzeciwko kąta α, a b
                    to długość przyprostokątnej przy kącie α.
                  </p>
                </div>

                <div>
                  <p className="font-semibold">4. Cotangens kąta ostrego α:</p>
                  <p className="pl-4">cot(α) = b/a</p>
                  <p className="text-sm text-gray-600 pl-4">
                    gdzie b to długość przyprostokątnej przy kącie α, a a to
                    długość przyprostokątnej naprzeciwko kąta α.
                  </p>
                </div>
              </div>
            </section>
            <br />
            <section>
              <h2 className="text-xl font-semibold mb-3">
                Graficzna metoda zapamiętania:
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Sinus:</strong> Patrzymy na przyprostokątną
                  naprzeciwko kąta α oraz na przeciwprostokątną.
                  <br />
                  <br />
                  <img
                    src={sinusImage}
                    alt="Rysunek trójkąta prostokątnego"
                    className="w-80 h-auto rounded-lg shadow-md mx-auto"
                  />
                  <br />
                </li>
                <li>
                  <strong>Cosinus:</strong> Patrzymy na przyprostokątną przy
                  kącie α oraz na przeciwprostokątną.
                  <br />
                  <br />
                  <img
                    src={cosinusImage}
                    alt="Rysunek trójkąta prostokątnego"
                    className="w-80 h-auto rounded-lg shadow-md mx-auto"
                  />
                  <br />
                </li>
                <li>
                  <strong>Tangens:</strong> Patrzymy na przyprostokątną
                  naprzeciwko kąta α oraz na drugą przyprostokątną.
                  <br />
                  <br />
                  <img
                    src={tangensImage}
                    alt="Rysunek trójkąta prostokątnego"
                    className="w-80 h-auto rounded-lg shadow-md mx-auto"
                  />
                  <br />
                </li>
                <li>
                  <strong>Cotangens:</strong> Patrzymy na przyprostokątną przy
                  kącie α oraz na drugą przyprostokątną.
                  <br />
                  <br />
                  <img
                    src={cotangensImage}
                    alt="Rysunek trójkąta prostokątnego"
                    className="w-80 h-auto rounded-lg shadow-md mx-auto"
                  />
                  <br />
                </li>
              </ul>
            </section>
            <hr />
            <section>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Przykład:</h2>
                  <img
                    src={przykladImage}
                    alt="Rysunek trójkąta prostokątnego"
                    className="w-auto h-60 rounded-lg shadow-md mx-auto"
                  />
                  <br />
                  <br />
                  <div className="pl-4">
                    <p>sin(α) = 4/5</p>
                    <p>tan(α) = 4/3</p>
                    <p>cos(α) = 3/5</p>
                    <p>cot(α) = 3/4</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <button
            onClick={onReturnHome}
            className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full"
          >
            Powrót do strony głównej
          </button>
        </div>
      </div>
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
  const handleShowTheory = () => setCurrentView(Views.THEORY); // Dodane
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
        <HomeScreen
          onStartQuiz={handleStartQuiz}
          onShowTheory={handleShowTheory} // Dodane
        />
      )}
      {currentView === Views.THEORY && ( // Dodane
        <Theory onReturnHome={handleReturnHome} />
      )}
      {currentView === Views.QUIZ && <Quiz onComplete={handleQuizComplete} />}
      {currentView === Views.RESULTS && (
        <Results userAnswers={userAnswers} onReturnHome={handleReturnHome} />
      )}
    </div>
  );
};

export default App;
