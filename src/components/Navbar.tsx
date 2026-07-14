import { useEffect, useState, type ReactNode } from 'react';

import Button from './Button';

import IconMenu from '../assets/IconMenu';
import { Link, useLocation } from 'wouter';
import IconSearch from '../assets/IconSearch';
import TextField from './TextField';
import IconClose from '../assets/IconClose';

interface NavbarProps {
	BrandLogo?: any;
	brandName?: string;
	navItems?: Array<[string, ReactNode, string]>;
	ctaItems?: Array<[string, ReactNode, string]>;
	selected?: string;
	onNav?: (value: string) => void;
	onCta?: (value: string) => void;
	onSearch?: (value: string) => void;
};

const Navbar = ({ BrandLogo, brandName, navItems, ctaItems, selected, onNav, onCta, onSearch }: NavbarProps) => {
	const [showMenu, setShowMenu] = useState(false);
	const [navItem, setNavItem] = useState(selected);
	const [showSearch, setShowSearch] = useState(false);

	const [_, navigate] = useLocation();

	useEffect(() => {
		setNavItem(selected);
	}, [selected]);

	useEffect(() => {
		onNav && onNav(navItem as string);
	}, [navItem]);

	return (
		<nav className='sticky top-0 z-20 w-full rounded-b bg-base shadow-md'>
			<div className='px-4 py-2 md:p-0 md:mx-auto md:max-w-screen-xl flex flex-wrap justify-between items-end'>
				<div className={`my-auto group transition-all ${showSearch ? 'opacity-0 invisible max-w-0' : 'opacity-100 visible max-w-screen'} cursor-pointer flex flex-row gap-2`} onClick={() => navigate('/')}>
					{BrandLogo &&
						<BrandLogo className='h-10 w-10 fill-white group-hover:fill-primary transition-all' />
					}
					<h1 className='font-bold text-3xl group-hover:text-primary transition-all'>{brandName}</h1>
				</div>
				<div className={`transition-all ${showSearch ? 'grow-0' : 'grow-1'}`} />
				<div className={`transition-all ${showSearch ? 'grow-1 bg-base-hard' : 'grow-0'} my-auto rounded flex flex-row justify-left`}>
					{onSearch &&
						<>
							<Button
								isQuiet={true}
								onClick={() => { onSearch('wubba'); setShowSearch(!showSearch) }}
							>
								<IconSearch className='w-9 h-9 fill-white' />
							</Button>
							<div
								className={`transition-all ${showSearch ? 'grow-1 opacity-100 visible max-w-screen' : 'opacity-0 invisible max-w-0'} flex flex-row`}
							>
								<input
									type='text'
									className='grow-1 w-full'
								/>
								<Button isQuiet={true}>
									<IconClose className='w-9 h-9 fill-white' />
								</Button>
							</div>
						</>
					}
					<div
						className={`transition-all ${showSearch ? 'opacity-0 invisible max-w-0' : 'opacity-100 visible max-w-screen'} md:hidden`}
					>
						<Button
							className='md:hidden'
							isQuiet={true}
							onClick={() => setShowMenu(!showMenu)}
							onBlur={() => setShowMenu(false)}
						>
							{showMenu ?
								<IconClose className='w-10 h-10 fill-white' />
								:
								<IconMenu className='w-10 h-10 fill-white' />
							}
						</Button>
					</div>
				</div>
				{navItems &&
					<div className={`transition-all ${showMenu ? 'max-h-[900px] opacity-100' : 'max-h-0 opacity-0'} ${showSearch ? 'opacity-0 max-w-0' : 'opacity-100 max-w-screen'} md:block overflow-hidden md:overflow-visible w-full md:max-h-full md:w-auto `}>
						<ul className={`mb-2 md:m-0 md:pt-1 rounded bg-base-hard md:bg-transparent border border-base-soft md:border-none flex flex-col md:flex-row`}>
							{ctaItems && ctaItems.map(item => (
								<li
									key={item[2]}
									className={`transition-all relative block md:inline-block p-4 rounded md:rounded-none ${(navItem === item[2]) ? 'bg-primary text-base-hard md:border-primary selected' : 'bg-transparent hover:bg-base-soft active:bg-base md:hover:bg-transparent md:active:bg-transparent md:border-transparent'} md:bg-transparent md:border-b-4 font-bold flex flex-row gap-2 content-center items-center group`}
									onClick={() => onCta && onCta(item[2])}
								>
									{item[1]}
									<p className='block md:hidden md:group-hover:block md:origin-center-left md:absolute md:left-1/2 md:-translate-x-1/2 md:translate-y-1/2 md:p-2 md:rounded md:rounded-t-none md:bg-base md:shadow-xl md:text-white'>
										{item[0]}
									</p>
								</li>
							))}
							{navItems.map(item => (
								<Link
									href={`/${item[2]}`}
									onClick={() => setNavItem(item[2])}
								>
									<li
										key={item[2]}
										className={`transition-all relative block md:inline-block p-4 rounded md:rounded-none ${(navItem === item[2]) ? 'bg-primary text-base-hard md:border-primary selected' : 'bg-transparent hover:bg-base-soft active:bg-base md:hover:bg-transparent md:active:bg-transparent md:border-transparent'} md:bg-transparent md:border-b-4 font-bold flex flex-row gap-2 content-center items-center group`}
									>
										{item[1]}
										<p className='block md:hidden md:group-hover:block md:origin-center-left md:absolute md:left-1/2 md:-translate-x-1/2 md:translate-y-1/2 md:p-2 md:rounded md:rounded-t-none md:bg-base md:shadow-xl md:text-white'>
											{item[0]}
										</p>
									</li>
								</Link>
							))}
						</ul>
					</div>
				}
			</div>
		</nav>
	);
};

export default Navbar;
