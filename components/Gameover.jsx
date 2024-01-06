export default function Gameover({winner, onRestart})
{
    return(
        <div id="game-over">
            {winner ? <p>{winner} won!</p> :<p>it's draw</p> }
            <p><button onClick={onRestart}>Rematch</button></p>
        </div>
    )
}