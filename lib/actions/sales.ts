"use server";

import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";

export async function GetSales(
  searchQuery: string,
  page: number,
  items_per_page: number
) {
  try {
    const supabase = createClient();
    const query = supabase
      .from("sales")
      .select(`*, product_id(name, quantity, price)`)
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

export async function CreateSale(formData: FormData) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("sales")
      .insert({
        name: formData.get("name"),
        quantity: formData.get("quantity"),
        product_id: formData.get("product_id"),
      })
      .select();

    if (error) {
      return { error: error.message };
    }
    revalidatePath("/sales");
    revalidatePath("/dashboard/sales");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function GetSaleById(id: string) {
  try {
    const supabase = createClient();
    const { error, data } = await supabase
      .from("sales")
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

export async function UpdateSales(formData: FormData) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("sales")
      .update({
        name: formData.get("name"),
        quantity: formData.get("quantity"),
        product_id: formData.get("product_id"),
      })
      .eq("id", formData.get("id"))
      .select();

    if (error) {
      return { error: error };
    }
    revalidatePath("/sales");
    revalidatePath("/dashboard/sales");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function DeleteSale(id: string) {
  try {
    const supabase = createClient();
    const { error } = await supabase.from("sales").delete().eq("id", id);

    if (error) {
      return { error: error };
    }
    revalidatePath("/sales");
    revalidatePath("/dashboard/sales");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function GetTotalSales() {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.from("sales").select("*");

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
