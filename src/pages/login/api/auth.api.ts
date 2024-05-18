import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { Gender, IUser } from '../../../shared/types/user';

interface ISignInEmailAndPassword {
  email: string;
  password: string;
}

interface ISignInEmailAndPasswordReturnProps {
  refreshToken: string;
}

const MOCK_USER_DATA: IUser = {
  email: 'user@gmail.com',
  gender: Gender.male,
  name: 'Иллион Александрович',
};

export const fetchUser = async ({
  email,
}: {
  email: string;
}): Promise<IUser> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...MOCK_USER_DATA, email });
    }, 500);
  });
};

export const signInEmailAndPassword = async ({
  email,
  password,
}: ISignInEmailAndPassword): Promise<ISignInEmailAndPasswordReturnProps> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ refreshToken: '00000-11111' });
    }, 500);
  });

  const auth = getAuth();
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const firebaseUser = userCredential.user;
  const userRefreshToken = firebaseUser.refreshToken;

  return { refreshToken: userRefreshToken };
};
