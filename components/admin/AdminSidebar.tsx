"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FileText, Mail, BarChart2, LogOut } from "lucide-react";

const LINKS = [
  { href: "/admin/content",    label: "Contenu landing",  icon: LayoutDashboard },
  { href: "/admin/blog",       label: "Blog",             icon: FileText },
  { href: "/admin/newsletter", label: "Newsletter",       icon: Mail },
  { href: "/admin/analytics",  label: "Analytics",        icon: BarChart2 },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <aside
      className="w-56 shrink-0 flex flex-col min-h-screen py-6 px-3"
      style={{ background: "white", borderRight: "1px solid #d4ecea" }}
    >
      <div className="px-3 mb-8">
        <p className="text-[#0f172a] font-bold text-sm">Mon Assistant Kiné</p>
        <p className="text-[#94a3b8] text-xs mt-0.5">Administration</p>
      </div>

      <nav className="flex-1 flex flex-col gap-1">
        {LINKS.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all"
              style={active
                ? { background: "#eef7f6", color: "#3899aa" }
                : { color: "#64748b" }
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-[#94a3b8] hover:text-[#ef4444] transition-colors mt-4"
      >
        <LogOut className="w-4 h-4 shrink-0" />
        Déconnexion
      </button>
    </aside>
  );
}
