"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function VerifyEmailPage() {
  const params = useSearchParams();
  const router = useRouter();
  const status = params.get("status");

  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        router.push("/account"); // login page
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [status, router]);

  if (status === "success") {
    return (
      <p className="text-center mt-20 text-green-500">
        ✅ Email verified successfully! Redirecting to login…
      </p>
    );
  }

  if (status === "invalid") {
    return (
      <p className="text-center mt-20 text-red-500">
        ❌ Verification link is invalid or expired.
        <br />
        Please request a new verification email.
      </p>
    );
  }

  return <p className="text-center mt-20">Verifying your email…</p>;
}
