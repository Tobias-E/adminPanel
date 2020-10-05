import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
	aboutModalIsOpen,
	aboutSelectedItem,
	tokens,
	forceToUpdate,
} from '../Recoil';

// Assets
import { theme } from '../utils';
import { useSetRecoilState } from 'recoil';

// Exported Component
Modal.setAppElement('#root');
const ModalS = () => {
	const token = useRecoilValue(tokens);
	const selected = useRecoilValue(aboutSelectedItem);
	const [isOpen, setIsOpen] = useRecoilState(aboutModalIsOpen);
	const toDoUpdate = useSetRecoilState(forceToUpdate);
	const forceUpdate = () => toDoUpdate((n) => n + 1);
	const { register, handleSubmit, errors } = useForm();

	// Put data
	async function put(data) {
		const urlPost = `http://localhost:4000/api/v1/abouts/${selected.id}`;
		const result = await fetch(urlPost, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ title: data.title, content: data.content }),
		});
		return result;
	}
	const onSubmit = (data) => put(data) & setIsOpen(false);

	// Delete data
	async function del() {
		const urlPost = `http://localhost:4000/api/v1/abouts/${selected.id}`;
		const result = await fetch(urlPost, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		return result;
	}
	const deleteSubmit = () => del() & setIsOpen(false);

	return (
		<Modal
			isOpen={isOpen}
			style={customStyles}
			contentLabel='Example Modal'
		>
			<Button
				onClick={() => {
					setIsOpen(false);
				}}
			>
				X
			</Button>
			<h2>ID: {selected.id}</h2>
			<h2>{selected.title}</h2>
			<P>{selected.content}</P>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<h2>Ændringer?</h2>
				<input
					type='text'
					name='title'
					defaultValue={selected.title}
					ref={register({
						required: 'Title is required',
						message: 'Please enter a title',
					})}
				/>
				{errors.title && errors.title.message}
				<input
					type='text'
					name='content'
					defaultValue={selected.content}
					ref={register({
						required: 'Content is required',
						message: 'Please enter some content',
					})}
				/>
				{errors.content && errors.content.message}
				<input
					type='number'
					name='number'
					defaultValue={selected.id}
					ref={register({
						required: 'Id is required',
						message: 'Please enter the id',
					})}
				/>
				{errors.number && errors.number.message}

				<button
					type='submit'
					id='submit'
					onClick={() =>
						setTimeout(() => {
							forceUpdate();
						}, 1)
					}
				>
					Gem ændringer
				</button>
			</Form>
			<form onSubmit={handleSubmit(deleteSubmit)}>
				<button
					type='submit'
					id='submit'
					onClick={() =>
						setTimeout(() => {
							forceUpdate();
						}, 1)
					}
				>
					Slet
				</button>
			</form>
		</Modal>
	);
};

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

const Button = styled.button`
	padding: 0.5rem 0.8rem;
	background-color: ${theme.buttonColor};
	color: ${theme.white};
	border: none;
	border-radius: 5px;
`;

const P = styled.p`
	max-width: 70vw;
`;

const Form = styled.form`
	height: 250px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`;

export default ModalS;
