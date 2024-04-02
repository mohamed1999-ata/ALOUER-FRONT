import {Component,OnInit,ChangeDetectionStrategy,ViewEncapsulation,ViewChild,TemplateRef} from '@angular/core';
import { CalendarEvent, CalendarEventAction,CalendarView,CalendarMonthViewDay} from 'angular-calendar';
import {subMonths,addMonths,addDays,addWeeks,subDays,subWeeks,startOfMonth,endOfMonth,startOfWeek,endOfWeek,startOfDay,endOfDay,isSameDay,isSameMonth} from 'date-fns';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormGroup,FormBuilder} from '@angular/forms';
import { AnnonceService } from 'src/app/services/annonce/annonce.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';



type CalendarPeriod = 'day' | 'week' | 'month';

function addPeriod(period: CalendarPeriod, date: Date, amount: number): Date {
  return {
    day: addDays,
    week: addWeeks,
    month: addMonths,
  }[period](date, amount);
}

function subPeriod(period: CalendarPeriod, date: Date, amount: number): Date {
  return {
    day: subDays,
    week: subWeeks,
    month: subMonths,
  }[period](date, amount);
}

function startOfPeriod(period: CalendarPeriod, date: Date): Date {
  return {
    day: startOfDay,
    week: startOfWeek,
    month: startOfMonth,
  }[period](date);
}

function endOfPeriod(period: CalendarPeriod, date: Date): Date {
  return {
    day: endOfDay,
    week: endOfWeek,
    month: endOfMonth,
  }[period](date);
}

@Component({
  selector: 'app-calendrier',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendrier.component.html',
  styles: [
    `
      .cal-disabled {
        background-color: #eee;
        pointer-events: none;
        cursor: not-allowed;
      }

      .cal-disabled .cal-day-number {
        opacity: 0.1;
      }

      .modal-body label{
        margin-bottom: 10px ;
        margin-rigth : 10px;
        font-size : 15px;
      }

      form .date-dispo{
         dispaly : flex ;
         justify-content: space-around;

      }
     
    `,
  ],
  encapsulation: ViewEncapsulation.None,

})

export class CalendrierComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView | CalendarPeriod = CalendarView.Month;

  colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3',
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF',
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA',
    },
  };


  viewDate: Date = new Date();
  locale: string = 'fr-TN';
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  events: CalendarEvent[] = [];

  minDate: Date = subMonths(new Date(), 1);

  maxDate: Date = addMonths(new Date(), 1);

  dateMin : any ;

  prevBtnDisabled: boolean = false;

  nextBtnDisabled: boolean = false;
  
  activeDayIsOpen: boolean = true;

  agendaForm :FormGroup;

  constructor(
    private modal: NgbModal,
    private fb : FormBuilder,
    private annonceService : AnnonceService,
    private router : Router
    ) {
    // this.dateOrViewChanged();
    this.getDate()

    this.agendaForm = this.fb.group({
      start : [ ],
      end  : [ ],
    })

    this.agendaForm?.get('start')?.valueChanges.subscribe((selectedValue) => {
  
      this.agendaForm?.get('end')?.setValue(selectedValue, {
        onlySelf: true,
      });
    });
  }


  getDate(){
    var date = new Date()
    var toDate:any = date.getDate()
    if(toDate <10){
      toDate = '0' + toDate
    }
    var month:any = date.getMonth()+1
    if(month<10){
      month = '0' + month
    }
    var year : any = date.getFullYear()
    this.dateMin = year + '-' + month +'-' +toDate
   }
  

  increment(): void {
    this.changeDate(addPeriod(this.view, this.viewDate, 1));
  }

  decrement(): void {
    this.changeDate(subPeriod(this.view, this.viewDate, 1));
  }

  today(): void {
    this.changeDate(new Date());
  }

  dateIsValid(date: Date): boolean {
    return  date.getTime() >new Date().getTime();
    
  }

  changeDate(date: Date): void {
    this.viewDate = date;
  }

  changeView(view: CalendarPeriod): void {
    this.view = view;
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: this.colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }
  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
    this.modal.open(this.modalContent, { size: 'md', centered: true });
    console.log('date' + date);
  }

  dateOrViewChanged(): void {
    this.prevBtnDisabled = !this.dateIsValid(
      endOfPeriod(this.view, subPeriod(this.view, this.viewDate, 1))
    );
    this.nextBtnDisabled = !this.dateIsValid(
      startOfPeriod(this.view, addPeriod(this.view, this.viewDate, 1))
    );
    if (this.viewDate < this.minDate) {
      this.changeDate(this.minDate);
    } else if (this.viewDate > this.maxDate) {
      this.changeDate(this.maxDate);
    }
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach((day) => {
      if (!this.dateIsValid(day.date)) {
        day.cssClass = 'cal-disabled';
      }
    });
  }
  ngOnInit(): void {}

  onSubmit(){
     const id:any = localStorage.getItem('annonce_id') 
         this.annonceService.addDisponibilte(this.agendaForm.value ,id).subscribe(res=>{
          Swal.fire( `votre annonce est publiée avec succès 
                      vous attendez l'acceptation par l'administration
                       pour publier votre annonce. `, '','success');
         })
          localStorage.removeItem('annonce_id')

  }




}
