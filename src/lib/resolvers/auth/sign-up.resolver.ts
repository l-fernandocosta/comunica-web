import { z } from 'zod';
import { ResolverMessage } from '../resolver-message';

const { RequiredField, InvalidEmail, Min } = ResolverMessage;

export const SignUpInput = z.object({
  name: z.string({ required_error:RequiredField }).min(1,{  message: Min(1)}),
  password: z.string({ required_error: RequiredField}).min(8, { message: Min(8) }),
  email: z.string({ required_error:RequiredField }).email({  message: InvalidEmail}),
});

export type SignUpInputType = z.infer<typeof SignUpInput>;