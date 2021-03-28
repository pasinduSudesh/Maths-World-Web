import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import {ShowPaperService} from '../../services/paper/show-paper.service';
import { LoadingComponent } from '../../common/loading/loading.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-list-papers',
  templateUrl: './list-papers.component.html',
  styleUrls: ['./list-papers.component.css']
})
export class ListPapersComponent implements OnInit {

  papers: any;
  loading = "";
  showingPapers = [];

  constructor(
    private navbar: NavbarComponent,
    private showPaperService: ShowPaperService,
    private loadingComponent: LoadingComponent,
    private router: Router
  ) { }

  async ngOnInit() {
    this.loading = "Getting Paper Details";
    var result = await this.showPaperService.getPapers().toPromise();
    this.papers = result.payload;
    this.loading = "";
    // console.log(this.papers);
    var data = {
      month: this.papers[0].month,
      year: this.papers[0].year,
      categoryprize: this.papers[0].categoryprize,
      isCategory: true      
    }
    this.showingPapers.push(data);
    for(let i=0; i<this.papers.length; i++){
      let categoryId = this.papers[i].categoryid;
      if(i>0 && categoryId !== this.papers[i-1].categoryid){
        this.showingPapers.push( {
          month: this.papers[i].month,
          year: this.papers[i].year,
          categoryprize: this.papers[i].categoryprize,
          isCategory: true      
        })
      }
      this.papers[i].isCategory = false;

      this.showingPapers.push(this.papers[i]);


    }
    console.log(this.showingPapers);
  }

  addpaper(){
    this.router.navigate(['/add-papers',{data:"hello"}]);
  }

}
