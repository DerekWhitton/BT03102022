import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '@bushtrade/administration-portal/shared/entites';
import { Observable } from 'rxjs';
import { loadUsers } from '../../../+state/users/users.actions';
import { UsersFacade } from '../../../+state/users/users.facade';

@Component({
  selector: 'bushtrade-aministration-users-index',
  templateUrl: './users-index.component.html',
  styleUrls: ['./users-index.component.scss'],
})
export class UsersIndexComponent implements OnInit {
  columns = [
    { field: 'firstName', header: 'First Name' },
    { field: 'surname', header: 'Surname' },
  ];
  users$: Observable<IUser[]>;
  loading$ = this.usersFacade.loaded$;
  constructor(public usersFacade: UsersFacade, private router: Router) {}

  ngOnInit(): void {
    this.usersFacade.dispatch(loadUsers());
    this.users$ = this.usersFacade.allUsers$;
  }

  onViewSelection(data) {
    this.router.navigate(['/', 'users', 'user', data.id]);
  }
}
