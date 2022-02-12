import jwt from 'jsonwebtoken';
import cookie from 'cookie';

import { NextPageContext } from 'next';

interface FromServerSide {
  shoudRedirectPath?: string;
}

export const withUnAuth = (fromServerSide?: FromServerSide) => {
  return async (ctx: NextPageContext) => {
    const reqCookie = ctx.req?.headers?.cookie;
    if (reqCookie) {
      const data = cookie.parse(reqCookie);
      if (data && data.token) {
        const payload = jwt.decode(data.token);
        if (payload && (payload as any).id !== undefined) {
          ctx?.res?.writeHead(302, {
            Location:
              (fromServerSide && fromServerSide.shoudRedirectPath) || '/',
          });
          ctx?.res?.end();
          return {
            props: {},
          };
        }
      }
    }

    return {
      props: {},
    };
  };
};
