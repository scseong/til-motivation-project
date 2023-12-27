## 내배캠 React 3기 A-7조 심화 프로젝트

### 📢 프로젝트 개요

**23. 12. 26 - 24. 01. 03**

- 프로젝트 명 : 여러분 TIL 제출하러 갑시다~ 🚗💨
- 주제: TIL 제출로 힘들어 하시는 매니저님을 위해 만든 TIL 인증 사이트
- 소개: 오늘 우리가 배운 것들을 나누고 함께 성장해요. 개발자 여러분의 코딩 여정을 기록하세요.

### 👥 팀 소개

- 팀명: 킹갓제너럴창성조 스윗챌린저 당도100% 이빨 다 썩음 당뇨걸릴뻔 인슐린 맞을 준비 하시조
- 팀원: 전민석, 손창성, 정유진, 천영륜

### 💡 구현 기능

#### 필수요구사항

- 회원가입, 로그인

  - UI/UX
  - supabase Auth를 사용한 이메일 회원가입, SNS 로그인

    - 이메일 가입 시 자신의 블로그 주소 (필수)
    - SNS 로그인 시 프로필 페이지로 리다이렉트 (개인 블로그 주소 입력)

  - react-hook-form 사용하여 유효성 검사

- 프로필
  - 프로필 (이름, 소개, 팔로워, 팔로잉, 개인 블로그 주소)
  - TIL 일지 (like. github 잔디)
  - 프로필 수정 (이름, 소개, 프로필 이미지, 개인 블로그 주소)
    - 본인 인증
  - 작성한 게시글 목록
  - 좋아요 누른 게시글 목록
- 메인 페이지

  - 헤더
    - 홈
    - 검색 - 키워드, 카테고리
    - 유저 컴포넌트 or 로그인
      - 로그아웃
      - 마이 프로필 이동
  - 게시글 작성 UI
    - 로그인 필요
    - 프로필 이미지, 문구
    - 클릭하면 게시글 작성 url로 이동
    - 스크롤 시 고정
  - TIL 목록 표시 기준
    - 시간 순으로 TIL 표시
  - TIL 게시글
    - 작성자 정보
      - 프로필 이미지, 닉네임, 게시일, 소속(?)
      - 팔로우 버튼
      - 클릭 시 프로필 페이지로 이동
    - TIL 게시글
      - 제목, 내용, 게시글 요약 정보 (Open Graph 활용)
      - 댓글, 좋아요 개수 표시
      - 하단 아이콘 박스 - 좋아요, 댓글
        - 댓글 버튼 클릭 시 상세 페이지 이동
      - 게시글 클릭 시 상세 페이지 이동
  - 사이드바 (위치 고정)

    - 연속 TIL 일수

- 상세 페이지

  - 작성자 정보
    - 프로필 이미지, 닉네임, 게시일, 소속
    - 클릭 시 프로필 페이지로 이동
  - 제목, 내용, 작성 시간
  - 첨부한 TIL 블로그
    - 클릭 시 새 창으로 이동
  - 댓글
    - 댓글 개수 표시
    - 댓글 작성
      - 프로필 이미지, 내용
      - 로그인 필요
      - 유효성 검사 후 버튼 활성화
    - 작성자 정보 (프로필 이미지, 이름, 소속, 작성시간)
      - 클릭 시 프로필 페이지 이동
    - 댓글 내용
    - 자신의 댓글 수정, 삭제

- 게시글 작성 페이지
  - 제목 (최대 40자 제한 - 현재 글자 수 보여주기), 내용, url 입력 form
  - 게시글 에디터
  - 첨부한 TIL URL 미리보기 (오픈 그래프)
  - 주소 유효성 검사
    - 사용 가능한 블로그 제한 (velog, tistory, github, medium)
  - 뒤로 가기
    - 작성한 내용이 있다면 페이지 이동 시 확인

#### 선택요구사항

- 메인 페이지

  - TIL 목록 필터링/정렬 - 추천, 팔로우, 좋아요

- 팔로우/팔로워
- 게시글 공유 (url 복사 or SNS 공유)
- 사이드바

  - 좋아요 순 인기 Top 10
  - 일수, 좋아요 전환 Tab

- 댓글
  - 작성자의 댓글이면 "작성자" 태그
  - 대댓글

### 📝 역할 분담

| 전민석                 | 손창성           | 정유진      | 천영륜      |
| ---------------------- | ---------------- | ----------- | ----------- |
| 글 작성 페이지, 프로필 | 회원가입, 로그인 | 상세 페이지 | 메인 페이지 |

### 🚩 개발 내용

#### 💻 개발 환경

- IDE: Visual Studio Code
- OS: Windows
- Package Manager: Yarn Classic
- React boilerplate: Create React App

#### 📌 사용 기술과 사용한 이유

- React - 사용자와 상호작용 할 수 있는 UI를 효율적으로 구현
- Zustand - 전역 상태 관리 도구

  - 팀원들 모두 알고 있던 Redux와 유사한 기술. Redux는 불필요한 코드 작성이 많고 새로운 전역 상태 관리 도구를 적용하기 위해 선택
  - Recoil은 2월 이후 업데이트 X

- TypeScript - 코드 작성 단계에서 오류를 사전에 방지하고 코드 피드백 및 자동 완성 기능을 활용하여 개발 생산성 향상
- NextJS - 서버 사이드 렌더링과 정적 사이트 생성을 지원하는 리액트 프레임워크. 검색 엔진 최적화와 초기 로딩 성능 향상.
- React Hook Form - Form 관리를 위한 간단하고 성능 최적화된 라이브러리. React 기반의 유연한 폼 처리
- postcss - 스타일링. CSS Module을 사용할 수 있게 해주는 플러그인.

  - styled components - 서버 컴포넌트 지원 X
  - tailwind - 짧은 프로젝트 내에 적용하기에 러닝 커브 높음

- Supabase - 사용자 인증과 데이터베이스 등의 서버 기능 제공

  - firebase에 비해 규모가 작지만 성장하고 있는 서비스. 오픈 소스.

- React Query - 비동기 작업과 상태를 관리

