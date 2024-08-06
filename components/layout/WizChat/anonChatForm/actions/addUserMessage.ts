"use server";

import { cookies } from "next/headers";
import supabase from "@/lib/utils/supabase/client";

export async function addUserMessage(content: string) {
  const cookieStore = cookies();
  const user_id = cookieStore.get("user_uuid").value;

  if (!content || !user_id) {
    console.error("Invalid form data or missing user_id");
    return;
  }

  const requestForm = {
    user_id,
    content,
  };

  const { error } = await supabase.from("messages").insert([requestForm]);

  if (error) {
    console.error("Error inserting message:", error);
    return null;
  }
}
