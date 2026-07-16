import { useEffect, useState } from 'react';
import type { DialogueCollection, DialogueData } from '../types';
import { DEFAULT_DIALOGUE_DATA } from '../types';

import Button from '../components/Button';
import DialogueEditor from '../components/DialogueEditor';
import IllustratedMessage from '../components/IllustratedMessage';
import DialoguePlayer from '../components/DialoguePlayer';

import IconBubble from '../assets/IconBubble';
import IconPlus from '../assets/IconPlus';
import IconUpload from '../assets/IconUpload';
import IconSearch from '../assets/IconSearch';

interface HomeProps {
	start: string;
	value: DialogueCollection;
	filter?: string;
	onChange: (value: DialogueCollection) => void;
	onStartRequest: (key: string) => void;
	onUploadRequest: () => void;
};

const Home = ({ start, value = {}, filter = '', onChange, onStartRequest, onUploadRequest }: HomeProps) => {
	const [data, setData] = useState<DialogueCollection>(value);
	const [playing, setPlaying] = useState<string>('');
	const [filteredData, setFilteredData] = useState<DialogueCollection>(data);

	const addNode = () => {
		setData((prevData) => {
			const keys = Object.keys(prevData).map(Number);
			const maxKey = keys.length > 0 ? Math.max(...keys) : 0;
			if (keys.length === 0) {
				onStartRequest(String(maxKey + 1));
			}
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

		if (Object.keys(newData).length === 0) {
			onStartRequest('0');
		} else if (key === start) {
			onStartRequest(Object.keys(newData)[0]);
		}
	};

	useEffect(() => {
		onChange(data);
	}, [data]);

	useEffect(() => {
		if (filter === '') {
			setFilteredData({});
		} else {
			setFilteredData(Object.keys(data)
				.filter(key => {
					const d: DialogueData = data[key];
					return key.includes(filter) || d.speaker.includes(filter) || d.text.includes(filter);
				})
				.reduce((obj: DialogueCollection, key) => {
					obj[key] = data[key];
					return obj;
				}, {})
			);
		}
	}, [filter]);

	return (
		<div className='max-w-screen-xl p-2 mx-auto'>
			{(Object.keys(data).length === 0 && filter === '') &&
				<IllustratedMessage
					Icon={IconBubble}
					heading='Add dialogues.'
					body='Add new dialogues from the input to start creating your dialogue flow.'
				/>
			}
			<div className='dialogues mb-2 flex flex-col gap-2'>
				{(filter === '') ?
					<>
						{Object.keys(data).map((key) => (
							<DialogueEditor
								key={key}
								id={key}
								isStart={key === start}
								data={data}
								onChange={updateNode}
								onStartRequest={onStartRequest}
								onPlayRequest={setPlaying}
								onDeleteRequest={() => deleteNode(key)}
							/>
						))}
					</>
					:
					<>
						{(Object.keys(filteredData).length === 0) ?
							<IllustratedMessage
								Icon={IconSearch}
								heading='No results found'
								body='Try searching for something else.'
							/>
							:
							<>
								{Object.keys(filteredData).map((key) => (
									<DialogueEditor
										key={key}
										id={key}
										isStart={key === start}
										data={data}
										onChange={updateNode}
										onStartRequest={onStartRequest}
										onPlayRequest={setPlaying}
										onDeleteRequest={() => deleteNode(key)}
									/>
								))}
							</>
						}
					</>
				}
			</div>
			<div className={`${(filter !== '') && 'hidden'} sticky bottom-4 my-2 flex justify-center`}>
				<Button
					className='md:w-100 grow-1 md:grow-0 justify-center text-xl shadow-xl'
					onClick={addNode}
				>
					<IconPlus className='w-10 h-10 fill-base-hard' />
					Add dialogue
				</Button>
			</div>
			{(Object.keys(data).length === 0 && filter === '') &&
				<div className='flex flex-col items-stretch md:items-center'>
					<div className='w-full my-10'>
						<h1 className='text-center text-2xl text-white-hard font-bold'>Or</h1>
						<p className='text-center text-white-hard'>Upload your dialogue JSON file.</p>
					</div>
					<Button
						className='md:w-100 grow-1 md:grow-0 justify-center text-xl'
						onClick={onUploadRequest}
					>
						<IconUpload className='w-10 h-10 fill-base-hard' />
						Upload dialogue file
					</Button>
				</div>
			}
			<DialoguePlayer
				startKey={playing}
				data={data}
				onClose={() => setPlaying('')}
			/>
		</div>
	);
};

export default Home;
