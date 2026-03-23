import { QRCodeCanvas } from "qrcode.react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import bgHero from "../assets/bgreward.png";
import card1 from "../assets/rwc1.png";
import card2 from "../assets/rwc2.png";
import card3 from "../assets/rwc3.png";
import Footer from "../components/Footer";


function Reward() {
  const [history, setHistory] = useState([]);
  const [cart, setCart] = useState([]);

  const [filter, setFilter] = useState("semua");
  const [showCart, setShowCart] = useState(false);
  const [showUse, setShowUse] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState(null);
  const [walletType, setWalletType] = useState("");
  const [phone, setPhone] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [receiver, setReceiver] = useState("");
  const [address, setAddress] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [animateCart, setAnimateCart] = useState(false);

  const rewards = [
    { id: 1, name: "Voucher Belanja 50K", points: 500, img: card1, type: "voucher" },
    { id: 2, name: "E-Wallet 100K", points: 1500, img: card2, type: "ewallet" },
    { id: 3, name: "Tumbler", points: 500, img: card3, type: "barang" },
  ];

  const filteredRewards =
    filter === "semua"
      ? rewards
      : rewards.filter((r) => r.type === filter);

  const handleConfirm = (item) => {
    setSelectedItem(item);
    setShowConfirm(true);
  };

  const handleTukar = () => {
    if (!selectedItem) return;

    if (points < selectedItem.points) {

      setToast({
        type: "error",
        message: "Poin tidak mencukupi",
      });

      setTimeout(() => {
        setToast(null);
      }, 2500);

      return;
    }

    setAnimateCart(true);

    setTimeout(() => {
      const newItem = {
        ...selectedItem,
        code: "ECO-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
        status: "available",
      };

      setPoints(points - selectedItem.points);
      setCart([newItem, ...cart]);

      setHistory([
        {
          name: selectedItem.name,
          action: "Tukar",
          date: new Date().toLocaleString(),
        },
        ...history,
      ]);

      setAnimateCart(false);
    }, 400);

    setShowConfirm(false);
  };

  const handleUse = (item, index) => {
    if (item.status === "used") return;

    const updated = [...cart];
    updated[index].status = "used";

    setCart(updated);
    setSelectedItem(updated[index]);
    setShowUse(true);

    setHistory([
      {
        name: item.name,
        action: "Digunakan",
        date: new Date().toLocaleString(),
      },
      ...history,
    ]);
  };

  const [points, setPoints] = useState(() => {
    const saved = localStorage.getItem("points");
    if (saved === null) {
      localStorage.setItem("points", JSON.stringify(3500));
      return 3500;
    }
    return JSON.parse(saved);
  });
  useEffect(() => {
    localStorage.setItem("points", JSON.stringify(points));
  }, [points]);

  return (
    <>
      {/* HERO */}
      <div className="relative h-[360px]">

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgHero})` }}
        />

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative h-full flex items-center px-10">

          <div className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-xl">

            <h1 className="text-4xl font-bold">
              Tukar Poin
            </h1>

            <p className="text-gray-600 mt-2">
              Saldo Anda
            </p>

            <p className="text-3xl text-green-600 font-bold">
              {points} Poin
            </p>

          </div>

        </div>

      </div>



      {/* BACKGROUND */}
      <div className="bg-gradient-to-b from-green-50 via-white to-green-100 px-6 py-10">


        {/* FILTER */}
        <div className="flex flex-wrap gap-2 mb-6">

          {["semua", "voucher", "ewallet", "barang"].map((f) => (

            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1 rounded-full text-sm shadow transition ${filter === f
                ? "bg-green-600 text-white"
                : "bg-white border"
                }`}
            >
              {f}
            </button>

          ))}

          <motion.button
            animate={animateCart ? { scale: [1, 1.2, 1] } : {}}
            onClick={() => setShowCart(true)}
            className="ml-auto bg-green-600 text-white px-4 py-2 rounded-xl shadow"
          >
            🛒 ({cart.length})
          </motion.button>

        </div>



        {/* LIST */}
        <div className="grid md:grid-cols-3 gap-6">

          {filteredRewards.map((item) => (

            <motion.div
              key={item.id}
              whileHover={{ y: -5 }}
              className="bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-green-100 p-4"
            >

              <img
                src={item.img}
                className="h-40 w-full object-cover rounded-xl"
              />

              <h3 className="text-center font-semibold mt-2">
                {item.name}
              </h3>

              <p className="text-center text-green-600">
                {item.points} poin
              </p>

              <button
                onClick={() => handleConfirm(item)}
                className="mt-3 w-full bg-green-600 text-white py-2 rounded-xl shadow"
              >
                Tukar
              </button>

            </motion.div>

          ))}

        </div>

        {/* CONFIRM MODAL */}
        {showConfirm && selectedItem && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-2xl shadow-xl p-6 w-[320px] text-center">

              <h3 className="text-lg font-bold">
                Konfirmasi Tukar
              </h3>

              <p className="mt-2 text-sm">
                Tukar <b>{selectedItem.name}</b>
                <br />
                dengan {selectedItem.points} poin ?
              </p>

              <div className="flex gap-2 mt-4">

                <button
                  onClick={() => setShowConfirm(false)}
                  className="w-full bg-gray-300 py-2 rounded-xl"
                >
                  Batal
                </button>

                <button
                  onClick={handleTukar}
                  className="w-full bg-green-600 text-white py-2 rounded-xl"
                >
                  Ya, Tukar
                </button>

              </div>

            </div>

          </div>
        )}


        {/* CART MODAL */}
        {showCart && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-2xl shadow-xl w-[360px] p-5">

              <h3 className="font-bold mb-3">
                Keranjang Reward
              </h3>

              {cart.length === 0 && (
                <p className="text-gray-400 text-center">
                  Keranjang kosong
                </p>
              )}

              <div className="flex flex-col gap-2">

                {cart.map((item, i) => (

                  <div
                    key={i}
                    className="flex justify-between items-center border rounded-lg px-3 py-2"
                  >

                    <div>

                      <p className="text-sm font-semibold">
                        {item.name}
                      </p>

                      <p className="text-xs text-gray-400">
                        {item.status}
                      </p>

                    </div>

                    <button
                      onClick={() => handleUse(item, i)}
                      disabled={item.status === "used"}
                      className={
                        item.status === "used"
                          ? "text-gray-400"
                          : "text-green-600"
                      }
                    >
                      {item.status === "used" ? "Sudah" : "Gunakan"}
                    </button>

                  </div>

                ))}

              </div>

              <button
                onClick={() => setShowCart(false)}
                className="mt-4 w-full bg-gray-200 py-2 rounded-xl"
              >
                Tutup
              </button>

            </div>

          </div>
        )}

        {/* USE MODAL */}
        {showUse && selectedItem && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white p-6 rounded-2xl w-[340px]">

              <h3 className="font-bold text-center mb-3">
                Gunakan Reward
              </h3>

              <p className="text-center text-sm mb-4">
                {selectedItem.name}
              </p>


              {/* ================= VOUCHER ================= */}
              {selectedItem.type === "voucher" && (

                <div className="flex flex-col items-center gap-3">

                  <div className="bg-gray-100 p-3 rounded-xl">
                    <QRCodeCanvas
                      value={selectedItem.code}
                      size={150}
                    />
                  </div>

                  <div className="bg-gray-100 px-3 py-2 rounded text-sm font-mono">
                    {selectedItem.code}
                  </div>

                </div>

              )}


              {/* ================= EWALLET ================= */}
              {selectedItem.type === "ewallet" && (

                <div className="flex flex-col gap-2">

                  <select
                    className="border rounded-lg p-2"
                    value={walletType}
                    onChange={(e) => setWalletType(e.target.value)}
                  >
                    <option value="">Pilih E-Wallet</option>
                    <option>DANA</option>
                    <option>OVO</option>
                    <option>GoPay</option>
                  </select>

                  <input
                    placeholder="Nomor Telepon"
                    className="border rounded-lg p-2"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />

                </div>

              )}


              {/* ================= BARANG ================= */}
              {selectedItem.type === "barang" && (

                <div className="flex flex-col gap-2">

                  <input
                    placeholder="Nama Penerima"
                    className="border rounded-lg p-2"
                    value={receiver}
                    onChange={(e) => setReceiver(e.target.value)}
                  />

                  <input
                    placeholder="Nomor Telepon"
                    className="border rounded-lg p-2"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />

                  <textarea
                    placeholder="Alamat Lengkap"
                    className="border rounded-lg p-2"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />

                </div>

              )}


              <button
                onClick={() => {

                  if (selectedItem.type === "voucher") {
                    setSuccessMsg("Voucher berhasil digunakan");
                  }

                  if (selectedItem.type === "ewallet") {
                    setSuccessMsg(
                      "E-Wallet berhasil ditukarkan, saldo akan masuk dalam 1-2 hari kerja"
                    );
                  }

                  if (selectedItem.type === "barang") {
                    setSuccessMsg(
                      "Paket akan dikirim ke alamat yang telah diisi"
                    );
                  }

                  setShowUse(false);
                  setShowSuccess(true);

                }}
                className="mt-4 w-full bg-green-600 text-white py-2 rounded-xl"
              >
                Selesai
              </button>

            </div>

          </div>
        )}


        {/* HISTORY */}
        <div className="mt-10">

          <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-6">

            <h3 className="text-lg font-bold mb-4">
              Riwayat Aktivitas
            </h3>

            {history.length === 0 && (
              <div className="text-center text-gray-400 py-6">
                Belum ada aktivitas
              </div>
            )}


            <div className="flex flex-col gap-3">

              {history.map((h, i) => {

                const isTukar = h.action === "Tukar";
                const isUse = h.action === "Digunakan";

                return (

                  <div
                    key={i}
                    className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition rounded-xl px-4 py-3 border"
                  >

                    {/* LEFT */}
                    <div className="flex items-center gap-3">

                      <div
                        className={`w-10 h-10 flex items-center justify-center rounded-full text-white
                  ${isTukar ? "bg-green-500" : ""}
                  ${isUse ? "bg-blue-500" : ""}
                `}
                      >
                        {isTukar && "🎁"}
                        {isUse && "✅"}
                      </div>

                      <div>

                        <p className="font-semibold text-sm">
                          {h.name}
                        </p>

                        <p className="text-xs text-gray-500">
                          {h.action}
                        </p>

                      </div>

                    </div>


                    {/* RIGHT */}
                    <div className="text-xs text-gray-400 text-right">
                      {h.date}
                    </div>

                  </div>

                );

              })}

            </div>

          </div>

        </div>

      </div>

      {/* TOAST */}
      {toast && (
        <div className="fixed top-5 right-5 z-[999]">

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            className={`
        px-4 py-3 rounded-xl shadow-xl text-white
        ${toast.type === "error" ? "bg-red-500" : ""}
        ${toast.type === "success" ? "bg-green-600" : ""}
      `}
          >
            {toast.message}
          </motion.div>

        </div>
      )}

      {/* SUCCESS MODAL */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-[999]">

          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 w-[320px] text-center shadow-2xl"
          >

            <div className="text-5xl mb-2">
              ✅
            </div>

            <h3 className="font-bold text-lg">
              Berhasil
            </h3>

            <p className="text-sm text-gray-600 mt-2">
              {successMsg}
            </p>

            <button
              onClick={() => setShowSuccess(false)}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-xl"
            >
              OK
            </button>

          </motion.div>

        </div>
      )}

      <Footer />
    </>
  );
}

export default Reward;