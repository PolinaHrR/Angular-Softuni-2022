import { Component, OnInit } from '@angular/core';
import {HomepageQuery, ItemDetailPageGQL, ItemDetailPageQuery} from "../../generated/graphql";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {

  item: Observable<ItemDetailPageQuery['item']>|null=null;

  constructor(
    private route: ActivatedRoute,
    private itemDetailPageGQL: ItemDetailPageGQL
  ) {

  }

  ngOnInit(): void {
    const itemId = this.route.snapshot.paramMap.get('id');
    if (itemId != null) {
      this.item = this.itemDetailPageGQL.watch( { id : itemId } ).valueChanges.pipe(map(result => result.data.item));
    }
  }

}
