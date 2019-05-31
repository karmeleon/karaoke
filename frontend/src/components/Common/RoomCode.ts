/**
 * A selection of 4-letter naughty words we don't want to generate
 * as room codes. Modified from http://www.bannedwordlist.com/lists/swearWords.txt
 */
export const BANNED_ROOM_NAMES = [
    'ANAL',
    'ANUS',
    'ARSE',
    'BLOW',
    'BOOB',
    'BUTT',
    'COCK',
    'COON',
    'CRAP',
    'CUNT',
    'DAMN',
    'DICK',
    'DYKE',
    'FECK',
    'FUCK',
    'HELL',
    'HOMO',
    'JERK',
    'JIZZ',
    'KNOB',
    'MUFF',
    'NIGG',
    'PISS',
    'POOP',
    'PUBE',
    'PUSS',
    'SHIT',
    'SLUT',
    'TURD',
    'TWAT',
    'WANK',
];

/**
 * Generate a four-letter room code
 */
export function generateRoomCode(): string {
    const roomCode = generateRandomString(4);

    // make sure we're not saying something bad
    if (BANNED_ROOM_NAMES.includes(roomCode)) {
        // just recurse, it'll probably never happen twice in a row
        return generateRoomCode();
    }
    return roomCode;
}

/**
 * Generate a random all-caps string with a given length
 */
export function generateRandomString(length: number): string {
    const charCodes = new Array(4)
        .fill(undefined)
        .map(() => Math.floor(Math.random() * 26) + 'A'.charCodeAt(0));
    return String.fromCharCode(...charCodes);
}

/**
 * Generate a PeerJS peer key from a room code
 */
export function generatePeerJSKey(roomCode: string): string {
    return `rtckaraoke-${roomCode}`;
}
