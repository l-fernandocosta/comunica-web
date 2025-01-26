import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import http from "../../client";

type UseRemoveUserProps = UseMutationOptions<unknown, AxiosError, string>;

async function removeUserMutation(id: string){
  const url : string =`/users/${id}`


  return await http.delete(url)
  .then(r => r.data)
  .catch(e => { throw e})
}

const useRemoveUser = (options: UseRemoveUserProps) => {
  return useMutation({
    mutationFn: removeUserMutation,
    ...options
  })
}

export { useRemoveUser };
