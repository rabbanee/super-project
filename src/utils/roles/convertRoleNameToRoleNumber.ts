import { roleNames } from "@data/roles";
export const convertRoleNameToRoleNumber =  (roleName: string) =>(roleNames.findIndex((role) => role === roleName)) + 1;