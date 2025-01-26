import { z } from 'zod';
import { ResolverMessage } from '../resolver-message';

const { RequiredField, InvalidEmail, Min } = ResolverMessage;

export const SignInInput = z.object({
  email: z.string({ required_error:RequiredField }).email({  message: InvalidEmail}),
  password: z.string({ required_error: RequiredField}).min(8, { message: Min(8) }),
});

export type SignInInputType = z.infer<typeof SignInInput>;