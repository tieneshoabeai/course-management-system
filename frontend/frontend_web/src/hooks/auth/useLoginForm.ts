import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { ROUTES } from '../../app/constants/routes';
import { loginWithPassword } from '../../service/auth/auth.service';
import { useAuth } from './useAuth';

const loginSchema = z.object({
  email: z.string().trim().email('Email khong dung dinh dang.'),
  password: z.string().min(1, 'Mat khau khong duoc de trong.'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export function useLoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = form.handleSubmit(async (values) => {
    setSubmitError(null);

    try {
      const session = await loginWithPassword(values);
      login(session);
      navigate(ROUTES.dashboard, { replace: true });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Dang nhap that bai.');
    }
  });

  return {
    form,
    handleLogin,
    isSubmitting: form.formState.isSubmitting,
    submitError,
  };
}
