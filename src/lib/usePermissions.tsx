import findPermissionByName from '@utils/findPermissionByName';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface usePermissionsParams  {
  permissionName: string, 
  redirectTo?: String, 
};

const usePermissions = ({ permissionName, redirectTo }: usePermissionsParams) => {
  const user = useSelector(state => state.user);
  const permissions = useSelector(state => state.permissions);
  const router = useRouter();

  useEffect(() => {
    if (!permissions.isValid && !user.isValid) {
      return;
    }
    if (!findPermissionByName(permissions.list, permissionName)) {
      router.push('/');
    }
  },[user, permissions]);

  return false;
};

export default usePermissions;