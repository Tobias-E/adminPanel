import React from 'react';
import styled from 'styled-components';

// Imported components
import { theme } from '../utils';

const Header = () => {
	return (
		<HeaderStyled>
			<h2>Header</h2>
		</HeaderStyled>
	);
};

const HeaderStyled = styled.header`
	background-color: ${theme.secondaryColor};
`;

export default Header;
