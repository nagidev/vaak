import type { ReactNode } from 'react';

interface ButtonProps {
	children: ReactNode;
	className?: string;
	isQuiet?: boolean;
	onClick?: () => void;
	onBlur?: () => void;
};

const Button = ({ children, className, isQuiet = false, onClick, onBlur }: ButtonProps) => {
	return (
		<button
			className={`transition-all p-2 active:p-1.5 m-0 active:m-0.5 rounded ${isQuiet? 'bg-transparent hover:bg-base-soft active:bg-base':'bg-primary hover:bg-primary-soft active:bg-primary-hard'} font-bold text-base-hard cursor-pointer flex flex-row gap-2 justify-center items-center ${className}`}
			onClick={() => onClick && onClick()}
			onBlur={() => onBlur && onBlur()}
		>
			{children}
		</button>
	);
};

export default Button;
