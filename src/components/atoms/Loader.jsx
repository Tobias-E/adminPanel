import React from 'react';
import styled, { keyframes } from 'styled-components';

// Assets
import logo from '../../assets/logo.png';

const Loader = () => {
	return (
		<Container>
			<Logo src={logo} alt='loader' />
		</Container>
	);
};

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const animate = keyframes`
	0% {
		width: 100px;
		height: 100px;
		opacity: 0;
	}

	50% {
		width: 120px;
		height: 120px;
		opacity: 1;
	}

	100% {
		width: 100px;
		height: 100px;
		opacity: 0;

	}
`;

const Logo = styled.img`
	display: flex;
	justify-self: center;
	animation: ${animate} infinite 2s linear;
`;

export default Loader;
