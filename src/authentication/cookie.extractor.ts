import { Request } from 'express';

export const CookieExtractor = (req: Request): string | null => {
  if (!req?.headers?.cookie) return null;

  const { cookie } = req.headers;
  const token = cookie.replace('jwt=', '');

  return token;
};
