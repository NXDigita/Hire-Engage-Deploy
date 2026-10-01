import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms-and-conditions")({
  component: TermsAndConditions,
});

function TermsAndConditions() {
  return (
    <iframe
      src="/terms-and-conditions.html"
      title="Terms & Conditions & Privacy Policy"
      style={{
        width: "100%",
        minHeight: "100vh",
        border: "none",
      }}
    />
  );
}