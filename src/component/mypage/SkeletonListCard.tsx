import styled, { keyframes } from 'styled-components';

const SkeletonListCard = () => {
  return (
    <CardBox>
      {/* image가 들어가는 영역 */}
      <Image>
        <AnimationBar />
      </Image>
      <ContentBox>
        {/* text가 들어가는 영역 */}
        <ContentText>
          <AnimationBar />
        </ContentText>
        <div style={{ flex: 1 }} />
        {/* text가 들어가는 영역 */}
        <ContentText>
          <AnimationBar />
        </ContentText>
      </ContentBox>
    </CardBox>
  );
};

const loading = keyframes`
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(100%);
    }
  `;

// text
const ContentText = styled.div`
  width: 200px;
  height: 1rem;
  font-size: 0.9rem;
  background-color: ${({ theme }) => theme.colors.gray};
  overflow: hidden;
`;

// box
const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 200px;
  background-color: rgba(255, 255, 245, 0.6);
  border-radius: 1.2rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);
`;

const ContentBox = styled.div`
  display: flex;
  padding: 0.7rem 1rem;
  gap: 1rem;
`;

// component
const Image = styled.div`
  width: 260px;
  height: 150px;
  border-radius: 1rem 0.7rem 0.7rem 0.7rem;
  background-color: ${({ theme }) => theme.colors.gray};
  overflow: hidden;
`;

const AnimationBar = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.gray} 0%,
    rgba(255, 255, 255, 0.4) 30%,
    ${({ theme }) => theme.colors.gray} 60%
  );
  animation: ${loading} 1.5s infinite linear;
  border-radius: 1rem 0.7rem 0.7rem 0.7rem;
`;

export default SkeletonListCard;
