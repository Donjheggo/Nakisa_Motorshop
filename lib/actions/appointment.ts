"use server";

import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";

export async function GetAppointments(
  searchQuery: string,
  page: number,
  items_per_page: number
) {
  try {
    const supabase = createClient();
    const query = supabase
      .from("appointments")
      .select(`*, service_id(name), schedule_id(*)`)
      .order("name", { ascending: true })
      .range((page - 1) * items_per_page, page * items_per_page - 1);

    const { data, error } = searchQuery
      ? await query.ilike("name", `%${searchQuery}%`)
      : await query;

    if (error) {
      console.error(error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function CreateAppointment(formData: FormData) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("appointments")
      .insert({
        user_id: formData.get("user_id"),
        name: formData.get("name"),
        contact_number: formData.get("contact_number"),
        service_id: formData.get("service_id"),
        schedule_id: formData.get("schedule_id"),
        problem: formData.get("problem"),
      })
      .select();

    if (error) {
      return { error: error.message };
    }
    revalidatePath("/");
    revalidatePath("/dashboard/appointments");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function GetAppointmentById(id: string) {
  try {
    const supabase = createClient();
    const { error, data } = await supabase
      .from("appointments")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return false;
    }
    return data;
  } catch (error) {
    return false;
  }
}

export async function UpdateAppointment(formData: FormData) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("appointments")
      .update({
        completed: formData.get("completed"),
      })
      .eq("id", formData.get("id"))
      .select();

    if (error) {
      return { error: error.message };
    }
    revalidatePath("/dashboard/appointments");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function DeleteAppointment(id: string) {
  try {
    const supabase = createClient();
    const { error } = await supabase.from("appointments").delete().eq("id", id);

    if (error) {
      return { error: error.message };
    }
    revalidatePath("/appointments");
    revalidatePath("/dashboard/appointments");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function GetTotalAppointments() {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.from("appointments").select("*");

    if (error) {
      console.error(error);
      return 0;
    }

    return data.length || 0;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

export async function GetMyAppointments() {
  try {
    const supabase = createClient();
    const { data: userData } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("appointments")
      .select(`*, service_id(*), schedule_id(*)`)
      .eq("user_id", userData?.user?.id || "")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}
