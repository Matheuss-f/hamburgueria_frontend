import React from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import LoginImg from '../../assets/login-image.svg';
import Logo from '../../assets/logo.svg';
import Button from '../../components/Button';
import api from '../../services/api';
import {
  Container,
  LoginImage,
  ContainerItens,
  Label,
  Input,
  SignInLink,
  ErrorMessage
} from './styles';

function Login() {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Digite um e-mail válido')
      .required('O e-mail é obrigatório'),
    password: Yup.string()
      .required('A senha é obrigatória')
      .min(6, 'A senha deve conter no mínimo 6 caracteres')
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const errorPassword = errors.password && errors.password.message;
  const errorEmail = errors.email && errors.email.message;

  const onSubmit = async userData => {
    const response = await api.post('sessions', {
      email: userData.email,
      password: userData.password
    });
  };

  return (
    <Container>
      <LoginImage src={LoginImg} alt="login-image" />
      <ContainerItens>
        <img src={Logo} alt="Logo" />
        <h1>Login</h1>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Label>Email</Label>
          <Input type="email" {...register('email')} error={errorEmail} />
          <ErrorMessage>{errorEmail}</ErrorMessage>

          <Label>Senha</Label>
          <Input
            type="password"
            {...register('password')}
            error={errorPassword}
          />
          <ErrorMessage>{errorPassword}</ErrorMessage>

          <Button type="submit">Sign In</Button>
        </form>
        <SignInLink>
          Não possui conta? <a>Sign Up</a>
        </SignInLink>
      </ContainerItens>
    </Container>
  );
}

export default Login;
