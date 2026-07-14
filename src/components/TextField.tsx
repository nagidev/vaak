import { useState, useEffect } from 'react';

interface TextFieldProps {
	className?: string;
	isQuiet?: boolean;
	placeholder?: string;
	value?: string;
	onChange?: (newValue: string) => void;
	onBlur?: () => void;
};

const TextField = ({ className, isQuiet, placeholder = 'Enter text here...', value = '', onChange, onBlur }: TextFieldProps) => {
	const [text, setText] = useState(value);

	useEffect(() => {
		onChange && onChange(text);
	}, [text]);

	return (
		<input
			placeholder={placeholder}
			type='text'
			value={text}
			onChange={(e) => setText(e.target.value)}
			onBlur={() => onBlur && onBlur()}
			className={`block w-full resize-none p-2 rounded ${isQuiet?'bg-transparent border-2 border-transparent accent-transparent focus:outline-none focus:border-transparent focus:border-2':'bg-base-hard border-2 border-base accent-primary focus:outline-none focus:border-primary focus:border-2'} ${className}`}
		/>
	);
};

export default TextField;
