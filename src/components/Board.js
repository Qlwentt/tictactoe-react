import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'styled-bootstrap-grid';

const StyledContainer = styled(Container)`
    max-width: 31.25rem;
    margin-top: 2rem;
    width: 100%;
`;

const Cell = styled.div`
    min-height: 6.75rem;
    text-align: center;
    font-size: 4.5rem;
    font-family: 'Montserrat', sans-serif;
    color: ${props => props.cellState === 'X' ? '#f4b611' : '#a7aeb5'};
`;

const StyledRow = styled(Row)`
    border-bottom: 1px solid #2b3a67;
    border-top: 1px solid #2b3a67;
    
    &:first-of-type, &:last-of-type {
        border: none; 
    }
    ${Col} {
        &:nth-child(2) {
            ${Cell} {
                border-left: 1px solid #2b3a67;
                border-right: 1px solid #2b3a67;
            }
        }
        
    }
`;


function Board({ board, setBoard, player, gameIsOver }) {

    function updateBoard(row, col) {
        const newBoard = [...board];
        newBoard[row][col] = player;
        setBoard(newBoard);

    }

    return (
        <StyledContainer>
            {board.map((row, rowIndex) => (
                <StyledRow key={rowIndex}>
                    {row.map((column, colIndex) => (
                        <Col noGutter col key={colIndex} xl="4" lg="4" md="4" sm="4">
                            <Cell cellState={board[rowIndex][colIndex]}onClick={()=>{
                                if(!gameIsOver && board[rowIndex][colIndex] === ''){
                                    updateBoard(rowIndex, colIndex);
                                }
                            }}>
                                {board[rowIndex][colIndex]}
                            </Cell>
                        </Col>
                    ))}
                </StyledRow>
            ))}
        </StyledContainer>
    );
  }

export default Board;
  