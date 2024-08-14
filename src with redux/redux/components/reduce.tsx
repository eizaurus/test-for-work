import { PaletteMode } from '@mui/material';

type task = {
	text: string;
	complete: boolean;
};
export type taskList = {
	[key: number]: task;
};
export type visible = 'All' | 'Active' | 'Completed';
type state = {
	todo: {
		theme: PaletteMode;
		task: taskList;
		visible: visible;
	};
};

const darkmode = 'todo/darkmode';
const task_add = 'todo/task_add';
const task_change = 'todo/task_change';
const task_visible = 'todo/visible';
const clearCompleted = 'todo/clear';
const action = {
	theme: () => ({ type: darkmode, payload: '' }),
	task_add: (v: string): any => ({ type: task_add, payload: v }),
	task_change: (v: string): any => ({ type: task_change, payload: v }),
	visible_change: (v: visible): any => ({ type: task_visible, payload: v }),
	clearCompleted: () => ({ type: clearCompleted }),
};
const selector = {
	theme: (state: state) => state.todo.theme,
	task: (state: state) => state.todo.task,
	visible: (state: state) => state.todo.visible,
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
		visible: LocalStorage.isset('visible') || 'All',
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
			let add = Object.assign({}, state.task);
			add[Object.keys(add).length] = {
				text: action.payload,
				complete: false,
			};
			LocalStorage.Change('task', JSON.stringify(add));
			return {
				...state,
				task: add,
			};
		case task_change:
			let change = Object.assign({}, state.task);
			change[action.payload].complete = !change[action.payload].complete;
			LocalStorage.Change('task', JSON.stringify(change));
			return {
				...state,
				task: change,
			};
		case task_visible:
			LocalStorage.Change('visible', action.payload);
			return {
				...state,
				visible: action.payload,
			};
		case clearCompleted:
			let c = Object.assign({}, state.task);
			let newTaskList: taskList = {};
			Object.keys(c).map((i) => {
				let ii = Number(i);
				if (!c[ii].complete)
					newTaskList[Object.keys(newTaskList).length] = c[ii];
			});
			return {
				...state,
				task: newTaskList,
			};
		default: {
			return state;
		}
	}
}

export { todoReducer, action, selector };
