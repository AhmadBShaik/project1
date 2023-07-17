"use client";
import { ReactNode, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { supabase } from "@/clients/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";

const signInFormData = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(20),
});

type SignInFormData = z.infer<typeof signInFormData>;
export default function SignIn() {
  const [info, setInfo] = useState<ReactNode>();
  const [loading, setLoading] = useState<boolean>(false);
  const supabase = createClientComponentClient<Database>();

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInFormData),
  });

  const submitData = async (data: SignInFormData) => {
    setLoading(true);
    const signInResponse = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (!signInResponse.error) {
      router.push("../");
      router.refresh();
    } else {
      if (signInResponse.error.message === "Email not confirmed") {
        setInfo(
          <div
            className={
              "w-full bg-yellow-200 text-yellow-700 border border-yellow-300 rounded py-2 space-y-1"
            }
          >
            <div className="text-center font-bold">Email is not verified</div>
            <div className="text-center">
              Please check your email to verify your account
            </div>
          </div>
        );
      } else if (signInResponse.error.message === "Invalid login credentials") {
        setInfo(
          <div
            className={
              "w-full bg-red-200 text-red-700 border border-red-300 rounded py-2 space-y-1"
            }
          >
            <div className="text-center font-bold">Invalid credentials</div>
            <div className="text-center">
              Try again with correct email and password
            </div>
          </div>
        );
        setLoading(false);
      } else {
        setInfo(
          <div
            className={
              "w-full bg-red-200 text-red-700 border border-red-500 rounded-lg py-2 space-y-1"
            }
          >
            <div className="text-center font-bold">Something went wrong!</div>
            <div className="text-center">Please try again later</div>
          </div>
        );
        setLoading(false);
      }
    }
  };
  return (
    <>
      <main className="flex-1 mt-18 w-full flex items-center justify-center p-3 mt-20">
        <section className="w-full max-w-lg bg-neutral-800 p-5 shadow-md rounded-md">
          <form
            className="space-y-3"
            onSubmit={handleSubmit(submitData)}
            autoComplete="off"
          >
            <legend className="text-green-500 mb-5">
              <div className="font-bold text-2xl">Welcome back!</div>
              <div className="text-sm">Sign in to your account</div>
            </legend>
            {!!info ? <>{info}</> : null}
            <label className="block">
              <span className="block text-sm font-medium text-neutral-200">
                Email
              </span>
              <input
                className="w-full outline-0 px-2 py-0.5 rounded bg-neutral-600 text-neutral-100"
                placeholder="Enter email"
                {...register("email")}
              />
              {errors.email ? (
                <span className="text-sm text-red-500">
                  {errors.email.message}
                </span>
              ) : null}
            </label>

            <label className="block">
              <span className="block text-sm font-medium text-neutral-200">
                Password
              </span>
              <input
                className="w-full outline-0 px-2 py-0.5 rounded bg-neutral-600 text-neutral-100"
                type="password"
                placeholder="Enter Password"
                {...register("password")}
              />
              {errors.password ? (
                <span className="text-sm text-red-500">
                  {errors.password.message}
                </span>
              ) : null}
            </label>
            <div className="pt-5">
              <input
                disabled={loading}
                type="submit"
                value={"Sign In"}
                className={`w-full font-bold ${
                  loading ? "bg-green-300" : "bg-green-500"
                } text-neutral-100 py-2 rounded cursor-pointer`}
              />
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
