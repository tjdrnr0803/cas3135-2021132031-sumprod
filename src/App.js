  // App.js 파일의 calculate 함수를 아래 내용으로 교체합니다.

  const calculate = async () => {
    setError(null);
    setSum(null);
    setProd(null);

    // --- 디버깅 코드 1번 ---
    // 환경 변수가 제대로 불러와졌는지 확인합니다.
    console.log('Backend URL 변수:', BACKEND_BASE_URL);

    // 프론트엔드에서의 간단한 유효성 검사
    if (inputX === '') {
      setError('첫 번째 숫자(x)를 입력해주세요.');
      return;
    }
    if (inputY === '') {
      setError('두 번째 숫자(y)를 입력해주세요.');
      return;
    }

    try {
      const fullUrl = `${BACKEND_BASE_URL}/sumprod?x=${inputX}&y=${inputY}`;
      
      // --- 디버깅 코드 2번 ---
      // 실제로 fetch가 시도하는 전체 URL 주소를 확인합니다.
      console.log('Fetching URL:', fullUrl);

      const response = await fetch(fullUrl);
      const data = await response.json();

      if (data.type === 'success') {
        setSum(data.sum);
        setProd(data.prod);
        setResultX(inputX);
        setResultY(inputY);
      } else {
        setError(data.message);
      }
    } catch (err) {
      // --- 디버깅 코드 3번 ---
      // catch 블록으로 들어온 실제 에러 객체의 내용을 확인합니다.
      console.error('Fetch 실패! 실제 에러:', err); 
      
      setError('Server error occurred. (콘솔 창에서 실제 에러를 확인하세요)');
    }
  };
