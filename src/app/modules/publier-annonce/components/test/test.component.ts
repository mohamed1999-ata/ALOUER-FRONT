import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateFilterFn } from '@angular/material/datepicker';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})


export class TestComponent implements OnInit {


  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  myHolidayDates = [
    new Date("05/27/2022"),
    new Date("05/28/2022"),
    new Date("05/29/2022"),

];

myHolidayFilter  = (d: Date | null): boolean => {
  const time=d?.getTime();
  return !this.myHolidayDates.find(x=>x.getTime()==time);
};
  constructor() { }

  ngOnInit(): void {
  
  }

}
