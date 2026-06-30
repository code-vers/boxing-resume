"use client";

import * as React from "react";
import Image from "next/image";
import { Copy, Share2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

const facebookLogo = "https://www.figma.com/api/mcp/asset/91068f95-a40d-402d-a039-8e557f437a5f";
const whatsappLogo = "https://www.figma.com/api/mcp/asset/c86842a6-c4e8-42b7-a1eb-7210dc67d056";
const instagramLogo = "https://www.figma.com/api/mcp/asset/35d07da7-eb22-4ed3-9093-43b9e80084bb";

const stats = [
  {
    label: "Total Fights",
    canelo: "65",
    usyk: "23",
    winner: "canelo",
  },
  {
    label: "Wins",
    canelo: "61",
    usyk: "22",
    winner: "canelo",
  },
  {
    label: "Losses",
    canelo: "2",
    usyk: "0",
    winner: "usyk",
  },
  {
    label: "Draws",
    canelo: "2",
    usyk: "0",
    winner: "usyk",
  },
  {
    label: "KOs",
    canelo: "39",
    usyk: "14",
    winner: "canelo",
  },
  {
    label: "KO Rate",
    canelo: "60",
    usyk: "61",
    winner: "usyk",
  },
  {
    label: "Titles Won",
    canelo: "4",
    usyk: "4",
    winner: "both",
  },
  {
    label: "Reach",
    canelo: "70.5",
    usyk: "78",
    winner: "usyk",
  },
];

const StartComparison = () => {
  const [shareLink, setShareLink] = React.useState(
    "https://boxing-resume.app/comparison"
  );
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.setTimeout(() => {
        setShareLink(window.location.href);
      }, 0);
    }
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareLink);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const shareMessage = `Compare Canelo Alvarez vs Oleksandr Usyk: ${shareLink}`;

  const openShareTarget = (
    target: "twitter" | "whatsapp" | "facebook" | "instagram"
  ) => {
    const encoded = encodeURIComponent(shareMessage);
    let url = "";

    if (target === "twitter") {
      url = `https://twitter.com/intent/tweet?text=${encoded}`;
    }

    if (target === "whatsapp") {
      url = `https://api.whatsapp.com/send?text=${encoded}`;
    }

    if (target === "facebook") {
      url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareLink
      )}`;
    }

    if (target === "instagram") {
      url = `https://www.instagram.com/`;
    }

    window.open(url, "_blank", "noreferrer");
  };

  return (
    <section className="w-full bg-page-bg px-4 pb-8 sm:px-6 md:px-8 xl:px-12">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-[20px] font-black uppercase leading-none text-text-primary">
            Stats Comparison
          </h2>
          <p className="mt-1 text-sm leading-6 text-text-muted">
            Compare the key stats and see who has the edge in each category.
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="inline-flex items-center gap-2 border-card-border text-text-primary hover:border-card-border-hover">
              <Share2 className="h-4 w-4" />
              Share Comparison
            </Button>
          </DialogTrigger>
          <DialogContent>
            <div className="grid gap-4 sm:flex sm:items-center sm:justify-between">
              <p className="text-[18px] font-heading font-black uppercase leading-[27px] tracking-[0.03em] text-text-primary">
                Share
              </p>
              <DialogClose asChild>
                <Button variant="ghost" size="icon" aria-label="Close dialog">
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            </div>

            <div className="grid gap-4 rounded-[20px] border border-border bg-page-bg p-4">
              <div className="rounded-[6px] bg-[#0a0a0a] p-4">
                <p className="text-[11px] uppercase tracking-[1.32px] text-[#d72322]">
                  BOXING RESUME
                </p>
                <p className="mt-3 text-[16px] uppercase text-white">
                  Canelo Alvarez
                </p>
                <p className="mt-3 text-center text-[14px] uppercase tracking-[0.08em] text-[#d72322]">
                  VS
                </p>
                <p className="mt-3 text-[16px] uppercase text-white">
                  Oleksandr Usyk
                </p>
                <p className="mt-5 text-[11px] text-[#857f78]">
                  KO Rate: 60% vs 61%
                </p>
              </div>

              <div className="grid gap-2">
                <p className="text-[10px] uppercase tracking-[0.8px] text-[#857f78]">
                  SHARE TO
                </p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => openShareTarget("twitter")}
                    className="flex h-[40px] items-center gap-2 rounded-[6px] border border-[#e8e2d8] bg-white px-3 text-[12px] font-medium text-[#0a0a0a]"
                  >
                    <span className="flex h-[18px] w-[18px] items-center justify-center rounded-[4px] bg-[#0a0a0a]" />
                    Post on X
                  </button>
                  <button
                    type="button"
                    onClick={() => openShareTarget("facebook")}
                    className="flex h-[40px] items-center gap-2 rounded-[6px] border border-[#e8e2d8] bg-white px-3 text-[12px] font-medium text-[#0a0a0a]"
                  >
                    <Image src={facebookLogo} alt="Facebook" width={18} height={18} className="h-[18px] w-[18px]" />
                    Facebook
                  </button>
                  <button
                    type="button"
                    onClick={() => openShareTarget("whatsapp")}
                    className="flex h-[40px] items-center gap-2 rounded-[6px] border border-[#e8e2d8] bg-white px-3 text-[12px] font-medium text-[#0a0a0a]"
                  >
                    <Image src={whatsappLogo} alt="WhatsApp" width={18} height={18} className="h-[18px] w-[18px]" />
                    WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => openShareTarget("instagram")}
                    className="flex h-[40px] items-center gap-2 rounded-[6px] border border-[#e8e2d8] bg-white px-3 text-[12px] font-medium text-[#0a0a0a]"
                  >
                    <Image src={instagramLogo} alt="Instagram" width={18} height={18} className="h-[18px] w-[18px]" />
                    Instagram
                  </button>
                </div>
              </div>

              <div className="grid gap-2">
                <p className="text-[10px] uppercase tracking-[0.8px] text-[#857f78]">
                  COPY LINK
                </p>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <div className="min-w-0 flex-1 overflow-hidden rounded-[6px] border border-[#d4cec4] bg-[#faf8f4] px-3 py-2">
                    <p className="truncate text-[12px] text-[#857f78] break-all">{shareLink}</p>
                  </div>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleCopy}
                    className="w-full sm:w-auto rounded-[6px] bg-[#0a0a0a] px-4 text-[11px] font-medium text-white"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    {copied ? "Copied" : "Copy"}
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-hidden rounded-[8px] border border-card-border bg-surface-white">
        <div className="grid h-[72px] grid-cols-[1fr_120px_1fr] items-start bg-page-bg px-5 py-5 sm:grid-cols-[1fr_180px_1fr]">
          <span className="font-heading text-[12px] font-black uppercase leading-none text-text-primary">
            Canelo Alvarez
          </span>
          <span className="pt-8 text-center text-[14px] font-medium uppercase leading-none text-text-placeholder">
            Stat
          </span>
          <span className="self-end text-right font-heading text-[12px] font-black uppercase leading-none text-text-primary">
            Oleksandr Usyk
          </span>
        </div>

        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`grid min-h-[82px] grid-cols-[1fr_120px_1fr] items-center border-t border-divider px-5 sm:grid-cols-[1fr_180px_1fr] ${
              index % 2 === 0 ? "bg-surface-white" : "bg-section-bg"
            }`}
          >
            <span
              className={`text-left text-[13px] font-semibold leading-none ${
                stat.winner === "canelo" || stat.winner === "both"
                  ? "text-text-accent"
                  : "text-text-disabled"
              }`}
            >
              {stat.canelo}
            </span>

            <span className="text-center text-[14px] font-medium leading-none text-text-placeholder">
              {stat.label}
            </span>

            <span
              className={`text-right text-[13px] font-semibold leading-none ${
                stat.winner === "usyk" || stat.winner === "both"
                  ? "text-text-accent"
                  : "text-text-disabled"
              }`}
            >
              {stat.usyk}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};


export default StartComparison;
