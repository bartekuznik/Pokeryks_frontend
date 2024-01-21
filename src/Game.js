import React, { useContext, useEffect, useState } from 'react';
import NavBarr from './components/NavBarr';
import { useNavigate } from "react-router-dom";
import './App.css';
import { UserContext } from './UserContext';

const Game = () => {
    const { userData } = useContext(UserContext);
    const [socket, setSocket] = useState(null);
    const [riskAmount, setRiskAmount] = useState(0);
    const [gameState, setGameState] = useState(null); 
    const navigate = useNavigate();

    // Assuming your server object has an 'ip' property
    const serverIp = userData.selectedServer.ip; 

    useEffect(() => {
        // Establish WebSocket connection when component mounts
        const newSocket = new WebSocket(`ws://localhost:${serverIp}/ws/socket-server`);

        newSocket.addEventListener('open', () => {
            const playerInfo = new PlayerInfoDTO(userData.username, userData.tokens, userData.vip);
            newSocket.send(JSON.stringify(playerInfo));
        });

        newSocket.onmessage = (event) => {
            const response = JSON.parse(event.data);
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
    }

    // Bottom game controls
    const gameControls = (
        <div className="game-controls">
            <button onClick={() => returnToMenu()}>Return to Menu</button>
            <button onClick={() => handleMove('Fold')}>Fold</button>
            <button onClick={() => handleMove('Call')}>Call</button>
            <button onClick={() => handleMove('Bet', riskAmount)}>Bet</button>
            <button onClick={() => setRiskAmount(r => Math.max(0, r - 50))}>-50</button>
            <button onClick={() => setRiskAmount(r => r + 50)}>+50</button>
        </div>
    );
    return (
        <div>
            <NavBarr />
            <div className="game-container">
                {gameState && (
                    <div className="game-table">
                        {/* Display the community cards on the table */}
                        <div className="community-cards">
                            {gameState.cardsOnTable.map((card, index) => (
                                <img
                                    key={index}
                                    src={`/images/cards/${card.card}.png`}
                                    alt="Community Card"
                                    className="card-image"
                                />
                            ))}
                        </div>
                        {/* Display the pot and other game information */}
                        <div className="pot-info">
                            <p>Pot: {gameState.tokensOnTable}</p>
                        </div>
                        {/* Display player information such as tokens and actions */}
                        <div className="player-info">
                            {/* Map over players and display their info */}
                            {gameState.playersInGame.map((player, index) => (
                                <div key={index} className="player">
                                    <div className="player-nickname">{player.nick}</div>
                                    <div className="player-tokens">Tokens: {player.tokens}</div>
                                    <div className="player-cards">
                                        <img
                                            src={`./public/images/cards/${player.card1}.png`}
                                            alt="Player Card 1"
                                            className="card-image"
                                        />
                                        <img
                                            src={`./public/images/cards/${player.card2}.png`}
                                            alt="Player Card 2"
                                            className="card-image"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {gameControls}
            </div>
        </div>
    );
};

export default Game;

// DTOs and other classes
class PlayerInfoDTO {
    // Make sure these properties match what your server expects
    constructor(player_nick, tokens, vip) {
        this.type = "PlayerInfo";
        this.player_nick = player_nick;
        this.tokens = tokens;
        this.vip = vip;
    }
}

class Move {
    // Make sure these properties match what your server expects
    constructor(nick, moveType, amount) {
        this.type = "Move";
        this.nick = nick;
        this.moveType = moveType;
        this.amount = amount;
    }
}