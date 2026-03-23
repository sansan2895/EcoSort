import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import bg from "../assets/bgLogin.png";

function Register() {
  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [jk, setJk] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    const user = {
      nama,
      email,
      jk,
      password,
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Register berhasil");

    navigate("/login");
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 grid-cols-1">

      {/* LEFT IMAGE */}
      <div
        className="
        flex flex-col
        items-center md:items-start
        justify-center md:justify-start
        text-white text-center
        p-6 md:p-10
        pt-10 md:pt-16
      "
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "40vh",
        }}
      >
        <h1 className="text-4xl font-bold bg-white/70 text-green-600 px-6 py-2 rounded-xl">
          EcoSort
        </h1>

        <p className="mt-4 bg-white/60 text-black px-4 py-2 rounded-lg">
          Daftar akun baru
        </p>
      </div>


      {/* RIGHT FORM */}
      <div className="flex items-start md:items-center justify-center bg-gray-100 py-6 md:py-0">

        <form
          onSubmit={handleRegister}
          className="
          bg-white
          p-6 md:p-8
          rounded-2xl
          shadow-lg
          w-full
          max-w-sm
          space-y-4
          mt-[-40px] md:mt-0
        "
        >

          <h2 className="text-center text-2xl font-bold">
            Register
          </h2>


          {/* NAMA */}
          <div>
            <label>Nama Lengkap</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded mt-1"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
            />
          </div>


          {/* EMAIL */}
          <div>
            <label>Email</label>
            <input
              type="email"
              className="w-full border px-3 py-2 rounded mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>


          {/* JENIS KELAMIN */}
          <div>
            <label>Jenis Kelamin</label>

            <select
              className="w-full border px-3 py-2 rounded mt-1"
              value={jk}
              onChange={(e) => setJk(e.target.value)}
              required
            >
              <option value="">Pilih</option>
              <option>Laki-laki</option>
              <option>Perempuan</option>
            </select>
          </div>


          {/* PASSWORD */}
          <div>
            <label>Password</label>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>


          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            Daftar
          </button>


          {/* LOGIN */}
          <p className="text-sm text-center">
            Sudah punya akun?{" "}
            <Link
              to="/login"
              className="text-green-600"
            >
              Login
            </Link>
          </p>

        </form>

      </div>

    </div>
  );
}

export default Register;