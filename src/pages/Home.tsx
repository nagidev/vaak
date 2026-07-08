import { useEffect, useState } from 'react';
import type { DialogueCollection, DialogueData } from '../types';
import { DEFAULT_DIALOGUE_DATA } from '../types';

import { useSettings } from '../contexts/SettingsContext';

import Button from '../components/Button';
import DialogueEditor from '../components/DialogueEditor';
import IllustratedMessage from '../components/IllustratedMessage';
import Debug from '../components/Debug';

import IconBubble from '../assets/IconBubble';
import IconPlus from '../assets/IconPlus';

interface HomeProps {
	value: DialogueCollection;
	onChange: (value: DialogueCollection) => void;
};

const Home = ({ value = {}, onChange }: HomeProps) => {
	const [data, setData] = useState<DialogueCollection>(value);

  const { debug } = useSettings();

	const addNode = () => {
		setData((prevData) => {
			const keys = Object.keys(prevData).map(Number);
			const maxKey = keys.length > 0 ? Math.max(...keys) : 0;
			return { ...prevData, [String(maxKey + 1)]: DEFAULT_DIALOGUE_DATA }
		});
	};

	const updateNode = (newValue: DialogueData, key: string) => {
		setData((prevData) => ({ ...prevData, [key]: newValue }));
	};

	const deleteNode = (key: string) => {
		const newData = { ...data };
		delete newData[key];
		setData(newData);
	};

	useEffect(() => {
		onChange(data);
	}, [data]);

	return (
		<div className='max-w-screen-xl p-2 mx-auto'>
      <Debug show={debug}>{JSON.stringify(data)}</Debug>
			{(Object.keys(data).length === 0) &&
				<IllustratedMessage
					Icon={IconBubble}
					heading='Add dialogues.'
					body='Add new dialogues from the input to start creating your dialogue flow.'
				/>
			}
			<div className='mb-2 flex flex-col gap-2'>
				{Object.keys(data).map((key) => (
					<DialogueEditor
						key={key}
						id={key}
						data={data}
						onChange={updateNode}
						onDeleteRequest={() => deleteNode(key)}
					/>
				))}
			</div>
			<div className='sticky bottom-4 my-2 flex justify-center'>
				<Button
					className='md:w-100 grow-1 md:grow-0 justify-center text-xl shadow-xl'
					onClick={addNode}
				>
					<IconPlus className='w-10 h-10 fill-base-hard' />
					Add dialogue
				</Button>
			</div>
		</div>
	);
};

export default Home;
