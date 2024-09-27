import React, { useState } from 'react';
import styled from 'styled-components';
import bgImg from '../assets/background/bg-1.png';
import Pagenation from '../component/mypage/Pagenation';
import ScriptListCard from '../component/mypage/ScriptListCard';
import { dummyData } from '../component/mypage/mypageDummyData'; // dummy data
import { useAnimation } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../utils/queryKeys';
import { useAuth } from '../hooks/useAuth';
import { useConvert } from '../hooks/useConvert';

interface ScriptListProps {
  updatedAt: string;
  title: string;
  image: string;
}

const MyPage = () => {
  const [page, setPage] = useState<number>(1);
  //const totalScript = dummyData.length; // 총 게시물 수
  //const pageRange = 6; // 페이지당 보여줄 게시물 수
  //const startPost = (page - 1) * pageRange + 1; // 시작 게시물 번호
  //const endPost = startPost + pageRange - 1; // 끝 게시물 번호

  // pagenation animate
  const control = useAnimation();

  const { userInfoFunc } = useAuth();
  const { convertList } = useConvert();

  const userInfoQuery = useQuery({
    queryKey: queryKeys.userinfo,
    queryFn: () => userInfoFunc(),
  });

  const listQuery = useQuery({
    queryKey: [queryKeys.list, page],
    queryFn: () => convertList(page),
    enabled: page !== null, //  type: boolean
  });

  const pagenationAnimate = () => {
    control.start({
      height: ['50%', '100%'],
      opacity: [0.3, 1],
      transition: {
        duration: 1.2,
        ease: 'easeInOut',
        times: [0, 0.2, 0.5, 0.8, 1],
      },
    });
  };

  const ScriptListfunc = (data: ScriptListProps[]) => {
    const list = data.map((item, index) => {
      return (
        <ScriptListCard
          control={control}
          key={index}
          updatedAt={item.updatedAt}
          title={item.title}
          image={item.image}
        />
      );
    });

    return list;
  };

  return (
    <Background>
      <BackgroundImage>
        <BackgroundCover>
          <LayoutWrapper>
            <UserInfoTextBox>
              {!userInfoQuery.isLoading && (
                <TitleText style={{ fontSize: '20px' }}>
                  {userInfoQuery.data.email}
                </TitleText>
              )}
              <TitleText style={{ fontSize: '40px' }}>Works</TitleText>
            </UserInfoTextBox>
            {/* scripts list */}
            <ListContainer>
              {!listQuery.isFetching && (
                <>
                  <ItemsContainer>
                    {ScriptListfunc(listQuery.data.result.userConvertListDTO)}
                  </ItemsContainer>
                  <div style={{ flex: 1 }} />
                  <Pagenation
                    page={page}
                    setPage={setPage}
                    totalScript={listQuery.data.result.totalItems}
                    animate={pagenationAnimate}
                    hasPrevious={listQuery.data.result.hasPrevious}
                    hasNext={listQuery.data.result.hasNext}
                  />
                </>
              )}
            </ListContainer>
          </LayoutWrapper>
        </BackgroundCover>
      </BackgroundImage>
    </Background>
  );
};

// text
const TitleText = styled.span`
  color: white;
  font-weight: bold;
`;

// background
const Background = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.beige};
  height: 100vh;
`;

const BackgroundImage = styled.div`
  display: flex;
  height: 75vh;
  background-image: url(${bgImg});
  background-size: cover;
`;

const BackgroundCover = styled.div`
  flex: 1;
  background-color: #a6a29a66;
  backdrop-filter: blur(3px);
`;

// wrapper, container
const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 5vw;
`;

const ListContainer = styled.div`
  display: flex;
`;

const ItemsContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(3, 1fr);
  gap: 60px 70px;

  @media ${({ theme }) => theme.mediaSize.xl} {
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(2, 1fr);
  }
`;

const UserInfoTextBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  top: -3.5rem;
`;

export default MyPage;
