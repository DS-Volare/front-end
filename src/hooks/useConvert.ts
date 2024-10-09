import axios from 'axios';
import { useUser } from './useUser';
import {
  useNovelIdData,
  useStoryboardData,
  useCharaterData,
  useNovelData,
  useNovelTitleData,
  useScriptData,
  useScriptIdData,
} from '../context/convertDataContext';
import { Script } from '../types';
import { useAuth } from './useAuth';
import { useAxiosInstances } from './useAxiosInstance';
import { useConvertStep } from '../context/convertStepContext';

export const useConvert = () => {
  const { getTokenUser } = useUser();
  const { novelId, setNovelId } = useNovelIdData();
  const { reissue } = useAuth();
  const { setStoryboard } = useStoryboardData();
  const { setCharacterList } = useCharaterData();
  const { setText } = useNovelData();
  const { setTitle } = useNovelTitleData();
  const { setScript } = useScriptData();
  const { setScriptId } = useScriptIdData();
  const { setStep } = useConvertStep();

  // axios instance 선언
  const { createAxiosInstance } = useAxiosInstances();
  const axiosInstance = createAxiosInstance(reissue);

  // api: save novel / spring
  const saveNovel = async (title: string, novel: string) => {
    const requestData = {
      title: title,
      novel: novel,
    };

    try {
      const result = await axiosInstance.post(`/spring/novels`, requestData);
      const data = result.data;
      return data;
    } catch (err) {
      console.log(err); // temporary error handling
    }
  };

  // api: cognize the character / flask
  const cognizeCharacter = async (text: string) => {
    try {
      const result = await axios.post(
        `/flask/convert_script/character_cognizing`,
        { text }
      );
      return result.data;
    } catch (err) {
      console.log(err); // temporary error handling
    }
  };

  // api: convert a script / spring
  const convertScript = async (candidates: string[], text: string) => {
    const requestData = {
      candidates: candidates,
      text: text,
    };

    try {
      const result = await axiosInstance.post(
        `/spring/scripts/${novelId}`,
        requestData
      );

      const data = result.data;
      console.log(data);
      if (data.isSuccess) {
        console.log(data.message);
        return data.result; // return script
      } else {
        console.log(data.message);
        return false;
      }
    } catch (err) {
      console.log(err); // temporary error handling
    }
  };

  // api: convert storyboard
  const convertStoryboard = async (scriptId: number, script: Script) => {
    const requestData = {
      scriptId: scriptId,
      script: script,
    };

    try {
      const result = await axios.post(
        `/spring/sb/generate-storyboard`,
        requestData
      );

      const data = result.data;
      console.log(data);
      if (data.isSuccess) {
        console.log(data.message);
        return data.result; // return storyboard
      } else {
        console.log(data.message);
        return false;
      }
    } catch (err) {
      console.log(err); // temporary error handling
    }
  };

  // api: create a new chatRoom / spring
  const startNewChat = async (scriptId: number) => {
    try {
      const result = await axiosInstance.post(`/spring/chatRooms/${scriptId}`);

      const data = result.data;
      console.log(data);
      if (data.isSuccess) {
        console.log(data.message);
        return data.result;
      } else {
        console.log(data.message);
        return false;
      }
    } catch (err) {
      console.log(err); // temporary error handling
    }
  };

  // api: get chat list / spring
  // (need fix) cursor-based-pagination
  const getChatList = async (chatRoomId: string) => {
    try {
      const result = await axiosInstance.get(`/spring/chats/${chatRoomId}`);

      const data = result.data;
      if (data.isSuccess) {
        // console.log(data.result.allMessages);
        return data.result;
      } else {
        console.log(data.message);
        return false;
      }
    } catch (err) {
      console.log(err); // temporary error handling
    }
  };

  // api: apperance rate
  const apperanceRate = async (scriptId: number) => {
    try {
      const result = await axiosInstance.get(
        `/spring/scripts/${scriptId}/appearance-rate`
      );
      const data = result.data;
      if (data.isSuccess) {
        return data;
      } else {
        console.log(data.message);
        return data.false;
      }
    } catch (err) {
      console.log(err); // temporary error handling
    }
  };

  // api: novel statistics
  const convertStatistics = async (scriptId: number) => {
    try {
      const result = await axiosInstance.get(
        `/spring/scripts/${scriptId}/details`
      );
      const data = result.data;
      if (data.isSuccess) {
        return data;
      } else {
        console.log(data.message);
        return data.false;
      }
    } catch (err) {
      console.log(err); // temporary error handling
    }
  };

  // api: user convert list
  const convertList = async (page: number) => {
    try {
      const result = await axiosInstance.get(
        `/spring/users/conversion?pageNo=${page}`
      );
      const data = result.data;
      if (data.isSuccess) {
        return data;
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const convertDetail = async (novelId: string) => {
    try {
      const result = await axiosInstance.get(
        `/spring/users/conversion-details/${novelId}`
      );
      const data = result.data;
      if (data.isSuccess) {
        return data;
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // clear context data
  const clearConvertData = () => {
    setText('');
    setTitle('');
    setCharacterList([]);
    setScript({ scene: [] });
    setStoryboard({ scene: [] });
    setScriptId(0);
    setNovelId('');
    setStep([false, false, false, false]);
  };

  return {
    saveNovel,
    cognizeCharacter,
    convertScript,
    convertStoryboard,
    startNewChat,
    getChatList,
    apperanceRate,
    convertStatistics,
    convertList,
    convertDetail,
    clearConvertData,
  };
};
