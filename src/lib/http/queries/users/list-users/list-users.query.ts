import http from "@/lib/http/client";
import { useQuery } from "@tanstack/react-query";

export async function listUsers(){
  const url : string = `/users`;

  return await http.get(url)
  .then(r => r.data)
  .catch(e => { throw e})
}


export const useUsers = () => {
  return useQuery({
    queryKey: ['users'], 
    queryFn: listUsers, 
    staleTime: Infinity
  })
}