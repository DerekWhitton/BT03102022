import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IRole, IUser } from '@bushtrade/administration-portal/shared/entites';
import { BreadcrumbService } from '@bushtrade/ui';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RolesFacade } from '../../../+state/roles/roles.facade';
import {
  addRoleUser,
  loadUserDetails,
  removeRoleUser,
  setSelectedUser,
} from '../../../+state/users/users.actions';
import { UsersFacade } from '../../../+state/users/users.facade';

@Component({
  selector: 'bushtrade-aministration-users-detail',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.scss'],
})
export class UsersDetailsComponent implements OnInit {
  user$: Observable<IUser>;
  roles$: Observable<IRole[]>;
  roles: any;
  id: string;
  displayAddRoleToUserDialog: boolean = false;
  roleToAdd: IRole;
  constructor(
    public usersFacade: UsersFacade,
    public rolesFacade: RolesFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.id = params.id;
    this.usersFacade.dispatch(loadUserDetails({ userId: params.id }));
    this.user$ = this.usersFacade.selectedUsers$.pipe(
      map((user) => {
        if (user) {
          this.rolesFacade.allRoles$.subscribe({
            next: (roles) => {
              this.roles = roles.filter(
                (role) => user.roles.map((r) => r.id).includes(role.id) == false
              );
            },
          });
          return user;
        }
      })
    );
  }

  addRoleToUser() {
    const roleToAdd = this.roleToAdd as IRole;
    this.usersFacade.dispatch(
      addRoleUser({ role: roleToAdd, userId: this.id })
    );
    this.displayAddRoleToUserDialog = false;
  }

  removeRoleFromUser(roleId: string) {
    this.usersFacade.dispatch(
      removeRoleUser({ roleId: roleId, userId: this.id })
    );
  }
}
