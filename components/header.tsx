import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import { ProfileDropdown } from "./profile-dropdown";
import NavigationMenu from "./navigation-menu";

async function Header() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { data: profiles } = await supabase.from("profile").select();
  const profile = profiles?.[0];
  return (
    <>
      <header className="fixed bg-transparent w-full p-3 text-green-500 backdrop-blur-md border-b border-green-200 max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="font-bold text-2xl cursor-default">Project 1</div>
          {!session ? (
            <div className="space-x-5 text-xs hidden sm:block">
              <>
                <Link
                  href={"/sign-in"}
                  className="hover:bg-opacity-75  font-bold text-green-500 bg-neutral-800 px-3 py-2 rounded"
                >
                  Sign In
                </Link>
                <Link
                  href={"/sign-up"}
                  className="hover:bg-opacity-75 font-bold text-white bg-green-500 px-3 py-2 rounded"
                >
                  Sign Up
                </Link>
              </>
            </div>
          ) : (
            <div className="flex items-center">
              <ProfileDropdown
                name={profile?.username!}
                email={session.user.email!}
                imageUrl={undefined}
                postfix={
                  <div className="sm:hidden text-gray-500 cursor-pointer">
                    <NavigationMenu />
                  </div>
                }
              />
            </div>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
