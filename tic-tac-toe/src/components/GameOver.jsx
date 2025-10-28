export default function GameOver({ winner, onRestart }) {
  return (
    <div id="game-over">
      {winner ? <h2>{winner} Wins!</h2> : <h2>It's a Draw!</h2>}
      <button onClick={onRestart}>Restart Game</button>
    </div>
  );
}
