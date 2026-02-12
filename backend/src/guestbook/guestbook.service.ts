import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class GuestbookService {
  private supabase: SupabaseClient;

  constructor() {
  this.supabase = createClient(
    process.env.SUPABASE_URL!, // The ! tells TS this won't be undefined
    process.env.SUPABASE_KEY!
  );
}

  async findAll() {
    const { data } = await this.supabase.from('guestbook').select('*').order('created_at', { ascending: false });
    return data;
  }

  async create(payload: { name: string; message: string }) {
    const { data } = await this.supabase.from('guestbook').insert([payload]).select();
    return data;
  }

  async update(id: string, message: string) {
    const { data } = await this.supabase.from('guestbook').update({ message }).eq('id', id).select();
    return data;
  }

  async delete(id: string) {
    await this.supabase.from('guestbook').delete().eq('id', id);
    return { deleted: true };
  }
}