export type ErrorKey = keyof typeof ERRORS;
export type ErrorResponse = {
  errors: ErrorKey;
};

export const ERRORS = {
  'auth/email-already-in-use': '이미 사용 중인 이메일입니다.',
  'auth/weak-password': '비밀번호는 6글자 이상이어야 합니다.',
  'auth/invalid-email': '잘못된 이메일 형식입니다.',
  'auth/invalid-login-credentials': '로그인에 실패했습니다.',
  'auth/too-many-requests': '잠시 후에 시도해주세요.',
  'auth/invalid-credential': '이메일, 비밀번호를 다시 확인해주세요.'
};
