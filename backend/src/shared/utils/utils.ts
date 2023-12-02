import * as crypto from 'crypto';

export const generateToken = (): string => {
  return crypto.randomBytes(20).toString('hex');
};

export const generateClassCode = (): string => {
  return crypto.randomBytes(3).toString('hex');
};

export const getRndInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
