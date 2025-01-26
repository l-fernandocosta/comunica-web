import http from "@/lib/http/client";
import { useQuery } from "@tanstack/react-query";
import { GetCharacterOutput } from "./get-character-output";

export async function getCharacter(){
  const randomId = Math.floor(Math.random() * 82) + 1;
  const url : string = `/swapi/${randomId}`

  return http.get<GetCharacterOutput>(url)
    .then(r => r.data)
    .catch(e => { throw e})
}

export function useSWCharacter(){
  return useQuery({
    queryKey: ['swapi-character'],
    queryFn: getCharacter,
    refetchInterval: 60e3 * 2 // 2 minutes
  })
}