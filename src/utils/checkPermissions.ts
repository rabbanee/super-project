import findPermissionByName from "./findPermissionByName";

interface checkPermissionsParams  {
  permissions: any,
  permissionName: any, 
  redirectTo?: String, 
  context: any,
};

const checkPermissions = ({ permissions, permissionName, redirectTo, context }: checkPermissionsParams) => {
  if (!findPermissionByName(permissions, permissionName)) {
    context.res.writeHead(302, {
      Location: redirectTo || '/',
    });
    context.res.end();
  }
};

export default checkPermissions;