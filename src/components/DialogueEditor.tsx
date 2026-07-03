import type { Key } from 'react';

import Button from './Button';

import IconDelete from '../assets/IconDelete';
import IconEdit from '../assets/IconEdit';

interface DialogueEditorProps {
	id: Key;
	value: { text: string };
};

const DialogueEditor = ({ id, value }: DialogueEditorProps) => {
	return (
		<div className='rounded p-2 bg-base border border-base-soft'>
			<div className='flex flex-row items-start gap-2'>
				<p className='grow-1 text-white-hard'>{`# ${id}`}</p>
				<Button isQuiet={true} className='text-white'>
					<IconEdit className='w-9 h-9 fill-white mx-auto my-auto' />
				</Button>
				<Button>
					<IconDelete className='w-9 h-9 stroke-2 stroke-base-hard' />
				</Button>
			</div>
			<p >{value.text}</p>
		</div>
	);
};

export default DialogueEditor;
