import { Component, HostListener, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LocalStorage } from '../../util/localStorage.service';
import { Constants } from '../../util/Constants';
import { UserDetailsService } from '../../services/user/user-details.service';
import { title } from 'node:process';

@Component({
  selector: 'app-student-root',
  templateUrl: './student-root.component.html',
  styleUrls: ['./student-root.component.scss']
})
export class StudentRootComponent implements OnInit {
  subscribedSubjects = [];
  sidenavLinks = [];
  constructor(
    private router: Router,
    private userService: UserDetailsService,) {
  }
  async ngOnInit() {
    this.resize(window.innerWidth);
    this._opened = !(window.innerWidth < this._autoCollapseWidth)

    let userId = localStorage.getItem(LocalStorage.USER_ID);
    if (userId === "" || userId === null) {
      this.router.navigate(['/login'])
    }

    let userRoll = localStorage.getItem(LocalStorage.ROLES);
    if (!(Constants.USER_ROLE_ASSIGNMENTS_STUDENT.All.includes(userRoll))) {
      this.router.navigate(['/login']);
    }

    // var subscriptionResult = await this.userService.getSubscribedSubjects(userId).toPromise();
    // var subscribedSubjects = JSON.stringify(subscriptionResult.payload);
    this.subscribedSubjects = JSON.parse(localStorage.getItem(LocalStorage.SUBSCRIPTION));
    // console.log(this.subscribedSubjects, "in student root")
    // localStorage.setItem(LocalStorage.SUBSCRIPTION, subscribedSubjects);


    this.sidenavLinks = [
      {
        title: 'All Papers',
        link: '/paper/list',
        content: [
          ... this.subscribedSubjects.map(subject => {
            return {
              title: subject.subjectname,
              link: '/paper/list',
              queryParams: { subject: subject.subjectid }
            }
          }),
          {
            title: 'Physics',
            link: '/paper/list',
            queryParams: { subject: 5 }
          },
          {
            title: 'Chemistry',
            link: '/paper/list',
            queryParams: { subject: 6 }
          }
        ]
        // content: this.subscribedSubjects.map(subject => {
        //   return {
        //     title: subject.subjectname,
        //     link: '/paper/list',
        //     queryParams: { subject: subject.subjectid }
        //   }
        // })
      },
      {
        title: 'Paid Papers',
        link: '/paper/paid'
      },
      {
        title: 'Login',
        link: '/login'
      }
    ]

    console.log(this.sidenavLinks)
  }

  public _opened: boolean = true;
  public _autoCollapseWidth: number = 560;
  public _mode: string = 'over'


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resize(event.target.innerWidth);
  }

  private resize(width) {
    if (width < this._autoCollapseWidth) {
      this._mode = 'slide';
    } else {
      this._mode = 'push';
    }
  }

  public _toggleSidebar() {
    this._opened = !this._opened;
  }

  navigate(subject) {
    console.log("inside navigate()", subject);
    this.router.navigate(['/paper/list'], { queryParams: { subject: subject.subjectid } });
  }
}
