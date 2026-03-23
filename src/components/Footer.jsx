import bgFooter from "../assets/footer.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgFooter})`,
        }}
      ></div>

      {/* Overlay PUTIH TIPIS (biar gambar tetap keliatan) */}
      {/* <div className="absolute inset-0 bg-white/40"></div> */}

      {/* Gradient halus dari bawah */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/30 to-transparent"></div>

      {/* Content */}
      <div className="relative px-6 md:px-16 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo */}
        <div>
          <h2 className="text-3xl font-bold text-green-600 mb-3">
            <Link to="/"><b>EcoSort</b></Link>
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            Platform pintar untuk membantu memilah dan mendaur ulang sampah
            demi lingkungan yang lebih hijau.
          </p>
        </div>

        {/* Menu */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Menu</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <Link to="/dashboard" className="hover:text-green-600 transition">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/scan" className="hover:text-green-600 transition">
                Scan
              </Link>
            </li>
            <li>
              <Link to="/reward" className="hover:text-green-600 transition">
                Reward
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-green-600 transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-green-600 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Kontak</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>Email: EcoShort@gmail.com</li>
            <li>Telp: +62 895-9999-6666</li>
            <li>Bandung, Indonesia</li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="relative border-t border-gray-300 py-4 text-center text-sm text-gray-600">
        © 2026 EcoSort.
      </div>

    </footer>
  )
}