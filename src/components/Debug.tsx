import type { ReactNode } from 'react';

interface DebugProps {
	children: ReactNode;
	show?: boolean;
};

const Debug = ({ children, show = true }: DebugProps) => {
	return (
		<p className={`${show ? '' : 'hidden'} rounded mb-2 p-2 bg-green-900 border border-green-500 break-all font-mono`}>
			<b>Debug</b><br />
			{children}
		</p>
	);
};

export default Debug;
