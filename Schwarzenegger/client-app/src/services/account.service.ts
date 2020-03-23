// import { User } from "../models/user.model";
// import { Role } from '../models/Role';
// import { Permission, PermissionNames, PermissionValues } from '../models/permission.model';
// import { UserEdit } from '../models/user-edit.model';
import store from "../store";
import { PermissionValues } from "@/models/permission.model";
import { Role } from "@/models/role.model";
import axios from "axios";

export type RolesChangedOperation = "add" | "delete" | "modify";
export interface RolesChangedEventArg {
  roles: Role[] | string[];
  operation: RolesChangedOperation;
}

class AccountService {
  private static instance: AccountService;
  public static readonly roleAddedOperation: RolesChangedOperation = "add";
  public static readonly roleDeletedOperation: RolesChangedOperation = "delete";
  public static readonly roleModifiedOperation: RolesChangedOperation =
    "modify";

  //   private _rolesChanged = new Subject<RolesChangedEventArg>();

  // getUser(userId?: string) {
  //     return this.accountEndpoint.getUserEndpoint<User>(userId);
  // }

  // getUserAndRoles(userId?: string) {

  //     return forkJoin(
  //         this.accountEndpoint.getUserEndpoint<User>(userId),
  //         this.accountEndpoint.getRolesEndpoint<Role[]>());
  // }

  async getUsers() {
    try {
      const response = await axios.get(
        "https://localhost:44300/api/account/users"
      );
      return response.data;
    } catch (err) {
      return [];
    }
  }

  // getUsersAndRoles(page?: number, pageSize?: number) {

  //     return forkJoin(
  //         this.accountEndpoint.getUsersEndpoint<User[]>(page, pageSize),
  //         this.accountEndpoint.getRolesEndpoint<Role[]>());
  // }

  // updateUser(user: UserEdit) {
  //     if (user.id) {
  //         return this.accountEndpoint.getUpdateUserEndpoint(user, user.id);
  //     } else {
  //         return this.accountEndpoint.getUserByUserNameEndpoint<User>(user.userName).pipe(
  //             mergeMap(foundUser => {
  //                 user.id = foundUser.id;
  //                 return this.accountEndpoint.getUpdateUserEndpoint(user, user.id);
  //             }));
  //     }
  // }

  // newUser(user: UserEdit) {
  //     return this.accountEndpoint.getNewUserEndpoint<User>(user);
  // }

  // getUserPreferences() {
  //     return this.accountEndpoint.getUserPreferencesEndpoint<string>();
  // }

  // updateUserPreferences(configuration: string) {
  //     return this.accountEndpoint.getUpdateUserPreferencesEndpoint(configuration);
  // }

  // deleteUser(userOrUserId: string | User): Observable<User> {

  //     if (typeof userOrUserId === 'string' || userOrUserId instanceof String) {
  //         return this.accountEndpoint.getDeleteUserEndpoint<User>(userOrUserId as string).pipe<User>(
  //             tap(data => this.onRolesUserCountChanged(data.roles)));
  //     } else {

  //         if (userOrUserId.id) {
  //             return this.deleteUser(userOrUserId.id);
  //         } else {
  //             return this.accountEndpoint.getUserByUserNameEndpoint<User>(userOrUserId.userName).pipe<User>(
  //                 mergeMap(user => this.deleteUser(user.id)));
  //         }
  //     }
  // }

  // unblockUser(userId: string) {
  //     return this.accountEndpoint.getUnblockUserEndpoint(userId);
  // }

  userHasPermissions(permissionValues: PermissionValues[]): boolean {
    let hasPermission = true; 
    if(this.currentUser.isAdmin) {
      return true;
    }

    permissionValues.forEach(permissionValue => {
      if(!this.permissions.some(p => p as PermissionValues == permissionValue as PermissionValues)) {
        hasPermission = false;
      }
    });

    return hasPermission;
  }

  userHasPermission(permissionValue: PermissionValues): boolean {
    return (
      this.currentUser.isAdmin ||
      this.permissions.some(p => p == permissionValue)
    );
  }

  // refreshLoggedInUser() {
  //     return this.accountEndpoint.refreshLogin();
  // }

  // getRoles(page?: number, pageSize?: number) {

  //     return this.accountEndpoint.getRolesEndpoint<Role[]>(page, pageSize);
  // }

  // getRolesAndPermissions(page?: number, pageSize?: number) {

  //     return forkJoin(
  //         this.accountEndpoint.getRolesEndpoint<Role[]>(page, pageSize),
  //         this.accountEndpoint.getPermissionsEndpoint<Permission[]>());
  // }

  // updateRole(role: Role) {
  //     if (role.id) {
  //         return this.accountEndpoint.getUpdateRoleEndpoint(role, role.id).pipe(
  //             tap(data => this.onRolesChanged([role], AccountService.roleModifiedOperation)));
  //     } else {
  //         return this.accountEndpoint.getRoleByRoleNameEndpoint<Role>(role.name).pipe(
  //             mergeMap(foundRole => {
  //                 role.id = foundRole.id;
  //                 return this.accountEndpoint.getUpdateRoleEndpoint(role, role.id);
  //             }),
  //             tap(data => this.onRolesChanged([role], AccountService.roleModifiedOperation)));
  //     }
  // }

  // newRole(role: Role) {
  //     return this.accountEndpoint.getNewRoleEndpoint<Role>(role).pipe<Role>(
  //         tap(data => this.onRolesChanged([role], AccountService.roleAddedOperation)));
  // }

  // deleteRole(roleOrRoleId: string | Role): Observable<Role> {

  //     if (typeof roleOrRoleId === 'string' || roleOrRoleId instanceof String) {
  //         return this.accountEndpoint.getDeleteRoleEndpoint<Role>(roleOrRoleId as string).pipe<Role>(
  //             tap(data => this.onRolesChanged([data], AccountService.roleDeletedOperation)));
  //     } else {

  //         if (roleOrRoleId.id) {
  //             return this.deleteRole(roleOrRoleId.id);
  //         } else {
  //             return this.accountEndpoint.getRoleByRoleNameEndpoint<Role>(roleOrRoleId.name).pipe<Role>(
  //                 mergeMap(role => this.deleteRole(role.id)));
  //         }
  //     }
  // }

  // getPermissions() {

  //     return this.accountEndpoint.getPermissionsEndpoint<Permission[]>();
  // }

  //   private onRolesChanged(roles: Role[] | string[], op: RolesChangedOperation) {
  //     this._rolesChanged.next({ roles, operation: op });
  //   }

  //   onRolesUserCountChanged(roles: Role[] | string[]) {
  //     return this.onRolesChanged(roles, AccountService.roleModifiedOperation);
  //   }

  //   getRolesChangedEvent(): Observable<RolesChangedEventArg> {
  //     return this._rolesChanged.asObservable();
  //   }

  get permissions(): PermissionValues[] {
    return store.getters.userPermissions();
  }

  get currentUser() {
    return store.getters.currentUser();
  }
}

const instance = new AccountService();

export default instance;
