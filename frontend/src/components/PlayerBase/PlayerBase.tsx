import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import React, { FC } from 'react';

import ConnectionManager from './ConnectionManager';

import styles from './PlayerBase.module.scss';

const PlayerBase: FC<{}> = () =>
    <div className={styles.fullscreenContainer}>
        <div className={styles.videoSection}>
            <Typography>There'll be a video here or sth</Typography>
        </div>
        <div className={styles.bottomSection}>
            <Grid container>
                <Grid item xs={2}>
                    <ConnectionManager />
                </Grid>
            </Grid>
        </div>
    </div>;

export default PlayerBase;
