import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
	aboutModalIsOpen,
	aboutSelectedItem,
	aboutData,
	volunteerModalIsOpen,
	volunteerSelectedItem,
	volunteerData,
	animalData,
	animalModalIsOpen,
	animalSelectedItem,
} from '../Recoil';

// Assets
import { theme } from '../utils';

// Imported Components
import { logout } from '../atoms/Auth';
import AddAbout from '../molecules/AddAbout';
import ModalAbout from '../molecules/ModalAbout';
import AddVolunteer from '../molecules/AddVolunteer';
import ModalVolunteer from '../molecules/ModalVolunteer';
import AddAnimal from '../molecules/AddAnimal';
import ModalAnimal from '../molecules/ModalAnimal';

// Exported Component
const Panel = () => {
	// About
	const about = useRecoilValue(aboutData);
	const setAboutSelected = useSetRecoilState(aboutSelectedItem);
	const setAboutIsOpen = useSetRecoilState(aboutModalIsOpen);
	// Volunteer
	const volunteer = useRecoilValue(volunteerData);
	const setVolunteerSelected = useSetRecoilState(volunteerSelectedItem);
	const setVolunteerIsOpen = useSetRecoilState(volunteerModalIsOpen);
	// Animals
	const animal = useRecoilValue(animalData);
	const setAnimalSelected = useSetRecoilState(animalSelectedItem);
	const setAnimalIsOpen = useSetRecoilState(animalModalIsOpen);
	console.log(animal);
	return (
		<Container>
			<h1>Admin panel</h1>
			<Link
				to='/login'
				onClick={() => {
					logout();
				}}
			>
				Logout
			</Link>
			<SHeading>About section</SHeading>
			<Section>
				{about.map((e) => (
					<ContentContainer
						key={e.id}
						data-info={e.id}
						data-title={e.title}
						data-content={e.content}
						onClick={(e) => {
							setAboutIsOpen(true);
							setAboutSelected({
								id: e.target.dataset.info,
								title: e.target.dataset.title,
								content: e.target.dataset.content,
							});
						}}
					>
						<Heading>Title: {e.title}</Heading>
						<P>Content: {e.content}</P>
						<P>ID: {e.id}</P>
					</ContentContainer>
				))}
				<ContentContainer>
					<AddAbout />
				</ContentContainer>
			</Section>
			<ModalAbout />

			<SHeading>Volunteer section</SHeading>
			<Section>
				{volunteer.map((e) => (
					<ContentContainer
						key={e.id}
						data-info={e.id}
						data-title={e.title}
						data-content={e.content}
						data-extra={e.extra}
						onClick={(e) => {
							setVolunteerIsOpen(true);
							setVolunteerSelected({
								id: e.target.dataset.info,
								title: e.target.dataset.title,
								content: e.target.dataset.content,
								extra: e.target.dataset.extra,
							});
						}}
					>
						<Heading>Title: {e.title}</Heading>
						<P>content: {e.content}</P>
						<P>extra: {e.extra}</P>
						<P>ID: {e.id}</P>
					</ContentContainer>
				))}
				<ContentContainer>
					<AddVolunteer />
				</ContentContainer>
			</Section>
			<ModalVolunteer />

			<SHeading>Animal section</SHeading>
			<Section>
				{animal.map((e) => (
					<ContentContainer
						key={e.id}
						data-info={e.id}
						data-name={e.name}
						data-description={e.description}
						data-age={e.age}
						onClick={(e) => {
							setAnimalIsOpen(true);
							setAnimalSelected({
								id: e.target.dataset.info,
								name: e.target.dataset.name,
								description: e.target.dataset.description,
								age: e.target.dataset.age,
							});
						}}
					>
						<Heading>Name: {e.name}</Heading>
						<P>Description: {e.description}</P>
						<P>Age: {e.age}</P>
						<P>ID: {e.id}</P>
					</ContentContainer>
				))}
				<ContentContainer>
					<AddAnimal />
				</ContentContainer>
			</Section>
			<ModalAnimal />
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0 15vw;
`;

const Section = styled.section`
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto;
	grid-gap: 1rem;
`;

const ContentContainer = styled.div`
	width: 15vw;
	padding: 0.5rem;
	display: flex;
	flex-direction: column;
	border: 1px solid ${theme.cardBorder};
	border-radius: 10px;
`;

const SHeading = styled.h2`
	margin-top: 4rem;
`;

const Heading = styled.h2`
	pointer-events: none;
`;
const P = styled.p`
	pointer-events: none;
`;

export default Panel;
