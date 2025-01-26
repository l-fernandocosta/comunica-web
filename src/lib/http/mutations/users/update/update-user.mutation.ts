import http from "@/lib/http/client";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UpdateUserMutationInput } from "./update-user-mutation-input";

type UseUpdateUser = UseMutationOptions<unknown, AxiosError, UpdateUserMutationInput>;


export async function updateUserMutation(input : UpdateUserMutationInput){
  const { id, ...rest} = input;
  const url : string = `users/${id}`;

  return await http.put(url, {...rest})
    .then(r => r.data)
    .catch(e => { throw e});
}


export const useUpdateUser = (options?: UseUpdateUser) => {
  return useMutation({
    mutationFn: updateUserMutation, 
    ...options
  })
}
