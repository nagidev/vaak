import { useState } from 'react';

import './App.css';

import Navbar from './components/Navbar';
import IllustratedMessage from './components/IllustratedMessage';
import Button from './components/Button';
import DialogueEditor from './components/DialogueEditor';

import IconBrand from './assets/IconBrand';
import IconBubble from './assets/IconBubble';
import IconPlus from './assets/IconPlus';
import Debug from './components/Debug';

function App() {
  const [data, setData] = useState({});

  const addNode = () => {
    setData((prevData) => {
      const keys = Object.keys(prevData).map(Number);
      const maxKey = keys.length > 0 ? Math.max(...keys) : 0;
      return { ...prevData, [maxKey + 1]: { speaker: '', text: '' } }
    });
  };

  const deleteNode = (key: number) => {
    const newData = { ...data };
    delete newData[key];
    setData(newData);
  };

  return (
    <div>
      <Navbar
        BrandLogo={IconBrand}
        brandName='Vaak'
        navItems={['Home', 'Settings']}
        selected='Home'
      />
      <div className='max-w-screen-xl p-2 mx-auto'>
        {(Object.keys(data).length === 0) &&
          <IllustratedMessage
            Icon={IconBubble}
            heading='Add dialogues.'
            body='Add new dialogues from the input to start creating your dialogue flow.'
          />
        }
        <div className='mb-2 flex flex-col gap-2'>
          {Object.entries(data).map(([key, value]: Array<any>) => (
            <DialogueEditor
              key={key}
              id={key}
              value={value}
              onDeleteRequest={() => deleteNode(key)}
            />
          ))}
        </div>
        <Debug show={false}>{JSON.stringify(data)}</Debug>
        <div className='sticky bottom-4 my-2 flex justify-center'>
          <Button
            className='md:w-100 grow-1 md:grow-0 text-xl'
            onClick={addNode}
          >
            <IconPlus className='w-10 h-10 fill-base-hard' />
            Add dialogue
          </Button>
        </div>
      </div>
    </div>
  )
}

export default App;
