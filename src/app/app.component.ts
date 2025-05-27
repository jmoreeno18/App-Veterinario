import { Component, OnInit } from '@angular/core';
import { SupabaseService } from './supabase/supabase.service';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, RouterModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'mockvet';

  constructor(public supabaseService: SupabaseService) {}

  async ngOnInit() {
    await this.supabaseService.restoreSession();
  }
}
