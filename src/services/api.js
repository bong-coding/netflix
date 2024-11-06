// src/services/api.js
import axios from "axios";

const apiKey = process.env.VUE_APP_TMDB_API_KEY; // .env 파일에 API 키 저장

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: apiKey,
    language: "ko-KR", // 한국어 설정 (필요 시 변경)
  },
});

// 요청 인터셉터 (필요 시)
api.interceptors.request.use(
  (config) => {
    // 예: 토큰 추가 (필요 시)
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 (필요 시)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 예: 에러 처리
    return Promise.reject(error);
  }
);

export default api;
