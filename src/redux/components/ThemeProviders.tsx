'use client';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import { useSelector } from 'react-redux';
import { AppS, selector, Providers } from '@/redux';
import React from 'react';

export default function ThemeProviders({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const reduceTheme: PaletteMode = useSelector(selector.theme) || 'dark';
	/* const [theme, setTheme] = React.useState(
		createTheme({
			palette: {
				mode: reduceTheme,
			},
		})
	);
	React.useEffect(() => {
		setTheme(
			createTheme({
				palette: {
					mode: reduceTheme,
				},
			})
		);
	}, [reduceTheme]); */
	const theme = React.useMemo(
		() =>
			createTheme({
				palette: {
					mode: reduceTheme,
				},
			}),
		[reduceTheme]
	);
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
