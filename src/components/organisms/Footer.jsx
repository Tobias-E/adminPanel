import React from 'react';
import styled from 'styled-components';

// Imported components
import { theme } from '../utils';

const Footer = () => {
	return (
		<FooterStyled>
			<h2>Footer</h2>
		</FooterStyled>
	);
};

const FooterStyled = styled.footer`
	background-color: ${theme.secondaryColor};
`;

export default Footer;
