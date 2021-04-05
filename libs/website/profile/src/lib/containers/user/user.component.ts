import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IUser } from '@bushtrade/website/shared/entites';
import { UserService } from '@bushtrade/website/shared/services';
import { getUser, loadUser, setProfilePicture } from '@bushtrade/website/shared/state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'website-user-index',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user$: Observable<IUser>;
  loaded$: Observable<boolean>;
  image: SafeUrl = "assets/layout/images/no-profile.png";
  @ViewChild('fileUpload') fileUpload: any;

  constructor(
    private store: Store, 
    private userService: UserService,
    private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.store.dispatch(loadUser());
    this.user$ = this.store.select(getUser);

    // Display profile image only if provided
    this.user$.subscribe(user => {
      if (user.profilePictureUri.length > 0)
          this.image = user.profilePictureUri;
    })
    
  }

  UploadProfilePicture(event: { files: any }) {
    // Update the image on the UI
    this.image = this.sanitizer.bypassSecurityTrustUrl(
      window.URL.createObjectURL(event.files[0])
    );
    
    // POST the new image to server and retrieve it's Guid
    this.userService.uploadProfilePicture(event.files[0]).subscribe(imageId => {
      this.store.dispatch(setProfilePicture({ filePath: this.image as string }))
    });
    
    // Reset the file uploader to prevent stacking
    this.fileUpload.clear();
  }
}
