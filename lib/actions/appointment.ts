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
      .select(`*`)
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
        name: formData.get("name"),
        contact_number: formData.get("contact_number"),
        service_id: formData.get("service_id"),
        schedule: formData.get("schedule"),
        prodblem: formData.get("prodblem"),
      })
      .select();

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
        name: formData.get("name"),
        contact_number: formData.get("contact_number"),
        service_id: formData.get("service_id"),
        schedule: formData.get("schedule"),
        prodblem: formData.get("prodblem"),
      })
      .eq("id", formData.get("id"))
      .select();

    if (error) {
      return { error: error };
    }
    revalidatePath("/appointments");
    revalidatePath("/dashboard/appointments");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function DeleteAppointment(id: string) {
  try {
    const supabase = createClient();
    const { error } = await supabase.from("appointment").delete().eq("id", id);

    if (error) {
      return { error: error };
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
