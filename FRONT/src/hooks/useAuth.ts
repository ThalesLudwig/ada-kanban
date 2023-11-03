import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

import { AppDispatch, RootState } from "../config/store";
import { setToken } from "../config/authSlice";
import { Token } from "../types/Token";

const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((store: RootState) => store.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ login: "letscode", senha: "lets@123" }),
        });
        const { data } = await response.json();
        dispatch(setToken(data));
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      }
      setIsLoading(false);
    };

    const validateToken = async () => {
      try {
        if (!token) await fetchToken();
        const decodedToken = jwtDecode<Token>(token);
        const expiresAt = new Date(decodedToken.exp * 1000);
        if (new Date() > expiresAt) await fetchToken();
        setError("");
      } catch (error) {
        setError((error as {message: string}).message);
      }
    };

    validateToken()
  }, [token, dispatch]);

  return { token, isLoading, error };
};

export default useAuth;
