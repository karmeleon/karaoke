import { Grid } from '@material-ui/core';
import React, { FC } from 'react';

import RoomCodeDisplay from './RoomCodeDisplay';
import UserIsland from './UserIsland';
import VideoDisplay from './VideoDisplay';
import { PlaylistDispatchContext } from './Context';
import { useLogic } from './hooks';

import styles from './PlayerBase.module.scss';

const PlayerBase: FC<{}> = () => {
    const connectionStatus = useLogic();

    return (
        <PlaylistDispatchContext.Provider value={connectionStatus.playlistDispatch}>
            <div className={styles.fullscreenContainer}>
                <div className={styles.videoSection}>
                    <VideoDisplay playlist={connectionStatus.playlist} />
                </div>
                <div className={styles.bottomSection}>
                    <Grid container>
                        <RoomCodeDisplay roomCode={connectionStatus.roomCode} />
                        {connectionStatus.connectedUsers.map(metadata =>
                            <UserIsland name={metadata.friendlyName} key={metadata.friendlyName} />
                        )}
                    </Grid>
                </div>
            </div>
        </PlaylistDispatchContext.Provider>
    );
};

export default PlayerBase;
