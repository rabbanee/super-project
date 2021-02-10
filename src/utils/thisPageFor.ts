interface thisPageForParams  {
  currentRole: number,
  forRoles: Array<number>, 
  redirectTo?: String, 
  context: any
};

export const thisPageFor = ({ currentRole, forRoles, redirectTo, context }: thisPageForParams) => {
  const findRoleByCurrentRole = forRoles.find((forRole) => forRole === currentRole);
  if (!findRoleByCurrentRole) {
    context.res.writeHead(302, {
      Location: redirectTo || '/',
    });
    context.res.end();
  }
};