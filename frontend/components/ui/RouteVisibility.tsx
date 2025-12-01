"use client";

import { usePathname } from "next/navigation";

type Mode = "exact" | "startsWith";

/** 表示/非表示の切替だけ担当（使い回し用・超小型） */
export default function RouteVisibility({
  showOn,
  mode = "exact",
  keepMounted = false,
  className,
  children,
}: {
  showOn: string[];        
  mode?: Mode;             
  keepMounted?: boolean;   
  className?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const visible = showOn.some((p) =>
    mode === "startsWith" ? pathname.startsWith(p) : pathname === p
  );

  if (keepMounted) {
    return (
      <div className={visible ? className : ["hidden", className].filter(Boolean).join(" ")}>
        {children}
      </div>
    );
  }
  return visible ? <div className={className}>{children}</div> : null;
}
