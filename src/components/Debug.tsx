import type { ReactNode } from 'react';
import { useSettings } from '../contexts/SettingsContext';

interface DebugProps {
	children: ReactNode;
};

const Debug = ({ children }: DebugProps) => {
	const { debug } = useSettings();

	return (
		<p className={`${debug ? '' : 'hidden'} rounded p-2 bg-green-900 border border-green-500 break-all font-mono`}>
			<b>Debug</b><br />
			{children}
		</p>
	);
};

export default Debug;
