import { Injectable } from '@angular/core';
import {
  AuthSession,
  createClient,
  SupabaseClient,
} from '@supabase/supabase-js'
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class SupabaseService {
  private supabase: SupabaseClient;
  _session: AuthSession | null = null;
  constructor() {
    this.supabase =  createClient(environment.SUPABASE_URL, environment.SUPABASE_KEY)
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session
    })
    return this._session
  }

  signIn(email: string) {
    return this.supabase.auth.signInWithOtp({ email })
  }
  signOut() {
    return this.supabase.auth.signOut()
  }

}
