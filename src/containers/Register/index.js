import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import Logo from '../../assets/logo.svg';
import RegisterImg from '../../assets/register-image.svg';
import Button from '../../components/Button';
import api from '../../services/api';
import {
  Container,
  RegisterImage,
  ContainerItens,
  Label,
  Input,
  SignInLink,
  ErrorMessage
} from './styles';

function Register() {
  const schema = Yup.object().shape({
    name: Yup.string().required('O seu nome é obrigatório'),
    email: Yup.string()
      .email('Digite um e-mail válido')
      .required('O e-mail é obrigatório'),
    password: Yup.string()
      .required('A senha é obrigatória')
      .min(6, 'A senha deve conter no mínimo 6 caracteres'),
    confirmPassword: Yup.string()
      .required('Confirme sua senha')
      .oneOf([Yup.ref('password')], 'As senhas devem ser iguais')
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const errorPassword = errors.password && errors.password.message;
  const errorConfirmPassword =
    errors.confirmPassword && errors.confirmPassword.message;
  const errorEmail = errors.email && errors.email.message;
  const errorName = errors.name && errors.name.message;

  const onSubmit = async userData => {
    try {
      const { status } = await api.post(
        'users',
        {
          name: userData.name,
          email: userData.email,
          password: userData.password
        },
        { validateStatus: () => true }
      );

      if (status === 200 || status === 201) {
        toast.success('Cadastrado com suesso!', {});
      } else if (status === 409) {
        toast.error('E-mail já cadastrado!', {});
      } else {
        throw new Error();
      }
    } catch (err) {
      toast.error('Algo deu errado! Tente novamente.', {});
    }
  };

  return (
    <Container>
      <RegisterImage src={RegisterImg} alt="register-image" />
      <ContainerItens>
        <img src={Logo} alt="Logo" />
        <h1>Cadastre-se</h1>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Label error={errorName}> Nome </Label>
          <Input type="text" {...register('name')} error={errorName} />
          <ErrorMessage>{errorName}</ErrorMessage>

          <Label error={errorEmail}> Email </Label>
          <Input type="email" {...register('email')} error={errorEmail} />
          <ErrorMessage>{errorEmail}</ErrorMessage>

          <Label error={errorPassword}> Senha </Label>
          <Input
            type="password"
            {...register('password')}
            error={errorPassword}
          />
          <ErrorMessage>{errorPassword}</ErrorMessage>

          <Label error={errorConfirmPassword}> Confirmar senha </Label>
          <Input
            type="password"
            {...register('confirmPassword')}
            error={errorConfirmPassword}
          />
          <ErrorMessage>{errorConfirmPassword}</ErrorMessage>

          <Button type="submit" style={{ marginTop: 30, marginBottom: 25 }}>
            Sign Up
          </Button>
        </form>
        <SignInLink>
          Já possui conta?{' '}
          <Link to="/login" style={{ color: 'white' }}>
            Entrar
          </Link>
        </SignInLink>
      </ContainerItens>
    </Container>
  );
}

export default Register;
