import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "./user";
import { UserService } from "./user.service";
import { Subscription } from 'rxjs';
import { AlertService } from '../../util/alert/alert.service';
import { AuthenticationService } from "../../util/authentication.service";


@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit, OnDestroy {
  public showPassword_au: boolean = false
  subscription!: Subscription;
  isSubmitted: boolean = false;
  Districts: any[] = [
  { name: 'Ampara' },
  { name: 'Anuradhapura' },
  { name: 'Badulla' },
  { name: 'Batticaloa' },
  { name: 'Colombo' },
  { name: 'Galle' },
  { name: 'Gampaha' },
  { name: 'Hambantota' },
  { name: 'Jaffna' },
  { name: 'Kalutara' },
  { name: 'Kandy' },
  { name: 'Kegalle' },
  { name: 'Kilinochchi' },
  { name: 'Kurunegala' },
  { name: 'Mannar' },
  { name: 'Matale' },
  { name: 'Matara' },
  { name: 'Moneragala' },
  { name: 'Mullaitivu' },
  { name: 'Nuwara Eliya' },
  { name: 'Polonnaruwa' },
  { name: 'Puttalam' },
  { name: 'Ratnapura' },
  { name: 'Trincomalee' },
  { name: 'Vavuniya' }
  ];
  //subject that need to be add should initialized 
  mathematics: boolean = false;
  chemistry: boolean = false;
  physics: boolean = false;
  accounting: boolean = false;
  @Input() user: any;
  @Output() closeClicked = new EventEmitter();

  constructor(private userService: UserService, private alertService: AlertService, private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit(){
  }
  selectSub(sub: string) {
    console.log("[selectUserRole] : (userRole) " + sub);
    if (sub === "mathematics") {
      this.mathematics = !this.mathematics;
    } else if (sub === "chemistry") {
      this.chemistry = !this.chemistry;
    } else if (sub === "physics") {
      this.physics = !this.physics;
    } else if (sub === "accounting") {
      this.accounting = !this.accounting;
    }
  }
  onSave(addUserForm: NgForm) {
    var subjects: string[] = [];
    //check whether the added subject is clicked and if it is add to the list
    if (this.mathematics) {
      subjects.push("1");
    }
    if (this.chemistry) {
      subjects.push("2");
    }
    if (this.physics) {
      subjects.push("3");
    }
    if (this.accounting) {
      subjects.push("4");
    }
    console.log("[userAccountsComponent] :: onSave()::" );
    if (addUserForm.value.password != addUserForm.value.repass) {
      this.alertService.clear();
      this.alertService.error("Passwords do not match!");
      return;
    }
    
    if (subjects.length == 0) {
      this.alertService.clear();
      this.alertService.warn("Please subscribed to atleast one Subject.");
      return;
    }
    if (addUserForm.valid) {
      this.isSubmitted = true;
      const user = {
        firstName: addUserForm.value.firstName,
        lastName: addUserForm.value.lastName,
        residentialAddress: addUserForm.value.residentialAddress,
        district: addUserForm.value.district,
        mobileNum: addUserForm.value.mobileNum,
        college: addUserForm.value.college,
        year: addUserForm.value.year,
        subject: subjects,
        email: addUserForm.value.email,
        passWord: addUserForm.value.password,
        status: "1",
        userRoles: "Student"
      };

      this.userService.addUser(user);
      this.subscription = this.userService.alertMessageOccured
        .subscribe(
          (alert) => {
          console.log(alert);
          if (alert.code == 200) {
            this.alertService.clear();
            this.router.navigateByUrl("key-code");
          } else {
            this.isSubmitted = false;
            this.alertService.clear();
            this.alertService.error(alert.message);
          }

        }

        )

    } else {
      return;
    }


  }
  ngOnDestroy() {
    if (this.subscription != undefined) {
      this.subscription.unsubscribe();
    }
  }

}
