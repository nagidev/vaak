import { useEffect, useRef, useState } from 'react';
import { Redirect, Route, Switch, useLocation } from 'wouter';
import type { DialogueFile } from './types';
import { DEFAULT_DIALOGUE_FILE } from './types';

import './App.css';

import Navbar from './components/Navbar';
import IllustratedMessage from './components/IllustratedMessage';
import Debug from './components/Debug';
import Home from './pages/Home';
import Settings from './pages/Settings';

import IconBrand from './assets/IconBrand';
import IconSignPost from './assets/IconSignPost';
import IconDownload from './assets/IconDownload';
import IconUpload from './assets/IconUpload';
import IconHome from './assets/IconHome';
import IconSettings from './assets/IconSettings';

function App() {
  const [location, navigate] = useLocation();
  const [navTab, setNavTab] = useState('home');
  const navIconClass = 'w-9 h-9 fill-white group-[.selected]:fill-base-hard md:group-[.selected]:fill-primary';

  const tempFile = localStorage.getItem('temp_file');
  const [file, setFile] = useState<DialogueFile>(tempFile ? JSON.parse(tempFile) : DEFAULT_DIALOGUE_FILE);
  const fileInputRef = useRef(null);

  const handleSearch = (value: string) => {
    console.log(value)
  };

  const handleCta = (value: string) => {
    switch (value) {
      case 'download':
        downloadFile();
        break;
      case 'upload':
        fileInputRef.current.click();
        break;
    }
  };

  const downloadFile = () => {
    const jsonString = JSON.stringify(file, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const href = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = href;
    link.download = 'dialogue_file.json';

    document.body.appendChild(link);
    link.click();

    document.removeChild(link);
    URL.revokeObjectURL(href);
  };

  const uploadFile = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      if (!e.target) return;
      setFile(JSON.parse((e.target.result as string)));
      navigate('/home');
    };
    if (e.target.files) {
      reader.readAsText(e.target.files[0]);
    }
  };

  useEffect(() => {
    const curLocation = location.split('/')[1];
    setNavTab(curLocation === '' ? 'home' : curLocation);
  }, [location]);

  useEffect(() => {
    localStorage.setItem('temp_file', JSON.stringify(file));
  }, [file]);

  return (
    <div>
      <Navbar
        BrandLogo={IconBrand}
        brandName='Vaak'
        navItems={[
          ['Home', <IconHome className={navIconClass} />, 'home'],
          ['Settings', <IconSettings className={navIconClass} />, 'settings'],
        ]}
        ctaItems={[
          ['Download', <IconDownload className={navIconClass} />, 'download'],
          ['Upload', <IconUpload className={navIconClass} />, 'upload'],
        ]}
        selected={navTab}
        onCta={handleCta}
        onSearch={handleSearch}
      />
      <Debug>{JSON.stringify(file)}</Debug>
      <Switch>
        <Route path='/'>
          <Home
            start={file.start}
            value={file.data}
            onChange={(newData) => setFile(prevFile => ({ ...prevFile, data: newData }))}
            onStartRequest={(newStart) => setFile(prevFile => ({ ...prevFile, start: newStart }))}
            onUploadRequest={() => fileInputRef.current.click()}
          />
          <input
            type='file'
            accept='application/json'
            ref={fileInputRef}
            onChange={uploadFile}
            className='hidden'
          />
        </Route>
        <Route path='/home'><Redirect to='/' /></Route>
        <Route path='/download'><Redirect to='/' /></Route>
        <Route path='/upload'><Redirect to='/' /></Route>
        <Route path='/settings'><Settings /></Route>
        <Route>
          <IllustratedMessage
            Icon={IconSignPost}
            heading='404'
            body={`Page not found. It looks like you've stumbled somewhere you shouldn't be.`}
          />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
