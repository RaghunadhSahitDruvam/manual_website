"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader, SearchIcon } from "lucide-react";
import { resolve } from "path";
import { useState } from "react";

type orderDetails = {
  orderId: string;
  status: string;
  estimatedDelivery: string;
};

const lookupOrder = (orderId: string): Promise<orderDetails | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (orderId === "12345") {
        resolve({
          orderId: "12345",
          status: "In Transit",
          estimatedDelivery: "2023-06-15",
        });
      } else {
        resolve(null);
      }
    }, 1000);
  });
};
const TrackOrderPage = () => {
  const [orderId, setOrderId] = useState<string>("");
  const [orderDetails, setOrderDetails] = useState<orderDetails | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOrderDetails(null);

    if (!orderId.trim()) {
      setError("Please enter an order number");
      setLoading(false);
      return;
    }

    try {
      const result = await lookupOrder(orderId);
      if (result) {
        setOrderDetails(result);
      } else {
        setError(
          "Order not found. Please check your order number and try again."
        );
      }
    } catch (err) {
      setError(
        "An error occurred while looking up your order. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-4 sm:p-6 ms:p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-xl sm:text-2xl mb-4 sm:mb-6 text-center tracking-[0.6px]">
          Track Your Order
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="">
            <label
              htmlFor="orderId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Order Number
            </label>
            <div className="relative">
              <Input
                type="text"
                id="orderId"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter your order number"
                className="pl-10 w-full"
                aria-describedby="orderIdHelp"
              />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            <p
              id="orderIdHelp"
              className="mt-1 text-xs sm:text-sm text-gray-500"
            >
              Enter the order number from your confirmation email
            </p>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}{" "}
            {loading ? "Searching..." : "Track Order"}
          </Button>
        </form>
        {error && (
          <div
            role="alert"
            className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm"
          >
            {error}
          </div>
        )}
        {orderDetails && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded ">
            <h2 className="text-lg font-semibold mb-2">Order Found</h2>
            <div className="space-y-2 text-sm sm:text-base">
              <p>
                <span className="font-medium">Order ID:</span>{" "}
                {orderDetails.orderId}
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                {orderDetails.status}
              </p>
              <p>
                <span className="font-medium">Estimated Delivery:</span>{" "}
                {orderDetails.estimatedDelivery}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrderPage;
