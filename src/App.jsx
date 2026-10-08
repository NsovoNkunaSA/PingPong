
import { useEffect, useState } from "react";
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

        <button type="submit">Start Game</button>
      </form>
    </main>
  );
}

function PongGame({ player1, player2 }) {
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);

  const [ball, setBall] = useState({
    x: 50,
    y: 50,
    dx: 0.5,
    dy: 0.5
  });

  const [paddle1, setPaddle1] = useState(50);
  const [paddle2, setPaddle2] = useState(50);

  useEffect(() => {
    function moveBall() {
      setBall((currentBall) => {
        let newX = currentBall.x + currentBall.dx;
        let newY = currentBall.y + currentBall.dy;

        let newDx = currentBall.dx;
        let newDy = currentBall.dy;

        if (newY <= 2 || newY >= 98) {
          newDy = -newDy;
        }

        if (newX <= 5) {
          if (Math.abs(newY - paddle1) < 15) {
            newDx = Math.abs(newDx);
          } else {
            setScore2((score) => score + 1);

            return {
              x: 50,
              y: 50,
              dx: 0.5,
              dy: 0.5
            };
          }
        }

        if (newX >= 95) {
          if (Math.abs(newY - paddle2) < 15) {
            newDx = -Math.abs(newDx);
          } else {
            setScore1((score) => score + 1);

            return {
              x: 50,
              y: 50,
              dx: -0.5,
              dy: 0.5
            };
          }
        }

        return {
          x: newX,
          y: newY,
          dx: newDx,
          dy: newDy
        };
      });
    }

    const gameLoop = setInterval(moveBall, 16);

    return () => clearInterval(gameLoop);
  }, [paddle1, paddle2]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "w" || event.key === "W") {
        setPaddle1((position) => Math.max(10, position - 5));
      }

      if (event.key === "s" || event.key === "S") {
        setPaddle1((position) => Math.min(90, position + 5));
      }

      if (event.key === "ArrowUp") {
        setPaddle2((position) => Math.max(10, position - 5));
      }

      if (event.key === "ArrowDown") {
        setPaddle2((position) => Math.min(90, position + 5));
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <main className="game">
      <section className="scoreboard">
        <article>
          <h2>{player1}</h2>
          <p>{score1}</p>
          <small>W / S</small>
        </article>

        <span>VS</span>

        <article>
          <h2>{player2}</h2>
          <p>{score2}</p>
          <small>↑ / ↓</small>
        </article>
      </section>

      <section className="pong-board">
        <div
          className="paddle left-paddle"
          style={{ top: `${paddle1}%` }}
        ></div>

        <div
          className="ball"
          style={{
            left: `${ball.x}%`,
            top: `${ball.y}%`
          }}
        ></div>

        <div
          className="paddle right-paddle"
          style={{ top: `${paddle2}%` }}
        ></div>
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
