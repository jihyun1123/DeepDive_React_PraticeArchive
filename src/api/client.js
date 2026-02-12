// axios를 커스텀 설정하여 인스턴스 생성

import axios from 'axios';

const client = axios.create({
  // 모든 요청 앞에 자동으로 붙는 기본 주소
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://{IP}:{PORT}/api',
  timeout: 5000,
  // 공통 헤더 설정, 서버에 JSON 형식으로 요청함을 알림
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;