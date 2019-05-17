import { createContext } from 'react';
import { PlaylistDispatch } from './hooks';

export const PlaylistDispatchContext = createContext<PlaylistDispatch>(() => {});
