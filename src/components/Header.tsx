import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-1 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-[#f9a157]">
          {/* Food Precision Rx */}
          <img src="food-rx-logo.png" className="max-w-[400px] w-[80%]"/>
        </Link>
        <div className="space-x-4">
          <Link
            href="/about"
            className="text-gray-600 hover:text-[#f9a157] transition duration-300"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-gray-600 hover:text-[#f9a157] transition duration-300"
          >
            Contact
          </Link>
          <Link
            href="/loginform"
            className="bg-[#f9a157] text-white px-4 py-2 rounded hover:bg-[#fbcb66] transition duration-300"
          >
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}
