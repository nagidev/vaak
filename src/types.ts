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
