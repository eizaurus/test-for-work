'use client';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useDispatch } from 'react-redux';
import { action, selector, AppS } from './redux';

const DarkModeButton = () => {
	const dispatch = useDispatch();
	let Icon = <Brightness7Icon />;
	const theme = AppS(selector.theme);
	if (theme === 'dark') {
		Icon = <Brightness7Icon />;
	} else {
		Icon = <Brightness4Icon />;
	}
	const sx = {
		margin: 'auto',
		bgcolor: 'inherit',
		color: 'inherit',
	};

	return (
		<IconButton
			size='large'
			sx={sx}
			onClick={() => dispatch(action.theme())}
		>
			{Icon}
		</IconButton>
	);
};
export default DarkModeButton;
