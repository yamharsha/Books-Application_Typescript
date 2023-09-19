import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css'],
})
export class DatepickerComponent {
  @Input() defaultDate!: string | undefined;

  @Output() convertDate: EventEmitter<any> = new EventEmitter<string>();

  selectedDate!: NgbDateStruct;

  ngOnInit(): void {
    if (this.defaultDate) {
      const defaultSplit = this.defaultDate.split('-');
      this.selectedDate = {
        year: parseInt(defaultSplit[0]),
        month: parseInt(defaultSplit[1]),
        day: parseInt(defaultSplit[2]),
      };
    }
  }

  onDateChange() {
    this.convertDate.emit(this.selectedDate);
  }
}
