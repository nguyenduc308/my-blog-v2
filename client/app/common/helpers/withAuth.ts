import { NextPageContext } from 'next';
import axios from './axios';

interface FromServerSide {
  shoudRedirectPath?: string;
  getServerSidePropsFunc?: Function;
}

const getMe = async (ctx: NextPageContext) => {
  const cookie = ctx.req?.headers?.cookie;

  return axios.get('/users/me', {
    headers: ctx.req && cookie ? { cookie } : undefined,
  });
};

export const withAuth = (fromServerSide?: FromServerSide) => {
  return async (ctx: NextPageContext) => {
    const resp: any = await getMe(ctx).catch((res) => {
      return res.response.data;
    });

    const { data: user, statusCode } = resp;

    if (statusCode === 401) {
      ctx?.res?.writeHead(302, {
        Location:
          (fromServerSide && fromServerSide.shoudRedirectPath) || '/auth/login',
      });
      ctx?.res?.end();
      return {
        props: {
          user: null,
        },
      };
    }

    if (!['admin', 'mod'].includes(user.role)) {
      ctx?.res?.writeHead(302, {
        Location:
          (fromServerSide && fromServerSide.shoudRedirectPath) || '/',
      });
      ctx?.res?.end();
      return {
        props: {
          user: null,
        },
      };
    }

    if (fromServerSide && fromServerSide.getServerSidePropsFunc) {
      const data = await fromServerSide.getServerSidePropsFunc(ctx);
      return {
        props: { user, data },
      };
    }

    return {
      props: {
        user: user || null,
      },
    };
  };
};

// export function withAuthComponent(Component: any){
//   return ({user, data}:{user: any, data: any}) => {
//       if(!user){
//           return <h1>Unauthorization</h1>
//       }
//       return <Component {...data.props}/>
//   }
// }
