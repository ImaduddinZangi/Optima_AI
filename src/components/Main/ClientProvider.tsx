"use client";

import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import Image from "next/image";
import { Navbar } from "@/components/Main/Navbar";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";

const queryClient = new QueryClient();

export default function ClientProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const noHeaderPaths = ["/auth/signin", "/auth/signup"];
  const shouldShowHeader = !noHeaderPaths.includes(pathname);
  return (
    <>
      <Toaster position="top-right" />
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          {shouldShowHeader ? (
            <>
              <header className="fixed top-0 inset-x-0 h-[14vh] bg-white shadow z-50">
                <div className="mx-auto h-full px-[2vw] flex items-center justify-between">
                  <Image
                    src="/optima.png"
                    alt="Optima.AI"
                    width={218}
                    height={60}
                    className="object-contain"
                  />
                  <Navbar />
                </div>
              </header>
              <main className="w-full pt-[14vh] flex flex-col lg:flex-row">
                {children}
              </main>
            </>
          ) : (
            children
          )}
        </SessionProvider>
      </QueryClientProvider>
    </>
  );
}
