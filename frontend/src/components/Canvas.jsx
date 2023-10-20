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
  const [currImg, setCurrImg] = useState('')

  const canvasRef = useRef(null);

  const handleImageUpload = (e) => {
    const newImages = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleClick = async(url) => {
    setCurrImg(url);
    const fileArr = await getFile(url);
    const newImages = Array.from(fileArr).map((file) => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
    console.log(images)
}

  const handleImageDelete = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const addDialogue = ()=>{
      setDialogues([...dialogues,text]);
      setText('');

  }

  const getFile = async(imageUrl)=>{
   
      const fileName = 'name' + Math.random();
      const response = await fetch(imageUrl);
      console.log("response is ",response)
      const contentType = response.headers.get('content-type')
      const blob = await response.blob()
      const file = [new File([blob], fileName, { contentType })]      
      return file;
  }

  return (
    <>
    <div className='flex'>
                    <div className='flex-auto'>
                    
                    <div className='img-menu mt-12 ml-2  overflow-y-scroll'>
                    <h3 className='font-bold mb-2 text-lg'>Select character</h3>
                        <img src="https://ipfs.io/ipfs/Qmf9fzrrg9ZnSUuPwGQUbGepwhvQUyxe6AwP1J9zoXU821" className='imgs mb-4' alt="img1" style={{
                            border: "https://ipfs.io/ipfs/Qmf9fzrrg9ZnSUuPwGQUbGepwhvQUyxe6AwP1J9zoXU821" === currImg ? '6px solid orange' : 'none',
                        }}
                        onClick={() => handleClick("https://ipfs.io/ipfs/Qmf9fzrrg9ZnSUuPwGQUbGepwhvQUyxe6AwP1J9zoXU821")}

                        
                        />


                        <img src="https://ipfs.io/ipfs/QmQPoCVQNY2fSXGENmS22Ha4DeL83bQP2s2DDesiuASFDf" className='imgs mb-4' alt="img2"
                        onClick={() => handleClick("https://ipfs.io/ipfs/QmQPoCVQNY2fSXGENmS22Ha4DeL83bQP2s2DDesiuASFDf")}
                        style={{
                            border: "https://ipfs.io/ipfs/QmQPoCVQNY2fSXGENmS22Ha4DeL83bQP2s2DDesiuASFDf" === currImg ? '6px solid orange' : 'none',
                        }}

                        />
                    </div>

                </div>
      </div>
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