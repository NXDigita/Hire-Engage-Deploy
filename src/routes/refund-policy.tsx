import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/refund-policy")({
  component: RefundPolicy,
});

function RefundPolicy() {
  return (
    <iframe
      src="/refund-policy.html"
      title="Refund & Cancellation Policy"
      style={{
        width: "100%",
        minHeight: "100vh",
        border: "none",
      }}
    />
  );
}