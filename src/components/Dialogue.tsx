import { useEffect, useState, type ReactNode } from 'react';
import Button from './Button';

interface DialogueProps {
	children?: ReactNode;
	title?: string;
	body?: string;
	actionLabel?: string;
	cancelLabel?: string;
	isOpen: boolean;
	onClose?: () => void;
	onAction?: () => void;
};

const Dialogue = ({
	children,
	title = 'Alert',
	body = 'Are you sure?',
	actionLabel = 'Okay',
	cancelLabel = 'Cancel',
	isOpen = false,
	onClose,
	onAction,
}: DialogueProps) => {
	const [showing, setShowing] = useState(isOpen);

	useEffect(() => {
		setShowing(isOpen);
	}, [isOpen]);

	const handleClose = () => {
		setShowing(false);
		onClose && onClose();
	};

	const handleAction = () => {
		setShowing(false);
		onAction && onAction();
		onClose && onClose();
	}

	return (
		<div
			className={`dialogue transition-all ${showing ? 'opacity-100' : 'opacity-0 invisible'} fixed top-0 left-0 z-10 w-full h-screen bg-base-hard/70 flex justify-center items-center content-center`}
			onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}
		>
			<div className={`transition-all p-4 ${showing ? '' : 'mt-10'} min-w-sm max-w-screen-lg rounded bg-base border border-base-soft shadow-xl`}>
				{children !== undefined ?
					children
					:
					<div className='flex flex-col gap-2'>
						<h1 className='text-xl font-bold text-white'>{title}</h1>
						<p className='text-white'>{body}</p>
						<div className='flex flex-row gap-2 justify-end'>
							<Button
								isQuiet={true}
								className='text-white'
								onClick={handleClose}
							>
								{cancelLabel}
							</Button>
							<Button
								className='text-base-hard'
								onClick={handleAction}
							>
								{actionLabel}
							</Button>
						</div>
					</div>
				}
			</div>
		</div>
	);
};

export default Dialogue;
