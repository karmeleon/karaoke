// A song is represented (for now) by a YouTube video ID.
export type Song = string;
export type Playlist = Song[];

// A message that queues up a song.
export interface PlaylistQueueMessage {
	type: 'playlist.queue';
	song: Song;
}

export interface PlaylistOverwriteMessage {
	type: 'playlist.overwrite';
	playlist: Playlist;
}

export interface PlaylistDequeueMessage {
	type: 'playlist.dequeue';
}

export type PlaylistMessage =
	PlaylistQueueMessage |
	PlaylistOverwriteMessage |
	PlaylistDequeueMessage;

export type Message = PlaylistQueueMessage;
