import React from 'react';
import { useDrag } from 'react-dnd';

const ItemTypes = {
  IMAGE: 'image',
};

function Image({ image }) {
  const [, drag] = useDrag({
    type: ItemTypes.IMAGE,
    item: { image },
  });

  return <img src={image} alt="Draggable Image" ref={drag} />;
}

export default Image;