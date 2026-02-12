import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class GuestbookService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    const url = this.configService.get<string>('SUPABASE_URL');
    const key = this.configService.get<string>('SUPABASE_KEY');

    if (!url || !key) {
      throw new Error('Missing SUPABASE_URL or SUPABASE_KEY environment variables');
    }

    this.supabase = createClient(url, key);
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