import cookie from 'js-cookie';
import withConditionalRedirect from './withConditionalRedirect';

export const withAuth = (WrappedComponent) => {
  return withConditionalRedirect({
    WrappedComponent,
    location: '/login',
    clientCondition: function withAuthClientCondition() {
      return !cookie.get('token');
    },
    serverCondition: function withAuthServerCondition(ctx) {
      // This isn't a good way to check for cookie values.
      // See the blog post linked below for something better.
      // We kept it simple here.
      return !ctx.req.headers.cookie?.includes('token');
    }
  });
}
