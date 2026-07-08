import { useState } from 'react';
import { Redirect, Route } from 'wouter';
import type { DialogueCollection } from './types';

import './App.css';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Settings from './pages/Settings';

import IconBrand from './assets/IconBrand';

function App() {
  const [data, setData] = useState<DialogueCollection>({});

  return (
    <div>
      <Navbar
        BrandLogo={IconBrand}
        brandName='Vaak'
        navItems={['Home', 'Settings']}
        selected='Home'
      />
      <Route path='/'><Home value={data} onChange={setData} /></Route>
      <Route path='/home'><Redirect to='/' /></Route>
      <Route path='/settings'><Settings /></Route>
    </div>
  )
}

export default App;
