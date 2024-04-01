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
        //Implement logic for the player to stand
        axios.post('http://localhost:5000/game/stand',
            { gameId: gameState._id })
            .then(response => {
                setGameState(response.data);
                checkWinner(response.data.winner);
            })
            .catch(error =>
                console.error("Error standing:", error));
    };

    const startNewGame = () => {
        //Implement logic to start a new game
        setWinnerMessage(''); //Clear the winner message
        axios.post('http://loaclhost:5000/game/start')
            .then(response => setGameState(response.data))
            .catch(error =>
                console.error('Error starting a new game:', error));
    };

    const checkWinner = (winner) => {
        //Display winner message and start a new game
        setWinnerMessage('Winner: ${winner}');
        setTimeout(() => {
            startNewGame();
        }, 5000);// Automativally start a new game after 5 seconds
    };

    return (
        
    )
}