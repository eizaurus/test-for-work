import Image from 'next/image';
import styles from './page.module.css';
import { DarkModeButton } from '@/redux';
import { Box, Typography } from '@mui/material';
import Todos from './todos';

export default function Home() {
	return (
		<Box
			sx={{
				display: 'flex',
				width: '100%',
				alignItems: 'center',
				justifyContent: 'center',
				bgcolor: 'background.default',
				color: 'text.primary',
			}}
			className={styles.main}
		>
			{/* <DarkModeButton
				style={{ position: 'absolute', top: 8, right: 8 }}
			/> */}
			<Typography variant='h2' component='h2'>
				todos
				<DarkModeButton />
			</Typography>
			<Todos />
		</Box>
	);
}
