"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSessions, getProviders } from 'next-auth/react';
 
const Nav = () => {
  const isUserLoggedIn = true;
  
  const [ providers, setProviders ] = useState(null); //Needed for the singIn fucntionality
  const [toggleDropDown, setToggleDropDown] = useState(false);

  // Sett Providers taht only runs at the start
  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }

    setProviders();
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image 
          src="/assets/images/logo.svg"
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href="/profile">
              <Image 
                src="/assets/images/logo.svg"
                alt="Profie"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ): (
          <>
            {providers && // Code for a Auth signup button. This specifici only uses Google Auth, but multiple can be added
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {isUserLoggedIn ? (
          <div className="flex">
            <Image 
                src="/assets/images/logo.svg"
                alt="Profie"
                width={37}
                height={37}
                className="rounded-full"
                onClick={() => setToggleDropDown((prev)  => !prev)}
              />
              {toggleDropDown && (
                <div className="dropdown">
                  <Link
                    href="/profile"
                    className="dropdown_link"
                    onClick={() => setToggleDropDown
                      (false)} 
                  >
                  My Profile
                  </Link>
                  <Link
                    href="/create-prompt"
                    className="dropdown_link"
                    onClick={() => setToggleDropDown
                      (false)} 
                  >
                  Create Prompt
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setToggleDropDown(false);
                      signOut();
                    }}
                    className="mt-5 w-full black_btn"
                  >
                    Sign Out
                  </button>
                </div>

              )}
          </div>
        ): (
          <>
            {providers && // Code for a Auth signup button. This specifici only uses Google Auth, but multiple can be added
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                  >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

    </nav>
  )
}

export default Nav