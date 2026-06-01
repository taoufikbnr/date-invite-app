"use server";

import { supabase } from "@/lib/supabaseClient";


export async function createInvitation(email: string) {

  const { data, error } = await supabase
    .from("invite")
    .insert({
      creator_email: email,
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data.id;
}