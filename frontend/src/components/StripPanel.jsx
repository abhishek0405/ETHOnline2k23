import React from 'react';
import { useDrop } from 'react-dnd';
import Image from './Image';
import DialogueBox from './DialogueBox';

const ItemTypes = {
  IMAGE: 'image',
  DIALOGUE_BOX: 'dialogue_box',
};

function StripPanel() {
  const [items, setItems] = React.useState([]);

  const [, drop] = useDrop({
    accept: [ItemTypes.IMAGE, ItemTypes.DIALOGUE_BOX],
    drop: (item) => handleDrop(item),
  });

  const handleDrop = (item) => {
    setItems([...items, { type: item.type, content: item.content }]);
  };

  const panelStyle = {
    border: '1px dashed #aaa',
    height: '300px', // Adjust as needed
    width: '300px', // Adjust as needed
    backgroundColor: '#fff',
    position: 'relative',
    overflow: 'auto',
  };

  return (
    <div ref={drop} style={panelStyle}>
      {items.map((item, index) => (
        <div key={index} style={{ position: 'relative' }}>
          {item.type === ItemTypes.IMAGE && <Image image={item.content} />}
          {item.type === ItemTypes.DIALOGUE_BOX && <DialogueBox />}
        </div>
      ))}
    </div>
  );
}

export default StripPanel;