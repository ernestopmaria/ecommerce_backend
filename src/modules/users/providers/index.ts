import { container } from 'tsyringe';
import BcryptHashProvider from './HashProvider/implementations/BcryptHashProvider';
import { IHashProvider } from './HashProvider/models/IHashProvider';
import TokenProvider from './TokenProvider/implementations/TokenProvider';
import { ITokenProvider } from './TokenProvider/models/ITokenProvider';

container.registerSingleton<IHashProvider>('HashProvider', BcryptHashProvider);
container.registerSingleton<ITokenProvider>('TokenProvider', TokenProvider);
