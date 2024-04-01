import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { response } from 'express';

const Game = () => {
    const [gameState, setGameState] = useState(null);
    const [winnerMessage, setWinnerMessage] = useState('');

    useEffect(() => {
        //Fetch initaial game state when the component mounts
        axios.post('https://localhost:5000/game/start')
            .then(response => setGameState(response.data))
            .catch(error =>
                console.error('Error starting a new game:', error));
    }, []);

    const handleHit = () => {
        //Implement logic for the player to hit
        axios.post('http://loaclhost:5000/game/hit',
        { gameId: gameState._id })
        .then(response => {
            setGameState(response.data);
            checkWinner(response.data.winner);
        })
        .catch(error => console.error('Error hitting:', error));
    };

    const handleStand = () => {
        
    }
}