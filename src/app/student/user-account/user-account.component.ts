import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "./user";
import { UserService } from "./user.service";
import { Subscription } from 'rxjs';
import { AlertService } from '../../util/alert/alert.service';
import { AuthenticationService } from "../../util/authentication.service";
import { LoadingService } from "../../util/loading/loading.service";


@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit, OnDestroy {

  recaptchaSiteKey = '6LccP9YaAAAAAKIYXKtJcIkLIRn87KLNa7XtrT7D';
  public showPassword_au: boolean = false
  subscription!: Subscription;
  isSubmitted: boolean = false;
  subjectList: any[];
  selectedSubjectList: any[];
  isLoadingSubjectList: boolean = true;
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
  
  //subject that need to be add should initialized whe use hard coded methods:start
  
  // mathematics: boolean = false;
  // chemistry: boolean = false;
  // physics: boolean = false;
  // accounting: boolean = false;
  
  //subject that need to be add should initialized whe use hard coded methods: end

  @Input() user: any;
  @Output() closeClicked = new EventEmitter();

  constructor(
    private userService: UserService, 
    private alertService: AlertService, 
    private router: Router, 
    private authenticationService: AuthenticationService,
    private loadingService: LoadingService
    
    ) { }

  ngOnInit(){

    //get the subject details using API call
    //put them to a lists and do some processing
    this.subjectList = [];
    this.selectedSubjectList = [];
    this.userService.getSubjectDetails()
    .subscribe(async response => {
      var responseStatus = response.status.code;
      if (responseStatus == '200') {
        if (response.payload.length > 0) {
          this.subjectList = response.payload;
          for (let i=0; i<response.payload.length; i++) {
            var subjectListJson = {
              'subjectId' : response.payload[i]["subjectid"],
              'isSelected' : false
            }
            this.selectedSubjectList.push(subjectListJson)
            this.isLoadingSubjectList = false;
          }
        }
      } else {
        this.alertService.error('Error in Service');
      }
    })


    this.loadingService.hideLoading();
  }



  selectSub(sub: string) {
    console.log("[selectUserRole] : (userRole) " + sub);
    for (var i = 0; i < this.selectedSubjectList.length; i++){
      if (this.selectedSubjectList[i]['subjectId'] === sub) {
        this.selectedSubjectList[i]['isSelected'] = !this.selectedSubjectList[i]['isSelected'];
      }
    }

    //select sub method implementation when using hard code method:start

    // if (sub === "mathematics") {
    //   this.mathematics = !this.mathematics;
    // } else if (sub === "chemistry") {
    //   this.chemistry = !this.chemistry;
    // } else if (sub === "physics") {
    //   this.physics = !this.physics;
    // } else if (sub === "accounting") {
    //   this.accounting = !this.accounting;
    // }

    //select sub method implementation when using hard code method:end

  }
  onSave(addUserForm: NgForm) {
    var subjects: string[] = [];
    //check whether the added subject is clicked and if it is add to the list
    for (var sub in this.selectedSubjectList) {
      if (this.selectedSubjectList[sub]['isSelected']) {
        subjects.push(this.selectedSubjectList[sub]['subjectId'])
      }
    }

    //put the subscribed subject ids to array: start

    // if (this.mathematics) {
    //   subjects.push("1");
    // }
    // if (this.chemistry) {
    //   subjects.push("2");
    // }
    // if (this.physics) {
    //   subjects.push("3");
    // }
    // if (this.accounting) {
    //   subjects.push("4");
    // }

    //put the subscribed subject ids to array: end

    console.log("[userAccountsComponent] :: onSave()::" );
    if (addUserForm.value.password != addUserForm.value.repass) {
      this.loadingService.hideLoading();
      this.alertService.clear();
      this.alertService.error("Passwords do not match!");
      this.gotoTop();
      return;
    }
    
    if (subjects.length == 0) {
      this.loadingService.hideLoading();
      this.alertService.clear();
      this.alertService.warn("Please subscribed to atleast one Subject.");
      this.gotoTop();
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
            this.loadingService.hideLoading();
            this.alertService.clear();
            this.router.navigateByUrl("verify");
          } else {
            this.isSubmitted = false;
            this.loadingService.hideLoading();
            this.alertService.clear();
            this.alertService.error(alert.message);
            this.gotoTop();
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

  gotoTop() {
    window.scroll({ 
      top: 1, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  async resolved(e){
    console.log("resolved()::")
    // console.log(e)
    var secretKey = "6LccP9YaAAAAAK659qiIyBADwc_U1te-spo5EmP5";
    var url = "https://www.google.com/recaptcha/api/siteverify";
    var response = await this.userService.verifyReCaptha(e).toPromise();
    console.log(response);
  }

}
