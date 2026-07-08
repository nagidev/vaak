import { useSettings } from '../contexts/SettingsContext';

import Toggle from '../components/Toggle';

const Settings = () => {
	const { debug, setDebug } = useSettings();

	return (
		<div className='max-w-screen-xl mx-auto p-2 flex flex-col gap-2'>
			<div className='flex flex-row gap-2'>
				<span className='grow-1 text-xl font-bold'>Debug</span><Toggle checked={debug} onChange={setDebug} />
			</div>
		</div>
	);
};

export default Settings;
