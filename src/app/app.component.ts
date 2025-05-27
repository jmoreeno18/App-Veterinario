import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SupabaseService } from './supabase/supabase.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
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
