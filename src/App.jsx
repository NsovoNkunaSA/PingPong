import { useState } from "react";
import "./App.css";

function PlayerSetup({ startGame }) {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (player1.trim() === "" || player2.trim() === "") {
      return;
    }

    startGame(player1, player2);
  }

  return (
    <main className="setup">
      <h1>Pong Game</h1>
      <p>Enter the names of both players.</p>

      <form onSubmit={handleSubmit}>
        <label>
          Player 1
          <input
            type="text"
            value={player1}
            onChange={(event) => setPlayer1(event.target.value)}
            placeholder="Enter Player 1 name"
          />
        </label>

        <label>
          Player 2
          <input
            type="text"
            value={player2}
            onChange={(event) => setPlayer2(event.target.value)}
            placeholder="Enter Player 2 name"
          />
        </label>

        <button type="submit">
          Start Game
        </button>
      </form>
    </main>
  );
}

function PongGame({ player1, player2 }) {
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);

  return (
    <main className="game">
      <section className="scoreboard">
        <article>
          <h2>{player1}</h2>
          <p>{score1}</p>
        </article>

        <span>VS</span>

        <article>
          <h2>{player2}</h2>
          <p>{score2}</p>
        </article>
      </section>

      <section className="pong-board">
        <div className="paddle left-paddle"></div>

        <div className="ball"></div>

        <div className="paddle right-paddle"></div>
      </section>
    </main>
  );
}

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  function startGame(name1, name2) {
    setPlayer1(name1);
    setPlayer2(name2);
    setGameStarted(true);
  }

  if (!gameStarted) {
    return <PlayerSetup startGame={startGame} />;
  }

  return (
    <PongGame
      player1={player1}
      player2={player2}
    />
  );
}

