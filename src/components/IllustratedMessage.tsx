import type { ReactNode } from "react";

interface IllustratedMessageProps {
	Icon?: (props: { className: string }) => ReactNode;
	heading?: string;
	body?: string;
};

const IllustratedMessage = ({ Icon, heading, body }: IllustratedMessageProps) => {
	return (
		<div className='flex flex-col items-center p-10 pt-0 m-20'>
			{Icon && Icon({ className: 'fill-base-soft h-50 max-h-100' })}
			<h1 className='text-center text-2xl text-white-hard font-bold'>{heading}</h1>
			<p className='text-center text-white-hard'>{body}</p>
		</div>
	);
};

export default IllustratedMessage;
