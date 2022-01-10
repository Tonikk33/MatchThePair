import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {appService} from './app.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'MatchThePair';
  public tableData: any[] = [];
  public file: any;
  public totalDaysData: any[] = [];



  public cols: any[] = [
    {field: 'EmpID', header: 'Employee Number'},
    {field: 'ProjectID', header: 'Project ID'},
    {field: 'DateFrom', header: 'Start Date'},
    {field: 'DateTo', header: 'End Date'}
  ];
  public colsTotal: any = [
    {field: 'startDate', header: 'Start Date worked on project'},
    {field: 'endDate', header: 'Last Date on the project'},
    {field: 'employee1', header: 'Employee ID 1'},
    {field: 'employee2', header: 'Employee ID 2'},
    {field: 'project', header: 'Project ID'},
    {field: 'total', header: 'Total Days'},

    {startDate: '', endDate: '', employee1: '', employee2: '', total: '', project: ''}
  ]

  constructor(private service: appService) {
  }

  changeListener($event: any): void {
    this.readFile($event.target);
  }

  readFile(inputValue: any): void {
    let reader = new FileReader(),
      file: File = inputValue.files[0];
    reader.readAsText(file);
    reader.onload = this.onLoadCallback.bind(this);

  }

  onLoadCallback(event: any) {
    let arr: [] = [];
    let arr1: [] = [];
    this.tableData = Object.values(JSON.parse(event.target["result"]))
    this.tableData.forEach((x) => {
      if (x['DateTo'] === 'NULL') {
        x['DateTo'] = formatDate(new Date, 'yyyy-MM-dd', 'en-US');
      }
      // @ts-ignore
      if (!arr.includes(x['ProjectID'])) {
        // @ts-ignore
        arr.push(x['ProjectID']);
      }
    })

    arr.forEach((x) => {
      let p = this.tableData.filter(el => el['ProjectID'] == x);

      for (let i = 0; i < p.length; i++) {
        for (let k = i + 1; k < p.length; k++) {
          let startDate = '';
          let endDate = '';
          let totalTimeTogether = {startDate: '', endDate: '', employee1: '', employee2: '', total: '', project: ''}
          // @ts-ignore
          if ((new Date(p[k]['DateFrom'])).getTime() > (new Date(p[i]['DateFrom'])).getTime()) {
            startDate = p[k]['DateFrom'];
          } else {
            startDate = p[i]['DateFrom'];
          }
          if ((new Date(p[k]['DateTo'])).getTime() > (new Date(p[i]['DateTo'])).getTime()) {
            endDate = p[k]['DateTo'];
          } else {
            endDate = p[i]['DateTo'];
          }
          const date1 = new Date(startDate);
          const date2 = new Date(endDate);
          let totalDays = Math.floor((Math.abs(+date2-+date1))/(1000*60*60*24));
          totalTimeTogether.startDate = startDate;
            totalTimeTogether.endDate = endDate;
            totalTimeTogether.employee1 = p[i]['EmpID'];
            totalTimeTogether.employee2 = p[k]['EmpID'];
            totalTimeTogether.project = p[i]['ProjectID'];
            totalTimeTogether.total = totalDays.toString() + " Days"
          this.totalDaysData = [...this.totalDaysData, totalTimeTogether]
        }
      }
    })
  }


  ngOnInit(): void {
    this.service.getData().subscribe((data) => {

    });
  }


  ngOnDestroy(): void {
  }


}

