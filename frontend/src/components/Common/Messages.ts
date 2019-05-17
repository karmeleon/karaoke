// A song is represented (for now) by a simple URL.
export type Song = string;
export type Playlist = Song[];

// A message that queues up a song.
export interface PlaylistQueueMessage {
	type: 'playlist.queue',
	song: Song,
}

export interface PlaylistOverwriteMessage {
	type: 'playlist.overwrite',
	playlist: Playlist,
}

export type PlaylistMessage = PlaylistQueueMessage | PlaylistOverwriteMessage;

export type Message = PlaylistQueueMessage;
