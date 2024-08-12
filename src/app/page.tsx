import Image from 'next/image';
import styles from './page.module.css';
import { DarkModeButton } from '@/redux';
import { Box } from '@mui/material';

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
		>
			<DarkModeButton
				style={{ position: 'absolute', top: 8, right: 8 }}
			/>
			<main className={styles.main}>
				<div className={styles.center}></div>
			</main>
		</Box>
	);
}
