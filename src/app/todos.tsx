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
	const [checked, setChecked] = React.useState([0]);
	const [task, setTask] = React.useState('');
	const [choice, setChoice] = React.useState('All');

	const taskList: taskList = AppS(selector.task);

	const addTask = () => {
		if (task.length > 0) {
			d(action.task_add( task));
		}
	};
	const handleToggle = (value: number) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	return (
		<Card sx={{ width: 600 }}>
			<CardContent>
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
						[0, 1, 2, 3].map((index, value) => {
							const labelId = `checkbox-list-label-${value}`;

							return (
								<>
									{index > 0 && (
										<Divider
											variant='middle'
											component='li'
										/>
									)}
									<ListItem key={value} disablePadding>
										<ListItemButton
											role={undefined}
											onClick={handleToggle(value)}
											dense
										>
											<ListItemIcon>
												<Checkbox
													edge='start'
													checked={
														checked.indexOf(
															value
														) !== -1
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
														checked.indexOf(
															value
														) !== -1
															? 'line-through'
															: 'none',
												}}
												primary={`Line item ${
													value + 1
												}`}
											/>
										</ListItemButton>
									</ListItem>
								</>
							);
						})
					) : (
						<ListItem key='outlined-add-task' disablePadding>
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
