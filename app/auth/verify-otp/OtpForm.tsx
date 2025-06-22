"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

import { otpSchema, type OtpInput } from "@/lib/schemas/auth";
import { verifyOtpAction } from "@/app/_actions/auth";

export default function OtpForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const phone = searchParams.get("phone") || "";

  const form = useForm<OtpInput>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      token: "",
    },
  });

  const { execute, isExecuting } = useAction(verifyOtpAction, {
    onSuccess: (result) => {
      if (result.data?.success) {
        toast.success(result.data.message);
        router.push("/");
      }
    },
    onError: ({ error }) => {
      if (error.serverError) {
        toast.error(error.serverError);
      } else {
        toast.error("Verification failed. Please try again.");
      }
    },
  });

  const onSubmit = (data: OtpInput) => {
    if (!phone) {
      toast.error("Phone number is missing. Please try registering again.");
      return;
    }
    execute({ ...data, phone });
  };

  const maskedPhone = phone ? `${phone.slice(0, 3)}****${phone.slice(-4)}` : "";

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <Shield className="w-8 h-8 text-primary" />
          </div>

          <div className="space-y-2 mb-8">
            <h3 className="text-lg font-semibold">Enter Verification Code</h3>
            <p className="text-sm text-muted-foreground">
              We've sent a 6-digit code to{" "}
              <span className="font-medium text-foreground">{maskedPhone}</span>
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="token"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Verification Code</FormLabel>
                    <FormControl>
                      <div className="flex justify-center">
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot
                              index={0}
                              className="w-12 h-12 text-lg"
                            />
                            <InputOTPSlot
                              index={1}
                              className="w-12 h-12 text-lg"
                            />
                            <InputOTPSlot
                              index={2}
                              className="w-12 h-12 text-lg"
                            />
                            <InputOTPSlot
                              index={3}
                              className="w-12 h-12 text-lg"
                            />
                            <InputOTPSlot
                              index={4}
                              className="w-12 h-12 text-lg"
                            />
                            <InputOTPSlot
                              index={5}
                              className="w-12 h-12 text-lg"
                            />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-12 text-base font-medium"
                disabled={isExecuting}
              >
                {isExecuting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Verify Phone Number
              </Button>
            </form>
          </Form>

          <div className="mt-6 space-y-4">
            <p className="text-sm text-muted-foreground">
              Didn't receive the code?{" "}
              <Button variant="link" className="p-0 h-auto text-primary">
                Resend code
              </Button>
            </p>

            <Link href="/auth/register">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to registration
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
