import { z } from "zod";
import { ResolverMessage } from "../resolver-message";

const { RequiredField, InvalidEmail, Min} = ResolverMessage;

export const UpdateUserInput = z.object({
  name: z.string({ required_error: RequiredField }).min(1, { message: Min(1)}), 
  email: z.string({ required_error: RequiredField }).email({ message: InvalidEmail}),
})

export type UpdateUserInputType = z.infer<typeof UpdateUserInput>;