import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface SettingsContextType {
	debug: boolean;
	setDebug: React.Dispatch<React.SetStateAction<boolean>>;
};

const SettingsContext = createContext<SettingsContextType | null>(null);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
	const savedSettings = localStorage.getItem('user_settings');
	const [debug, setDebug] = useState(savedSettings ? JSON.parse(savedSettings).debug : false);

	useEffect(() => {
		localStorage.setItem('user_settings', JSON.stringify({ debug }));
	}, [debug]);

	return (
		<SettingsContext.Provider value={{ debug, setDebug }}>
			{children}
		</SettingsContext.Provider>
	);
};

export const useSettings = (): SettingsContextType => {
	const context = useContext(SettingsContext);

	if (!context) {
		throw new Error('useSettings must be used within a SettingsProvider');
	}

	return context;
};
