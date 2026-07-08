
interface ToggleProps {
	checked?: boolean;
	onChange?: (value: boolean) => void;
};

const Toggle = ({ checked, onChange }: ToggleProps) => {
	return (
		<label className='relative cursor-pointer w-11 h-6'>
			<input type='checkbox' className='peer sr-only' checked={checked} onChange={(e) => onChange && onChange(e.target.checked)} />
			<span className='absolute inset-0 transition-colors bg-base-soft rounded-full peer-checked:bg-primary'></span>
			<span className='absolute top-1/2 inset-s-0.5 -translate-y-1/2 size-5 transition-transform bg-white rounded-full shadow-md peer-checked:translate-x-full'></span>
		</label>
	);
};

export default Toggle;
