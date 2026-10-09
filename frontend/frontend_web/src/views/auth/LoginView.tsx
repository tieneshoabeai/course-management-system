import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import { Alert, Button, Stack, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

import { useLoginForm } from '../../hooks/auth/useLoginForm';

export function LoginView() {
  const { form, handleLogin, isSubmitting, submitError } = useLoginForm();
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <main className="login-page">
      <section className="login-panel" aria-labelledby="login-title">
        <div className="login-copy">
          <img className="login-logo" src="/8learn-logo.webp" alt="8LEARN" />
          <p className="eyebrow-text">8LEARN CMS</p>
          <h1 id="login-title">Dang nhap he thong quan ly hoc tap</h1>
          <p>
            Mot cong dang nhap cho sinh vien va nhan su nha truong, dung JWT mock de kiem tra private
            route truoc khi noi API that.
          </p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <Stack spacing={2.5}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  type="email"
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                  fullWidth
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Mat khau"
                  type="password"
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                  fullWidth
                />
              )}
            />

            {submitError ? <Alert severity="error">{submitError}</Alert> : null}

            <Button type="submit" size="large" variant="contained" startIcon={<LoginRoundedIcon />} disabled={isSubmitting}>
              {isSubmitting ? 'Dang kiem tra...' : 'Dang nhap'}
            </Button>
          </Stack>
        </form>
      </section>
    </main>
  );
}
