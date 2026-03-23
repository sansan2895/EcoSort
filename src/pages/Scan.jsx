import bgHero from "../assets/bgscaner.png";
import sampleImg from "../assets/upload.png";
import sample from "../assets/sample.png";
import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import runtah3 from "../assets/runtah3.jpeg";
import Footer from "../components/Footer";

function Scan() {

  const location = useLocation();
  const uploadRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleScroll = () => {
    uploadRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);

  const [showConvert, setShowConvert] = useState(false);
  const navigate = useNavigate();

  const analyzeImage = (filename) => {

    const name = filename.toLowerCase();

    let kategori = "Plastik";
    let jenis = "Anorganik";
    let saran = "Daur Ulang";
    let warna = "text-blue-600";
    let catatan = "";

    if (name.includes("runtah1")) {
      kategori = "Organik";
      jenis = "Organik";
      saran = "Kompos";
      warna = "text-red-600";
    }

    else if (name.includes("runtah2")) {
      kategori = "-";
      jenis = "Organik & Anorganik";
      saran = "-";
      warna = "text-gray-700";

      catatan =
        "Pisahkan sampah terlebih dahulu. Biru = Anorganik, merah = Organik";
    }

    setResult({
      kategori,
      jenis,
      warna,
      saran,
      catatan,
      berat: (Math.random() * 3 + 0.5).toFixed(1),
      jumlah: Math.floor(Math.random() * 5) + 1,
      confidence: 95,
    });

  };

  useEffect(() => {
    if (location.state && location.state.image) {

      const file = location.state.image;
      const name = file.name.toLowerCase();

      setImage(file);

      if (name.includes("runtah2")) {
        setPreview(runtah3);
      } else {
        setPreview(URL.createObjectURL(file));
      }

      analyzeImage(file.name);
    }
  }, [location]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const name = file.name.toLowerCase();

    setImage(file);

    if (name.includes("runtah2")) {
      setPreview(runtah3);
    } else {
      setPreview(URL.createObjectURL(file));
    }

    analyzeImage(file.name);
  };

  const [cart, setCart] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const handleSaveToCart = () => {

    if (!result) return;

    // ❌ tidak boleh simpan jika campuran
    if (result.jenis === "Organik & Anorganik") {

      setShowError(true);

      setTimeout(() => {
        setShowError(false);
      }, 1500);

      return;
    }

    const item = {
      id: Date.now(),
      jenis: result.jenis,
      kategori: result.kategori,
      berat: result.berat,
      jumlah: result.jumlah,
    };

    const newCart = [...cart, item];

    setCart(newCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(newCart)
    );

    setShowNotif(true);

    setTimeout(() => {
      setShowNotif(false);
    }, 1200);

    resetScan();

  };

  const handleDeleteItem = (id) => {

    const newCart = cart.filter((item) => item.id !== id);

    setCart(newCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(newCart)
    );

  };

  const handleConvertItem = (id) => {

    const item = cart.find((i) => i.id === id);

    if (!item) return;

    const newCart = cart.filter((i) => i.id !== id);

    setCart(newCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(newCart)
    );

    setShowConvert(true);

  };

  const resetScan = () => {
    setImage(null);
    setPreview(null);
    setResult(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>

      {/* HERO */}
      <div className="relative">

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgHero})` }}
        />

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative h-[380px] flex items-center px-6 md:px-20 text-white">

          <div>

            <h1 className="text-5xl font-bold">
              Scan Sampah
            </h1>

            <p className="mt-2">
              Upload foto sampah dan dapatkan reward
            </p>

            <button
              onClick={handleScroll}
              className="mt-5 bg-green-600 px-6 py-3 rounded-xl shadow-lg hover:bg-green-700"
            >
              Mulai Scan
            </button>

          </div>

        </div>
      </div>



      {/* BACKGROUND */}
      <div
        ref={uploadRef}
        className="bg-gradient-to-b from-green-50 via-white to-green-100 px-4 md:px-20 py-12"
      >

        <h2 className="text-2xl font-semibold mb-8">
          Upload Foto Sampah
        </h2>


        {/* GRID */}
        {/* GRID */}
        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


          {/* ================= LEFT COLUMN ================= */}
          <div className="flex flex-col gap-4">


            {/* UPLOAD */}
            <div className="bg-white/80 backdrop-blur rounded-3xl shadow-xl border border-green-100 p-6">

              <h3 className="font-semibold mb-4 text-gray-700">
                Upload Foto Sampah
              </h3>

              <div className="border-2 border-dashed border-green-200 rounded-2xl p-4 text-center">

                <img
                  src={sampleImg}
                  className="w-full h-44 object-cover rounded-xl mb-4"
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  className="hidden"
                  id="upload"
                  ref={fileInputRef}
                />

                <label
                  htmlFor="upload"
                  className="
            inline-block
            bg-green-600
            text-white
            px-5
            py-2
            rounded-xl
            cursor-pointer
            hover:bg-green-700
          "
                >
                  📷 Pilih Foto
                </label>

              </div>

            </div>


            {/* CART SMALL */}
            <div className="bg-white/80 backdrop-blur rounded-2xl shadow border border-green-100 p-4">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="text-2xl">🛒</div>

                  <div>

                    <p className="text-xs text-gray-500">
                      Keranjang
                    </p>

                    <p className="font-semibold text-green-600">
                      {cart.length} item
                    </p>

                  </div>

                </div>

                <button
                  onClick={() => setShowCart(true)}
                  className="
    bg-green-600
    text-white
    px-3
    py-1
    rounded-lg
    text-sm
    hover:bg-green-700
  "
                >
                  Lihat
                </button>

              </div>

            </div>

          </div>


          {/* ================= PREVIEW ================= */}
          <div className="bg-white/80 backdrop-blur rounded-3xl shadow-xl border border-green-100 p-6">

            <h3 className="font-semibold mb-3 text-gray-700">
              Preview
            </h3>

            <img
              src={preview || sample}
              className="w-full h-52 object-cover rounded-2xl mb-4"
            />

            <div className="space-y-2">

              <label className="text-sm text-gray-600">
                Jumlah Sampah
              </label>

              <div className="flex">

                <input
                  type="number"
                  placeholder="0"
                  className="w-full border rounded-l-xl px-3 py-2 focus:outline-green-500"
                />

                <select className="border border-l-0 rounded-r-xl px-3 py-2 bg-gray-50">
                  <option>kg</option>
                  <option>pcs</option>
                </select>

              </div>

            </div>

          </div>

          {/* RESULT */}
          <div className="bg-white/80 backdrop-blur rounded-3xl shadow-xl border border-green-100 p-6">

            <h3 className="font-semibold mb-4 text-gray-700">
              Hasil AI
            </h3>

            {result ? (
              <>

                <div className="space-y-3 text-sm">

                  {/* JENIS */}
                  <div className="flex justify-between items-center bg-gray-50 rounded-xl px-3 py-2">

                    <span className="text-gray-500">
                      Jenis
                    </span>

                    <span className={`${result.warna} font-semibold`}>
                      {result.jenis}
                    </span>

                  </div>


                  {/* KATEGORI */}
                  <div className="flex justify-between items-center bg-gray-50 rounded-xl px-3 py-2">

                    <span className="text-gray-500">
                      Kategori
                    </span>

                    <span className="font-medium">
                      {result.kategori}
                    </span>

                  </div>


                  {/* SARAN */}
                  <div className="flex justify-between items-center bg-gray-50 rounded-xl px-3 py-2">

                    <span className="text-gray-500">
                      Saran
                    </span>

                    <span className="font-medium text-green-600">
                      {result.saran}
                    </span>

                  </div>

                </div>


                {result.catatan && (
                  <div className="mt-2 text-red-500 text-sm">
                    ⚠ {result.catatan}
                  </div>
                )}


                {/* CONFIDENCE */}
                <div className="mt-4">

                  <div className="flex justify-between text-xs mb-1">
                    <span>Akurasi</span>
                    <span>{result.confidence}%</span>
                  </div>

                  <div className="w-full bg-gray-200 h-2 rounded">

                    <div
                      className="bg-green-500 h-2 rounded"
                      style={{
                        width: `${result.confidence}%`,
                      }}
                    />

                  </div>

                </div>


                {/* INPUT */}
                <div className="flex flex-col gap-2 mt-4">

                  <div className="flex gap-2 mb-3">

                    <div className="flex gap-2">

                      {/* JUMLAH */}
                      <div className="w-full">

                        <label className="text-xs text-gray-500">
                          Jumlah (pcs)
                        </label>

                        <div className="flex">

                          <input
                            value={result.jumlah}
                            readOnly
                            className="border rounded-l-xl px-3 py-2 w-full bg-gray-50"
                          />

                          <span className="bg-gray-100 border border-l-0 px-3 flex items-center rounded-r-xl text-sm">
                            pcs
                          </span>

                        </div>

                      </div>


                      {/* BERAT */}
                      <div className="w-full">

                        <label className="text-xs text-gray-500">
                          Berat (Gram)
                        </label>

                        <div className="flex">

                          <input
                            value={result.berat}
                            readOnly
                            className="border rounded-l-xl px-3 py-2 w-full bg-gray-50"
                          />

                          <span className="bg-gray-100 border border-l-0 px-3 flex items-center rounded-r-xl text-sm">
                            Gram
                          </span>

                        </div>

                      </div>

                    </div>

                  </div>

                  <button
                    onClick={handleSaveToCart}
                    className="
    bg-gradient-to-r
    from-green-500
    to-emerald-600
    text-white
    py-2
    rounded-xl
    shadow
    hover:shadow-lg
    hover:scale-105
    transition
  "
                  >
                    🛒 Simpan ke Keranjang
                  </button>

                </div>

              </>
            ) : (

              <div className="text-gray-400 text-sm">
                Upload gambar untuk melihat hasil AI
              </div>

            )}

          </div>


        </div >

      </div >


      <Footer />


      {
        showNotif && (

          <div className="fixed top-6 right-6 z-50">

            <div
              className="
        bg-green-600
        text-white
        px-5
        py-3
        rounded-xl
        shadow-lg
        animate-bounce
      "
            >
              ✅ Masuk ke keranjang
            </div>

          </div>

        )
      }

      {showError && (

        <div className="fixed top-6 right-6 z-50">

          <div
            className="
        bg-red-500
        text-white
        px-5
        py-3
        rounded-xl
        shadow-lg
        animate-bounce
      "
          >
            ❌ Sampah campuran tidak bisa disimpan
          </div>

        </div>

      )}

      {showCart && (

        <div className="fixed inset-0 z-50 flex items-center justify-center">

          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowCart(false)}
          />

          {/* modal */}
          <div className="relative bg-white rounded-3xl shadow-2xl w-[95%] md:w-[500px] max-h-[80vh] overflow-hidden">

            {/* header */}
            <div className="flex justify-between items-center px-6 py-4 border-b">

              <h3 className="font-semibold text-lg">
                🛒 Keranjang Sampah
              </h3>

              <button
                onClick={() => setShowCart(false)}
                className="text-gray-500 hover:text-black"
              >
                ✕
              </button>

            </div>


            {/* content */}
            <div className="p-4 max-h-[60vh] overflow-y-auto">

              {cart.length === 0 && (
                <p className="text-center text-gray-400">
                  Keranjang kosong
                </p>
              )}

              {cart.map((item) => (

                <div
                  key={item.id}
                  className="bg-gray-50 rounded-xl p-3 mb-3 flex justify-between items-center"
                >

                  <div>

                    <p className="font-semibold">
                      {item.jenis}
                    </p>

                    <p className="text-sm text-gray-500">
                      {item.kategori}
                    </p>

                    <p className="text-xs text-gray-400">
                      {item.jumlah} pcs • {item.berat} gram
                    </p>

                  </div>

                  <div className="flex gap-2">

                    <button
                      onClick={() => handleConvertItem(item.id)}
                      className="
      bg-yellow-500
      text-white
      px-2
      py-1
      rounded-lg
      text-xs
      hover:bg-yellow-600
    "
                    >
                      Convert
                    </button>

                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="
      bg-red-500
      text-white
      px-2
      py-1
      rounded-lg
      text-xs
      hover:bg-red-600
    "
                    >
                      Hapus
                    </button>

                  </div>

                </div>

              ))}

            </div>


            {/* footer */}
            <div className="border-t p-4 flex justify-between items-center">

              <p className="text-sm text-gray-600">
                Total item: {cart.length}
              </p>

              <button
                onClick={() => setShowCart(false)}
                className="bg-green-600 text-white px-4 py-2 rounded-xl"
              >
                Tutup
              </button>

            </div>

          </div>

        </div>

      )}

      {showConvert && (

        <div className="fixed inset-0 z-50 flex items-center justify-center">

          {/* overlay */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn" />

          {/* modal */}
          <div
            className="
        relative
        bg-white
        rounded-3xl
        shadow-2xl
        w-[92%]
        md:w-[420px]
        p-6
        text-center
        animate-scaleIn
      "
          >

            {/* ICON */}
            <div className="flex justify-center">

              <div
                className="
            w-20
            h-20
            rounded-full
            bg-gradient-to-br
            from-yellow-400
            to-orange-500
            flex
            items-center
            justify-center
            text-4xl
            shadow-lg
          "
              >
                🪙
              </div>

            </div>


            {/* TITLE */}
            <h3 className="text-xl font-bold mt-4">
              Convert Berhasil
            </h3>


            {/* TEXT */}
            <p className="text-gray-600 text-sm mt-2">

              Sampah berhasil dikonversi menjadi koin.

              <br />

              Koin akan masuk ke saldo anda
              dalam 1 - 2 hari kerja.

            </p>


            {/* INFO BOX */}
            <div
              className="
          mt-4
          bg-green-50
          border
          border-green-200
          rounded-xl
          p-3
          text-sm
          text-green-700
        "
            >
              ✔ Terima kasih sudah mendaur ulang sampah
            </div>


            {/* BUTTON */}
            <div className="flex gap-3 mt-5">

              <button
                onClick={() => setShowConvert(false)}
                className="
            w-full
            border
            rounded-xl
            py-2
            hover:bg-gray-100
          "
              >
                Tutup
              </button>

              <button
                onClick={() => {
                  setShowConvert(false);
                  navigate("/reward");
                }}
                className="
            w-full
            bg-gradient-to-r
            from-green-500
            to-emerald-600
            text-white
            py-2
            rounded-xl
            shadow
            hover:shadow-lg
            hover:scale-105
            transition
          "
              >
                Cek saldo koin
              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );
}

export default Scan;