import { useState } from 'react';

import IconChevronDown from '../assets/IconChevronDown';

import Button from './Button';

interface DropdownProps {
	selected: number | string;
	items: Array<number | string>;
	prefix?: number | string;
	onChange?: (value: number | string) => void;
};

const Dropdown = ({ selected, items, prefix, onChange }: DropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(selected);

	const handleSelect = (value: number | string) => {
		setSelectedItem(value);
		onChange && onChange(value);
	};

	const handleBlur = () => {
		setTimeout(() => setIsOpen(false), 100);
	};

	return (
		<div
			className='relative inline-block'
			onBlur={handleBlur}
		>
			<Button
				isQuiet={true}
				className='text-white justify-between'
				onClick={() => setIsOpen(!isOpen)}
			>
				{prefix && prefix}{selectedItem}
				<IconChevronDown className='w-9 h-9 fill-white' />
			</Button>
			<div className={`${isOpen ? 'opacity-100 mt-0' : 'opacity-0 mt-4 invisible'} transition-all origin-top-right absolute right-0 z-10 min-w-30 p-2 rounded bg-base-hard border border-base shadow-lg flex flex-col gap-1`}>
				{items.map(item => (
					<Button
						key={item}
						isQuiet={true}
						className='text-white'
						onClick={() => handleSelect(item)}
					>
						{prefix && prefix}{item}
					</Button>
				))}
			</div>
		</div>
	);
};

export default Dropdown;
