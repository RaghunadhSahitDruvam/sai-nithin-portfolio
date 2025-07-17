"use client";
import React, { useState, useEffect } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { checkAdminExists } from "@/lib/actions/admin/check";
import { signupAdmin } from "@/lib/actions/admin/signup";
import { sendVerificationCode } from "@/lib/actions/admin/send-verification";
import { Loader2 } from "lucide-react";

export default function AdminAuth() {
  const [hasAdmin, setHasAdmin] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [step, setStep] = useState<"credentials" | "verification">(
    "credentials"
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    verificationCode: "",
  });
  const router = useRouter();

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    try {
      const result = await checkAdminExists();
      setHasAdmin(result.hasAdmin);
    } catch (error) {
      console.error("Error checking admin:", error);
      toast.error("Failed to check admin status");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await signupAdmin(
          formData.email,
          formData.password
        );

      if (result.success) {
        setSuccess(result.message || "Admin account created! Please check your email for verification code.");
        setStep("verification");
        toast.success("Admin account created! Please check your email for verification code.");
      } else {
        setError(result.error || "Signup failed");
        toast.error(result.error || "Signup failed");
      }
    } catch (error) {
      setError("An error occurred during signup");
      toast.error("An error occurred during signup");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await sendVerificationCode(
          formData.email,
          formData.password
        );

      if (result.success) {
        setSuccess(result.message || "Verification code sent!");
        setStep("verification");
        toast.success("Verification code sent!");
      } else {
        setError(result.error || "Failed to send verification code");
        toast.error(result.error || "Failed to send verification code");
      }
    } catch (error) {
      setError("An error occurred");
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        verificationCode: formData.verificationCode,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        toast.error(result.error);
      } else {
        toast.success("Login successful!");
        router.push("/admin/dashboard");
      }
    } catch (error) {
      setError("An error occurred during verification");
    } finally {
      setIsLoading(false);
    }
  };

  if (hasAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {hasAdmin ? "Admin Sign In" : "Admin Setup"}
          </CardTitle>
          <CardDescription className="text-center">
            {hasAdmin
              ? "Sign in to access the admin dashboard"
              : "Create the first admin account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-4 border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="mb-4 border-green-200 bg-green-50">
              <AlertDescription className="text-green-800">
                {success}
              </AlertDescription>
            </Alert>
          )}

          {step === "credentials" ? (
            <form
              onSubmit={hasAdmin ? handleSendVerification : handleSignup}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  placeholder="Enter admin email"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                  placeholder="Enter password"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {hasAdmin ? "Sending Code..." : "Creating Account..."}
                  </>
                ) : hasAdmin ? (
                  "Send Verification Code"
                ) : (
                  "Create Admin Account"
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerification} className="space-y-4">
              <div>
                <Label htmlFor="verificationCode">Verification Code</Label>
                <Input
                  id="verificationCode"
                  type="text"
                  value={formData.verificationCode}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      verificationCode: e.target.value,
                    })
                  }
                  required
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify & Sign In"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setStep("credentials")}
              >
                Back
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
