"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  { href: "/dashboard", label: "Vue d'ensemble" },
  { href: "/dashboard/articles", label: "Articles" },
  { href: "/dashboard/seo", label: "SEO & trafic" },
  { href: "/dashboard/gbp", label: "Google Business" },
];

const SOON: { label: string }[] = [];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/dashboard/login", { method: "DELETE" });
    router.replace("/dashboard/login");
    router.refresh();
  }

  return (
    <aside className="flex w-60 shrink-0 flex-col bg-anthracite-dark text-white/80">
      <div className="px-6 py-6">
        <p className="text-lg font-bold text-white">ATB Charpente</p>
        <p className="text-xs text-white/50">Dashboard</p>
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {NAV.map((item) => {
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active ? "bg-orange text-white" : "hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
        {SOON.length > 0 && (
          <>
            <p className="px-3 pb-1 pt-5 text-[10px] font-semibold uppercase tracking-widest text-white/40">
              Bientôt
            </p>
            {SOON.map((item) => (
              <span
                key={item.label}
                className="block cursor-default rounded-lg px-3 py-2 text-sm text-white/35"
              >
                {item.label}
              </span>
            ))}
          </>
        )}
      </nav>
      <div className="p-3">
        <button
          type="button"
          onClick={logout}
          className="w-full rounded-lg px-3 py-2 text-left text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          Se déconnecter
        </button>
      </div>
    </aside>
  );
}
