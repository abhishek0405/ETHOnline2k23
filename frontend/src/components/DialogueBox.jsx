import React from "react";
import {useState} from 'react'
import Draggable from 'react-draggable';
import { Resizable } from 're-resizable'; // Use re-resizable instead of react-resizable
const ItemTypes = {
  DIALOGUE_BOX: "dialogue_box",
};

function DialogueBox() {
  const [text, setText] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <Draggable>
      <Resizable
        className="dialog-box"
        width={300}
        height={200}
        lockAspectRatio
        resizeHandles={['se']}
      >
        <div className="dialog-content">
          <textarea
            className="dialog-textarea"
            value={text}
            onChange={handleTextChange}
            placeholder="Type your text here..."
          />
          {/* <button className="close-button" onClick={onClose}>
            Close
          </button> */}
        </div>
      </Resizable>
    </Draggable>
  );
  
}

export default DialogueBox;