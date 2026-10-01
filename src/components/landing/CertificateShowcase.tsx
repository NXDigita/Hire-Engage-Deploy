import { useState } from "react";
import { Download, FileText, Linkedin, Loader2, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";

const DEFAULT_CERTIFICATE = {
  name: "",
  college: "",
  program: "",
  issued: "",
  credentialId: "",
};
const INTERNSHIP_COMPLETED = false;
const SHARE_URL = "https://www.nxdigita.com";

type Certificate = typeof DEFAULT_CERTIFICATE;

function shareUrl(network: "linkedin" | "x" | "whatsapp", certificate: Certificate) {
  const message = `${certificate.name} completed the ${certificate.program} with NxDigita AI Technologies. #NxDigitaCertified #CareerGrowth`;
  const text = encodeURIComponent(message);
  const url = encodeURIComponent(SHARE_URL);
  switch (network) {
    case "linkedin":
      return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    case "x":
      return `https://twitter.com/intent/tweet?text=${text}%20${url}`;
    case "whatsapp":
      return `https://wa.me/?text=${text}%20${url}`;
  }
}

export function CertificateShowcase() {
  const [certificate, setCertificate] = useState(DEFAULT_CERTIFICATE);
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  

  const updateCertificate = (field: "name" | "college" | "program", value: string) => {
    setCertificate((current) => ({ ...current, [field]: value }));
  };

  const handleDownload = async () => {
    // if (downloading) return;
    if (!INTERNSHIP_COMPLETED || downloading) return;

    setDownloading(true);

    try {
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();

      pdf.setFillColor(250, 250, 250);
      pdf.rect(0, 0, width, height, "F");
      pdf.setDrawColor(255, 107, 0);
      pdf.setLineWidth(1.5);
      pdf.rect(10, 10, width - 20, height - 20);
      pdf.setDrawColor(16, 196, 212);
      pdf.setLineWidth(0.45);
      pdf.rect(14, 14, width - 28, height - 28);

      pdf.setTextColor(4, 11, 22);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(17);
      pdf.text("NxDigita AI Technologies", width / 2, 34, { align: "center" });
      pdf.setTextColor(90, 98, 110);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.text("HIRE · ENGAGE · DEPLOY", width / 2, 42, { align: "center" });

      pdf.setTextColor(4, 11, 22);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(30);
      pdf.text("Certificate of Completion", width / 2, 70, { align: "center" });
      pdf.setTextColor(90, 98, 110);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(12);
      pdf.text("This certificate is proudly presented to", width / 2, 84, { align: "center" });

      pdf.setTextColor(255, 107, 0);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(27);
      pdf.text(certificate.name.trim() || "Certificate Recipient", width / 2, 103, {
        align: "center",
        maxWidth: width - 55,
      });
      pdf.setTextColor(4, 11, 22);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(12);
      pdf.text(`for successfully completing the ${certificate.program}`, width / 2, 120, {
        align: "center",
        maxWidth: width - 55,
      });
      pdf.text(`at ${certificate.college.trim() || "their institution"}`, width / 2, 131, {
        align: "center",
        maxWidth: width - 55,
      });

      pdf.setDrawColor(210, 214, 220);
      pdf.line(35, 153, width - 35, 153);
      pdf.setTextColor(90, 98, 110);
      pdf.setFontSize(9);
      pdf.text(`ISSUED: ${certificate.issued}`, 40, 164);
      pdf.text(`CREDENTIAL ID: ${certificate.credentialId}`, width - 40, 164, { align: "right" });
      pdf.setTextColor(10, 158, 171);
      pdf.setFont("helvetica", "bold");
      pdf.text("Verified live project contribution", width / 2, 180, { align: "center" });

      const safeName = (certificate.name.trim() || "certificate")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      pdf.save(`nxdigita-certificate-${safeName}.pdf`);
      setDownloading(false);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    } catch {
      setDownloading(false);
    }
  };

  return (
    <section id="certificate" className="bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="text-center">
            <p className="text-sm font-medium tracking-wide text-primary">
              PROOF OF WORK
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Certified &amp; Completed. Share It.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Every certificate is credited for a live project contribution — and
              built to be shared with the people who hire.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mx-auto mt-14 max-w-2xl">
           {!INTERNSHIP_COMPLETED && (
            <div className="mb-6 grid gap-4 rounded-lg border border-border bg-card p-4 sm:grid-cols-2">
              <CertificateField
                label="Certificate name"
                value={certificate.name}
                onChange={(value) => updateCertificate("name", value)}
                
              />
              <CertificateField
                label="College"
                value={certificate.college}
                onChange={(value) => updateCertificate("college", value)}
              />
              <div className="sm:col-span-2">
                <CertificateField
                  label="Program"
                  value={certificate.program}
                  onChange={(value) => updateCertificate("program", value)}
                />
              </div>
            </div>
           )}

            <CertificateMock certificate={certificate} />

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                onClick={handleDownload}
                disabled={!INTERNSHIP_COMPLETED || downloading}
                title={!INTERNSHIP_COMPLETED ? "Available after internship completion" : undefined}
                size="lg"
                className="h-11 w-full sm:w-auto"
              >
                {downloading ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Download className="size-4" aria-hidden="true" />
                )}
                {downloading
                  ? "Preparing…"
                  : downloaded
                    ? "Downloaded"
                    : "Download Certificate"}
              </Button>

              <div className="flex w-full items-center gap-2 sm:w-auto">
                <span className="hidden h-11 items-center gap-2 rounded-md border border-border px-4 text-sm text-muted-foreground sm:inline-flex">
                  <Share2 className="size-4" aria-hidden="true" />
                  Share Achievement
                </span>
                <ShareLink
                  href={shareUrl("linkedin", certificate)}
                  label="Share on LinkedIn"
                  enabled={INTERNSHIP_COMPLETED}
                >
                  <Linkedin className="size-4" aria-hidden="true" />
                </ShareLink>
                <ShareLink
                  href={shareUrl("x", certificate)}
                  label="Share on X"
                  enabled={INTERNSHIP_COMPLETED}
                >
                  <FileText className="size-0" aria-hidden="true" />
                  <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </ShareLink>
                <ShareLink
                  href={shareUrl("whatsapp", certificate)}
                  label="Share on WhatsApp"
                  enabled={INTERNSHIP_COMPLETED}
                >
                  <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </ShareLink>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ShareLink({
  href,
  label,
  enabled,
  children,
}: {
  href: string;
  label: string;
  enabled: boolean;
  children: React.ReactNode;
}) {
  const base =
    "inline-flex size-11 flex-1 items-center justify-center rounded-md border border-border sm:flex-none";

  if (!enabled) {
    return (
      <span
        role="link"
        aria-disabled="true"
        aria-label={`${label} (available after internship completion)`}
        title="Available after you complete the internship"
        className={`${base} cursor-not-allowed text-muted-foreground opacity-40`}
      >
        {children}
      </span>
    );
  }

  return (
    
     <a href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={`${base} text-muted-foreground transition-colors hover:bg-accent hover:text-foreground`}
    >
      {children}
    </a>
  );
}

function CertificateField({
  label,
  value,
  onChange,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <label className="block text-sm text-muted-foreground">
      {label}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        maxLength={80}
        disabled={disabled}
        className="mt-1.5 h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}

function CertificateMock({ certificate }: { certificate: Certificate }) {
  return (
    <div className="rounded-2xl border border-border bg-background p-2 shadow-2xl">
      <div className="rounded-xl border border-border/60 p-6 sm:p-10">
        <div className="flex items-start justify-between gap-4">
          <p className="text-sm font-semibold tracking-tight text-foreground">
            NxDigita AI Technologies{" "}
            <span className="font-normal text-muted-foreground">· TalentTopper</span>
          </p>
          <span className="shrink-0 rounded-full border border-border px-3 py-1 text-[10px] font-medium tracking-wide text-muted-foreground">
            CERTIFIED &amp; COMPLETED
          </span>
        </div>

        <p className="mt-10 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
          Congratulations,
        </p>
        <p className="font-heading text-4xl font-extrabold text-primary sm:text-5xl">
          {certificate.name || "Certificate Recipient"}
        </p>
        <p className="mt-4 text-sm text-muted-foreground">{certificate.program}</p>

        <div className="mt-12 grid gap-6 border-t border-border pt-6 text-xs sm:grid-cols-3">
          <div>
            <p className="tracking-[0.18em] text-muted-foreground/70">COLLEGE</p>
            <p className="mt-1.5 text-sm font-medium text-foreground">
              {certificate.college || ""}
            </p>
          </div>
          <div>
            <p className="tracking-[0.18em] text-muted-foreground/70">ISSUED</p>
            <p className="mt-1.5 text-sm font-medium text-foreground">
              {certificate.issued}
            </p>
          </div>
          <div>
            <p className="tracking-[0.18em] text-muted-foreground/70">CREDENTIAL ID</p>
            <p className="mt-1.5 font-mono text-sm font-medium text-foreground">
              {certificate.credentialId}
            </p>
          </div>
        </div>
        <p className="mt-6 text-[11px] text-muted-foreground/60">
          #NxDigitaInterns #NxDigitaCertified #CareerGrowth
        </p>
      </div>
    </div>
  );
}