"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { User, Settings, LogOut, ChevronDown } from "lucide-react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function UserMenu() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  if (!session?.user) {
    return null;
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center space-x-2 h-auto p-2 hover:bg-gray-100"
        >
          <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-medium">
            {session.user.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="hidden lg:flex flex-col items-start">
            <span className="text-sm font-medium text-gray-900">
              {session.user.name}
            </span>
            <span className="text-xs text-gray-500">
              {session.user.email}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5 lg:hidden">
          <div className="font-medium text-sm">{session.user.name}</div>
          <div className="text-xs text-gray-500">{session.user.email}</div>
        </div>

        <DropdownMenuSeparator className="lg:hidden" />

        <DropdownMenuItem asChild>
          <Link href="/perfil" className="flex items-center cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Configurações</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleSignOut}
          className="text-red-600 focus:text-red-600 cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}