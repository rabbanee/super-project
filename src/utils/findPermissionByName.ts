const findPermissionByName = (permissions, permissionName) => permissions.find((navItem) => navItem.name === permissionName);

export default findPermissionByName;