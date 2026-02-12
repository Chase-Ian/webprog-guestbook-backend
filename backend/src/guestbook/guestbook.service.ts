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
    const { data, error } = await this.supabase.from('guestbook').select('*').order('created_at', { ascending: false });
    if (error) throw new Error(`Failed to fetch guestbook: ${error.message}`);
    return data;
  }

  async create(payload: { name: string; message: string }) {
    const { data, error } = await this.supabase.from('guestbook').insert([payload]).select();
    if (error) throw new Error(`Failed to create entry: ${error.message}`);
    return data;
  }

  async update(id: string, message: string) {
    const { data, error } = await this.supabase.from('guestbook').update({ message }).eq('id', id).select();
    if (error) throw new Error(`Failed to update entry: ${error.message}`);
    return data;
  }

  async delete(id: string) {
    const { error } = await this.supabase.from('guestbook').delete().eq('id', id);
    if (error) throw new Error(`Failed to delete entry: ${error.message}`);
    return { deleted: true };
  }
}