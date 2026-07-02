import { useState } from 'react';

import './App.css';

import Navbar from './components/Navbar';
import IllustratedMessage from './components/IllustratedMessage';
import TextInput from './components/TextInput';
import DialogueEditor from './components/DialogueEditor';

import IconBrand from './assets/IconBrand';
import IconBubble from './assets/IconBubble';

const showDebug = false;

function App() {
  const [data, setData] = useState<{}>({});

  const handleSubmit = (value: string) => {
    if ( value.trim() === '' ) return;

    setData((prevData) => {
      const keys = Object.keys(prevData).map(Number);
      const maxKey = keys.length > 0 ? Math.max(...keys) : 0;
      return { ...prevData, [maxKey + 1]: { text: value } }
    });
  };

  return (
    <div>
      <Navbar
        BrandLogo={IconBrand}
        brandName='Vaak'
        navItems={['Home', 'Settings']}
        selected='Home'
      />
      <div className='max-w-screen-xl p-4 mx-auto'>
        {(Object.keys(data).length === 0) &&
          <IllustratedMessage
            Icon={IconBubble}
            heading='Add dialogues.'
            body='Add new dialogues from the input to start creating your dialogue flow.'
          />
        }
        <div className='mb-4 flex flex-col gap-2'>
          {Object.entries(data).map(([key, value]: Array<any>) => (
            <DialogueEditor id={key} value={value} />
          ))}
        </div>
        {showDebug && <p className='rounded mb-2 p-2 bg-green-900 border border-green-500'><b>Debug</b><br />{JSON.stringify(data)}</p>}
        <div className='sticky bottom-4'>
          <TextInput onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  )
}

export default App;
