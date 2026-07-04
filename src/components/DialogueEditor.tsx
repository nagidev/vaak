import { useState, type Key } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Button from './Button';
import TextField from './TextField';
import TextArea from './TextArea';

import IconDelete from '../assets/IconDelete';
import Dropdown from './Dropdown';
import Debug from './Debug';
import Dialogue from './Dialogue';

interface DialogueEditorProps {
	id: Key;
	value: { speaker: string, text: string };
	onDeleteRequest?: () => void;
};

const DialogueEditor = ({ id, value, onDeleteRequest }: DialogueEditorProps) => {
	const [options, setOptions] = useState<Array<{ id: string, text: string, link: number }>>([{ id: '0', text: '', link: 0 }]);
	const [showDeleteDialogue, setShowDeleteDialogue] = useState(false);

	const handleOptionChange = (value: string, index: number) => {
		let newOptions = [...options];
		if (value !== '' && index === (options.length - 1)) {
			newOptions.push({ id: uuidv4(), text: '', link: 0 });
		}

		newOptions[index].text = value;
		setOptions(newOptions);
	};

	const handleOptionBlur = (value: string, index: number) => {
		if (value === '' && options.length > 2 && index !== (options.length - 1)) {
			let newOptions = options.filter((_, optionIndex) => optionIndex !== index);
			setOptions(newOptions);
		}
	};

	return (
		<div className='rounded p-2 bg-base border border-base-soft flex flex-col gap-2'>
			<div className='flex flex-row items-center gap-2'>
				<p className='grow-1 text-white-hard font-mono'>{`#${id}`}</p>
				<Button
					isQuiet={true}
					className='group hover:bg-red'
					onClick={() => setShowDeleteDialogue(true)}
				>
					<IconDelete className='w-9 h-9 fill-red group-hover:fill-white transition-all' />
				</Button>
			</div>
			<TextField
				value={value.speaker}
				placeholder='Enter speaker name...'
			/>
			<TextArea
				value={value.text}
				placeholder='Enter dialogue here...'
			/>
			{options.map((option, index) => (
				<div key={option.id} className='flex flex-row gap-2'>
					<TextField
						placeholder='Enter option here...'
						value={option.text}
						onChange={(value) => handleOptionChange(value, index)}
						onBlur={() => handleOptionBlur(options[index].text, index)}
					/>
					<Dropdown items={[0, 1, 2]} selected={0} prefix='#' />
				</div>
			))}
			<Dialogue
				isOpen={showDeleteDialogue}
				title='Delete dialogue node?'
				body={`Are you sure you want to delete the dialogue node #${id}`}
				actionLabel='Delete'
				onClose={() => setShowDeleteDialogue(false)}
				onAction={() => onDeleteRequest && onDeleteRequest()}
			/>
			<Debug show={false}>{JSON.stringify(options)}</Debug>
		</div>
	);
};

export default DialogueEditor;
