import * as crypto from 'crypto';

export const generateToken = (): string => {
  return crypto.randomBytes(20).toString('hex');
};
