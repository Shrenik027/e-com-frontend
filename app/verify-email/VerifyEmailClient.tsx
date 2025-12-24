"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import API from "@/services/api";

export default function VerifyEmailPage() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    API.get(`/auth/verify-email?token=${token}`)
      .then(() => {
        setStatus("success");
        setTimeout(() => router.push("/account"), 2000);
      })
      .catch(() => setStatus("error"));
  }, [token]);

  if (status === "loading") {
    return <p className="text-center mt-20">Verifying your email...</p>;
  }

  if (status === "success") {
    return (
      <p className="text-center mt-20 text-green-500">
        Email verified successfully! Redirecting to login...
      </p>
    );
  }

  return (
    <p className="text-center mt-20 text-red-500">
      Verification link is invalid or expired.
    </p>
  );
}
