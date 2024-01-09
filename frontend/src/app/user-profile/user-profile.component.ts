import { Component, OnInit } from '@angular/core';
import { UserService } from '../auth/user.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userData: any;


  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo(): void {
    this.userData = this.authService.getUser();
    console.log('User data loaded from AuthService:', this.userData);
  }

  saveUserInfo(): void {
    const userId = this.userData.id;
  
    const updatedUserData = {
      username: this.userData.username,
      email: this.userData.email,
      phone: this.userData.phone,
      mobile: this.userData.mobile,
      address: this.userData.address,
      contactNo: this.userData.contactNo,
      designation: this.userData.designation,
    };
  
    this.userService.updateStrapiUserInfo(userId, updatedUserData).subscribe(
      (response: any) => {
        console.log('Strapi API Response:', response);
  
    
        if (response) {
          console.log('Updated user data from Strapi:', response);
  
        
          this.authService.updateUser(response);
        } else {
          console.error('Invalid response from Strapi. Response is empty or missing expected properties.');
        }
      },
      (error: any) => {
        console.error('Error updating user information in Strapi:', error);
      }
    );
  }
  
// UserProfileComponent

deleteAccount(): void {
  const isConfirmed = confirm('Are you sure you want to delete your account?');

  if (isConfirmed) {
    const userId = this.userData.id;

    this.userService.deleteAccount(userId).subscribe(
      (response: any) => {
        console.log('Account deleted successfully:', response);
        this.authService.logout();
        // Optionally, you can redirect the user to a specific page after deletion.
        // this.router.navigate(['/deleted-account']);
      },
      (error: any) => {
        console.error('Error deleting user account:', error);
      }
    );
  }
}
 
  
}
