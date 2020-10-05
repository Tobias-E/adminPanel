import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { tokens, forceToUpdate } from '../Recoil';

const Add = () => {
	const toDoUpdate = useSetRecoilState(forceToUpdate);
	const forceUpdate = () => toDoUpdate((n) => n + 1);
	const token = useRecoilValue(tokens);
	const { register, handleSubmit, errors, reset } = useForm();
	const urlPost = 'http://localhost:4000/api/v1/animals';
	async function post(data) {
		const result = await fetch(urlPost, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				name: data.name,
				description: data.description,
				age: data.age,
			}),
		});
		return result;
	}
	const onSubmit = (data) => post(data) & reset();

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<h2>Tilføj dyr</h2>
			<input
				type='text'
				name='name'
				id='name'
				placeholder='Name'
				ref={register({
					required: 'Name is required',
					message: 'Please enter a Name',
				})}
			/>
			{errors.title && errors.title.message}
			<input
				type='text'
				name='description'
				id='description'
				placeholder='Description'
				ref={register({
					required: 'Description is required',
					message: 'Please enter a description',
				})}
			/>
			{errors.content && errors.content.message}
			<input
				type='number'
				name='age'
				placeholder='Age'
				ref={register({})}
			/>
			<button
				type='submit'
				id='submit'
				onClick={() =>
					setTimeout(() => {
						forceUpdate();
					}, 1)
				}
			>
				Tilføj
			</button>
		</Form>
	);
};

const Form = styled.form`
	height: 200px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`;

export default Add;
