import { useState, useEffect } from 'react';

interface TextFieldProps {
	placeholder?: string;
	value?: string;
	onChange?: (newValue: string) => void;
	onBlur?: () => void;
};

const TextField = ({ placeholder = 'Enter text here...', value = '', onChange, onBlur }: TextFieldProps) => {
	const [text, setText] = useState(value);

	useEffect(() => {
		onChange && onChange(text);
	}, [text]);

	return (
		<textarea
			placeholder={placeholder}
			rows={1}
			value={text}
			onChange={(e) => setText(e.target.value)}
			onBlur={() => onBlur && onBlur()}
			className='block w-full resize-none p-2 rounded bg-base-hard border-2 border-base accent-primary focus:outline-none focus:border-primary focus:border-2'
		/>
	);
};

export default TextField;
