import heroImg from "../assets/bgabout.png";
import visiImg from "../assets/visim.png";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";;

function About() {
  return (
    <>
      {/* HERO */}
      <div className="relative py-20 px-6 md:px-16 overflow-hidden">

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImg})`,
          }}
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-white max-w-xl">

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Tentang <span className="text-green-400">EcoSort</span>
          </h1>

          <p className="mb-6 text-gray-200">
            Platform pintar untuk mengelola sampah,
            menggunakan AI dan sistem reward modern.
          </p>

          <Link to="/scan">
            <button className="bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded-xl shadow-lg">
              Mulai Scan
            </button>
          </Link>

        </div>

      </div>

      <div className="bg-gradient-to-b from-green-50 via-white to-green-100">

        {/* VISI MISI */}
        <div className="px-6 md:px-16 py-16">

          <div className="max-w-5xl">

            <p className="text-gray-700 mb-10">
              EcoSort adalah platform berbasis AI yang membantu pengguna
              memilah sampah dengan mudah hanya melalui scan foto.
              Setiap aktivitas akan mendapatkan poin yang bisa ditukar
              dengan reward menarik.
            </p>

            <h2 className="text-2xl font-bold mb-8">
              Visi dan Misi
            </h2>

          </div>


          <div className="grid md:grid-cols-2 gap-10 items-center">

            {/* kiri */}
            <div className="space-y-6">

              <div className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow">

                <h3 className="font-semibold text-lg mb-2">
                  🌍 Visi
                </h3>

                <p className="text-gray-600">
                  Mewujudkan lingkungan bersih berbasis teknologi
                  dengan sistem reward yang memotivasi masyarakat.
                </p>

              </div>


              <div className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow">

                <h3 className="font-semibold text-lg mb-2">
                  ♻️ Misi
                </h3>

                <ul className="space-y-1 text-gray-600">
                  <li>✔ Edukasi pemilahan sampah</li>
                  <li>✔ Meningkatkan kesadaran lingkungan</li>
                  <li>✔ Memberikan reward poin</li>
                </ul>

              </div>

            </div>


            {/* kanan */}
            <div className="relative">

              <img
                src={visiImg}
                className="rounded-3xl shadow-xl"
              />

              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl">

                <p className="font-semibold text-green-600">
                  EcoSort AI System
                </p>

                <p className="text-xs text-gray-500">
                  Smart Waste Management
                </p>

              </div>

            </div>

          </div>

        </div>



        {/* KEUNGGULAN */}
        <div className="px-6 md:px-16 py-16">

          <h2 className="text-2xl font-bold mb-10">
            Keunggulan EcoSort
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">


            {[
              {
                icon: "🤖",
                title: "AI Scan",
                desc: "Deteksi sampah otomatis",
              },
              {
                icon: "🧠",
                title: "Smart System",
                desc: "AI mengenali kategori",
              },
              {
                icon: "🎁",
                title: "Reward",
                desc: "Tukar poin hadiah",
              },
              {
                icon: "🌱",
                title: "Eco Friendly",
                desc: "Peduli lingkungan",
              },
            ].map((item, i) => (

              <div
                key={i}
                className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow hover:shadow-xl transition relative overflow-hidden"
              >

                <div className="absolute top-0 right-0 w-24 h-24 bg-green-200 blur-2xl opacity-40 rounded-full" />

                <div className="relative text-center">

                  <div className="text-3xl mb-3">
                    {item.icon}
                  </div>

                  <h3 className="font-semibold text-green-700">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-600">
                    {item.desc}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>



        {/* AI + REWARD */}
        <div className="px-6 md:px-16 py-8">

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow">

              <h3 className="font-semibold text-green-700 mb-2">
                🤖 AI Scan Sampah
              </h3>

              <p className="text-gray-600">
                Scan foto sampah dan sistem AI akan mendeteksi
                jenis sampah secara otomatis.
              </p>

            </div>


            <div className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow">

              <h3 className="font-semibold text-green-700 mb-2">
                🎁 Reward System
              </h3>

              <p className="text-gray-600">
                Kumpulkan poin dan tukarkan dengan voucher,
                e-wallet, atau hadiah menarik.
              </p>

            </div>

          </div>

        </div>
      </div>


      <Footer />

    </>
  );
}

export default About;