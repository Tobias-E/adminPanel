import { atom, selector } from 'recoil';

// Login token
export const tokens = atom({
	key: 'tokens',
	default: window.sessionStorage.getItem('token'),
});

// Force to update
export const forceToUpdate = atom({
	key: 'forceToUpdate',
	default: 0,
});

// About
// About Modal Open state
export const aboutModalIsOpen = atom({
	key: 'aboutModalIsOpen',
	default: false,
});

// About selected item
export const aboutSelectedItem = atom({
	key: 'aboutSelectedItem',
	default: 0,
});

// Fetch About
const about = 'http://localhost:4000/api/v1/abouts';
export const aboutData = selector({
	key: 'aboutData',
	get: async ({ get }) => {
		get(forceToUpdate);
		const response = await fetch(about);
		const result = await response.json();
		return result;
	},
});

// Volunteers
// Volunteer Modal Open state
export const volunteerModalIsOpen = atom({
	key: 'volunteerModalIsOpen',
	default: false,
});

// Volunteer selected item
export const volunteerSelectedItem = atom({
	key: 'volunteerSelectedItem',
	default: 0,
});

// Fetch Volunteers
const volunteer = 'http://localhost:4000/api/v1/volunteers';
export const volunteerData = selector({
	key: 'volunteerData',
	get: async ({ get }) => {
		get(forceToUpdate);
		const response = await fetch(volunteer);
		const result = await response.json();
		return result;
	},
});

// Animals
// Fetch Animals
const animal = 'http://localhost:4000/api/v1/animals';
export const animalData = selector({
	key: 'animalData',
	get: async ({ get }) => {
		get(forceToUpdate);
		const response = await fetch(animal);
		const result = await response.json();
		return result;
	},
});

// Animal Modal Open state
export const animalModalIsOpen = atom({
	key: 'animalModalIsOpen',
	default: false,
});

// Animal selected item
export const animalSelectedItem = atom({
	key: 'animalSelectedItem',
	default: 0,
});
