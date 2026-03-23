import bgHero from "../assets/background-beranda.png";
import card1 from "../assets/Sampahcard.png";
import card2 from "../assets/pts.png";
import card3 from "../assets/tsampah.png";
import { Link, useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { useRef, useState, useEffect } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Footer from "../components/Footer";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [userName, setUserName] = useState("");
  const [points, setPoints] = useState(3500);

  useEffect(() => {
    const savedPoints = localStorage.getItem("points");
    const user = localStorage.getItem("loginUser");

    if (user) {
      const data = JSON.parse(user);
      setUserName(data.nama);
    }

    if (savedPoints === null) {
      localStorage.setItem("points", JSON.stringify(3500));
      setPoints(3500);
    } else {
      setPoints(JSON.parse(savedPoints));
    }
  }, []);

  const navigate = useNavigate();
  const fileRef = useRef();

  return (
    <>
      {/* HERO */}
      <div className="relative border-t bg-gray-50">

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgHero})` }}
        />

        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative h-[360px] flex items-center">
          <div className="z-10 px-10 md:px-20 text-white">

            <h1 className="text-5xl font-bold">
              Dashboard
            </h1>

            <p className="mt-2 text-lg">
              Selamat datang kembali,{" "}
              <span className="text-green-600 font-semibold">
                {userName}
              </span>
            </p>

            <Link
              to="/scan"
              className="inline-block mt-5 bg-green-600 px-6 py-3 rounded-xl shadow-lg hover:bg-green-700 transition"
            >
              Mulai Scan
            </Link>

          </div>
        </div>
      </div>



      {/* BACKGROUND SECTION */}
      <div className="bg-gradient-to-b from-green-50 via-white to-green-100 py-10 px-4 md:px-12">


        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">


          {/* CARD 1 */}
          <div
            className="
    bg-white/80 backdrop-blur
    rounded-3xl
    shadow-xl
    hover:shadow-2xl
    transition
    p-6
    flex flex-col items-center
    border border-green-100
    hover:-translate-y-2
    hover:border-green-300
    group
  "
          >

            {/* IMAGE */}
            <div className="relative w-full">

              <img
                src={card1}
                className="w-full h-36 object-cover rounded-2xl"
              />

              {/* overlay icon */}
              <div
                className="
        absolute
        top-3 right-3
        bg-white/80
        backdrop-blur
        rounded-full
        px-3 py-1
        text-xs
        font-medium
        text-green-700
        shadow
      "
              >
                AI Scan
              </div>

            </div>


            {/* TITLE */}
            <h3 className="font-semibold text-lg mt-4 text-gray-800">
              Upload Foto Sampah
            </h3>


            {/* DESC */}
            <p className="text-gray-500 text-sm mt-1 mb-4 text-center">
              Upload gambar untuk dianalisis AI
              dan dapatkan reward poin
            </p>


            {/* INPUT */}
            <input
              type="file"
              ref={fileRef}
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  navigate("/scan", {
                    state: { image: file },
                  });
                }
              }}
              className="hidden"
            />


            {/* BUTTON */}
            <button
              onClick={() => fileRef.current.click()}
              className="
      w-full
      bg-gradient-to-r
      from-green-500
      to-emerald-600
      text-white
      py-3
      rounded-xl
      shadow-md
      hover:shadow-lg
      hover:scale-105
      transition
      font-medium
    "
            >
              📷 Pilih Foto
            </button>

          </div>



          {/* CARD 2 */}
          <div
            className="
    bg-gradient-to-br
    from-green-50
    to-white
    rounded-3xl
    shadow-xl
    hover:shadow-2xl
    transition
    p-6
    flex flex-col items-center
    border border-green-100
    hover:-translate-y-2
  "
          >

            {/* IMAGE */}
            <div className="relative w-full">

              <img
                src={card2}
                className="w-full h-36 object-cover rounded-2xl"
              />

              {/* badge */}
              <div
                className="
        absolute
        top-3 left-3
        bg-green-600
        text-white
        text-xs
        px-3 py-1
        rounded-full
        shadow
      "
              >
                Reward
              </div>

            </div>


            {/* TITLE */}
            <h3 className="font-semibold text-lg mt-4 text-gray-800">
              Total Poin
            </h3>

            {/* POINT */}
            <div className="flex items-center gap-2 mt-2">

              <span className="text-4xl font-bold text-green-600">
                {points}
              </span>

              <span className="text-gray-500 font-medium">
                Pts
              </span>

            </div>


            {/* INFO */}
            <p className="text-sm text-gray-500 mt-2 text-center">
              Poin dari hasil scan sampah
            </p>

          </div>



          {/* CARD 3 */}
          <div
            className="
    bg-white/80 backdrop-blur
    rounded-3xl
    shadow-xl
    hover:shadow-2xl
    transition
    p-6
    border border-green-100
    hover:-translate-y-2
    flex flex-col
  "
          >

            {/* IMAGE */}
            <div className="relative">

              <img
                src={card3}
                className="w-full h-30 object-cover rounded-2xl"
              />

              <div
                className="
        absolute
        top-3 right-3
        bg-white/80
        backdrop-blur
        text-xs
        px-3 py-1
        rounded-full
        shadow
        text-green-700
      "
              >
                Statistik
              </div>

            </div>


            {/* TITLE */}
            <h3 className="font-semibold text-lg mt-4 text-gray-800 text-center">
              Total Sampah Minggu Ini
            </h3>


            {/* STATS */}
            <div className="mt-4 space-y-3">


              {/* ORGANIK */}
              <div
                className="
        flex justify-between items-center
        bg-red-50
        border border-red-100
        rounded-xl
        px-4 py-3
      "
              >
                <span className="text-red-600 font-medium">
                  🌿 Organik
                </span>

                <span className="font-bold text-red-600">
                  20 kg
                </span>
              </div>


              {/* ANORGANIK */}
              <div
                className="
        flex justify-between items-center
        bg-blue-50
        border border-blue-100
        rounded-xl
        px-4 py-3
      "
              >
                <span className="text-blue-600 font-medium">
                  ♻️ Anorganik
                </span>

                <span className="font-bold text-blue-600">
                  30 kg
                </span>
              </div>


            </div>

          </div>

        </div>

        {/* CARD KONVERSI KOIN */}

        <div className="mt-10">

          <div
            className="
      bg-gradient-to-br
      from-yellow-50
      via-white
      to-green-50
      rounded-3xl
      shadow-xl
      border
      border-yellow-200
      p-6
    "
          >

            {/* TITLE */}
            <div className="flex items-center justify-between mb-4">

              <h3 className="text-lg font-semibold text-gray-700">
                💰 Konversi Sampah ke Koin
              </h3>

              <span className="text-sm text-gray-500">
                Berlaku untuk organik & anorganik
              </span>

            </div>


            {/* TABLE */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

              {/* 1 KG */}
              <div className="bg-white rounded-xl border p-4 text-center shadow-sm">

                <p className="text-sm text-gray-500">
                  1 kg
                </p>

                <p className="text-lg font-bold text-green-600">
                  10 koin
                </p>

              </div>


              {/* 5 KG */}
              <div className="bg-white rounded-xl border p-4 text-center shadow-sm">

                <p className="text-sm text-gray-500">
                  5 kg
                </p>

                <p className="text-lg font-bold text-green-600">
                  60 koin
                </p>

              </div>


              {/* 10 KG */}
              <div className="bg-white rounded-xl border p-4 text-center shadow-sm">

                <p className="text-sm text-gray-500">
                  10 kg
                </p>

                <p className="text-lg font-bold text-green-600">
                  130 koin
                </p>

              </div>


              {/* 15 KG */}
              <div className="bg-white rounded-xl border p-4 text-center shadow-sm">

                <p className="text-sm text-gray-500">
                  15 kg
                </p>

                <p className="text-lg font-bold text-green-600">
                  210 koin
                </p>

              </div>


              {/* 20 KG */}
              <div className="bg-white rounded-xl border p-4 text-center shadow-sm">

                <p className="text-sm text-gray-500">
                  20 kg
                </p>

                <p className="text-lg font-bold text-green-600">
                  300 koin
                </p>

              </div>

            </div>


            {/* NOTE */}
            <div className="mt-4 text-xs text-gray-500">

              * Koin akan masuk setelah sampah diverifikasi oleh petugas

            </div>

          </div>

        </div>

        {/* STATISTIK */}
        <div className="mt-10">

          <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl p-6 border border-green-100">

            <div className="flex items-center justify-between mb-4">

              <h3 className="font-semibold text-lg text-gray-700">
                Statistik Mingguan
              </h3>

              <span className="text-sm text-gray-500">
                Berat Sampah (kg)
              </span>

            </div>

            <Line
              data={{
                labels: [
                  "Senin",
                  "Selasa",
                  "Rabu",
                  "Kamis",
                  "Jumat",
                  "Sabtu",
                  "Minggu",
                ],
                datasets: [
                  {
                    label: "Berat Sampah",
                    data: [70, 110, 150, 210, 160, 170, 220],
                    fill: true,
                    backgroundColor: "rgba(34,197,94,0.15)",
                    borderColor: "#22c55e",
                    borderWidth: 3,
                    tension: 0.4,
                    pointBackgroundColor: "#16a34a",
                    pointRadius: 4,
                  },
                ],
              }}

              options={{

                responsive: true,

                plugins: {
                  legend: {
                    display: false,
                  },
                },

                scales: {

                  y: {

                    ticks: {
                      callback: function (value) {
                        return value + " kg";
                      },
                      color: "#6b7280",
                    },

                    grid: {
                      color: "rgba(0,0,0,0.05)",
                    },

                  },

                  x: {
                    ticks: {
                      color: "#6b7280",
                    },
                    grid: {
                      display: false,
                    },
                  },

                },

              }}

            />

          </div>

        </div>


      </div>



      {/* FOOTER */}
      <Footer />
    </>
  );
}

export default Dashboard;
