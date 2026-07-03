import { useState, useEffect, useRef } from 'react';

import Button from './Button';

import IconPlus from '../assets/IconPlus';
import IconFullscreen from '../assets/IconFullscreen';
import IconFullscreenExit from '../assets/IconFullscreenExit';

interface TextInputProps {
	placeholder?: string;
	value?: string;
	onChange?: (newValue: string) => void;
	onSubmit?: (value: string) => void;
};

const TextInput = ({ placeholder = 'Enter text here...', value = '', onChange, onSubmit }: TextInputProps) => {
	const [text, setText] = useState(value);
	const [fullscreen, setFullscreen] = useState(false);

	const inputRef = useRef(null);
	const fullscreenInputRef = useRef(null);

	const handleSubmit = () => {
		onSubmit && onSubmit(text);
		setText('');
		setFullscreen(false);
	};

	useEffect(() => {
		onChange && onChange(text);
	}, [text]);

	useEffect(() => {
		if (inputRef.current && !fullscreen) {
			inputRef.current.focus();
		}

		if (fullscreenInputRef.current && fullscreen) {
			setTimeout(() => { fullscreenInputRef.current.focus(); }
				, 100);
		}
	}, [fullscreen]);

	return (
		<>
			<div className='flex flex-row gap-2 items-end'>
				<textarea
					placeholder={placeholder}
					rows={4}
					ref={inputRef}
					value={text}
					onChange={(e) => setText(e.target.value)}
					className='block w-full resize-none p-2 rounded bg-base-hard border-2 border-base accent-primary focus:outline-none focus:border-primary focus:border-2 shadow-lg'
				/>
				<div className='self-stretch flex flex-col justify-between'>
					<Button
						onClick={handleSubmit}
					>
						<IconPlus className='w-9 h-9 stroke-base-hard' />
					</Button>
					<Button
						isQuiet={true}
						onClick={() => setFullscreen(true)}
					>
						<IconFullscreen className='w-9 h-9 stroke-2 stroke-white' />
					</Button>
				</div>
			</div>
			<div
				className={`${fullscreen ? 'opacity-100 top-0' : 'opacity-0 top-10 invisible'} transition-all fixed left-0 z-10 w-full h-screen bg-base-hard/70`}
				onClick={(e) => { if (e.target === e.currentTarget) setFullscreen(false) }}
			>
				<div
					className='max-w-full md:max-w-screen-xl m-2 md:mx-auto'
				>
					<textarea
						placeholder={placeholder}
						rows={20}
						ref={fullscreenInputRef}
						value={text}
						onChange={(e) => setText(e.target.value)}
						className='w-full resize-none md:resize-y p-2 rounded bg-base-hard border-2 border-base accent-primary focus:outline-none focus:border-primary focus:border-2 shadow-lg'
					/>
					<div className='w-full mt-2 flex flex-row justify-end gap-2'>
						<Button
							onClick={handleSubmit}
						>
							<IconPlus className='w-9 h-9 stroke-base-hard' />
						</Button>
						<Button
							isQuiet={true}
							onClick={() => setFullscreen(false)}
						>
							<IconFullscreenExit className='w-9 h-9 stroke-2 stroke-white' />
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default TextInput;
