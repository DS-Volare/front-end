import styled from 'styled-components';

interface ChipProps {
  label: string;
  onDelete: () => void;
}

const CreateNovelCharacterChip = ({ label, onDelete }: ChipProps) => (
  <ChipWrapper>
    <ChipLabel>{label}</ChipLabel>
    <ChipDelete onClick={onDelete}>×</ChipDelete>
  </ChipWrapper>
);

export default CreateNovelCharacterChip;

const ChipWrapper = styled.div`
  display: inline-block;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 2rem;
  padding: 0.75rem 1.3rem;
  margin-right: 0.625rem;
  margin-bottom: 1rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const ChipLabel = styled.span`
  font-size: 1rem;
  margin-right: 1rem;
`;

const ChipDelete = styled.span`
  cursor: pointer;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.olive};
`;
