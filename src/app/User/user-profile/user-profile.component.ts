import { HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DtoUpdateProfileData } from 'Dto/DtoUpdateProfileData';
import { AuthenticationService } from 'src/app/authentication.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  @ViewChild('file') file!: ElementRef;
  public userProfile!: any;
  public isLoading: boolean = true;
  public hide: boolean = true;
  fileUpload!: File;
  public dbPath: string = '';
  public imageUrl: string = '';
  public modalUrl: string = '';
  userDetailForm: FormGroup = new FormGroup({});
  PassForm: FormGroup = new FormGroup({});
  public modalMessage!: string;
  public responseLoading: boolean = false;
  public passwordNotMatched: boolean = false;
  public imageSuccess: boolean = false;
  public imageFailed: boolean = false;
  public imageMessage: string = '';
  public progressBar: number = 0;

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private authService: AuthenticationService
  ) {}
  ngOnInit(): void {
    this.createForm();
    this.loadUserProfile();
    window.scroll(0, 0);
  }

  loadUserProfile() {
    this.service.getUserProfile(this.authService.UserObject().id).subscribe(
      (data) => {
        if (data.imagePath == null) {
          this.imageUrl =
            '../../../assets/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg';
          this.modalUrl = this.imageUrl;
        } else {
          this.imageUrl = `https://localhost:44362/${data.imagePath}`;
          this.modalUrl = this.imageUrl;
        }
        this.userProfile = {
          authId: data.authId,
          userId: data.userId,
          userName: data.userName,
          email: data.email,
        };
        this.userDetailForm.patchValue(data);
      },
      (err) => {
        if (err.status == 401) this.authService.LogOut();
      }
    );
    this.createForm();
    this.isLoading = false;
  }
  createForm() {
    this.userDetailForm = this.fb.group({
      userName: [
        { value: '', disabled: true },
        [
          Validators.required,
          Validators.pattern(/^[A-Za-z0-9][A-Za-z0-9 \.\-_]*[A-Za-z0-9]$/),
        ],
      ],
      firstName: [
        { value: '', disabled: true },
        [
          Validators.required,
          Validators.pattern(
            /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/
          ),
        ],
      ],
      lastName: [
        { value: '', disabled: true },
        [
          Validators.required,
          Validators.pattern(
            /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/
          ),
        ],
      ],
      email: [
        { value: '', disabled: true },
        [
          Validators.required,
          Validators.pattern(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
        ],
      ],
      dob: [{ value: '', disabled: true }, [Validators.required]],
      address: [{ value: '', disabled: true }, [Validators.required]],
      dateOfJoin: [{ value: '', disabled: true }, [Validators.required]],
      currentOrganizationName: [
        { value: '', disabled: true },
        [Validators.maxLength(50)],
      ],
      previousOrganizationName: [
        { value: '', disabled: true },
        [Validators.maxLength(50)],
      ],
      experiance: [{ value: '', disabled: true }, [Validators.maxLength(50)]],
    });
    this.PassForm = this.fb.group({
      Password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/
          ),
        ],
      ],
    });
  }
  get Password() {
    return this.PassForm.get('Password');
  }
  disable(id: string) {
    this.userDetailForm.controls[id].disable();
  }

  submitPassword() {
    this.service.ConfirmPassword(this.PassForm.value).subscribe(
      (data) => {
        if (data.statusCode == 200) {
          this.responseLoading = true;
          this.onSubmit();
        } else {
          this.passwordNotMatched = true;
          this.modalMessage = 'Password Not Match';
        }
      },
      (err) => {
        this.passwordNotMatched = true;
      }
    );
  }
  onSubmit() {
    var profileData: DtoUpdateProfileData = {
      firstName: this.userDetailForm.value.firstName,
      lastName: this.userDetailForm.value.lastName,
      address: this.userDetailForm.value.address,
      previousOrganizationName:
        this.userDetailForm.value.previousOrganizationName,
      experiance: this.userDetailForm.value.experiance,
    };
    this.service.UpdateUserProfileData(profileData).subscribe((data) => {
      if (data.statusCode == 200) {
        this.modalMessage = 'Profile Updated';
        this.loadUserProfile();
      } else this.modalMessage = 'Failed to Update. Try again';

      this.responseLoading = false;
    });
  }

  //Preview Profile Upload
  profileUpdate(event: any) {
    this.fileUpload = <File>event.target.files[0];
    var reader = new FileReader();
    reader.onload = (e: any) => {
      this.modalUrl = e.target.result;
    };
    reader.readAsDataURL(this.fileUpload);
  }

  //Uploda Profile Image
  uploadImage() {
    if(this.fileUpload == null || undefined) {
      this.imageFailed = true;
      this.imageMessage = '*Image Required.';
    } else {
      const fileData = new FormData();
      fileData.append('image', this.fileUpload, this.fileUpload.name);
      this.service.uploadUserProfileImage(fileData).subscribe((event) => {
        if (event.type == HttpEventType.UploadProgress)
          this.progressBar = Math.round((100 * event.loaded) / event.total);
        else if (event.type === HttpEventType.Response) {
          if (event.body.statusCode == 200) {
            this.imageFailed = false;
            this.imageSuccess = true;
            this.imageMessage = 'Image Uploaded Successfully';
          } else {
            this.imageSuccess = false;
            this.imageFailed = true;
            this.imageMessage = 'Image Upload Failed.';
          }
        }
      });
    }
  }
  refresh() {
    this.imageFailed = false;
    this.imageMessage = '';
    this.imageSuccess = false;
    this.progressBar = 0;
    this.file.nativeElement.value = null;
    this.loadUserProfile();
  }
}

// this.service.uploadUserProfileImage(fileData).subscribe((data) => {
//   if(data.statusCode== 200)
//   {
//     this.imageFailed = false;
//     this.imageSuccess = true;
//     this.imageMessage = "Image Uploaded Successfully";
//   }
//   else
//   {
//     this.imageSuccess = false;
//     this.imageFailed = true;
//     this.imageMessage = "Image Upload Failed."
//   }
// });
