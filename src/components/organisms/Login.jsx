import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';

// Assets
import { theme } from '../utils';

// Imported components
import Loader from '../atoms/Loader';

// Post login request
const url = 'https://dyrevelfaerd-tobias.herokuapp.com/auth/token';

// Exported Component
const Login = () => {
	const [loading, setLoading] = useState(false);
	const [auth, setAuth] = useState(false);
	const [invalid, setInvalid] = useState(false);
	const { register, handleSubmit, errors } = useForm();
	const onSubmit = (data) => postLogin(data);

	async function postLogin(data) {
		setInvalid(false);
		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: data.username,
					password: data.password,
				}),
			});
			const result = await response.json();
			console.log(new Date(result.validUntil));
			if (result.token) {
				sessionStorage.setItem('token', result.token);
				setAuth(true);
			} else {
				console.log('Error::', result.error);
			}
			return result;
		} catch (e) {
			setInvalid(true);
		}
	}

	if (auth) {
		return <Redirect to={{ pathname: '/protected' }} />;
	} else {
		return (
			<LoginContainer>
				<h2>Login</h2>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Input
						type='text'
						name='username'
						id='username'
						placeholder='Username'
						ref={register({
							required: 'Username is required',
							pattern: {
								message: 'Please enter your username',
							},
						})}
					/>
					{errors.username && errors.username.message}
					<Input
						type='text'
						name='password'
						id='password'
						placeholder='Password'
						ref={register({
							required: 'Password is required',
							pattern: {
								message: 'Please enter your password',
							},
						})}
					/>
					<Button
						type='submit'
						id='submit'
						onClick={() => setLoading(true)}
					>
						Login
					</Button>
				</Form>
				{invalid && <h2>Invalid username or password</h2>}
				{loading && !invalid && <Loader />}
			</LoginContainer>
		);
	}
};

const LoginContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Form = styled.form`
	width: 50vw;
	display: flex;
	flex-direction: column;
`;

const Input = styled.input`
	border-radius: 5px;
	border: 1px solid ${theme.cardBorder};
	height: 35px;
	margin: 1rem 0 0.5rem 0;
	@media screen and (min-width: 1023px) {
		margin: 0 0 1rem 0;
	}
	::placeholder {
		padding-left: 1rem;
	}
`;

const Button = styled.button`
	text-align: center;
	display: flex;
	justify-self: center;
	align-self: center;
	max-width: 100px;
	padding: 0.5rem 1rem;
	background-color: ${theme.buttonColor};
	color: ${theme.white};
	border-radius: 5px;
	border-style: none;
	margin-top: 1rem;
	@media screen and (min-width: 1023px) {
		margin-top: 0;
	}
`;

export default Login;
