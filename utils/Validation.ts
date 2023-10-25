  // 유효성 검증
  const pattern: Record<string, RegExp> = {
    id: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    nickName: /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]{2,8}$/,
    password: /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/,
  };

  export const validation = (property: string, data: string): boolean => {
    return pattern[property]?.test(data);
  };
