// Menu.js
"use client";
import * as React from "react";
import MenuList from "@/components/menu/MenuList";
import { Input } from "@/components/ui/input";
import {
  SidebarProvider,
  SidebarTrigger,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Slider } from "@/components/ui/slider";
import { useSelector } from "react-redux";
import MenuDetail from "@/components/menu/MenuDetail";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AvatarNav from "@/components/menuNav/Avatar";
import CartNav from "@/components/menuNav/Cart";

function Menu() {
  const { menuById } = useSelector((state) => state.menu);

  return (
    <div className="flex bg-[#C0AF90]">
      <SidebarProvider
        style={{
          "--sidebar-width": "20rem",
          "--sidebar-width-mobile": "20rem",
        }}
      >
        <Sidebar className="fixed">
          <SidebarContent className="bg-earth px-6">
            <SidebarGroup>
              <SidebarGroupLabel className="text-white ml-10 text-4xl mb-16 mt-6">
                Le Café
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-4">
                    Search
                  </label>
                  <Input type="email" placeholder="Search" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-4">
                    Category
                  </label>
                  <Select>
                    <SelectTrigger className="w-full mb-4">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Delivery">Coffe</SelectItem>
                      <SelectItem value="Dine-in">Non-coffe</SelectItem>
                      <SelectItem value="Dine-in">Food</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-4">
                    Price
                  </label>
                  <Slider defaultValue={[33]} max={100} step={1} />
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <div className="w-full">
          <div className="w-full h-10 flex items-center justify-between p-8 bg-earth4">
            <div className="flex items-center">
              <SidebarTrigger className="hover:bg-earth4" />
              <Breadcrumb className="px-10">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/menu">Menu</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    {menuById ? (
                      <>
                        <BreadcrumbSeparator />
                        <BreadcrumbPage>{menuById?.mn_name}</BreadcrumbPage>
                      </>
                    ) : null}
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex items-center gap-6">
              <AvatarNav />
              <CartNav />
            </div>
          </div>
          <main className="px-10 py-6">
            {menuById ? <MenuDetail /> : <MenuList />}
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}

export default Menu;
