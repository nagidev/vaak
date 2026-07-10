import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { DialogueCollection, DialogueData, Option } from '../types';

import Button from './Button';
import TextField from './TextField';
import TextArea from './TextArea';

import Dropdown from './Dropdown';
import Dialogue from './Dialogue';

import IconDelete from '../assets/IconDelete';
import IconPlay from '../assets/IconPlay';
import IconPower from '../assets/IconPower';

interface DialogueEditorProps {
	id: string;
	data: DialogueCollection;
	isStart?: boolean;
	onChange?: (value: DialogueData, id: string) => void;
	onStartRequest?: (key: string) => void;
	onPlayRequest?: (key: string) => void;
	onDeleteRequest?: () => void;
};

const DialogueEditor = ({ id, data, isStart, onChange, onStartRequest, onPlayRequest, onDeleteRequest }: DialogueEditorProps) => {
	const [dData, setDData] = useState<DialogueData>(data[id]);
	const [options, setOptions] = useState<Array<Option>>(data[id].options);
	const [links, setLinks] = useState<Array<number>>([]);
	const [showDeleteDialogue, setShowDeleteDialogue] = useState(false);

	useEffect(() => {
		if (options.length === 0) {
			setOptions([{ id: uuidv4(), text: '', link: 0 }]);
		}
	}, []);

	useEffect(() => {
		setLinks([0, ...Object.keys(data).map(Number)]);
	}, [data]);

	useEffect(() => {
		let finalData: DialogueData = { ...dData, options };
		onChange && onChange(finalData, id);
	}, [dData, options]);

	const handleOptionChange = (value: Option, index: number) => {
		let newOptions = [...options];
		if (value.text !== '' && index === (options.length - 1)) {
			newOptions.push({ id: uuidv4(), text: '', link: 0 });
		}

		newOptions[index] = value;
		setOptions(newOptions);
	};

	const handleOptionBlur = (value: string, index: number) => {
		if (value === '' && options.length > 1 && index !== (options.length - 1)) {
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
					onClick={() => onStartRequest && onStartRequest(id)}
				>
					<IconPower className={`transition-colors w-9 h-9 ${isStart ? 'fill-primary' : 'fill-white'}`} />
				</Button>
				<Button
					isQuiet={true}
					onClick={() => onPlayRequest && onPlayRequest(id)}
				>
					<IconPlay className='w-9 h-9 fill-white' />
				</Button>
				<Button
					isQuiet={true}
					className='group hover:bg-red'
					onClick={() => setShowDeleteDialogue(true)}
				>
					<IconDelete className='w-9 h-9 fill-red group-hover:fill-white transition-all' />
				</Button>
			</div>
			<TextField
				value={data[id].speaker}
				placeholder='Enter speaker name...'
				onChange={(value) => setDData((prevDData) => ({ ...prevDData, speaker: value }))}
			/>
			<TextArea
				value={data[id].text}
				placeholder='Enter dialogue here...'
				onChange={(value) => setDData((prevDData) => ({ ...prevDData, text: value }))}
			/>
			{options.map((option, index) => (
				<div key={option.id} className='flex flex-row gap-2'>
					<TextField
						placeholder='Enter option here...'
						value={option.text}
						onChange={(value) => handleOptionChange({ ...options[index], text: value }, index)}
						onBlur={() => handleOptionBlur(options[index].text, index)}
					/>
					<Dropdown
						items={links}
						selected={option.link}
						onChange={(value) => handleOptionChange({ ...options[index], link: Number(value) }, index)}
						prefix='#'
					/>
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
		</div>
	);
};

export default DialogueEditor;
