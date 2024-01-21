import React, { useEffect, useState, useCallback } from 'react';
import NavBarr from './components/NavBarr';
import "./App.css";

const useLeaderboard = (url) => {
    const [ranks, setRanks] = useState([]);

    const fetchLeaderboard = useCallback(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setRanks(data))
            .catch(error => console.error('Error fetching leaderboard:', error));
    }, [url]);

    useEffect(() => {
        fetchLeaderboard();
    }, [fetchLeaderboard]);

    return [ranks, fetchLeaderboard];
};

const Rank = () => {
    const [ranks, fetchLeaderboard] = useLeaderboard('http://127.0.0.1:8001/ranks/');

    return (
        <div>
            <NavBarr />
            <div className='rank--outer'>
                <div className='rank--div'>
                    <h1>Poker Leaderboard</h1>
                    <div className='rank-table'>
                        {ranks.map(e => (
                            <div key={e.id} className='rank-record'>
                                <div className='rank-record-player'>Player {e.username}</div>
                                <div className='rank-record-wins'>{e.win_number} wins</div>
                            </div>
                        ))}
                    </div>
                    <button onClick={fetchLeaderboard} className="refresh-button">Refresh</button>
                </div>
            </div>
        </div>
    );
};

export default Rank;
