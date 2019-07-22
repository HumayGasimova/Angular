import { Observable } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { GithubFollowersService } from './../services/github-followers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-github-followers',
  templateUrl: './github-followers.component.html',
  styleUrls: ['./github-followers.component.scss']
})
export class GithubFollowersComponent implements OnInit {
  followers: any[];

  constructor(
    private route: ActivatedRoute,
    private service: GithubFollowersService
  ) { }

  ngOnInit() {

    Observable.combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ]).switchMap(combined => {
        let id = combined[0].get('id');
        let page = combined[1].get('page');
        console.log( page)
         // this.service.getAll({id: id, page: page})
       return  this.service.getAll()
        // .subscribe(followers => this.followers = followers)
    })
    .subscribe(followers => this.followers = followers)
  




    // this.route.paramMap.subscribe();
    // let id = this.route.snapshot.paramMap.get('id');

    // this.route.queryParamMap.subscribe(); // will use observables, will not destroy component, change the number of page
    // let page = this.route.snapshot.queryParamMap.get('page');

    // this.service.getAll()
    // .subscribe(followers => this.followers = followers)
  }

}
