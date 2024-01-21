import React, { useContext, useEffect, useState } from 'react';
import NavBarr from './components/NavBarr';
import './App.css';
import io from 'socket.io-client';
import { UserContext } from './UserContext';

const Play = () => {

    const { userData } = useContext(UserContext);
   

    class PlayerInfoDTO {
        constructor(player_nick, tokens, vip) {
            this.type = "PlayerInfo";
            this.player_nick = player_nick;
            this.tokens = tokens;
            this.vip = vip;
            this.ip_address = '';
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
        constructor(cardsOnTable, playersInGame, nextPlayer, tokensOnTable, lastCall, isFinished) {
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

    const [socket, setSocket] = useState(null);

    const handleButtonClick = () => {
        // Create a new WebSocket connection
        const newSocket = new WebSocket("ws://127.0.0.1:8000/ws/socket-server");

        // Set up event listeners for the new socket
        newSocket.addEventListener("open", (event) => {
            // Create an instance of PlayerInfoDTO
            const playerInfo = new PlayerInfoDTO(userData.username, userData.money, userData.vip);

            // Convert the PlayerInfoDTO object to a JSON string
            const playerInfoJSON = JSON.stringify(playerInfo);

            // Send the JSON string through the WebSocket
            newSocket.send(playerInfoJSON);
        });

        newSocket.addEventListener("message", (event) => {
            // Handle the response from the server
            const response = JSON.parse(event.data);
            console.log("Server response:", response);
        });

        // Save the new socket in the state
        setSocket(newSocket);
    };
    return (
        <div>
            <NavBarr />
            <div className="centered-content">
                <div className="about-content">
                    <h1>About Pokeryks</h1>
                    <p>
                        The Pokeryks project, carried out as part of the 'Team project' course run by 
                        the number II Friday group, aims to create a poker app in the Friday group 
                        number II, aiming to develop a poker application based on a REST API mechanism.
                        The application will be available as a web and mobile version on Android.
                        <br /><br />
                        The main aim of the project is to develop features, ensure optimal performance, 
                        and provide users with a high-quality entertainment experience. The motivation for 
                        the project stems from the perceived shortcomings and inadequate functionality 
                        of existing competitive solutions...
                    </p>
                    <button onClick={handleButtonClick}>Connect to WebSocket</button>
                </div>
            </div>
        </div>
    )
}

export default Play;
