import { useQuery } from "@tanstack/react-query";
import { fetchEmployees } from "../api/employees.api";

const useEmployees = () => {
  return useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });
};

export default useEmployees;
