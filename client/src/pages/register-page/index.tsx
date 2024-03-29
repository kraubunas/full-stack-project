import React from 'react';
import { Alert, TextField } from '@mui/material';
import { FormikConfig, useFormik } from 'formik';
import * as Yup from 'yup';
import { useSearchParams } from 'react-router-dom';
import validator from 'validator';
import AuthForm from '../../components/auth-form';
import { UserRegistration } from '../../types/user-registration';
import { useRootSelector, useRootDispatch } from '../../store/hooks';
import { selectAuthLoading } from '../../store/selectors';
import { createRegisterActionThunk } from '../../store/actions-creators';
import AuthService from '../../services/auth-service';

type RegisterFormikConfig = FormikConfig<UserRegistration>;

const initialValues = {
  email: '',
  password: '',
  repeatPassword: '',
};

const validationSchema = Yup.object({
  email: Yup.string()
    .required('Required')
    .test(
      'emailAvailabilityCheck',
      'Email is not valid',
      async (email, context) => {
        if (!email) return false;
        if (!validator.isEmail(email)) return false;
        try {
          const emailIsAvailable = await AuthService.checkEmailAvailability(email);
          return emailIsAvailable;
        } catch (error) {
          throw context.createError({
            message: error instanceof Error ? error.message : error as string,
          });
        }
      },
    ),

  password: Yup.string()
    .max(32, 'Password must contain 32 characters or less')
    .min(8, 'Password must containe 8 characters or more')
    .required('Password is required')
    .matches(/^(?=.*[a-z])/, 'Must have atleast one lower case letter')
    .matches(/^(?=.*[A-Z])/, 'Must have atlest one upper case letter')
    .matches(/^(?=.*[0-9])/, 'Must have atleast one number')
    .matches(/^(?=.*[!@#$%^&*])/, 'Must have atleast one special character'),

  repeatPassword: Yup.string()
    .max(32, 'Password must contain 32 characters or less')
    .min(8, 'Password must containe 8 characters or more')
    .required('Password is required')
    .matches(/^(?=.*[a-z])/, 'Must have atleast one lower case letter')
    .matches(/^(?=.*[A-Z])/, 'Must have atlest one upper case letter')
    .matches(/^(?=.*[0-9])/, 'Must have atleast one number')
    .matches(/^(?=.*[!@#$%^&*])/, 'Must have atleast one special character'),
});

const RegisterPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const loading = useRootSelector(selectAuthLoading);
  const dispatch = useRootDispatch();

  const handleRegister: RegisterFormikConfig['onSubmit'] = ({ email, password }) => {
    const redirect = searchParams.get('redirect') ?? '/';
    const registerAction = createRegisterActionThunk({ email, password }, redirect);
    dispatch(registerAction);
  };

  const {
    values,
    touched,
    errors,
    dirty,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues,
    onSubmit: handleRegister,
    validationSchema,
  });

  return (
    <AuthForm
      formTitle="Register"
      submitText="Register"
      btnActive={dirty && isValid}
      onSubmit={handleSubmit}
    >
      <TextField
        name="email"
        type="email"
        label="Email"
        fullWidth
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.email && Boolean(errors.email)}
        helperText={touched.email && errors.email ? <Alert severity="error">{touched.email && errors.email}</Alert> : null}
        disabled={loading}
      />
      <TextField
        name="password"
        type="password"
        label="Password"
        fullWidth
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.password && Boolean(errors.password)}
        helperText={touched.password && errors.password ? <Alert severity="error">{touched.password && errors.password}</Alert> : null}
        disabled={loading}
      />
      <TextField
        name="repeatPassword"
        type="password"
        label="Repeat password"
        fullWidth
        value={values.repeatPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.repeatPassword && Boolean(errors.repeatPassword)}
        helperText={touched.repeatPassword && errors.repeatPassword ? <Alert severity="error">{touched.repeatPassword && errors.repeatPassword}</Alert> : null}
        disabled={loading}
      />
    </AuthForm>
  );
};

export default RegisterPage;
