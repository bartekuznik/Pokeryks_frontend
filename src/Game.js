import React, { useContext, useEffect, useState } from "react";
import NavBarr from "./components/NavBarr";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { UserContext } from "./UserContext";

const Game = () => {
  const { userData } = useContext(UserContext);
  const [socket, setSocket] = useState(null);
  const [riskAmount, setRiskAmount] = useState(0);
  const [gameState, setGameState] = useState(null);
  const navigate = useNavigate();

  const serverIp = userData.selectedServer.ip;

  useEffect(() => {
    const newSocket = new WebSocket(
      `ws://localhost:${serverIp}/ws/socket-server`
    );

    newSocket.addEventListener("open", () => {
      const playerInfo = new PlayerInfoDTO(
        userData.username,
        userData.money,
        userData.vip
      );
      newSocket.send(JSON.stringify(playerInfo));
    });

    newSocket.onmessage = (event) => {
      const response = JSON.parse(event.data);
      console.log(response);
      setGameState(response);
    };

    setSocket(newSocket);

    // Cleanup on unmount
    return () => newSocket.close();
  }, [serverIp, userData]);

  // Handlers for different moves, e.g., fold, call, raise, etc.
  const handleMove = (moveType, amount = 0) => {
    if (socket) {
      const move = new Move(userData.username, moveType, amount);
      socket.send(JSON.stringify(move));
    }
  };

  const returnToMenu = () => {
    navigate("/");
  };

  // Bottom game controls
  const gameControls = (
    <div className="game-controls">
      <button onClick={() => returnToMenu()}>Return to Menu</button>
      <button onClick={() => handleMove("Fold")}>Fold</button>
      <button onClick={() => handleMove("Call")}>Call</button>
      <button onClick={() => handleMove("Bet", riskAmount)}>Bet</button>
      <button onClick={() => setRiskAmount((r) => Math.max(0, r - 50))}>
        -50
      </button>
      <button onClick={() => setRiskAmount((r) => r + 50)}>+50</button>
    </div>
  );

  function importCardImage(cardFilename) {
    if (!cardFilename) {
      console.error("Card filename is undefined or null.");
      return null; // Return a default image or null
    }

    try {
      return require(`./cards/${cardFilename}.png`);
    } catch (e) {
      console.error(`Failed to load image: ./cards/${cardFilename}.png`, e);
      return null; // Return a default image or null
    }
  }

  // ... existing code ...

  return (
    <div>
      <NavBarr />
      <div className="game-container">
        {gameState && (
          <div className="game-table">
          <div className="community-cards">
            {[...Array(5)].map((_, index) => {
              const cardImage = importCardImage('backcard');
              return (
                <img
                  key={index}
                  src={cardImage}
                  alt="Community Card"
                  className="card-image"
                />
              );
            })}
          </div>
            {/* Column for game information */}
            <div className="game-info">
              <p>Last Call: {gameState.lastCall || "N/A"}</p>
              <p>Total Tokens: {gameState.tokensOnTable || "N/A"}</p>
              <p>
                Total Wins:{" "}
                {gameState.winPercentage
                  ? `${gameState.winPercentage}%`
                  : "N/A"}
              </p>
            </div>
          </div>
        )}

        {/* Game controls */}
        {gameControls}
      </div>
    </div>
  );
};

export default Game;

class PlayerInfoDTO {
  constructor(player_nick, tokens, vip) {
    this.type = "PlayerInfo";
    this.player_nick = player_nick;
    this.tokens = tokens;
    this.vip = vip;
    this.ip_address = "";
  }
}

// Move
class Move {
  constructor(nick, moveType, amount) {
    this.type = "Move";
    this.nick = nick;
    this.moveType = moveType;
    this.amount = amount;
  }
}

// UpdateTable
class UpdateTable {
  constructor(
    cardsOnTable,
    playersInGame,
    nextPlayer,
    tokensOnTable,
    lastCall,
    isFinished
  ) {
    this.cardsOnTable = cardsOnTable;
    this.playersInGame = playersInGame;
    this.nextPlayer = nextPlayer || "";
    this.tokensOnTable = tokensOnTable;
    this.lastCall = lastCall;
    this.isFinished = isFinished;
  }
}

// CardDto
class CardDto {
  constructor(card) {
    this.card = card || null;
  }
}

// PlayerInGameDTO
class PlayerInGameDTO {
  constructor(nick, tokens, card1, card2, winPercentage) {
    this.player_nick = nick;
    this.tokens = tokens;
    this.card_1 = card1;
    this.card_2 = card2;
    this.winPercentage = winPercentage || null;
  }
}
