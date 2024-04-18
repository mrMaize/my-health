import styled from 'styled-components';

const StyledInput = styled.input.attrs(({ type = 'text' }) => ({
  type,
}))`
  box-sizing: border-box;
  width: 100%;
  outline: none;
  border-radius: 5px;
  font-weight: 400;
  color: ${({ disabled }) => (disabled ? 'grey' : '#282c34')};
  font-size: 20px;
  border: 1px solid ${({ disabled }) => (disabled ? 'lightgrey' : '#282c34')};
  background-color: ${({ disabled }) => (disabled ? 'whitesmoke' : 'white')};
`;

const StyledLabel = styled.span`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #282c34;
`;

const Container = styled.div`
  margin-bottom: 15px;
  width: 100%;
`;

const Input = ({
  value,
  label,
  disabled,
  type,
}: {
  value: string;
  label: string;
  disabled: boolean;
  type: string;
}) => {
  return (
    <Container>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput value={value} disabled={disabled} type={type} />
    </Container>
  );
};

export default Input;
