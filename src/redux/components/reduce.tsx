import { PaletteMode } from '@mui/material';

type task = {
	text: string;
	complete: boolean;
};
export type taskList = {
	[key: number]: task;
};
type state = {
	todo: {
		theme: PaletteMode;
		task: taskList;
	};
};

const darkmode = 'todo/darkmode';
const task_add = 'todo/task_add';
const action = {
	theme: () => ({ type: darkmode, payload: '' }),
	task_add: (v: string): any => ({ type: task_add, payload: v }),
};
const selector = {
	theme: (state: state) => state.todo.theme,
	task: (state: state) => state.todo.task,
};

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
		task: LocalStorage.isset('task')
			? JSON.parse(LocalStorage.isset('task'))
			: [],
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
		case task_add:
			let a = Object.assign({}, state.task);
			a[Object.keys(a).length] = {
				text: action.payload,
				complete: false,
			};
			LocalStorage.Change('task', JSON.stringify(a));
			return {
				...state,
				task: a,
			};
		default: {
			return state;
		}
	}
}

export { todoReducer, action, selector };
