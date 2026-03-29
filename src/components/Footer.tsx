import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="font-bold text-lg text-white">DiabetesShop</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Improving quality of life for people living with diabetes through
              quality products and reliable information.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="hover:text-teal-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-teal-400 transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/info/about" className="hover:text-teal-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/info/shipping" className="hover:text-teal-400 transition-colors">
                  Shipping &amp; Returns
                </Link>
              </li>
              <li>
                <Link href="/basket" className="hover:text-teal-400 transition-colors">
                  Basket
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">
              Contact
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>info@example.com</li>
              <li>+48 123 456 789</li>
              <li>Mon–Fri: 9:00–17:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-xs text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} DiabetesShop. Not a medical provider. Always consult
            your healthcare provider.
          </p>
        </div>
      </div>
    </footer>
  );
}
