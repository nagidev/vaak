
interface IconMenuProps {
	className?: string;
};

const IconMenu = ({ className }: IconMenuProps) => {
	return (
		<svg
			className={className}
			viewBox='0 0 20 20'
			version='1.1'
			id='svg1'>
			<defs
				id='defs1' />
			<path
				fill-rule='evenodd'
				d='M19 4a1 1 0 01-1 1H2a1 1 0 010-2h16a1 1 0 011 1zm0 6a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 7a1 1 0 100-2H2a1 1 0 100 2h16z'
				id='path1' />
		</svg>
	);
};

export default IconMenu;
