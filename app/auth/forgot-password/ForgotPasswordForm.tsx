"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { Loader2, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

import {
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from "@/lib/schemas/auth";
import { forgotPasswordAction } from "@/app/_actions/auth";

export default function ForgotPasswordForm() {
  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      emailOrPhone: "",
    },
  });

  const { execute, isExecuting } = useAction(forgotPasswordAction, {
    onSuccess: (result) => {
      if (result.data?.success) {
        toast.success(result.data.message);
      }
    },
    onError: (error) => {
      if (error.error) {
        toast.error(error.error.serverError);
      } else {
        toast.error("Failed to send reset instructions. Please try again.");
      }
    },
  });

  const onSubmit = (data: ForgotPasswordInput) => {
    execute(data);
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              Enter your email address or phone number and we'll send you
              instructions to reset your password.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="emailOrPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Email or Phone
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          placeholder="john@example.com or +971501234567"
                          className="pl-10 h-12 border-muted-foreground/20 focus:border-primary"
                          {...field}
                        />
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
                Send Reset Instructions
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="text-center">
        <Link href="/auth/login">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to sign in
          </Button>
        </Link>
      </div>
    </div>
  );
}
