import { useState } from "react";

export default function Player({name, symbol, isActive})
{
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(name)
     
    //Handle edit button click
    function handleEditClick()
    {
        setIsEditing(edit => !edit);
    }

    //Handle input field change event
    function updatePlayerName(event)
    {
        setPlayerName(event.target.value);
    }

    return (
        <li className={isActive ? "active" : undefined}>
          <span className="player">
            { isEditing ? <input type="text" required value={playerName} onChange={updatePlayerName}/> 
            : <span className="palyer-name">{playerName}</span> }
            <span className="player-symbol">{symbol}</span>
          </span>
          <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    )
}