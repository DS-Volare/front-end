import React, { useEffect, useState } from 'react';
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
import SkeletonListCard from '../component/mypage/SkeletonListCard';

interface ScriptListProps {
  updatedAt: string;
  title: string;
  image: string;
}

const MyPage = () => {
  const [page, setPage] = useState<number>(1);
  const [totalScript, setTotalScript] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

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

  // skeleton UI
  const skeletonListFunc = () => {
    const skeletonCards = [];
    for (let i = 0; i < 6; i++) {
      skeletonCards.push(<SkeletonListCard key={i} />);
    }
    return skeletonCards;
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

  useEffect(() => {
    if (listQuery.data) {
      setHasNext(listQuery.data.result.hasPrevious);
      setHasPrevious(listQuery.data.result.hasPrevious);
      setTotalScript(listQuery.data.result.totalItems);
    }
  }, [listQuery.data]);

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
              <>
                <ItemsContainer>
                  {listQuery.isFetching && skeletonListFunc()}
                  {!listQuery.isFetching &&
                    ScriptListfunc(listQuery.data.result.userConvertListDTO)}
                </ItemsContainer>
                <div style={{ flex: 1 }} />
                <Pagenation
                  page={page}
                  setPage={setPage}
                  totalScript={totalScript}
                  hasPrevious={hasPrevious}
                  hasNext={hasNext}
                />
              </>
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
