import React, { FC } from 'react';
import { useLogic } from './hooks';
import ConnectionPanel from './ConnectionPanel';
import MainRemoteInterface from './MainRemoteInterface';

const RemoteBase: FC<{}> = () => {
	const {
        isConnected,
        friendlyName,
		connectToPlayer,
		sendMessage,
	} = useLogic();

	if (!isConnected) {
		return (
			<ConnectionPanel connectToPlayer={connectToPlayer} />
		);
	}
	return (
		<MainRemoteInterface sendMessage={sendMessage} />
	);
};

export default RemoteBase;
