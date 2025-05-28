import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../../supabase/supabase.service';
import { get } from 'http';

@Component({
  selector: 'app-summary',
  imports: [],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})

export class SummaryComponent implements OnInit{
  error: string | undefined;
  citas : any = "";

  appointmentsToday = 0;
  completedAppointments = 0;
  pendingAppointments = 0;
  ngOnInit(): void {
    this.getAppointment();
  }

  constructor(private supabase : SupabaseService){}

  getAppointment(){
    return this.supabase.getSummaryAppointments().subscribe({
      next: (data) =>{
        this.citas = data.data ?? [];
        this.appointmentsToday = this.citas.length;
      },
      error:(err) => {
        this.error = "error al cargar citas"
      }
    })
  }


}
