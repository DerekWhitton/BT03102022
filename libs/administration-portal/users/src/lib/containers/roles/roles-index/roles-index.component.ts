import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IRole } from '@bushtrade/administration-portal/shared/entites';
import {
  createRole,
  deleteRole,
  loadRoleDetails,
  setSelectedRole,
  updateRole,
} from '../../../+state/roles/roles.actions';
import { RolesFacade } from '../../../+state/roles/roles.facade';

@Component({
  selector: 'bushtrade-aministration-roles-index',
  templateUrl: './roles-index.component.html',
  styleUrls: ['./roles-index.component.scss'],
})
export class RolesIndexComponent implements OnInit {
  columns = [{ field: 'name', header: 'Name' }];
  roles$ = this.rolesFacade.allRoles$;
  loading$ = this.rolesFacade.loaded$;

  createFormGroup: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });
  updateFormGroup: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });
  constructor(public rolesFacade: RolesFacade) {}

  ngOnInit(): void {}

  onCreateSubmit() {
    const role = this.createFormGroup.value as IRole;
    this.rolesFacade.dispatch(createRole({ role }));
  }

  handleUpdateSelection(data) {
    this.rolesFacade.dispatch(setSelectedRole({ roleId: data.id }));
    this.rolesFacade.dispatch(loadRoleDetails({ roleId: data.id }));
    let ctx = this;
    this.rolesFacade.selectedRoles$.subscribe({
      next(role) {
        ctx.updateFormGroup.patchValue({ ...role });
      },
    });
  }

  onUpdateSubmit() {
    const role = this.updateFormGroup.value as IRole;
    this.rolesFacade.dispatch(updateRole({ role: role }));
  }

  onItemDeleted(data) {
    this.rolesFacade.dispatch(deleteRole({ roleId: data.id }));
  }
}
