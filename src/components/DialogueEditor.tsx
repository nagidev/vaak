import type { Key } from "react";

interface DialogueEditorProps {
	id: Key;
	value: { text: string };
};

const DialogueEditor = ({ id, value }: DialogueEditorProps) => {
	return (
		<div className='rounded p-2 bg-base border border-base-soft'>
			<p className='text-white-hard'>{`# ${id}`}</p>
			<p>{value.text}</p>
		</div>
	);
};

export default DialogueEditor;
