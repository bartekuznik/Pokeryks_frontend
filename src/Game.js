import React, { useContext, useEffect, useState } from "react";
import NavBarr from "./components/NavBarr";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { UserContext } from "./UserContext";

const Game = () => {
  const [riskAmount, setRiskAmount] = useState(0);
  const { userData } = useContext(UserContext);
  const [socket, setSocket] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [communityCards, setCommunityCards] = useState(
    new Array(5).fill("backcard")
  );
  const navigate = useNavigate();
  const cardsNumber = 5;

  // State to hold the current user's cards and other players
  const [currentUserCards, setCurrentUserCards] = useState({
    card1: "backcard",
    card2: "backcard",
  });
  const [otherPlayers, setOtherPlayers] = useState([]);

  useEffect(() => {
    const newSocket = new WebSocket(
      `ws://localhost:${userData.selectedServer.ip}/ws/socket-server`
    );

    newSocket.onopen = () => {
      console.log("WebSocket connection opened.");
      const playerInfo = new PlayerInfoDTO(
        userData.username,
        userData.money,
        userData.vip
      );
      newSocket.send(JSON.stringify(playerInfo));
    };

    newSocket.onmessage = (event) => {
      console.log("Message from server:", event.data);
      const message = JSON.parse(event.data);
      handleMessage(message);
    };

    newSocket.onerror = (event) => {
      console.error("WebSocket error observed:", event);
    };

    setSocket(newSocket);

    // Cleanup function
    return () => {
      newSocket.close();
    };
  }, [userData]);

  // A function to handle different types of messages
  const handleMessage = (message) => {
    switch (message.type) {
      case "Greeting":
        // Handle Greeting message
        console.log("Greeting message:", message);
        break;
      case "UpdateTable":
        // Update game state
        setGameState(message);

        // Find current user and update cards
        const currentPlayer = message.playersInGame.find(
          (player) => player.player_nick === userData.username
        );

        if (currentPlayer) {
          setCurrentUserCards({
            card1: currentPlayer.card_1?.card || "backcard",
            card2: currentPlayer.card_2?.card || "backcard",
          });
        }

        // Update community cards
        const updatedCommunityCards = message.cardsOnTable.map(
          (card) => card.card || "backcard"
        );
        while (updatedCommunityCards.length < 5) {
          updatedCommunityCards.push("backcard");
        }
        setCommunityCards(updatedCommunityCards);

        break;
      case "PlayerJoined":
        console.log("Player joined:", message);
        break;
      case "PlayerLeft":
        console.log("Player left:", message);

        break;
      default:
        console.log("Unknown message type:", message);
    }
  };

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
      return require(`./cards/backcard.png`);
    }

    try {
      return require(`./cards/${cardFilename}.png`);
    } catch (e) {
      return require(`./cards/backcard.png`);
    }
  }

  // Function to render all user boxes with their respective cards
  const renderUserBoxes = () => {
    const userBoxes = [];
    const positions = ["bottom-user", "top-user", "right-user", "left-user"];

    if (gameState && gameState.playersInGame) {
      // Find the index of the current user in the playersInGame array
      const currentUserIndex = gameState.playersInGame.findIndex(
        (player) => player.player_nick === userData.username
      );

      // Determine the position index based on the current user's index
      gameState.playersInGame.forEach((player, index) => {
        const positionIndex =
          (index - currentUserIndex + positions.length) % positions.length;
        const isCurrentUser = player.player_nick === userData.username;
        const playerCards = isCurrentUser
          ? currentUserCards
          : { card1: "backcard", card2: "backcard" };

        userBoxes.push(
          <div
            key={player.player_nick}
            className={`user-box ${positions[positionIndex]}`}
          >
            <img
              src={importCardImage(playerCards.card1)}
              alt="Player Card 1"
              className="card-image"
            />
            <img
              src={importCardImage(playerCards.card2)}
              alt="Player Card 2"
              className="card-image"
            />
            <div className="user-info">
              {player.player_nick} - Tokens: {player.tokens}
            </div>
          </div>
        );
      });
    }

    return userBoxes;
  };
  const renderCommunityCards = () => {
    return communityCards.map((card, index) => (
      <img
        key={index}
        src={importCardImage(card)}
        alt={`Community Card ${index + 1}`}
        className="card-image"
      />
    ));
  };

  return (
    <div>
      <NavBarr />
      <div className="game-container">
        {gameState && (
          <div className="game-table">
            {/* User boxes */}
            {renderUserBoxes()}

            <div className="community-cards">
              {/* Render community cards from the state */}
              {renderCommunityCards()}
            </div>
            {/* Column for game information */}
            <div className="game-info">
              <p>User: {userData.username}</p>
              <p>Last Call: {gameState.lastCall || "0.0%"}</p>
              <p>Total Tokens: {gameState.tokensOnTable || "N/A"}</p>
              <p>
                Total Wins:{" "}
                {gameState.winPercentage
                  ? `${gameState.winPercentage}%`
                  : "0.0"}
              </p>
            </div>
            {/* Display current user's cards */}
            <div className="user-box bottom-user">
              <img
                src={importCardImage(currentUserCards.card1)}
                alt="Player Card 1"
                className="card-image"
              />
              <img
                src={importCardImage(currentUserCards.card2)}
                alt="Player Card 2"
                className="card-image"
              />
              <div className="user-info">User tokens: {userData.money}</div>
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
