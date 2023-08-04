import { createServerSupabaseClient } from "@/clients/supabase-server-client";
import Link from "next/link";
import NavigationMenu from "./navigation-menu";
import { ProfileDropdown } from "./profile-dropdown";

async function Header() {
  const supabase = createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <header className="fixed w-full h-16 sm:h-20 text-green-500">
        <div className="flex">
          <div className="hidden xl:block w-2/12"></div>
          <div className="flex-1">
            <div className="flex-1 mx-auto flex justify-between items-center xl:px-0 bg-transparent backdrop-blur-md py-3.5 px-2.5 sm:pt-5 sm:pt-4.5">
              <div className="font-bold text-2xl sm:text-3xl cursor-default">
                Project 1
              </div>
              {!user ? (
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
                    name={user.user_metadata.name}
                    isAdmin={user.user_metadata.is_admin!}
                    email={user.email!}
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
            <div className="border-b border-green-500 "></div>
          </div>
          <div className="hidden xl:block w-2/12"></div>
        </div>
      </header>
    </>
  );
}

export default Header;
