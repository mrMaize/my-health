import styled from 'styled-components';

const Button = styled.button`
    width: 100%;
    height: 30px;
    font-size: 20px;
    font-weight: 500;
    background-color: ${(props) => props.disabled ? 'grey' : 'forestgreen'};
    border: none;
    color: ${(props) => props.disabled ? '#282c34' : 'white'};
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.disabled ? 'grey' : 'rgb(19, 114, 19)'};
    }
`;

export default Button;
