import React, { useState,useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 're-resizable'; // Use re-resizable instead of react-resizable
import './Canvas.css';
import ImageWithTextFunction from './ImageWithTextFunction';
import { Wallet, getDefaultProvider } from "ethers";
import { Database } from "@tableland/sdk";
import html2canvas from 'html2canvas';

const privateKey = process.env.REACT_APP_PRIVATE_KEY;
const wallet = new Wallet(privateKey);
const provider = getDefaultProvider("https://goerli.optimism.io/");
const signer = wallet.connect(provider);
const db = new Database({ signer });

const Canvas = () => {

  useEffect(() => {
    fetchCharacterList();

  }, []);
  const [characterList,setCharacterlist] = useState([])
  const [images, setImages] = useState([]);
  const [dialogues, setDialogues] = useState([]);
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('./dialogueBox.png');
  const [currImg, setCurrImg] = useState('')
  const tableName = "character_420_28";
  const contentToMergeRef = useRef(null);

  const handleDownload = () => {
    if (contentToMergeRef.current) {
      html2canvas(contentToMergeRef.current).then((canvas) => {
        const downloadLink = document.createElement('a');
        downloadLink.href = canvas.toDataURL('image/png');
        downloadLink.download = 'merged_content.png';
        downloadLink.click();
      });
    }
  };

  const canvasRef = useRef(null);

  const handleImageUpload = (e) => {
    const newImages = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const fetchCharacterList = async()=>{
    console.log('done')
    const { results } = await db.prepare(`SELECT * FROM ${tableName} WHERE owner = '${localStorage.getItem('metamaskAddress')}' ;`).all();
    console.log(results)
    setCharacterlist(results)
    
  }


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
                    {/* <div className='img-menu mt-12 ml-2 flex overflow-x-auto'> */}
                    <h3 className='font-bold mb-2 text-lg'>Select character</h3>
                      
                    <div>
                      {characterList.length === 0 ? (
                        <div>Loading...</div>
                      ) : (
                        characterList.map((obj, index) => (
                          <img
                            key={index}
                            src={`https://ipfs.io/ipfs/${obj.character_hash}/${obj.character_name}`}
                            alt={`Image ${index}`}
                            className='imgs mb-4' style={{
                              border: `https://ipfs.io/ipfs/${obj.character_hash}/${obj.character_name}` === currImg ? '6px solid orange' : 'none',
                          }}
                          onClick={() => handleClick(`https://ipfs.io/ipfs/${obj.character_hash}/${obj.character_name}`)}
  
                          />
                        ))
                      )}
                    </div>
                    </div>

                </div>
      </div>
    
     <div>
     <br></br>
     <input
        type="text"
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text here"
      />
      <p></p>
        <button onClick={addDialogue}>Add Dialogue</button>
      </div>

    <div ref={contentToMergeRef} className="canvas" style={{color:'black',marginLeft:'300px',marginTop:'-600px'}}>
     
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
    <button onClick={handleDownload}>Download Merged Image</button>
    </>
  );

};

export default Canvas;