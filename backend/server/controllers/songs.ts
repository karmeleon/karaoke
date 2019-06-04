import { Router } from 'express';
import { google, youtube_v3 } from 'googleapis';

const router = Router();

const youtube = google.youtube({
	version: 'v3',
	auth: process.env.YOUTUBE_API_KEY,
});

/**
 * Get a list of songs for a query.
 */
router.get('/', async (req, res, next) => {
	try {
		// query youtube
		const searchResults = await youtube.search.list({
			part: 'id,snippet',
			type: 'video',
			q: req.query.q as string,
			videoEmbeddable: 'true',
		}, null);

		// we also need to get the durations
		const videoIDs = searchResults.data.items.map(item => item.id.videoId);
		const videoDetails = await youtube.videos.list({
			part: 'contentDetails',
			id: videoIDs.join(','),
		});
		const idToDuration = new Map<string, string>();

		videoDetails.data.items.forEach(video => idToDuration.set(video.id, video.contentDetails.duration));

		// parse it into the response object
		res.json(searchResults.data.items.map(result => ({
			url: `https://www.youtube.com/watch?v=${result.id.videoId}`,
			displayName: result.snippet.title,
			duration: idToDuration.get(result.id.videoId),
		})));
	} catch (e) {
		next(e);
	}
});

export default router;
