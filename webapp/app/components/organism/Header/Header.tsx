import { AccessTime } from '@mui/icons-material';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import react from 'react';

import styles from './header.module.css';

const Header = () => {
    return (
        <AppBar>
            <Toolbar>
                <Typography variant="h6" color="inherit" noWrap>
                    <Box className={styles.box}>
                        <AccessTime />
                        <Typography variant="h6">
                            Ping Time Tracker
                        </Typography>
                    </Box>
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header