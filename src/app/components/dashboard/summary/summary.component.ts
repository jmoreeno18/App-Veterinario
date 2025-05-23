import { Component } from '@angular/core';

@Component({
  selector: 'app-summary',
  imports: [],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent {
    appointmentsToday = 12;
  completedAppointments = 5;
  pendingAppointments = 7;

}
