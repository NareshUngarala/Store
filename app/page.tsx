import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24 bg-[#F9FAFB]">
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-3 sm:mb-4 text-[#111827]">
          Welcome to StoreOS Admin Portal
        </h1>
        <p className="text-center text-sm sm:text-base text-[#6B7280] mb-6 sm:mb-8 px-4">
          Get started by navigating to the admin dashboard
        </p>
        <div className="flex justify-center">
          <Link href="/admin">
            <Button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3">
              Go to Admin Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

