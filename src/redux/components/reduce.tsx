import { PaletteMode } from '@mui/material';

type state = {
	todo: {
		theme: PaletteMode;
	};
};

const darkmode = 'todo/darkmode';
const action = { theme: () => ({ type: darkmode, payload: '' }) };
const selector = { theme: (state: state) => state.todo.theme };

const isBrowser = typeof window !== `undefined`;
const LocalStorage = {
	isset: (find: string): any => {
		return isBrowser && window.localStorage
			? window.localStorage.getItem(find)
			: undefined;
	},
	Change: (find: string, value: any): void => {
		return isBrowser && window.localStorage
			? window.localStorage.setItem(find, value)
			: undefined;
	},
	Remove: (find: string): void => {
		return isBrowser && window.localStorage
			? window.localStorage.removeItem(find)
			: undefined;
	},
};

function todoReducer(
	state: state['todo'] = {
		theme: LocalStorage.isset('theme') || 'light',
	},
	action: any
) {
	switch (action.type) {
		case darkmode:
			let d = state.theme === 'light' ? 'dark' : 'light';
			console.log(d);
			LocalStorage.Change('theme', d);
			return {
				...state,
				theme: d,
			};

		default: {
			return state;
		}
	}
}

export { todoReducer, action, selector };
