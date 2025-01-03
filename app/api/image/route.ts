import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('shots')
    .select('image_url')
    .eq('id', id)
    .single();

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 });
  }

  const response = await fetch(data.image_url);
  const imageBuffer = await response.arrayBuffer();

  const contentType = response.headers.get('Content-Type') || 'image/jpeg';
  return new Response(Buffer.from(imageBuffer), {
    headers: { 'Content-Type': contentType },
  });
}