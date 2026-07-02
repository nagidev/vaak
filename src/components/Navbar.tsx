import { useEffect, useState } from 'react';

import Button from './Button';

import IconMenu from '../assets/IconMenu';

interface NavbarProps {
	BrandLogo?: any;
	brandName?: string;
	navItems?: string[];
	selected?: string;
};

const Navbar = ({ BrandLogo, brandName, navItems, selected }: NavbarProps) => {
	const [showMenu, setShowMenu] = useState(false);
	const [navItem, setNavItem] = useState(selected);

	useEffect(() => {
		setNavItem(selected);
	}, [selected]);

	return (
		<nav className='sticky top-0 w-full rounded-b bg-base shadow-md'>
			<div className='flex flex-wrap justify-between items-end md:mx-auto md:max-w-screen-xl'>
				<div className='flex flex-row gap-2 p-4 group cursor-pointer'>
					{BrandLogo &&
						<BrandLogo className='h-10 w-10 fill-white group-hover:fill-primary transition-all' />
					}
					<h1 className='font-bold text-3xl'>{brandName}</h1>
				</div>
				<div className='mx-4 my-auto'>
					<Button
						className='md:hidden'
						isQuiet={true}
						onClick={() => setShowMenu(!showMenu)}
						onBlur={() => setShowMenu(false)}
					>
						<IconMenu className='w-10 h-10 fill-white' />
					</Button>
				</div>
				{navItems &&
					<div className={`transition-all transition-discrete duration-500 ${showMenu ? 'max-h-[900px] opacity-100' : 'max-h-0 opacity-0'} md:block overflow-hidden w-full md:max-h-full md:w-auto md:opacity-100`}>
						<ul className={`m-4 md:m-0 p-4 md:p-0 rounded bg-base-hard md:bg-transparent border border-base-soft md:border-none flex flex-col md:flex-row gap-2 md:gap-4`}>
							{navItems.map(item => (
								<li key={item}>
									<a
										href='#'
										className={`transition-all block p-4 rounded md:rounded-none ${(navItem === item) ? 'bg-primary text-base-hard md:text-primary md:border-primary' : 'bg-transparent hover:bg-base-soft active:bg-base md:text-white-hard md:hover:text-white md:hover:bg-transparent md:active:bg-transparent md:border-transparent'} md:bg-transparent md:border-b-4 md:text-xl font-bold`}
										onClick={() => setNavItem(item)}
									>
										{item}
									</a>
								</li>
							))}
						</ul>
					</div>
				}
			</div>
		</nav>
	);
};

export default Navbar;
