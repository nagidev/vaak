import { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { DEFAULT_DIALOGUE_FILE } from '../types';

import Toggle from '../components/Toggle';
import Button from '../components/Button';
import IconDelete from '../assets/IconDelete';

const Settings = () => {
	const [tempFileCleared, setTempFileCleared] = useState(localStorage.getItem('temp_file') === JSON.stringify(DEFAULT_DIALOGUE_FILE));
	const { debug, setDebug } = useSettings();

	const clearTempFile = () => {
		localStorage.setItem('temp_file', JSON.stringify(DEFAULT_DIALOGUE_FILE))
		setTempFileCleared(true);
	};

	return (
		<div className='max-w-screen-xl mx-auto p-2 flex flex-col gap-2'>
			<div className='flex flex-row gap-2'>
				<span className='grow-1 text-xl font-bold'>Debug</span><Toggle checked={debug} onChange={setDebug} />
			</div>
			<div className='flex flex-row items-center gap-2'>
				<span className='grow-1 text-xl font-bold'>Clear temporary storage</span>
				<Button
					onClick={clearTempFile}
					className='text-xl'
					disabled={tempFileCleared}
				>
					<IconDelete className={`w-9 h-9 ${tempFileCleared ? 'fill-base' : 'fill-base-hard'}`} />Clear
				</Button>
			</div>
		</div>
	);
};

export default Settings;
