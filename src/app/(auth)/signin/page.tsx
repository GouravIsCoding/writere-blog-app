"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { signinZodSchema } from "@/schema/signin";

import Formwrapper from "@/components/wrapper/formwrapper";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof signinZodSchema>>({
    resolver: zodResolver(signinZodSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signinZodSchema>) {
    setLoading(true);
    const res = await signIn("credentials", { ...values, redirect: false });
    setLoading(false);
    if (res?.error) return toast.error(res.error);

    toast.success("Signin scuccesful");
    return push("/dashboard");
  }

  return (
    <Formwrapper>
      <div className="text-center my-4">
        <h1 className="font-semibold text-xl">Signin Now</h1>
        <h2 className="text-base">To continue your blogging journey!</h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="gourav@example.com" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <h1 className="text-center">
            Don&apos;t have an account?{" "}
            <Link className="underline" href={"/signup"}>
              Signup Now
            </Link>
          </h1>
          <Button disabled={loading} className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </Formwrapper>
  );
}
