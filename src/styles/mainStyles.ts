import styled from 'styled-components';

interface textProps {
  $page: string;
}

// text
export const TitleText = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.darkBrown};
  font-size: 4rem;
  line-height: 1.2;
`;

export const SubTitleText = styled.span<textProps>`
  font-weight: bold;
  color: ${({ $page, theme }) =>
    $page === 'first' ? 'white' : theme.colors.darkBrown};
  font-size: ${({ $page }) => ($page === 'first' ? '1.5rem' : '1.2rem')};
  line-height: 1.2;
`;

export const ContentText = styled.span<textProps>`
  color: ${({ $page, theme }) =>
    $page === 'first' ? 'white' : theme.colors.darkBrown};
  font-size: 1rem;
  line-height: 1.2;
`;

// wrapper, container, box
export const ExplainGridBox = styled.div<textProps>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;

  position: absolute;
  bottom: ${({ $page }) => ($page === 'second' ? '5rem' : '11rem')};
  right: 7vw;
  width: 20vw;
  height: 20vh;
  z-index: 1;
  padding: 1rem;

  backdrop-filter: blur(25px);
  background-color: rgb(255, 255, 255, 0.4);

  border-style: solid;
  border-width: 2px;
  border-color: rgba(255, 255, 255, 0.35);
  border-radius: 1rem;
`;

// modal style
export const ModalCustomStyle: ReactModal.Styles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  content: {
    maxWidth: '500px',
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    height: 370,
    backgroundColor: 'rgba(255,255,255,0.6)',
    overflow: 'auto',
    borderStyle: 'none',
    borderRadius: '30px',
    outline: 'none',
    padding: 0,
    boxShadow: '0px 2px 7px rgba(0,0,0,0.3)',
  },
};
