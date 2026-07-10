import { useState } from 'react';
import { Redirect, Route } from 'wouter';
import type { DialogueFile } from './types';

import './App.css';

import Navbar from './components/Navbar';
import Debug from './components/Debug';
import Home from './pages/Home';
import Settings from './pages/Settings';

import IconBrand from './assets/IconBrand';

function App() {
  const [file, setFile] = useState<DialogueFile>({ start: '0', data: {} });


  return (
    <div>
      <Navbar
        BrandLogo={IconBrand}
        brandName='Vaak'
        navItems={['Home', 'Settings']}
        selected='Home'
      />
      <Debug>{JSON.stringify(file)}</Debug>
      <Route path='/'>
        <Home
          start={file.start}
          value={file.data}
          onChange={(newData) => setFile(prevFile => ({ ...prevFile, data: newData }))}
          onStartRequest={(newStart) => setFile(prevFile => ({ ...prevFile, start: newStart }))}
        /></Route>
      <Route path='/home'><Redirect to='/' /></Route>
      <Route path='/settings'><Settings /></Route>
    </div>
  )
}

export default App;
