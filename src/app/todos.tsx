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
import CommentIcon from '@mui/icons-material/Comment';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { action, AppD, AppS, selector } from '@/redux';
import { taskList } from '@/redux/components/reduce';

export default function Todos() {
	const d = AppD();
	const [task, setTask] = React.useState('');
	const [choice, setChoice] = React.useState('All');

	const taskList: taskList = AppS(selector.task);
	console.log('taskList', taskList);
	const addTask = () => {
		if (task.length > 0) {
			d(action.task_add(task));
		}
	};
	const changeTaskComplete = () => {};

	return (
		<Card sx={{ maxWidth: 600, maxHeight: '80vh' }}>
			<CardContent sx={{ scroll: 'auto' }}>
				<List
					dense={true}
					sx={{
						py: 0,
						width: '100%',
						borderRadius: 2,
						backgroundColor: 'background.paper',
					}}
				>
					<ListItem key='outlined-add-task' disablePadding>
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

					{Object.keys(taskList).length > 0 ? (
						Object.keys(taskList).map((v, index) => {
							const labelId = `checkbox-list-label-${index}`;
							console.log('Object.keys(taskList)', v);
							let i = Number(v);
							return (
								<>
									{index > 0 && (
										<Divider
											variant='middle'
											component='li'
										/>
									)}
									<ListItem key={index} disablePadding>
										<ListItemButton role={undefined} dense>
											<ListItemIcon>
												<Checkbox
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
													textDecoration: taskList[i]
														.complete
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
						<ListItem key='no-task' disablePadding>
							<Typography variant='caption' component='span'>
								no task!
							</Typography>
						</ListItem>
					)}
				</List>
			</CardContent>
			<CardActions sx={{ justifyContent: 'space-between' }}>
				<Typography variant='caption' component='span'>
					2 item
				</Typography>
				<Box>
					<Button
						size='small'
						color='secondary'
						variant={choice == 'All' ? 'outlined' : 'text'}
						onClick={() => setChoice('All')}
					>
						<Typography variant='caption' component='span'>
							All
						</Typography>
					</Button>
					<Button
						size='small'
						color='secondary'
						variant={choice == 'Active' ? 'outlined' : 'text'}
						onClick={() => setChoice('Active')}
					>
						<Typography variant='caption' component='span'>
							Active
						</Typography>
					</Button>
					<Button
						size='small'
						color='secondary'
						variant={choice == 'Completed' ? 'outlined' : 'text'}
						onClick={() => setChoice('Completed')}
					>
						<Typography variant='caption' component='span'>
							Completed
						</Typography>
					</Button>
				</Box>
				<Button size='small' color='secondary'>
					<Typography variant='caption' component='span'>
						Clear completed
					</Typography>
				</Button>
			</CardActions>
		</Card>
	);
}
