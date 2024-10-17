"use server";

import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";

export async function GetSchedules(
  searchQuery: string,
  page: number,
  items_per_page: number
) {
  try {
    const supabase = createClient();
    const query = supabase
      .from("schedules")
      .select(`*, service_id(*)`)
      .order("created_at", { ascending: true })
      .range((page - 1) * items_per_page, page * items_per_page - 1);

    const { data, error } = searchQuery
      ? await query.ilike("service_id.name", `%${searchQuery}%`)
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

export async function CreateSchedule(formData: FormData) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("schedules")
      .insert({
        service_id: formData.get("service_id"),
        start_time: formData.get("start_time"),
        end_time: formData.get("end_time"),
        available: true,
      })
      .select();

    if (error) {
      return { error: error.message };
    }

    revalidatePath("/dashboard/schedules");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function GetSchedulesById(id: string) {
  try {
    const supabase = createClient();
    const { error, data } = await supabase
      .from("schedules")
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

export async function UpdateSchedules(formData: FormData) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("schedules")
      .update({
        service_id: formData.get("service_id"),
        start_time: formData.get("start_time"),
        end_time: formData.get("end_time"),
        available: formData.get("available"),
      })
      .eq("id", formData.get("id"))
      .select();

    if (error) {
      return { error: error.message };
    }

    revalidatePath("/dashboard/schedules");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function DeleteSchedules(id: string) {
  try {
    const supabase = createClient();
    const { error } = await supabase.from("schedules").delete().eq("id", id);

    if (error) {
      return { error: error };
    }

    revalidatePath("/dashboard/schedules");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function GetTotalSchedules() {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.from("schedules").select("*");

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

export async function GetAllProducts() {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.from("schedules").select("*");

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

export async function GetScheduleByServiceId(service_id: string) {
  try {
    const supabase = createClient();
    const { error, data } = await supabase
      .from("schedules")
      .select("*")
      .eq("service_id", service_id);

    if (error) {
      return [];
    }
    return data || [];
  } catch (error) {
    return [];
  }
}
