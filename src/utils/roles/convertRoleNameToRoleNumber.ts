import { listRoleName } from "../../data/listRoleName";
export const convertRoleNameToRoleNumber =  (roleName: string) =>(listRoleName.findIndex((role) => role === roleName)) + 1;