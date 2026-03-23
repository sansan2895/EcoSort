import heroImg from "../assets/bgcontact.png";
import contactImg from "../assets/contact.png";
import { useState } from "react";
import Footer from "../components/Footer";

function Contact() {

  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = () => {

    setShowPopup(true);

    document.getElementById("formContact").reset();

    setTimeout(() => {
      setShowPopup(false);
    }, 2000);

  };

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

          <h1 className="text-4xl md:text-5xl font-bold">
            Hubungi Kami
          </h1>

          <p className="mt-3 text-gray-200">
            Silakan kirim pesan kepada tim EcoSort.
            Kami akan merespon secepat mungkin.
          </p>

          <a href="#hubungi">

            <button className="mt-5 bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded-xl shadow-lg">
              Kirim Pesan
            </button>

          </a>

        </div>

      </div>

      <div className="bg-gradient-to-b from-green-50 via-white to-green-100">

        {/* FORM */}
        <div
          id="hubungi"
          className="px-6 md:px-16 py-16"
        >

          <div className="grid md:grid-cols-2 gap-12 items-start">


            {/* LEFT */}
            <div>

              <h2 className="text-2xl font-bold mb-4">
                Hubungi Kami
              </h2>

              <p className="mb-6 text-gray-600 max-w-md">
                Isi form di bawah untuk menghubungi kami.
              </p>



              {/* FORM */}
              <form
                id="formContact"
                className="space-y-4"
              >

                <div className="bg-white/80 backdrop-blur rounded-xl shadow flex items-center px-3">

                  <span className="text-green-600 mr-2">👤</span>

                  <input
                    type="text"
                    placeholder="Nama"
                    className="w-full p-3 outline-none bg-transparent"
                  />

                </div>


                <div className="bg-white/80 backdrop-blur rounded-xl shadow flex items-center px-3">

                  <span className="text-green-600 mr-2">✉️</span>

                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 outline-none bg-transparent"
                  />

                </div>


                <div className="bg-white/80 backdrop-blur rounded-xl shadow flex items-center px-3">

                  <span className="text-green-600 mr-2">📄</span>

                  <input
                    type="text"
                    placeholder="Subjek"
                    className="w-full p-3 outline-none bg-transparent"
                  />

                </div>


                <div className="bg-white/80 backdrop-blur rounded-xl shadow flex px-3">

                  <span className="text-green-600 mr-2 mt-3">💬</span>

                  <textarea
                    rows="4"
                    placeholder="Pesan"
                    className="w-full p-3 outline-none bg-transparent"
                  />

                </div>


                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full bg-green-600 hover:bg-green-700 transition text-white py-3 rounded-xl shadow-lg"
                >
                  Kirim Pesan
                </button>

              </form>

            </div>



            {/* RIGHT */}
            <div className="flex flex-col gap-4">

              <img
                src={contactImg}
                className="rounded-3xl shadow-xl"
              />


              <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl p-6">

                <div className="space-y-4 text-gray-700">

                  <div className="flex gap-3 items-center border-b pb-3">
                    📞 +62 812 3456 7890
                  </div>

                  <div className="flex gap-3 items-center border-b pb-3">
                    ✉️ peduliAlam@ecosort.id
                  </div>

                  <div className="flex gap-3 items-center">
                    📍 Bandung, Indonesia
                  </div>

                </div>

              </div>

            </div>


          </div>

        </div>



        {/* POPUP */}
        {showPopup && (

          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

            <div className="bg-white px-8 py-6 rounded-2xl shadow-xl text-center animate-scale">

              <div className="text-4xl mb-2">
                ✅
              </div>

              <h3 className="font-semibold">
                Pesan berhasil dikirim
              </h3>

              <p className="text-sm text-gray-500">
                Tim EcoSort akan segera membalas
              </p>

            </div>

          </div>

        )}

      </div>

      <Footer />

    </>

  );
}

export default Contact;