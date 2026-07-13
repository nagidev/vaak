import { useEffect, useState } from 'react';
import type { DialogueCollection, Option } from '../types';

import Dialogue from './Dialogue';
import Button from './Button';
import IconPlay from '../assets/IconPlay';
import Debug from './Debug';

interface DialoguePlayerProps {
	startKey: string;
	data: DialogueCollection;
	onClose: () => void;
};

const DialoguePlayer = ({ startKey, data, onClose }: DialoguePlayerProps) => {
	const [playing, setPlaying] = useState(false);
	const [currentKey, setCurrentKey] = useState(startKey);
	const [speaker, setSpeaker] = useState('');
	const [text, setText] = useState('');
	const [options, setOptions] = useState<Option[]>([]);

	const handleClose = () => {
		setPlaying(false);
		onClose();
	};

	useEffect(() => {
		setCurrentKey(startKey);
	}, [startKey]);

	useEffect(() => {
		setPlaying(currentKey !== '');

		if (currentKey !== '' && currentKey !== '0') {
			setSpeaker(data[currentKey].speaker);
			setText(data[currentKey].text);
			let newOptions = data[currentKey].options;
			if (data[currentKey].options.length === 1 && data[currentKey].options[0].text === '') {
				setOptions(newOptions);
			} else {
				setOptions(newOptions.filter(option => option.text !== ''));
			}
		}
		else {
			handleClose();
		}
	}, [currentKey]);

	return (
		<Dialogue
			isOpen={playing}
			onClose={handleClose}
		>
			<Debug>currentKey: {currentKey}</Debug>
			<div className='flex flex-col gap-2'>
				<h1 className='text-xl font-bold'>{speaker}</h1>
				<h1 className='text-xl'>{text}</h1>
				<div className='flex flex-row flex-wrap justify-end gap-2'>
					{(options.length === 1 && options[0].text === '') ?
						<Button
							isQuiet={true}
							onClick={() => setCurrentKey(options[0].link.toString())}
						>
							<IconPlay className='w-6 h-6 fill-white' />
						</Button>
						:
						options.map(option => (
							<Button
								key={option.id}
								className='text-white'
								isQuiet={true}
								onClick={() => setCurrentKey(option.link.toString())}
							>
								{option.text}
							</Button>
						))}
				</div>
			</div>
		</Dialogue>
	);
};

export default DialoguePlayer;
