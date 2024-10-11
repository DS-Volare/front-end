import React from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';
import { motion, AnimationControls } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface ScriptListProps {
  updatedAt: string;
  title: string;
  control: AnimationControls;
  image: string;
  novelId: string;
}

const ScriptListCard = ({
  updatedAt,
  title,
  control,
  image,
  novelId,
}: ScriptListProps) => {
  const formatDate = (date: string) => {
    const dateobj = new Date(date);
    const year = String(dateobj.getFullYear()); // 'yy' 포맷
    const month = String(dateobj.getMonth() + 1).padStart(2, '0'); // 'mm' 포맷
    const day = String(dateobj.getDate()).padStart(2, '0'); // 'dd' 포맷
    return `${year}-${month}-${day}`;
  };

  // navigate
  const navigate = useNavigate();

  return (
    <CardBox
      animate={control}
      onClick={() => navigate('/convert', { state: { novelId } })}
    >
      <Image
        animate={control}
        src={
          image == null
            ? require('../../assets/background/list-basic-image.png')
            : image
        }
      />
      <ContentBox>
        <ContentText style={{ color: theme.colors.darkBrown }}>
          {formatDate(updatedAt)}
        </ContentText>
        <div style={{ flex: 1 }} />
        <ContentText
          style={{ textAlign: 'right', color: theme.colors.darkOlive }}
        >
          {title}
        </ContentText>
      </ContentBox>
    </CardBox>
  );
};

// text
const ContentText = styled.span`
  width: 200px;
  font-size: 0.9rem;
  overflow: hidden;

  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

// box
const CardBox = styled(motion.div)`
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
`;

// component
const Image = styled(motion.img)`
  width: 260px;
  height: 150px;
  border-radius: 1rem 0.7rem 0.7rem 0.7rem;
  background-color: white;
  background-size: cover;
`;

export default ScriptListCard;
