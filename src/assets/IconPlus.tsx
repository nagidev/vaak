
interface IconPlusProps {
	className: string;
};

const IconPlus = ({ className }: IconPlusProps) => {
	return (
		<svg
			className={className}
			viewBox='0 0 24 24'
			version='1.1'
			id='svg1'
		>
			<defs
				id='defs1' />
			<path
				d='M6 12H18M12 6V18'
				stroke-width='2'
				stroke-linecap='round'
				stroke-linejoin='round'
				id='path1' />
		</svg>
	);
};

export default IconPlus;
