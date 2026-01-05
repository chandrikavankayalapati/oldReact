import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import useLogin from "../auth/useLogin";
import { useAuth } from "../auth/AuthContext";



const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { mutate, isPending, isError, error } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(
      { email, password },
      {
        onSuccess: (data) => {
          login(data.token);
          navigate("/dashboard");
        },
      }
    );
  };

return (
  
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl space-y-6"
    >
<h1 className="text-2xl font-bold text-gray-800">
  Login to your account
</h1>
<p className="text-sm text-gray-500">
  Access your employee management dashboard
</p>

      <Input
        label="Email"
        placeholder="admin@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        
      />

      <Input
        label="Password"
        type="password"
        placeholder="Admin@123"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {isError && (
        <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md">
          {error.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-2.5 rounded-lg bg-indigo-600 text-white font-semibold
                   hover:bg-indigo-700 transition duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Logging in..." : "Login"}
      </button>
    </form>
  </div>
);

};

export default Login;

