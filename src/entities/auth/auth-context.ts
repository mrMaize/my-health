import { createContext } from 'react';
import { IAuth } from './types';

const AuthConsumer = createContext<IAuth | null>(null);

export { AuthConsumer };
