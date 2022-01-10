import {RouterModule, Routes} from '@angular/router';
import {MatchingPairsComponent} from './matchingPairs.component';
import {NgModule} from '@angular/core';


const routes: Routes = [
  {
    path: '',
    component: MatchingPairsComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchingPairsRoutingModule {}
