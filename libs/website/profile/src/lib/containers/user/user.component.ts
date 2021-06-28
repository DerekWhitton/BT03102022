import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IUser } from '@bushtrade/website/shared/entites';
import { UserService } from '@bushtrade/website/shared/services';
import {
  getUser,
  loadUser,
  loadUserSuccess,
  setProfilePicture,
} from '@bushtrade/website/shared/state';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IUserUpdateRequest } from '@bushtrade/website/shared/entites';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'website-user-index',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user$: Observable<IUser>;
  isLoading: boolean = true;
  editProfile: boolean = false;
  image: SafeUrl = 'assets/layout/images/no-profile.png';
  @ViewChild('fileUpload') fileUpload: any;

  userFormGroup: FormGroup = new FormGroup({
    age: new FormControl(0, [Validators.required, Validators.min(0)]),
    bio: new FormControl('', [Validators.required, Validators.maxLength(2500)]),
    gender: new FormControl('', [
      Validators.required,
      Validators.maxLength(2500),
    ]),
    location: new FormControl('', [
      Validators.required,
      Validators.maxLength(2500),
    ]),
    occupation: new FormControl('', [
      Validators.required,
      Validators.maxLength(2500),
    ]),
    countriesVisited: new FormControl('', [
      Validators.required,
      Validators.maxLength(2500),
    ]),
  });

  constructor(
    private store: Store,
    private userService: UserService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    let ctx = this;
    this.store.dispatch(loadUser());
    this.user$ = this.store.select(getUser);

    // Display profile image only if provided
    this.user$.subscribe((user) => {
      if (user.profilePictureUri.length > 0)
        this.image = user.profilePictureUri;

      // Update form values
      ctx.userFormGroup.patchValue({ ...user });

      // Hide loading spinner once we have fetched the user
      if (user.id !== '') this.isLoading = false;
    });
  }

  UploadProfilePicture(event: { files: any }) {
    // Update the image on the UI
    this.image = this.sanitizer.bypassSecurityTrustUrl(
      window.URL.createObjectURL(event.files[0])
    );

    // POST the new image to server and retrieve it's Guid
    this.userService
      .uploadProfilePicture(event.files[0])
      .subscribe((imageId) => {
        this.store.dispatch(
          setProfilePicture({ filePath: this.image as string })
        );
      });

    // Reset the file uploader to prevent stacking
    this.fileUpload.clear();
  }

  UpdateUser() {
    const userequest = this.userFormGroup.value as IUserUpdateRequest;
    this.isLoading = true;

    this.userService.updateProfileDetails(userequest).subscribe(
      (result) => {
        this.isLoading = false;

        // Update the user's details on the UI
        this.store.dispatch(loadUserSuccess({ payload: result }));
        this.user$ = this.store.select(getUser);
        this.editProfile = false;
      },
      (error) => {
        alert('An error has occurred');
        console.error(error);
      }
    );
  }
}
