import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../api/auth.api";


const useLogin = () => {
  return useMutation({
    mutationFn: loginApi,
  });
};

export default useLogin;
