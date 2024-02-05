import { AccessTime } from '@mui/icons-material';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import react from 'react';

import styles from './header.module.css';
import Link from 'next/link';

const Header = () => {
    return (
        <AppBar>
            <Toolbar>
                <Typography variant="h6" color="inherit" noWrap>
                    <Box className={styles.box}>
                        <AccessTime />
                        <Link href="/dashboard">
                            <Typography variant="h6">
                                Ping Time Tracker
                            </Typography>
                        </Link>
                    </Box>
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header