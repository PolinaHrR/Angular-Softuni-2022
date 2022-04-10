import { Component, OnInit } from '@angular/core';
import { HomepageGQL, HomepageQuery } from "../../generated/graphql";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  items: Observable<HomepageQuery['items']>;

  constructor(
    homepageGQL: HomepageGQL
  ) {
    this.items = homepageGQL.watch().valueChanges.pipe(map(result => result.data.items));
  }

  ngOnInit(): void {
  }
}
