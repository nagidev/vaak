import { useEffect, useState, type ReactNode } from 'react';

import Button from './Button';

import IconMenu from '../assets/IconMenu';
import { Link, useLocation } from 'wouter';

interface NavbarProps {
	BrandLogo?: any;
	brandName?: string;
	navItems?: string[];
	selected?: string;
	ctaIcons?: ReactNode[];
	ctaCallbacks?: Array<() => void>;
};

const Navbar = ({ BrandLogo, brandName, navItems, selected, ctaIcons, ctaCallbacks }: NavbarProps) => {
	const [showMenu, setShowMenu] = useState(false);
	const [navItem, setNavItem] = useState(selected);

	const [_, navigate] = useLocation();

	useEffect(() => {
		setNavItem(selected);
	}, [selected]);

	return (
		<nav className='sticky top-0 z-20 w-full rounded-b bg-base shadow-md'>
			<div className='flex flex-wrap justify-between items-end md:mx-auto md:max-w-screen-xl'>
				<div className='md:grow-1 p-4 group cursor-pointer flex flex-row gap-2' onClick={() => navigate('/')}>
					{BrandLogo &&
						<BrandLogo className='h-10 w-10 fill-white group-hover:fill-primary transition-all' />
					}
					<h1 className='font-bold text-3xl group-hover:text-primary transition-all'>{brandName}</h1>
				</div>
				<div className='mx-4 my-auto flex flex-row'>
					{ctaIcons &&
						ctaIcons.map((ctaIcon, index) => (
							<Button
								isQuiet={true}
								onClick={ctaCallbacks && ctaCallbacks[index]}
							>
								{ctaIcon}
							</Button>
						))}
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
						<ul className={`m-4 mt-0 md:m-0 rounded bg-base-hard md:bg-transparent border border-base-soft md:border-none flex flex-col md:flex-row md:gap-4`}>
							{navItems.map(item => (
								<li key={item}>
									<Link
										href={`/${item.toLowerCase()}`}
										className={`transition-all block p-4 rounded md:rounded-none ${(navItem === item) ? 'bg-primary text-base-hard md:text-primary md:border-primary' : 'bg-transparent hover:bg-base-soft active:bg-base md:text-white-hard md:hover:text-white md:hover:bg-transparent md:active:bg-transparent md:border-transparent'} md:bg-transparent md:border-b-4 md:text-xl font-bold`}
										onClick={() => setNavItem(item)}
									>
										{item}
									</Link>
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
