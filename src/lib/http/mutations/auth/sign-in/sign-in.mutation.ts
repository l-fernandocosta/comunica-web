import http from "@/lib/http/client";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import SignInInput from "./sign-in.input";
import AuthorizationCookies from "@/lib/utils/authorization-cookie.handler";

type UseSignInProps = UseMutationOptions<unknown, AxiosError, SignInInput>;

export async function signInMutation(input: SignInInput) {
  const url: string = '/auth/login';

  await http.post(url, input)
    .then(r => {
      http.defaults.headers['Authorization'] = `Bearer ${r.data.token}`
      AuthorizationCookies.initSession(r.data.token)
      return r.data
    })
    .catch(e => { throw e })
}

export const useSignin = (options?: UseSignInProps) => {
  return useMutation({
    mutationFn: signInMutation,
    ...options
  })
}

