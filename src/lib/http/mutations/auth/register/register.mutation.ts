import http from "@/lib/http/client";
import RegisterInput from "./register.input";
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from "axios";

type UseRegisterProps = UseMutationOptions<unknown, AxiosError, RegisterInput>;

async function registerMutation(input: RegisterInput){
  const url : string = '/users';

  await http.post(url, input)
  .then(r => r.data)
  .catch(e => { throw e})
}


export function useRegister(options?: UseRegisterProps ){
  return useMutation({
    mutationFn: registerMutation,
    ...options
  })
}