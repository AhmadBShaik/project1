"use client";
import React, { ReactNode, useState } from "react";
import { Eye, EyeOff } from "react-feather";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { supabase } from "@/clients/supabase";

const signUpFormData = z
  .object({
    email: z.string().email(),
    password: z.string().min(6).max(20),
    confirmPassword: z.string().min(6).max(20),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpFormData = z.infer<typeof signUpFormData>;

export default function SignUp() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [info, setInfo] = useState<ReactNode>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormData),
  });

  const submitData = async (data: SignUpFormData) => {
    setLoading(true);
    const signUpResponse = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (!signUpResponse.error) {
      setInfo(
        <div
          className={
            "w-full bg-green-200 text-green-700 border border-green-500 rounded-lg py-2 space-y-1"
          }
        >
          <div className="text-center font-bold">Success!</div>
          <div className="text-center">
            Please check your email to verify your account
          </div>
        </div>
      );
      console.log("signUpResponse", signUpResponse);
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

    // router.refresh();
  };
  return (
    <>
      <main className="flex-1 mt-18 w-full flex items-center justify-center p-3 mt-20">
        <section className="w-full max-w-lg bg-orange-200 p-5 shadow-md rounded-md">
          <form className="space-y-3" onSubmit={handleSubmit(submitData)}>
            <legend className="text-orange-500 mb-5">
              <div className="font-bold text-2xl">Get started</div>
              <div className="text-sm">Create a new account</div>
            </legend>
            {!!info ? <>{info}</> : null}

            <label className="block">
              <span className="block text-sm font-medium text-slate-700">
                Email
              </span>
              <input
                className="w-full outline-0 px-2 py-0.5 rounded"
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
              <span className="block text-sm font-medium text-slate-700">
                Password
              </span>
              <div className="relative">
                <input
                  className="w-full outline-0 px-2 py-0.5 rounded"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  {...register("password")}
                />
                {showPassword ? (
                  <Eye
                    className="absolute text-orange-500 top-0.5 right-2.5 w-5 cursor-pointer"
                    onClick={() => {
                      setShowPassword((prevState) => !prevState);
                    }}
                  />
                ) : (
                  <EyeOff
                    className="absolute text-orange-500 top-0.5 right-2.5 w-5 cursor-pointer"
                    onClick={() => {
                      setShowPassword((prevState) => !prevState);
                    }}
                  />
                )}
              </div>
              {errors.password ? (
                <span className="text-sm text-red-500">
                  {errors.password.message}
                </span>
              ) : null}
            </label>

            <label className="block">
              <span className="block text-sm font-medium text-slate-700">
                Confirm Password
              </span>
              <input
                className="w-full outline-0 px-2 py-0.5 rounded"
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword ? (
                <span className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </span>
              ) : null}
            </label>

            <input
              disabled={loading}
              type="submit"
              value={"Sign Up"}
              className={`w-full font-bold ${
                loading ? "bg-orange-300" : "bg-orange-500"
              } text-orange-50 py-2 rounded cursor-pointer`}
            />
          </form>
        </section>
      </main>
    </>
  );
}
