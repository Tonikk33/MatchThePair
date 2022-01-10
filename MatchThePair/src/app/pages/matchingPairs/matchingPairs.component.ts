import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatchingPairsService} from './matchingPairs.service';



@Component({
  selector: 'matching-pair',
  templateUrl: 'matchingPairs.component.html'
})
export class MatchingPairsComponent implements OnInit, OnDestroy {

  public tableData = []

  constructor(private service: MatchingPairsService) {
  }


  ngOnInit(): void {
    console.log('get data')
    this.service.getData().subscribe((data) => {
      console.log(data);
    })
  }

  ngOnDestroy(): void {
  }

}
