import React, { useState,useRef } from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 're-resizable'; // Use re-resizable instead of react-resizable
import './Canvas.css';
import ImageWithTextFunction from './ImageWithTextFunction';
const Canvas = () => {
  const [images, setImages] = useState([]);
  const [dialogues, setDialogues] = useState([]);
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('./dialogueBox.png');
  const canvasRef = useRef(null);

  const handleImageUpload = (e) => {
    const newImages = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleImageDelete = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const addDialogue = ()=>{
      setDialogues([...dialogues,text]);
      setText('');

  }

  return (
    <>
     <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
     <input
        type="text"
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text here"
      />
      <button onClick={addDialogue}>Add Dialogue</button>

    <div className="canvas" style={{color:'black'}}>
     
      <div className="image-container">
        {images.map((image, index) => (
          <div key={index} className="resizable-container">
            <Draggable>
              <Resizable
                defaultSize={{ width: 200, height: 200 }}
                
                resizeHandles={['se']}
                enable={{
                  top: true,
                  right: true,
                  bottom: true,
                  left: true,
                  topRight: true,
                  bottomRight: true,
                  bottomLeft: true,
                  topLeft: true,
                }}
              >
                <img src={image} alt={`Image ${index}`} className="resizable-image" />
              </Resizable>
            </Draggable>
            {/* <button className="delete-button" onClick={() => handleImageDelete(index)}>
              Delete
            </button> */}
          </div>
        ))}
      </div>
      <div>
      {dialogues.map((dialogue, index) => (
          <div key={index} className="resizable-container">
            <Draggable>
              <Resizable
                defaultSize={{ width: 200, height: 200 }}
                lockAspectRatio
                enable={{
                  top: true,
                  right: true,
                  bottom: true,
                  left: true,
                  topRight: true,
                  bottomRight: true,
                  bottomLeft: true,
                  topLeft: true,
                }}
              >
               <textarea color='black'>{dialogue}</textarea>
              </Resizable>
            </Draggable>
            {/* <button className="delete-button" onClick={() => handleImageDelete(index)}>
              Delete
            </button> */}
          </div>
        ))}
      </div>
    </div>
    </>
  );

};

export default Canvas;