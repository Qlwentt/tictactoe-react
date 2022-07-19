import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import { API_URL } from '../constants/constants';
import { getWinner } from '../utils/utils';
import Board from './Board';
import Button from 'react-bootstrap/Button';


const Wrapper = styled.section`
  font-family: 'Roboto', sans-serif;
`;

const Turn = styled.div`
    font-size: 2rem;
    font-weight: bold;
    margin: 0 auto;
    text-align: center;
    margin-top: 2rem;
`;

const Welcome = styled.h1`
    text-align: center;
    font-size: 2em;
    font-weight: bold;
    margin-bottom: 1em;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 50%;
  margin: 0 auto;
  Button {
    flex: 1 1 100%;
    margin: 10px;
  }
  `;

const GameResult = styled.div`
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    margin: 2rem auto;
`;

const NewGame = styled.div`
    margin: 0 auto;
    width: 110px;
`;

const StyledButton = styled(Button)`
    background-color: #2b3a67;
    border: none;
    &:hover {
        background-color: #2b3a67;
    }
`;

function Game() {
  const human = 'X';
  const [winner, setWinner] = useState(null);
  const [gameIsOver, setGameIsOver] = useState(false);
  const [player, setPlayer] = useState('X');
  const [difficulty, setDifficulty] = useState(null);
  const [board, setBoard] = useState([["", "", ""], ["", "", ""], ["", "", ""]]);


  function EndOfGame({winner}) {
    if (winner) {
        return <GameResult>{winner} wins!</GameResult>
    } else {
        return <GameResult>It's a draw!</GameResult>
    }
  }

  function setNewGame() {
    setGameIsOver(false);
    setWinner(null);
    setBoard([["", "", ""], ["", "", ""], ["", "", ""]]);
    setPlayer('X')
    setDifficulty(null);
  }

    useEffect(() => {
        const win = getWinner(board);
        if (win) {
            setGameIsOver(true);
            setWinner(win);
        } 
        
        if (board.every(row => row.every(cell => cell !== ""))) {
            setGameIsOver(true);
        } 
        if (!board.every(row => row.every(cell => cell === ""))) {
            console.log("swapping player");
            setPlayer(player => player === 'X' ? 'O' : 'X');

        }

    },[board]);

    useEffect(() => {
        async function getComputerMove(board, difficulty) {
            if (gameIsOver) {
                return null
            }
            const response = await fetch(`${API_URL}/api/get-move`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                board: board,
                difficulty: difficulty,
                player: player
            }),
            });
            const data = await response.json();
            return data.data.coordinates;
        }


        if (player !== human && !gameIsOver) {
            getComputerMove(board, difficulty).then(move => {
                if (move) {
                    const row = move[0];
                    const col = move[1];
                    const newBoard = [...board];
                    newBoard[row][col] = player;
                    setBoard(newBoard);
                }
            });
            
        }

    }, [player]);


  return (
    <Wrapper>
      {!difficulty && 
        <Welcome>Welcome to Tic Tac Toe!</Welcome>
    }
      {difficulty &&  <Board board={board} setBoard={setBoard} player={player} gameIsOver={gameIsOver}></Board>}
 
      
      {!difficulty && (
      <ButtonWrapper>
        Choose difficulty:
        <StyledButton onClick={() => {setDifficulty(1)}}>Easy</StyledButton>
        <StyledButton onClick={() => {setDifficulty(2)}}>Medium</StyledButton>
        <StyledButton onClick={() => {setDifficulty(3)}}>Hard</StyledButton>
        <StyledButton onClick={() => {setDifficulty(4)}}>Impossible</StyledButton>
      </ButtonWrapper>     
    )}
    { !gameIsOver && player === human && difficulty && (
        <Turn>Your Turn</Turn>
    )}
    { gameIsOver && (
        <>
            <EndOfGame winner={winner}/>
            <NewGame>
                <StyledButton onClick={() => { setNewGame() }} >New Game</StyledButton>
            </NewGame>
            
        </>
    
    )}
    </Wrapper>
  );
}


export default Game;
