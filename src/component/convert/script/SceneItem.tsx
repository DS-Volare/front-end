import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Scene } from '../../../types';

interface SceneItemProps {
  scene: Scene;
  sceneIndex: number;
  onContentChange: (
    sceneIndex: number,
    contentIndex: number,
    field: string,
    value: string
  ) => void;
}

const SceneItem = ({ scene, sceneIndex, onContentChange }: SceneItemProps) => {
  const actionDialogRef = useRef<(HTMLTextAreaElement | null)[]>([]);

  // 초기 height 설정
  useEffect(() => {
    scene.content.forEach((content, contentIndex) => {
      if (actionDialogRef.current[contentIndex]) {
        actionDialogRef.current[contentIndex]!.style.height = `${
          actionDialogRef.current[contentIndex]!.scrollHeight
        }px`;
      }
    });
  }, [scene]);

  const handleTextAreaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    contentIndex: number
  ) => {
    const value = e.target.value;

    actionDialogRef.current[contentIndex]!.style.height = 'auto';
    actionDialogRef.current[contentIndex]!.style.height = `${
      actionDialogRef.current[contentIndex]!.scrollHeight
    }px`;

    let action = '';
    let dialog = '';
    const regex = /\(([^)]+)\)(.*)/;
    const match = value.match(regex);

    if (match) {
      action = `(${match[1]})`;
      dialog = match[2].replace(/^\s+/, '');
    } else {
      action = '';
      dialog = value;
    }
    onContentChange(sceneIndex, contentIndex, 'action', action);
    onContentChange(sceneIndex, contentIndex, 'dialog', dialog);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    contentIndex: number,
    field: string
  ) => {
    const value = e.target.value;
    onContentChange(sceneIndex, contentIndex, field, value);
  };

  return (
    <SceneContainer>
      <SceneHeader>
        #{scene.scene_num}. {scene.location}
        {/* ({scene.time}) */}
      </SceneHeader>
      {scene.content.map((content, contentIndex) => (
        <ContentItem key={contentIndex}>
          {content.type === '지문' ? (
            <DirectionInput
              type="text"
              value={content.content || ''}
              onChange={(e) => handleInputChange(e, contentIndex, 'content')}
              $field="direction"
            />
          ) : (
            <>
              <CharacterInput
                type="text"
                value={content.character || ''}
                onChange={(e) =>
                  handleInputChange(e, contentIndex, 'character')
                }
                $field="character"
              />
              <ActionDialogTextArea
                ref={(el) => (actionDialogRef.current[contentIndex] = el)}
                onChange={(e) => handleTextAreaChange(e, contentIndex)}
                value={
                  content.action
                    ? `${content.action} ${content.dialog}`
                    : content.dialog
                }
              />
            </>
          )}
        </ContentItem>
      ))}
    </SceneContainer>
  );
};

export default SceneItem;

const SceneContainer = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.beige};
  border-radius: 5px;
`;

const SceneHeader = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;

const ContentItem = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  height: auto;
`;

const DirectionInput = styled.input<{ $field: string }>`
  width: 90%;
  margin-left: auto;
  font-size: 1em;
  font-style: italic;
`;

const CharacterInput = styled.input<{ $field: string }>`
  width: 5em;
  font-weight: bold;
  font-size: 1em;
  align-self: flex-start;
`;

const ActionDialogTextArea = styled.textarea`
  max-width: 25rem;
  min-height: 1rem;
  overflow-y: hidden;
  font-size: 1em;
  box-sizing: border-box;
  flex: 1;
  line-height: 1.5rem;
`;
