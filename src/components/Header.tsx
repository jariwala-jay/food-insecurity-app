import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Food Precision Rx
        </Link>
        <div className="space-x-4">
          <Link
            href="/about"
            className="text-gray-600 hover:text-blue-600 transition duration-300"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-gray-600 hover:text-blue-600 transition duration-300"
          >
            Contact
          </Link>
          <Link
            href="/loginform"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}
