import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import bg from "../assets/bgLogin.png";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const data = localStorage.getItem("user");

    if (!data) {
      alert("Belum register");
      return;
    }

    const user = JSON.parse(data);

    if (
      email === user.email &&
      password === user.password
    ) {

      localStorage.setItem("login", "true");

      localStorage.setItem(
        "loginUser",
        JSON.stringify(user)
      );

      navigate("/dashboard");

    } else {
      alert("Email atau password salah");
    }
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
          Platform pintar untuk memilah sampah
        </p>
      </div>


      {/* RIGHT FORM */}
      <div className="flex items-start md:items-center justify-center bg-gray-100 py-6 md:py-0">

        <form
          onSubmit={handleLogin}
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
            Login
          </h2>


          {/* EMAIL */}
          <div>
            <label className="text-sm">
              Username / Email
            </label>

            <input
              type="text"
              className="w-full border rounded-md px-3 py-2 mt-1"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>


          {/* PASSWORD */}
          <div>
            <label className="text-sm">
              Password
            </label>

            <input
              type="password"
              className="w-full border rounded-md px-3 py-2 mt-1"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </div>


          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md"
          >
            Masuk
          </button>


          {/* REGISTER */}
          <p className="text-sm text-center">
            Belum punya akun?{" "}
            <Link
              to="/Register"
              className="text-green-600 font-semibold"
            >
              Daftar
            </Link>
          </p>

        </form>

      </div>

    </div>
  );
}

export default Login;