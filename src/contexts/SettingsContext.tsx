import { createContext, useContext, useState, type ReactNode } from 'react';

interface SettingsContextType {
	debug: boolean;
	setDebug: React.Dispatch<React.SetStateAction<boolean>>;
};

const SettingsContext = createContext<SettingsContextType | null>(null);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
	const [debug, setDebug] = useState(false);

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
