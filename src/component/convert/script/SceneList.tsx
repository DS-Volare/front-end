import styled from 'styled-components';
import SceneItem from './SceneItem';
// import { script1, script2 } from './scriptDummyData';
import { useScriptData } from '../../../context/convertDataContext';

const Container = styled.div`
  padding: 20px;
`;

const SceneList = () => {
  //const [script, setScript] = useState(script2); // 초기값을 원하는 스크립트로 설정
  const { script, setScript } = useScriptData();

  const handleContentChange = (
    sceneIndex: number,
    contentIndex: number,
    field: string,
    value: string
  ) => {
    const newScript = { ...script };
    const content = newScript.scene[sceneIndex].content[contentIndex];

    if (content.type === '지문' && field === 'content') {
      content.content = value;
    } else if (content.type === '대사') {
      if (field === 'character') content.character = value;
      if (field === 'action') content.action = value;
      if (field === 'dialog') content.dialog = value;
    }

    setScript(newScript);
  };

  return (
    script && (
      <Container>
        {script.scene.map((scene, sceneIndex) => (
          <SceneItem
            key={scene.scene_num}
            scene={scene}
            sceneIndex={sceneIndex}
            onContentChange={handleContentChange}
          />
        ))}
      </Container>
    )
  );
};

export default SceneList;
