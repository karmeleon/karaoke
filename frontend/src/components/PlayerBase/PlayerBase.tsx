import { Grid, makeStyles, Theme, createStyles } from '@material-ui/core';
import React, { FC } from 'react';

import RoomCodeDisplay from './RoomCodeDisplay';
import UserIsland from './UserIsland';
import VideoDisplay from './VideoDisplay';
import { PlaylistDispatchContext } from './Context';
import { useLogic } from './hooks';

const useStyles = makeStyles((theme: Theme) => 
	createStyles({
		videoSection: {
            flexBasis: `calc(80% - ${theme.spacing(1)}px)`,
        },
        bottomSection: {
            flexBasis: `calc(20% - ${theme.spacing(1)}px)`,
        },
	})
);

const PlayerBase: FC<{}> = () => {
    const connectionStatus = useLogic();
    const classes = useStyles();

    return (
        <PlaylistDispatchContext.Provider value={connectionStatus.playlistDispatch}>
            <div className={classes.videoSection}>
                <VideoDisplay playlist={connectionStatus.playlist} />
            </div>
            <div className={classes.bottomSection}>
                <Grid container>
                    <RoomCodeDisplay roomCode={connectionStatus.roomCode} />
                    {connectionStatus.connectedUsers.map(metadata =>
                        <UserIsland name={metadata.friendlyName} key={metadata.friendlyName} />
                    )}
                </Grid>
            </div>
        </PlaylistDispatchContext.Provider>
    );
};

export default PlayerBase;
