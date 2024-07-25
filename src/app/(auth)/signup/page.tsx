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
import { Textarea } from "@/components/ui/textarea";
import { signupZodSchema } from "@/schema/signup";
import { signupAction } from "@/app/actions/signup";
import Formwrapper from "@/components/wrapper/formwrapper";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof signupZodSchema>>({
    resolver: zodResolver(signupZodSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      bio: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signupZodSchema>) {
    setLoading(true);
    const { data, error, message } = await signupAction(values);
    setLoading(false);
    if (data) {
      toast.success(message);
      return router.push("/signin");
    }
    toast.error(error);
  }

  return (
    <Formwrapper>
      <div className="text-center my-4">
        <h1 className="font-semibold text-xl">Signup Now</h1>
        <h2 className="text-base">To start blogging today</h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="gourav" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea placeholder="bio" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <h1 className="text-center">
            Already have an account?{" "}
            <Link className="underline" href={"/signin"}>
              Signin Now
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
