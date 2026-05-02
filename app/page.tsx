"use client";

import { useEffect, useState } from "react";
import supabase from "../lib/supabaseClient";

export default function Home() {
  const [orders, setOrders] = useState<any[]>([null]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      const { data, error } = await supabase.from("orders").select("*");

      if (error) {
        console.error(error);
      } else {
        setOrders(data || []);
      }

      setLoading(false);
    }

    fetchOrders();
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col w-full max-w-3xl py-10 px-6 bg-white dark:bg-black">
        <h1 className="text-xl font-bold mb-4">Orders</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="space-y-2">
            {orders.map((order) => (
              <li key={order.id} className="p-3 border rounded">
                <p>
                  <b>Customer:</b> {order.customer_name}
                </p>
                <p>
                  <b>Product:</b> {order.product_name}
                </p>
                <p>
                  <b>Qty:</b> {order.quantity}
                </p>
                <p>
                  <b>Status:</b> {order.status}
                </p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
