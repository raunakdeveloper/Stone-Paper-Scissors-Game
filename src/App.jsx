import React, { useState } from 'react';

function App() {
  const [userChoice, setUserChoice] = useState('None');
  const [computerChoice, setComputerChoice] = useState('None');
  const [result, setResult] = useState('None');
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const choices = ['Stone', 'Paper', 'Scissors'];

  const getResult = (user, computer) => {
    if (user === computer) return "It's a draw!";
    if (
      (user === 'Stone' && computer === 'Scissors') ||
      (user === 'Scissors' && computer === 'Paper') ||
      (user === 'Paper' && computer === 'Stone')
    ) {
      setUserScore((prev) => prev + 1);
      return 'You win!';
    } else {
      setComputerScore((prev) => prev + 1);
      return 'Computer wins!';
    }
  };

  const handleClick = (choice) => {
    if (gameOver) return;
  
    const computerRandomChoice = choices[Math.floor(Math.random() * choices.length)];
    setUserChoice(choice);
    setComputerChoice(computerRandomChoice);
    const result = getResult(choice, computerRandomChoice);
    setResult(result);

    if (result === 'You win!') {
      setUserScore((prev) => {
        const newScore = prev + 1;
        if (newScore === 10) {
          setGameOver(true);
        }
        return newScore;
      });
    } else if (result === 'Computer wins!') {
      setComputerScore((prev) => {
        const newScore = prev + 1;
        if (newScore === 10) {
          setGameOver(true);
        }
        return newScore;
      });
    }
  };
  

  const resetGame = () => {
    setUserScore(0);
    setComputerScore(0);
    setResult('None');
    setUserChoice('None');
    setComputerChoice('None');
    setGameOver(false);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mt-5 mb-5 text-center text-indigo-600">Stone Paper Scissors Game</h1>

      {gameOver ? (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-green-500 mb-5">
            {userScore === 10 ? 'You win the game!' : 'Computer wins the game!'}
          </h2>
          <button
            onClick={resetGame}
            className="px-6 py-2 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-700"
          >
            Play Again
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-center items-center mt-10 space-x-4">
            {choices.map((choice) => (
              <button
                key={choice}
                className="w-24 h-24 bg-indigo-500 text-white font-bold rounded-full hover:bg-indigo-700 flex items-center justify-center text-lg"
                onClick={() => handleClick(choice)}
              >
                {choice}
              </button>
            ))}
          </div>

          <div className="mt-10 text-center">
            <h2 className="text-lg font-semibold">You chose: <span className="text-blue-500">{userChoice}</span></h2>
            <h2 className="text-lg font-semibold">Computer chose: <span className="text-red-500">{computerChoice}</span></h2>
            <h2 className="text-2xl font-bold mt-5">Result: <span className="text-green-500">{result}</span></h2>
          </div>

          <div className="mt-10 text-center">
            <h3 className="text-xl font-semibold mb-2">Score</h3>
            <div className="flex justify-center space-x-10">
              <div className="bg-blue-100 p-4 rounded-lg shadow-md w-28">
                <h4 className="text-lg">You</h4>
                <p className="text-2xl font-bold">{userScore}</p>
              </div>
              <div className="bg-red-100 p-4 rounded-lg shadow-md w-28">
                <h4 className="text-lg">Computer</h4>
                <p className="text-2xl font-bold">{computerScore}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
