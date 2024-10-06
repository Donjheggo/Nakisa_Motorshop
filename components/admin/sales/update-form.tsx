"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UpdateProduct } from "@/lib/actions/products";
import { toast } from "react-toastify";
import { Button } from "../../ui/button";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Tables } from "@/database.types";
import { GetAllProducts } from "@/lib/actions/products";
import type { ProductsT } from "../products/update-form";

export default function UpdateSaleForm({ item }: { item: SalesT }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductsT[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await GetAllProducts();
      if (data) setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (
      !formData.get("name") ||
      !formData.get("product_id") ||
      !formData.get("quantity")
    ) {
      toast.error("Please fill in all the required fields correctly.");
      return;
    }
    setLoading(true);
    try {
      const { error } = await UpdateProduct(formData);
      if (error) {
        toast.error(error.toString());
      }
      router.push("/dashboard/products");
    } catch (error) {
      toast.error("There was an unexpected error updating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 mt-5 container max-w-screen-sm mx-auto">
        <div className="grid gap-2">
          <input
            name="id"
            id="id"
            type="text"
            placeholder=""
            required
            defaultValue={item.id}
            hidden
          />
        </div>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Customer name
            </Label>
            <Input
              name="name"
              id="name"
              type="text"
              placeholder="Engine Oil"
              className="col-span-3"
              defaultValue={item.name}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="product_id" className="text-right">
              Product
            </Label>
            <div className="col-span-3">
              <Select name="product_id" defaultValue={item.product_id}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {products.map((item, index) => (
                      <SelectItem key={index} value={item.id}>
                        {item.name} - ₱{item.price}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <Input
              name="quantity"
              id="quantity"
              type="number"
              placeholder=""
              className="col-span-3"
              defaultValue={item.quantity}
              required
            />
          </div>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? <Loader className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </form>
  );
}

export type SalesT = Tables<"sales">;
