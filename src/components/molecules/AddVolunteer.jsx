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
	const urlPost = 'http://localhost:4000/api/v1/volunteers';
	async function post(data) {
		const result = await fetch(urlPost, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				title: data.title,
				content: data.content,
				extra: data.extra,
			}),
		});
		return result;
	}
	const onSubmit = (data) => post(data) & reset();

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<h2>Tilføj frivillig</h2>
			<input
				type='text'
				name='title'
				id='title'
				placeholder='Title'
				ref={register({
					required: 'Title is required',
					message: 'Please enter a title',
				})}
			/>
			{errors.title && errors.title.message}
			<input
				type='text'
				name='content'
				id='content'
				placeholder='Content'
				ref={register({
					required: 'Content is required',
					message: 'Please enter some content',
				})}
			/>
			{errors.content && errors.content.message}
			<input
				type='text'
				name='extra'
				placeholder='Extra'
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
