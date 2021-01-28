export const redirectToHome = (context: any) => {
  context.res.writeHead(302, {
    Location: '/',
  });
  context.res.end();
}