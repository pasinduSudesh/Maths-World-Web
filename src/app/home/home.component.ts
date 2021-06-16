import { Component, Input, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { LoadingService } from '../util/loading/loading.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
  constructor( private navbar: NavbarComponent, private http: HttpClient, private loadingService: LoadingService,) { }

  ngOnInit() {
    this.loadingService.showLoading(true, false, "Loading", null);
    this.winnerList = []
    this.getResult("1")
    .subscribe (async response => {
      const returnedStatus = response.status;
      if (returnedStatus.code == '200') {
        console.log("Result", response.payload);
        const leaderBoard = response.payload
        this.firstPlace = leaderBoard[0]["firstname"]+" "+ leaderBoard[0]["lastname"] 
        this.firstCollege = leaderBoard[0]["college"]
        this.firstDistrict = leaderBoard[0]["district"]
        this.secondPlace = leaderBoard[1]["firstname"]+" "+ leaderBoard[1]["lastname"]
        this.secondCollege = leaderBoard[1]["college"]
        this.secondDistrict = leaderBoard[1]["district"]
        this.thirdPlace = leaderBoard[2]["firstname"]+" "+ leaderBoard[2]["lastname"]
        this.thirdCollege = leaderBoard[2]["college"]
        this.thirdDistrict = leaderBoard[2]["district"]
        for (let i = 3; i<10 && i < leaderBoard.length; i++) {
          var winner = {
            "id": i,
            "name": leaderBoard[i]['firstname']+" "+leaderBoard[i]['lastname'],
            "college": leaderBoard[i]['college'],
            "district": leaderBoard[i]['district']
          }
          console.log(winner);
          this.winnerList.push(winner)
        }
        console.log(this.winnerList);

      }
    }
    );

    this.loadingService.hideLoading();
  }

  show() {
    this.isDisplay = ! this.isDisplay;
  }

  changeDirection() {
    var element = document.getElementById("page");
  element.classList.toggle("no-filter");
  this.isDisplay = ! this.isDisplay;
  }


  getResult(subject: string   ) {
    const body = {
      paperId: subject
    }
    return this.http.post<any>(
      environment.SERVER_URL + "/v1/response/result/getTopResult",
      body
    )
  }
}
