import axios, { AxiosError } from 'axios';
import { useUser } from './useUser';
import { useTokenModal } from '../context/tokenModalContext';
import { useAxiosInstances } from './useAxiosInstance';

export const useAuth = () => {
  const { updateUser, clearUser, getTokenUser, reissueToken } = useUser();
  const { openModal } = useTokenModal();
  const { createAxiosInstance, createAxiosInstanceTwoTkn } =
    useAxiosInstances();

  const login = async (endpoint: string) => {
    try {
      window.location.href = `/spring/oauth/authorize/${endpoint}`;
    } catch (err) {
      console.log(err); // temporary error handling
    }
  };

  const logout = async () => {
    try {
      const result = await axiosInstanceTwo.post(`/spring/users/sign-out`);

      console.log(result);
      const data = result.data;
      console.log('data: ', data);
      if (data.isSuccess) {
        console.log(data.message);
        clearUser();
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err); // temporary error handling
    }
  };

  const reissue = async () => {
    const { accessToken, refreshToken } = getTokenUser();
    console.log('useAuth - reissue');

    try {
      const result = await axiosInstanceTwo.post(`/spring/users/reissue-token`);
      const data = result.headers;
      console.log('reissue', data);
      // 토큰 재발급 성공
      if (data) {
        const tokens = result.headers;
        const resAccessToken = tokens.accesstoken;
        const resRefreshToken = tokens.refreshtoken;
        // restore token
        reissueToken(resAccessToken, resRefreshToken);

        return true;
      } else {
        // 토큰 재발급 실패
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  };

  // axios instance 선언
  const axiosInstance = createAxiosInstance(reissue);
  const axiosInstanceTwo = createAxiosInstanceTwoTkn(reissue);

  const userInfoFunc = async () => {
    try {
      const result = await axiosInstance.get(`/spring/users`);
      console.log('result: ', result);
      const data = result.data.result;
      if (data.isSuccess) {
        return data;
      } else {
        return data;
      }
    } catch (err) {
      console.log(err); // temporary error handling
    }
  };
  return {
    login,
    logout,
    reissue,
    userInfoFunc,
  };
};
