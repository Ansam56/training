import { useState } from "react";
export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  // استقبلهم من ال App
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);
  function handleEditClick() {
    setIsEditing((editing) => !editing);
    if (isEditing) onChangeName(symbol, playerName);
  }
  function handleNameChange(event) {
    setPlayerName(event.target.value);
    // بحدث اسم اللاعب لما اليوزر يكتب في الانبوت
  }
  let editablePlayerName = <span className="player-name">{playerName}</span>;
  let btnCaption = "Edit";
  if (isEditing) {
    // بدي ال span رح نعرض input
    editablePlayerName = (
      <input
        className="player-name-input"
        required
        value={playerName}
        onChange={handleNameChange}
      />
    );
    btnCaption = "Save";
  }

  return (
    <li className={isActive ? "active" : undefined}>
      {editablePlayerName} <span className="player-symbol">{symbol}</span>
      <button onClick={handleEditClick}>{btnCaption}</button>
    </li>
  );
}
