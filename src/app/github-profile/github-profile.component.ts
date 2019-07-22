import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-github-profile',
  templateUrl: './github-profile.component.html',
  styleUrls: ['./github-profile.component.scss']
})
export class GithubProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap
    .subscribe(params => {
      console.log(params)
      let id = +params.get('id');
      console.log(id);
    })
  }

  submit() {
    this.router.navigate(['followers'], {
      queryParams: { page: 1, order: 'newest'}
    })
  }
}
