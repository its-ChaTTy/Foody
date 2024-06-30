import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft } from "react-icons/fa";
import { FaBell, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import { logout } from "@/operations/auth.fetch";

export default function Navbar() {
  const [openNav, setOpenNav] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const handleResize = () => window.innerWidth >= 960 && setOpenNav(false);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    await logout(); 
    router.push("/auth/login");
  };
 
  const navList = (
    <ul className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-6">
      <li>
        <Link href="/pages">
          <FaBell className="text-xl cursor-pointer" />
        </Link>
      </li>
      <li>
        <Link href="/customer/cart">
          <FaShoppingCart className="text-xl cursor-pointer" />
        </Link>
      </li>
      <li>
        <div onClick={handleLogout}>
          <FaSignOutAlt className="text-xl cursor-pointer" />
        </div>
      </li>
    </ul>
  );

  return (
    <div className="sticky top-0 z-10 bg-white">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/">
          <span style={{ fontWeight: 'bold', fontStyle: 'italic', fontSize: '24px' }}>Foody</span>
        </Link>
        <div className="lg:hidden">
          <button onClick={() => setOpenNav(!openNav)}>
            <Image src="/icon.png" alt="Menu" width={24} height={24} />
          </button>
        </div>
        <div className={`lg:flex ${openNav ? 'flex' : 'hidden'}`}>
          {navList}
          <div className="flex gap-x-1">
            <button className="px-4 py-2 text-sm">Log In</button>
            <button className="px-4 py-2 text-sm bg-blue-500 text-white">Sign Up</button>
          </div>
        </div>
      </div>
      {openNav && (
        <div className="lg:hidden">
          {navList}
          <div className="flex gap-x-1">
            <button className="w-full px-4 py-2 text-sm">Log In</button>
            <button className="w-full px-4 py-2 text-sm" style={{ backgroundColor: '#7c633d', color: 'white' }}>Sign Up</button>
          </div>
        </div>
      )}
    </div>
  );
}