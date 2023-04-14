import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import LoginImg from '../../assets/login-image.svg';
import Logo from '../../assets/logo.svg';
import Button from '../../components/Button';
import { useUser } from '../../hooks/UserContext';
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
  const { putUserData } = useUser();
  const history = useHistory();

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

  const onSubmit = async clientData => {
    const { data } = await toast.promise(
      api.post('sessions', {
        email: clientData.email,
        password: clientData.password
      }),
      {
        pending: 'Verificando seus dados',
        success: 'Seja bem-vindo(a)',
        error: 'Algo deu errado! Tente novamente.'
      }
    );

    putUserData(data);

    setTimeout(() => {
      history.push('/');
    }, 1000);
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

          <Button type="submit" style={{ marginTop: 75, marginBottom: 25 }}>
            Entrar
          </Button>
        </form>
        <SignInLink>
          Não possui conta?{' '}
          <Link to="/cadastro" style={{ color: 'white' }}>
            Cadastrar
          </Link>
        </SignInLink>
      </ContainerItens>
    </Container>
  );
}

export default Login;
