'use client';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import AddTaskIcon from '@mui/icons-material/AddTask';

type task = {
	text: string;
	complete: boolean;
};
type taskList = {
	[key: number]: task;
};
type visible = 'All' | 'Active' | 'Completed';

export default function Todos() {
	const [task, setTask] = React.useState<string>('');
	const [choice, setVisible] = React.useState<visible>('All');
	const [currentCount, setCount] = React.useState<number>(0);
	const [taskList, setTaskList] = React.useState<taskList>({});

	const addTask = () => {
		if (task.length > 0) {
			let newTaskList: taskList = Object.assign({}, taskList);
			newTaskList[Object.keys(newTaskList).length] = {
				text: task,
				complete: false,
			};
			setTask('');
			setTaskList(newTaskList);
		}
	};
	const changeTaskComplete = (id: number) => () => {
		let newTaskList: taskList = Object.assign({}, taskList);
		newTaskList[id].complete = !newTaskList[id].complete;
		setTaskList(newTaskList);
	};
	const clearCompleted = () => {
		let c: taskList = Object.assign({}, taskList);
		let newTaskList: taskList = {};
		Object.keys(c).map((i) => {
			if (!c[Number(i)].complete)
				newTaskList[Object.keys(newTaskList).length] = c[Number(i)];
		});
		setTaskList(newTaskList);
	};
	React.useEffect(() => {
		if (Object.keys(taskList).length > 0) {
			let i = 0;
			Object.keys(taskList).map((v) => {
				let complete = taskList[Number(v)].complete;
				if (
					choice == 'All' ||
					(choice === 'Active' && !complete) ||
					(choice == 'Completed' && complete)
				)
					i++;
			});
			setCount(i);
		}
	}, [taskList, choice]);

	return (
		<Card sx={{ maxWidth: 600, maxHeight: '80vh' }}>
			<CardContent sx={{ scroll: 'auto' }}>
				<List
					key={'list'}
					dense={true}
					sx={{
						py: 0,
						width: '100%',
						borderRadius: 2,
						backgroundColor: 'background.paper',
					}}
				>
					<ListItem /* key={0}  */ disablePadding>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'flex-end',
								width: '100%',
								marginRight: '16px',
								marginLeft: '16px',
							}}
						>
							<TextField
								role='InputTask'
								id='input-with-sx'
								label='add new task'
								variant='standard'
								value={task}
								onChange={(
									event: React.ChangeEvent<HTMLInputElement>
								) => {
									setTask(event.target.value);
								}}
								InputProps={{
									endAdornment: (
										<InputAdornment
											role='AddNewTask'
											position='end'
											onClick={() => addTask()}
										>
											<IconButton
												aria-label='delete'
												sx={{ margin: '0 4px' }}
											>
												<AddTaskIcon />
											</IconButton>
										</InputAdornment>
									),
								}}
								fullWidth
							/>
						</Box>
					</ListItem>

					{currentCount > 0 ? (
						Object.keys(taskList).map((v, index) => {
							const labelId = `checkbox-list-label-${index}`;
							let i = Number(v);
							let complete = taskList[i].complete;
							if (
								choice == 'All' ||
								(choice === 'Active' && !complete) ||
								(choice == 'Completed' && complete)
							)
								return (
									<>
										{/* {index > 0 && (
											<Divider
												key={index * 2}
												variant='middle'
												component='li'
												ComponentProps={{
													key: index * 2,
												}}
											/>
										)} */}
										
										<ListItem
											key={index * 2 + 1}
											disablePadding
											role={`task-${index}`}
										>
											<ListItemButton
												role={undefined}
												dense
												onClick={changeTaskComplete(
													index
												)}
											>
												<ListItemIcon>
													<Checkbox
														role={`checkbox-task-${index}`}
														edge='start'
														checked={
															taskList[i].complete
														}
														color='secondary'
														tabIndex={-1}
														disableRipple
														inputProps={{
															'aria-labelledby':
																labelId,
														}}
													/>
												</ListItemIcon>
												<ListItemText
													id={labelId}
													sx={{
														textDecoration:
															taskList[i].complete
																? 'line-through'
																: 'none',
													}}
													primary={taskList[i].text}
												/>
											</ListItemButton>
										</ListItem>
									</>
								);
						})
					) : (
						<ListItem
							/* key={1} */
							disablePadding
							sx={{ marginLeft: '16px' }}
						>
							<Typography variant='h6' component='p'>
								no task!
							</Typography>
						</ListItem>
					)}
				</List>
			</CardContent>
			<CardActions sx={{ justifyContent: 'space-between' }}>
				<Typography variant='caption' component='span'>
					{currentCount} item
				</Typography>
				<Box>
					<Button
						role='AllTask'
						size='small'
						color='secondary'
						variant={choice == 'All' ? 'outlined' : 'text'}
						onClick={() => setVisible('All')}
					>
						<Typography variant='caption' component='span'>
							All
						</Typography>
					</Button>
					<Button
						role='ActiveTask'
						size='small'
						color='secondary'
						variant={choice == 'Active' ? 'outlined' : 'text'}
						onClick={() => setVisible('Active')}
					>
						<Typography variant='caption' component='span'>
							Active
						</Typography>
					</Button>
					<Button
						role='CompletedTask'
						size='small'
						color='secondary'
						variant={choice == 'Completed' ? 'outlined' : 'text'}
						onClick={() => setVisible('Completed')}
					>
						<Typography variant='caption' component='span'>
							Completed
						</Typography>
					</Button>
				</Box>
				<Button
					role='ClearCompletedTask'
					size='small'
					color='secondary'
					onClick={() => clearCompleted()}
				>
					<Typography variant='caption' component='span'>
						Clear completed
					</Typography>
				</Button>
			</CardActions>
		</Card>
	);
}
