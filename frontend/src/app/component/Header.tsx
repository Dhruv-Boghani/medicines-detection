"use client";
// src/components/layout/header.tsx
import { Button } from "@/components/ui/button";
import { Menu, User, Tablet, X } from "lucide-react"; // Import all necessary icons
import Link from "next/link";
import React, { useState } from "react"; // Import useState hook
import { LoginDialog } from "./auth/Login";
import { RegisterDialog } from "./auth/Register";
import { useAuth } from "./auth/AuthContext";
import { ProfileDialog } from "./Profile";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to manage mobile menu visibility
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false); // State to manage profile dialog visibility, set to true to open by default
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="flex h-16 items-center justify-between px-4 lg:px-8 border-b border-gray-200 bg-white">
      {/* Logo */}
      <div className="flex items-center gap-2">
        {/* Placeholder for actual logo image */}
        <Tablet className="h-6 w-6 text-blue-600" />
        <span className="text-xl font-bold text-blue-700">MediLink</span>
      </div>

      {/* Navigation Links (Desktop) */}
      <nav className="hidden md:flex items-center gap-6">
        <Link // Changed from Link to a
          href="/"
          className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors"
        >
          Home
        </Link>

        <a
          href="scan-medicineDialog"
          className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors"
        >
          Scan Now
        </a>
        <a
          href="help"
          className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors"
        >
          Help
        </a>
      </nav>

      {/* Search Input and User/Menu Icons */}
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <Button onClick={logout} className="bg-red-600 hover:bg-red-700">
            Logout
          </Button>
        ) : (
          <>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setIsLoginDialogOpen(true)}
            >
              Login
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => setIsRegisterDialogOpen(true)}
            >
              Register
            </Button>
          </>
        )}
        {isLoginDialogOpen && (
          <LoginDialog onClose={() => setIsLoginDialogOpen(false)} />
        )}
        {isRegisterDialogOpen && (
          <RegisterDialog onClose={() => setIsRegisterDialogOpen(false)} />
        )}

        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex cursor-pointer"
          onClick={() => setIsProfileDialogOpen(true)}
        >
          <ProfileDialog
            isOpen={isProfileDialogOpen}
            onClose={() => setIsProfileDialogOpen(false)}
          />
          <span className="sr-only">User</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMobileMenu} // Add onClick handler
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5 text-gray-600 cursor-pointer" /> // Show close icon when menu is open
          ) : (
            <Menu className="h-5 w-5 text-gray-600 cursor-pointer" /> // Show menu icon when menu is closed
          )}
          <span className="sr-only">
            {isMobileMenuOpen ? "Close menu" : "Toggle menu"}
          </span>
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-b border-gray-200 shadow-md md:hidden z-50">
          <nav className="flex flex-col items-center py-4 gap-4">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 text-base font-medium transition-colors"
              onClick={toggleMobileMenu} // Close menu on link click
            >
              Home
            </Link>

            <Link // Changed from Link to a
              href="scan-medicineDialog"
              className="text-blue-600 font-semibold text-base"
              onClick={toggleMobileMenu} // Close menu on link click
            >
              Scan Now
            </Link>
            <Link // Changed from Link to a
              href="help"
              className="text-gray-700 hover:text-blue-600 text-base font-medium transition-colors"
              onClick={toggleMobileMenu} // Close menu on link click
            >
              Help
            </Link>

            <Button
              variant="ghost"
              className="w-full text-gray-700 hover:text-blue-600"
              onClick={() => {
                setIsProfileDialogOpen(true);
                setIsMobileMenuOpen(false); // Close mobile menu when opening dialog
              }}
            >
              <User className="h-5 w-5 mr-2" />
              User Profile
            </Button>
          </nav>
        </div>
      )}

      {/* Profile Dialog */}
    </header>
  );
}
