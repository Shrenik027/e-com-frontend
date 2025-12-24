"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getOrderById } from "@/services/order";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Home,
  Package,
  MapPin,
  ShoppingBag,
  ArrowRight,
  Loader2,
  Sparkles,
  Trophy,
  Gift,
  Shield,
  Clock,
  Download,
  Star,
  Zap,
  Printer,
  FileText,
  Truck,
  CreditCard,
  Calendar,
  User,
} from "lucide-react";

// Industry Standard Receipt Component - Only shows backend data
const OrderReceipt = ({ order }: { order: any }) => {
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Order Receipt - ${order._id}</title>
            <style>
              @media print {
                @page { size: auto; margin: 0; }
                body { margin: 1cm; font-family: Arial, sans-serif; }
              }
              body { font-family: Arial, sans-serif; line-height: 1.6; }
              .receipt { max-width: 800px; margin: 0 auto; }
              .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #000; padding-bottom: 20px; }
              .meta-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px; }
              table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
              th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
              th { background: #f5f5f5; font-weight: bold; }
              .summary { float: right; width: 300px; }
              .address-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px; }
              .footer { margin-top: 50px; padding-top: 20px; border-top: 2px dashed #000; text-align: center; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="receipt">
              <div class="header">
                <h1>ORDER RECEIPT</h1>
                <p>Order ID: ${order._id}</p>
                <p>Date: ${new Date().toLocaleDateString()}</p>
              </div>
              
              <table>
                <thead>
                  <tr>
                    <th>ITEM</th>
                    <th>QTY</th>
                    <th>PRICE</th>
                    <th>TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  ${order.items
                    .map(
                      (item: any) => `
                    <tr>
                      <td>${item.product?.name || "Product"}</td>
                      <td>${item.quantity}</td>
                      <td>₹${item.price.toFixed(2)}</td>
                      <td>₹${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  `
                    )
                    .join("")}
                </tbody>
              </table>
              
              <div class="summary">
                <div style="border-top: 2px solid #000; padding-top: 20px;">
                  <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span>Subtotal:</span>
                    <span>₹${order.subtotal?.toFixed(2) || "0.00"}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; font-size: 1.2em; font-weight: bold;">
                    <span>TOTAL:</span>
                    <span>₹${order.total?.toFixed(2) || "0.00"}</span>
                  </div>
                </div>
              </div>
              
              <div style="clear: both;"></div>
              
              <div class="address-grid">
                <div>
                  <h3>Shipping Address</h3>
                  <p>${order.address?.street || ""}</p>
                  <p>${order.address?.city || ""}, ${
        order.address?.zipCode || ""
      }</p>
                  <p>${order.address?.country || ""}</p>
                </div>
              </div>
              
              <div class="footer">
                <p>Thank you for your purchase!</p>
                <p>Order ID: ${order._id}</p>
                <p>Generated: ${new Date().toLocaleString()}</p>
              </div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
    setTimeout(() => setIsPrinting(false), 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-background-tertiary rounded-2xl border border-theme p-6 md:p-8 mb-8 print:bg-white print:border print:p-0 print:max-w-none"
      style={{ pageBreakInside: "avoid" }}
    >
      {/* Receipt Header */}
      <div className="text-center mb-8 pb-6 border-b border-theme">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-[#F59E0B] to-[#F97316] rounded-lg">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-primary">ORDER RECEIPT</h2>
        </div>
        <p className="text-sm text-muted">
          Order ID:{" "}
          <span className="font-mono text-secondary">{order._id}</span>
        </p>
        <p className="text-sm text-muted">
          Date: {new Date().toLocaleDateString()}
        </p>
      </div>

      {/* Order Items - Only actual backend data */}
      <div className="mb-8 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-theme">
              <th className="text-left py-3 px-4 text-sm font-semibold text-primary">
                ITEM
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-primary">
                QTY
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-primary">
                PRICE
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-primary">
                TOTAL
              </th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item: any, index: number) => (
              <tr
                key={index}
                className="border-b border-theme/30 hover:bg-background-secondary"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#F59E0B]/10 to-[#F97316]/10 rounded flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-[#F59E0B]" />
                    </div>
                    <div>
                      <p className="font-medium text-primary">
                        {item.product?.name || "Product"}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="text-right py-4 px-4 text-secondary">
                  {item.quantity}
                </td>
                <td className="text-right py-4 px-4 text-secondary">
                  ₹{item.price?.toFixed(2) || "0.00"}
                </td>
                <td className="text-right py-4 px-4 font-medium text-primary">
                  ₹{(item.price * item.quantity)?.toFixed(2) || "0.00"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pricing Summary - Only actual backend data */}
      <div className="mb-8">
        <div className="max-w-md ml-auto">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted">Subtotal</span>
              <span className="text-primary">
                ₹{order.subtotal?.toFixed(2) || "0.00"}
              </span>
            </div>
            <div className="border-t border-theme pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-primary">Total</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-[#F59E0B] to-[#F97316] bg-clip-text text-transparent">
                  ₹{order.total?.toFixed(2) || "0.00"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Address - Only actual backend data */}
      <div className="mb-8">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-primary mb-4">
          <Truck className="w-4 h-4 text-[#22C55E]" />
          SHIPPING ADDRESS
        </h3>
        <div className="space-y-2 text-secondary">
          <p>{order.address?.street || "Address not available"}</p>
          <p>
            {order.address?.city || ""}, {order.address?.zipCode || ""}
          </p>
          <p>{order.address?.country || ""}</p>
        </div>
      </div>

      {/* Receipt Footer */}
      <div className="border-t border-theme pt-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <p className="text-xs text-muted mb-2">
              THANK YOU FOR YOUR PURCHASE
            </p>
            <p className="text-sm text-secondary">
              Keep this receipt for your records
            </p>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrint}
              disabled={isPrinting}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-semibold rounded-lg hover:shadow-lg transition-shadow"
            >
              {isPrinting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Printer className="w-4 h-4" />
              )}
              <span>{isPrinting ? "Printing..." : "Print Receipt"}</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function OrderSuccessPage() {
  const { "order-id": orderId } = useParams() as { "order-id": string };
  const router = useRouter();

  const [order, setOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderId) return;

    (async () => {
      try {
        const data = await getOrderById(orderId);
        setOrder(data);
      } catch (err: any) {
        setError("Failed to load order");
      } finally {
        setLoading(false);
      }
    })();
  }, [orderId]);

  /* ---------------- LOADING STATE ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen bg-background-secondary flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="mb-6 flex justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <Loader2 className="w-12 h-12 text-brand" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-r from-[#F59E0B]/20 to-[#F97316]/20 rounded-full blur-sm"
              />
            </motion.div>
          </div>
          <h2 className="text-xl font-semibold text-primary mb-2">
            Loading Your Order
          </h2>
          <p className="text-muted">
            Please wait while we fetch your order details...
          </p>
        </motion.div>
      </div>
    );
  }

  /* ---------------- ERROR STATE ---------------- */
  if (error || !order) {
    return (
      <div className="min-h-screen bg-background-secondary flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="mb-6 relative">
            <div className="w-20 h-20 mx-auto bg-background-tertiary rounded-2xl flex items-center justify-center border border-theme">
              <Package className="w-10 h-10 text-muted" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-primary mb-3">
            Order Not Found
          </h2>
          <p className="text-muted mb-6">
            {error ||
              "We couldn't find your order details. Please check the order ID and try again."}
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.replace("/")}
            className="w-full max-w-xs bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-semibold py-4 px-6 rounded-xl hover:shadow-lg transition-shadow group"
          >
            <div className="flex items-center justify-center gap-3">
              <Home className="w-5 h-5" />
              <span>Return to Home</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.button>
        </motion.div>
      </div>
    );
  }

  /* ---------------- SUCCESS STATE ---------------- */
  return (
    <div className="min-h-screen bg-background">
      <div className="relative max-w-4xl mx-auto p-4 md:p-6">
        {/* Success Celebration Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="text-center mb-10 md:mb-12"
        >
          {/* Celebration Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="relative mb-8"
          >
            <div className="w-28 h-28 mx-auto bg-gradient-to-br from-[#F59E0B]/20 via-[#F97316]/10 to-transparent rounded-full flex items-center justify-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#F59E0B] to-[#F97316] rounded-full flex items-center justify-center shadow-lg shadow-orange-500/25">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
            </div>
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            <span className="bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#F59E0B] bg-clip-text text-transparent">
              Order Confirmed!
            </span>
          </h1>
          <p className="text-xl text-secondary mb-4">
            Your order has been successfully placed
          </p>

          {/* Order ID Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-background-tertiary rounded-full border border-theme"
          >
            <Trophy className="w-4 h-4 text-[#F59E0B]" />
            <span className="text-sm font-medium text-primary">
              Order ID: {order._id.slice(-8)}
            </span>
          </motion.div>
        </motion.div>

        {/* Industry Standard Receipt - Only backend data */}
        <OrderReceipt order={order} />

        {/* Next Steps - Generic, no misinformation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-background-tertiary rounded-2xl p-6 md:p-8 border border-theme mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-[#38BDF8]" />
            <h3 className="text-xl font-semibold text-primary">
              What to Expect Next
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-[#38BDF8]/10 rounded-lg mt-1">
                <Clock className="w-5 h-5 text-[#38BDF8]" />
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-1">
                  Order Confirmation
                </h4>
                <p className="text-sm text-muted">
                  Your order has been confirmed and is being processed. You'll
                  receive updates via email.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-[#22C55E]/10 rounded-lg mt-1">
                <Truck className="w-5 h-5 text-[#22C55E]" />
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-1">
                  Shipping Updates
                </h4>
                <p className="text-sm text-muted">
                  We'll notify you when your order ships with tracking
                  information.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="space-y-4 mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.replace("/")}
            className="w-full bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#F59E0B] text-white font-semibold py-4 md:py-5 px-6 rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-base md:text-lg">Continue Shopping</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </motion.button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push("/orders")}
              className="bg-background-tertiary text-primary font-semibold py-4 px-4 rounded-xl border border-theme hover:bg-background transition-colors flex items-center justify-center gap-3"
            >
              <FileText className="w-5 h-5" />
              <span>View All Orders</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Support Information */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="bg-background-tertiary rounded-2xl p-6 border border-theme"
        >
          <div className="flex items-start gap-4">
            <div className="p-2 bg-gradient-to-r from-[#38BDF8]/10 to-[#22C55E]/10 rounded-lg">
              <Shield className="w-6 h-6 text-[#38BDF8]" />
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-2">Need Help?</h4>
              <div className="space-y-2 text-sm text-muted">
                <p>
                  • Save your order ID for reference:{" "}
                  <span className="font-mono text-secondary">{order._id}</span>
                </p>
                <p>• Contact support with your order ID for assistance</p>
                <p>• Check your email for order confirmation</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
