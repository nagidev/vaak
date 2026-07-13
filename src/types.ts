export interface Option {
	id: string;
	text: string;
	link: number;
};

export interface DialogueData {
	speaker: string;
	text: string;
	options: Array<Option>;
};

export const DEFAULT_DIALOGUE_DATA: DialogueData = {
	speaker: '',
	text: '',
	options: []
};

export type DialogueCollection = Record<string, DialogueData>;

export interface DialogueFile {
	start: string;
	data: DialogueCollection;
};

export const DEFAULT_DIALOGUE_FILE: DialogueFile = { start: '0', data: {} };

export interface IconProps {
	className?: string;
};
