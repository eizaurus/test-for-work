'use client';
import * as React from 'react';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Box, Typography } from '@mui/material';
import Todos from './todos';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
const DarkModeButton = () => {
	const theme = useTheme();
	const colorMode = React.useContext(ColorModeContext);
	const sx = {
		margin: 'auto',
		bgcolor: 'inherit',
		color: 'inherit',
	};
	return (
		<IconButton size='large' sx={sx} onClick={colorMode.toggleColorMode}>
			{theme.palette.mode === 'dark' ? (
				<Brightness7Icon />
			) : (
				<Brightness4Icon />
			)}
		</IconButton>
	);
};
function MyApp() {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				alignItems: 'center',
				justifyContent: 'center',
				bgcolor: 'background.default',
				color: 'text.primary',
				height: '100vh',
			}}
		>
			<Typography variant='h2' component='h2'>
				todos
				<DarkModeButton />
			</Typography>
			<Todos />
		</Box>
	);
}
export default function Home() {
	const [mode, setMode] = React.useState<'light' | 'dark'>('light');
	const colorMode = React.useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) =>
					prevMode === 'light' ? 'dark' : 'light'
				);
			},
		}),
		[]
	);
	const theme = React.useMemo(
		() =>
			createTheme({
				palette: {
					mode,
				},
			}),
		[mode]
	);
	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<MyApp />
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}
