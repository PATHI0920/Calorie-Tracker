import { Component,OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { MenuService } from './service/menu.service';
import {item} from './model/item';
import {shareReplay,map} from 'rxjs/operators'

interface meal {
  name : string
  limit : number
  consumed : number
  list : item[]
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'CalorieTracker';
  mealItem : Array<any> = []
  menuList$ : Observable<item[]> 
  mealDetails : meal[] = [{name : 'breakfast',limit : 700,consumed : 0,list : []},
  {name : 'lunch',limit : 1000,consumed : 0,list : []},
  {name : 'dinner',limit : 900,consumed : 0,list : []}]
  
  constructor(private _service : MenuService){}

  ngOnInit() {
    this.menuList$ = this._service.getMenuList().pipe(shareReplay(1))
    for (let i = 0;i< this.mealDetails.length;i++){
      this.menuList$.subscribe(e => {
        this.mealDetails[i].list = e
        this.mealDetails[i].list = this.mealDetails[i].list.filter(e => e.cal <= this.mealDetails[i].limit)
      })
    }
  }

  selectedItem( m : number, i : item,itemIndex : number) {
    this.mealDetails[m].consumed = Number(this.mealDetails[m].consumed) + Number(i.cal)
    this.mealDetails[m].list.splice(itemIndex,1)
    let calAllowed = Number(Number(this.mealDetails[m].limit) - Number(this.mealDetails[m].consumed))
    this.mealDetails[m].list = this.mealDetails[m].list.filter(e => Number(e.cal) < Number(calAllowed))
  }
}
 