import { Component, Input, OnInit, HostListener } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { LoadingService } from '../util/loading/loading.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';
declare var $: any;
declare var window: any;
declare var FB: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showLoginModal = false;
  isLoginModalShowed = false;
  isDisplay: boolean = false;
  winnerList: any[];
  firstPlace: string;
  secondPlace: string;
  thirdPlace: string;
  firstCollege: string;
  secondCollege: string;
  thirdCollege: string;
  firstDistrict: string;
  secondDistrict: string;
  thirdDistrict: string;
  subject: string;
  // for winner list
  subjectList: Array<any> = null;
  selectedSubject: number = 0;

  constructor(private navbar: NavbarComponent, private http: HttpClient, private loadingService: LoadingService,) { }

  ngOnInit() {

  //messenger live chat- start
  var chatbox = document.getElementById('fb-customer-chat');
  chatbox.setAttribute("page_id", "109369341428736");
  chatbox.setAttribute("attribution", "biz_inbox");

  window.fbAsyncInit = function() {
    FB.init({
      xfbml            : true,
      version          : 'v11.0'
    });
  };

  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));


  //messeger live chat- end

    this.loadingService.showLoading(true, false, "Loading", null);

    this.winnerList = []
    this.getSubjectDetails()
      .subscribe(async response => {
        if (response.status.code == '200') {
          this.subjectList = response.payload;
          console.log(response.payload);
          console.log(this.subjectList[0])
        }
      });

    this.loadWinnerList(this.subjectList[0].subjectid);

    this.loadingService.hideLoading();
  }

  show() {
    this.isDisplay = !this.isDisplay;
  }

  changeDirection() {
    var element = document.getElementById("page");
    element.classList.toggle("no-filter");
    this.isDisplay = !this.isDisplay;
  }


  getResult(subject: string) {
    const body = {
      paperId: subject
    }
    return this.http.post<any>(
      environment.SERVER_URL + "/v1/response/result/getTopResult",
      body
    )
  }

  getSubjectDetails() {
    return this.http.get<any>(
      environment.SERVER_URL + "/v1/subject/getSubjectDetails",
    )
  }
  //modal testing
  @HostListener('window:scroll', ['$event'])

  onWindowScroll(e) {

    var hT = document.getElementById('contactUs').offsetTop;
    var wH = document.body.clientHeight;
    var wS = window.scrollY;
    if (wS + wH > hT && this.isLoginModalShowed == false) {
      console.log("INNNNNN")
      $('#loginModalHomePage').modal('show')
      this.isLoginModalShowed = true;
    }
    // if (this.showLoginModal) {
    //   $('#exampleModalLong').modal('show')
    //   this.log
    // }
  }

  changeSubject(direction) {
    this.selectedSubject = (this.selectedSubject + this.subjectList.length + direction) % this.subjectList.length;
    this.loadWinnerList(this.subjectList[this.selectedSubject].subjectid);
  }

  loadWinnerList(subjectId) {
    this.getResult(subjectId)
      .subscribe(async response => {
        const returnedStatus = response.status;
        if (returnedStatus.code == '200') {
          this.winnerList = []
          console.log("Result", response.payload);
          const leaderBoard = response.payload
          this.firstPlace = leaderBoard[0]["firstname"] + " " + leaderBoard[0]["lastname"]
          this.firstCollege = leaderBoard[0]["college"]
          this.firstDistrict = leaderBoard[0]["district"]
          this.secondPlace = leaderBoard[1]["firstname"] + " " + leaderBoard[1]["lastname"]
          this.secondCollege = leaderBoard[1]["college"]
          this.secondDistrict = leaderBoard[1]["district"]
          this.thirdPlace = leaderBoard[2]["firstname"] + " " + leaderBoard[2]["lastname"]
          this.thirdCollege = leaderBoard[2]["college"]
          this.thirdDistrict = leaderBoard[2]["district"]
          for (let i = 3; i < 10 && i < leaderBoard.length; i++) {
            var winner = {
              "id": i,
              "name": leaderBoard[i]['firstname'] + " " + leaderBoard[i]['lastname'],
              "college": leaderBoard[i]['college'],
              "district": leaderBoard[i]['district']
            }
            console.log(winner);
            this.winnerList.push(winner)
          }
          console.log(this.winnerList);

        }
      });
  }


}
