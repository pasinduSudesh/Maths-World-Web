import { Component, OnInit } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AlertService } from '../../util/alert/alert.service';
import { LoadingService } from "../../util/loading/loading.service";
import { LocalStorage } from '../../util/localStorage.service';
import { UserDetailsService } from '../../services/user/user-details.service';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss']
})
export class AddSubjectComponent implements OnInit {
  isConfirmed: boolean = false;
  notSelectedSubjectList: any[];
  selectedSubjectList: any[];
  subscribedSubjectList: any[];
  userId: string;
  server_url = environment.SERVER_URL;
  constructor(
    private http: HttpClient, 
    private alertService: AlertService, 
    private loadingService: LoadingService,
    private userService: UserDetailsService
    ) { }

  ngOnInit(): void {
    this.syncSubjectList();
  }

  syncSubjectList() {
    this.notSelectedSubjectList = [];
    this.selectedSubjectList = [];
    this.subscribedSubjectList = JSON.parse(localStorage.getItem(LocalStorage.SUBSCRIPTION));
    //console.log("subs subject" + this.subscribedSubjectList);
    this.getSubjectDetails()
      .subscribe(async response => {
        var responseStatus = response.status.code;
        if (responseStatus == '200') {
          if (response.payload.length > 0) {
            for (let i = 0; i < response.payload.length; i++) {
              var isSelected = false;
              for (let j = 0; j < this.subscribedSubjectList.length; j++) {
                //console.log("1:: "+this.subscribedSubjectList[j]['subjectid']+" "+response.payload[i]["subjectid"])
                if (this.subscribedSubjectList[j]['subjectid'] == response.payload[i]["subjectid"]) {
                  var subjectListJson = {
                    'subjectId': response.payload[i]["subjectid"],
                    'imgurl': response.payload[i]["imgurl"],
                    'name' : response.payload[i]["firstname"]+" "+response.payload[i]["lastname"],
                    'subjectName' : response.payload[i]["subjectname"],
                    'isSelected' : true
                    
                  }
                  isSelected = true;
                  this.selectedSubjectList.push(subjectListJson)  
                }
              }
              if (!isSelected) {
                var subjectListJson = {
                  'subjectId': response.payload[i]["subjectid"],
                  'imgurl': response.payload[i]["imgurl"],
                  'name' : response.payload[i]["firstname"]+" "+response.payload[i]["lastname"],
                  'subjectName' : response.payload[i]["subjectname"],
                  'isSelected' : false
                }
                this.notSelectedSubjectList.push(subjectListJson)
              }

              // console.log("selected subjectlist :: "+this.selectedSubjectList[i]['subjectId']+" "+this.selectedSubjectList[i]['isSelected'])

            }
          }
        } else {
          this.alertService.error('Error in Service');
        }
        this.loadingService.hideLoading();
      })
  }

  getSubjectDetails() {
    return this.http.get<any>(this.server_url + "/v1/subject/getSubjectDetails")
  }
  selectSub(sub: string) {
    //console.log("[selectUserRole] : (userRole) " + sub);
    for (var i = 0; i < this.notSelectedSubjectList.length; i++){
      if (this.notSelectedSubjectList[i]['subjectId'] === sub) {
        this.notSelectedSubjectList[i]['isSelected'] = !this.notSelectedSubjectList[i]['isSelected'];
      }
    }
  }

  onSave() {
    var subjects: string[] = [];
    var newSubjects: string[] = [];
    //check whether the added subject is clicked and if it is add to the list
    for (var sub in this.selectedSubjectList) {
      if (this.selectedSubjectList[sub]['isSelected']) {
        subjects.push(this.selectedSubjectList[sub]['subjectId'])
      }
    }
    for (var sub in this.notSelectedSubjectList) {
      if (this.notSelectedSubjectList[sub]['isSelected']) {
        subjects.push(this.notSelectedSubjectList[sub]['subjectId'])
        newSubjects.push(this.notSelectedSubjectList[sub]['subjectId'])
      }
    }


    if (newSubjects.length == 0) {
      this.loadingService.hideLoading();
      this.alertService.clear();
      this.alertService.warn("Select a subject to subscribe by clicking on the subject card!");
      this.gotoTop();
      return;
    } else {
      this.isConfirmed = true;
      //console.log('subjects ::'+subjects)
      this.addNewSubject(subjects, newSubjects)
        .subscribe(async response => {
           var responseStatus = response.status.code;
           if (responseStatus == '200') {
            var subscriptionResult = await this.userService.getSubscribedSubjects(this.userId).toPromise();
            var subscribedSubjects = JSON.stringify(subscriptionResult.payload);
            //console.log("[addSubjectComponenet] :: onSave():: subject::");
            localStorage.setItem(LocalStorage.SUBSCRIPTION, subscribedSubjects);
            this.syncSubjectList();
            this.loadingService.hideLoading();
            this.isConfirmed = false;
            this.alertService.success("Successfully subscribed the subject/s");
            this.gotoTop();
           }
        },
        err => {
          this.syncSubjectList();
          this.isConfirmed = false;
          this.loadingService.hideLoading();
          var returnedStatus = err.error.status.code;
          if (returnedStatus == '204') {
            this.alertService.error('User does not exists');
            this.gotoTop();
          } else {
            this.alertService.error('Database Error');
            this.gotoTop();
          }
        }
        );
    }
  }
  gotoTop() {

    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  addNewSubject(subjectList : string[], newSubjectList: string[]) {
    this.loadingService.showLoading(true, null, "Loading", null);
    this.userId = localStorage.getItem(LocalStorage.USER_ID);
    let headers: HttpHeaders = new HttpHeaders()
    headers = headers.append("user-id", btoa(this.userId))
    const body = {
      subjectList : subjectList,
      newSubjectList: newSubjectList
    }
    return this.http.put<any>(this.server_url + "/v1/users/updateSubjectList",
      body,
      {
        headers : headers
      }
    )
  }

}
