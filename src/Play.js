import React, { useEffect } from 'react';
import NavBarr from './components/NavBarr';
import './App.css';
import io from 'socket.io-client';

const Play = () => {
    useEffect(() => {
        const socket = io('ws://127.0.0.1:8000/ws/socket-server');  // Zastąp adresem twojego backendu.
    
        // Obsługa zdarzenia po nawiązaniu połączenia z serwerem WebSocket.
        socket.on('connect', () => {
          console.log('Połączono z serwerem WebSocket!');
        });
    
        // Obsługa zdarzenia po otrzymaniu wiadomości od serwera WebSocket.
        socket.on('message', (data) => {
          console.log('Otrzymano wiadomość:', data);
          // Tutaj możesz zaktualizować stan komponentu na podstawie otrzymanych danych.
        });
    
        // Obsługa zdarzenia po rozłączeniu z serwerem WebSocket.
        socket.on('disconnect', () => {
          console.log('Rozłączono z serwerem WebSocket!');
        });
    
        // Opcjonalnie: Wywołaj tę funkcję, aby zamknąć połączenie przy odmontowywaniu komponentu.
        return () => {
            if (socket.readyState === 1) { // <-- This is important
                socket.close();
            }
        };
      }, []);
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
                </div>
            </div>
        </div>
    )
}

export default Play;
