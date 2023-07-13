"use client";
import React, { useState } from "react";
import { Menu, X } from "react-feather";

function NavigationMenu() {
  const [showNavMenu, setShowNavMenu] = useState<boolean>(false);
  return (
    <>
      {showNavMenu ? (
        <X onClick={() => setShowNavMenu(false)} />
      ) : (
        <Menu onClick={() => setShowNavMenu(true)} />
      )}
    </>
  );
}

export default NavigationMenu;
