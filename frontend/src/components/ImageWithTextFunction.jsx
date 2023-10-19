import React, { useRef, useState } from 'react';

const ImageWithTextFunction = ({ text, imageSrc }) => {
  const canvasRef = useRef(null);

  const createImageWithText = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      ctx.fillStyle = 'white';
      ctx.font = '24px Arial';
      ctx.fillText(text, 20, 40);
    };
  };

  return (
    <div>
      <input type='text' value>Add text</input>
      <button onClick={createImageWithText}>Create Image with Text</button>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default ImageWithTextFunction;