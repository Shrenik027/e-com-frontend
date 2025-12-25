const STATUS_FLOW = [
  "placed",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
];

export default function OrderTimeline({ status }: { status: string }) {
  return (
    <div className="flex items-center gap-4 mt-6">
      {STATUS_FLOW.map((step, index) => {
        const isActive = STATUS_FLOW.indexOf(status) >= index;
        const isCancelled = status === "cancelled";

        return (
          <div key={step} className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${
                isCancelled
                  ? "bg-red-500"
                  : isActive
                  ? "bg-green-500"
                  : "bg-gray-300"
              }`}
            />
            <span
              className={`text-sm capitalize ${
                isActive ? "font-semibold" : "text-gray-400"
              }`}
            >
              {step}
            </span>

            {index < STATUS_FLOW.length - 1 && (
              <div className="w-8 h-[2px] bg-gray-300" />
            )}
          </div>
        );
      })}
    </div>
  );
}
