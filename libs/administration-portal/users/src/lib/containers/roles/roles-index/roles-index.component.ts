import { Component, OnInit } from '@angular/core';
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
  constructor(public rolesFacade: RolesFacade) {}

  ngOnInit(): void {}
}
