"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { loginSchema } from "@/schemas/auth";
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { CardWrapper } from "./card-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/modules/auth/actions/login";
import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      document: "",
      password: "",
    },
  });
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setError("");
    setSuccess("");
  
    startTransition(async () => {
      const { error, success } = await login(values);
  
      if (error) {
        setError(error);
        return;
      }
  
      if (success) {
        setSuccess(success);
        form.reset();
        router.push("/results");
      }
    });
  };

  return (
    <CardWrapper
      headerLabel="Bienvenido de nuevo!"
      backButtonLabel="No tienes una cuenta?"
      backButtonHref="/auth/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="document"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Documento</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="1234567890"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Contraseña:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="*********"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center justify-end">
            <Button
              variant="link"
              className="font-normal text-xs"
              size="sm"
              asChild
            >
              <Link href="/auth/reset-password">¿Olvidaste tu contraseña?</Link>
            </Button>
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Iniciar Sesión
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
