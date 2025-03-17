"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { verifySchema } from "@/schemas/auth";
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
import { useState, useTransition } from "react";
import { verifyEmail } from "@/modules/auth/actions/register";
import { useRouter } from "next/navigation";

interface VerifyFormProps {
  patientId: string;
}

export const VerifyForm = (params: VerifyFormProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
      patientId: params.patientId,
    },
  });

  const onSubmit = (values: z.infer<typeof verifySchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      verifyEmail(values).then((item) => {
        if (item.error) {
          setError(item.error);
        }

        if (item.success) {
          setSuccess(item.success);

          // Verificar si la respuesta tiene un ID y redirigir
          if (item.data) {
            router.push(`/auth/login`);
          } else {
            setError("No se pudo verificar el email correctamente");
          }
        }
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Verificacion de correo electronico"
      backButtonLabel="¿Ya tienes una cuenta?"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    Codigo de Verificacion
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="123456"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Verificar Codigo
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
