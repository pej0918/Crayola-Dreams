# 1. 프로젝트 소개

<hr/>

### ✏️ 다이어리 작성과 AI 분석을 통한 자아 감정 파악

> AI 감정분석 기술을 통해 사용자가 자신을 돌아보고 감정을 관리할 수 있는 경험을 제공하는 웹개발

> - 일기 작성 시, AI를 활용하여 작성한 일기 텍스트를 분석

> - 내용에 맞는 이미지 추천 서비스 및 감정데이터를 통한 감정 그래프 제공
> - 
>   <img width="779" alt="image" src="https://github.com/heua717/carum/assets/116487398/9aac66d8-16bf-4869-b127-c4e24803edb7">

<br/>

<hr/>

### ✔️ 1. 기획배경 및 필요성

<br/>

많은 현대인들은 바쁘고 귀찮다는 이유로 스스로 어떤 감정 상태에 있는지 회피하려는 경향을 보임

일기 쓰기를 통해 오늘 하루 중 있었던 사건, 사건을 받아들였던 자신의 생각과 감정을 적어보면 왜 힘들었는지 좋았는지를 파악할 수 있음

이러한 방법으로 자신의 마음을 돌아보고 이해하며 자신의 감정을 관리하는 훈련이 필요함

따라서 본인의 감정을 파악하여 다스릴 수 있으며 감정을 관리하는데 도움을 줄 수 있는 감정 일기의 필요성을 느껴서 이프로젝트를 진행하게됨

<br/>

### ✔️ 2. 대상

- 힐링과 공감이 필요한 사람
- 내 감정을 글로 기록하며 정리하고 싶은 사람

<br/>

<hr/>

# 2. 목차

<hr/>


<hr/>

# 3. 웹 화면 구성 

<hr/>


### ✔️ 3.1 서비스 흐름도 

<img width="600" alt="image" src="https://github.com/JS-A-CoreProject/DiaryFeelings/assets/116487398/60c3158a-9673-4692-bf49-013f7d7c313e">

<hr/>

### ✔️ 3.2 메뉴 구성 

<img width="600" alt="image" src="https://github.com/JS-A-CoreProject/DiaryFeelings/assets/116487398/bbf27ead-0837-4fa1-a334-d1ef977a997c">

<hr/>

### 3.3 메인페이지 

<img width="600" alt="image" src="https://github.com/JS-A-CoreProject/DiaryFeelings/assets/116487398/e7cbf8a6-53be-4f49-b7b8-8eefda4eca75">

**✏️화면설명**

① 로고 : 클릭 시 메인화면 이동

② 검색창 : 일기 검색 기능 

③ 로그인 : 로그인(Login_01) 페이지로 이동

④ 회원가입 : 회원가입(join_01) 페이지로 이동

⑤ 가이드 : 홈페이지 소개 및 사용 설명

<hr/>

### 3.2 로그인 페이지

<img width="600" alt="image" src="https://github.com/JS-A-CoreProject/DiaryFeelings/assets/116487398/d036327a-ceb9-4b3b-93d1-c9d1033acb06">


**✏️화면설명**

① 로그인 : 아이디, 패스워드 입력 후 클릭 시 일기 기록 페이지(Diary_01) 로 이동

② 회원가입 : 클릭 시, 회원가입 페이지(join_01) 로 이동

③ 소셜 로그인 : 각 소셜로그인 페이지(api) 로 이동

<hr/>

### 3.3 회원가입 페이지 

<img width="600" alt="image" src="https://github.com/JS-A-CoreProject/DiaryFeelings/assets/116487398/e1612f2d-ec0e-4891-b6af-e6dcb690ded8">


**✏️화면설명**

① 정보 등록 : 프로필사진, 닉네임, 이름 등록

② 중복확인 : 클릭 시 , 가입 가능 여부 알림

③ 회원가입 : 정보 입력 후, 클릭 시 로그인 페이지(Login_01)로 이동!

<hr/>

### 3.4 일기모아보기 

<img width="600" alt="image" src="https://github.com/JS-A-CoreProject/DiaryFeelings/assets/116487398/6ec739c9-5e61-4f42-a4e4-4d5c90cd465c">



**✏️화면설명**

① 달력기능 : 기록 날짜에 따라 달력에 이모지 표시. 클릭 시 Calendar_01 로 이동

② 일기작성 : 클릭 시 , Diary_03 로 이동

③ 다크모드/라이트모드

④ 사용자 프로필 사진

⑤ 모아보기 : 일기 별 콘텐츠를 카드화해서 보여주기

⑥ 날짜 검색:  검색한 날짜 일기 보여주기 

⑦ 페이지 넘기기 

<hr/>

### 3.5 일기작성 페이지

<img width="600" alt="image" src="https://github.com/JS-A-CoreProject/DiaryFeelings/assets/116487398/b9b0fba6-6eeb-49e4-aea5-7ce640267a1a">


**✏️화면설명**

① 감정 선택 

② 폰트 선택 : 일기마다 다른 폰트 설정 가능

③ 사진 추가 기능

④ 일기 텍스트 작성 

<hr/>

### 3.6 상세보기 페이지 

<img width="600" alt="image" src="https://github.com/JS-A-CoreProject/DiaryFeelings/assets/116487398/52f3a7ec-f16f-47e1-9a1d-f58905b02db5">


**✏️화면설명**

① 날씨 선택  기능

② 조언 텍스트 : 일기 분석을 통한 AI 조언 텍스트

③ 이미지 생성 : 정보 분석 후, 어울리는 AI 이미지 생성

④ 일기 내용 수정 및 삭제 기능

<hr/>


### 3.7 네비게이션 기능 

<img width="650" alt="image" src="https://github.com/JS-A-CoreProject/DiaryFeelings/assets/116487398/4bcf8479-0582-428d-bcfa-225aa45d4927">


① 다크모드 / 라이트 모드

② 캘린더 모달 창 : 일기 기록 시 감정 이모지 등록, 이모지 클릭 시 해당 일기로 이동 

③ 사용자 정보 모달 창 : 정보변경, 감정 그래프 확인, 배경 테마 켜기, 로그아웃 

④ 일기 검색 기능 : 검색 후 분류된 일기 모음 

<hr/>

### 3.8 사용자 감정정보 페이지 

<img width="600" alt="image" src="https://github.com/JS-A-CoreProject/DiaryFeelings/assets/116487398/b91b4752-82c1-4662-98cc-dec60d09a1d7">


① 최근 일기 기록 목록 

② 다짐과 목표 적는 텍스트 상자

③ 감정 기록 : 막대그래프, 원형 그래프

④ 정보 변경 페이지(Mypage_02)로 이동 

<hr/>

### 3.9 정보변경 페이지

<img width="600" alt="image" src="https://github.com/JS-A-CoreProject/DiaryFeelings/assets/116487398/473ea699-f73b-4aac-a43e-f79970164330">


① 정보 변경 : 프로필사진, 닉네임, 비밀번호

② 탈퇴 하기 모달창 

<hr/>


### 3.10 404Not 페이지 

<img width="600" alt="image" src="https://github.com/JS-A-CoreProject/DiaryFeelings/assets/116487398/3118770b-9eb0-4ded-b142-88eb46c76ead">

① Not403 페이지 : 사용자가 접근이 불가능한 페이지

② 작성한 일기가 없을 시 마이페이지

③ 작성한 일기가 없을 시 작성 페이지






<hr/>






# 4. 개발 환경 및 구성

<hr/>

## 4.1 감정분석 데이터셋 

#### 텍스트 기반 감정 분석

####  4.1.1 데이터 준비

| 데이터 정의   | 감정이 분류된 텍스트                                         |
|--------------|---------------------------------------------------------|
| 데이터 획득 방법 | AI Hub 사이트에서 분류된 데이터 획득                            |
|               | - 감성 대화 말뭉치                                           |
|               | - 웰니스 상담 스크립트                                        |

**감정 분류:**
- 행복
- 당황
- 분노
- 슬픔
- 불안
- 중립 등의 감정이 분류된 데이터.

#### 4.1.2 감성 대화 말뭉치 

<img width="482" alt="image" src="https://github.com/JS-A-CoreProject/DiaryFeelings/assets/116487398/87bc7147-7e55-4edc-aac6-bba2bce66fbc">

#### 4.1.3 웰니스 상담 스크립트 

<img width="382" alt="image" src="https://github.com/JS-A-CoreProject/DiaryFeelings/assets/116487398/9e1d8c7c-02f1-404e-957e-8073a59f2e8e">

### 4.2 전처리 과정

<img width="482" alt="image" src="https://github.com/JS-A-CoreProject/DiaryFeelings/assets/116487398/e14ba5a6-03f8-4d49-aa3c-e8d3191ba2bc">


| 발화문 및 감정 추출 | 발화문과 해당 감정을 추출하여 분류                           |
|----------------------|--------------------------------------------------------------|
| 전처리 데이터        | 데이터는 발화문과 해당하는 1번 감정이 포함된 데이터   <img width="482" alt="image" src="https://github.com/JS-A-CoreProject/DiaryFeelings/assets/116487398/57f24445-f016-43d7-a3aa-6e8c69a8877f">         |
                 


### 4.3 데이터 분석

| 데이터 분석 목표     | 비슷한 감정들을 하나의 감정으로 분류하기                      |
|----------------------|--------------------------------------------------------------|
| 데이터 분석 시나리오  | - 공포 감정은 불안 감정으로 분류                             |
|                      | - 혐오 감정은 분노 감정으로 분류                             |
|                      | - 상처 감정은 슬픔 감정으로 분류                             |
|                      | - 기쁨 감정은 행복 감정으로 분류                             |
| 데이터 분석 결과      | - 데이터 분류 결과 <img width="355" alt="image" src="https://github.com/JS-A-CoreProject/DiaryFeelings/assets/116487398/bb891d4f-cf13-4f61-8584-00ea00bd1937">
                                           |

### 4.4 모델 생성 및 학습

| 모델링 목표          | 사용자가 입력한 텍스트를 문장마다 감정 분석하기               |
|----------------------|--------------------------------------------------------------|
| 학습 모델             | KoBert 기반 kcbert-base를 파인 튜닝                           |
| 학습 방법             | - batch_size = 64                                            |
|                      | - learning_rate = 5e-5                                       |
|                      | - epochs = 5                                                 |
|                      | - 문장의 최대 길이로 padding함                                |
| 모델 예측 결과        | <img width="482" alt="image" src="https://github.com/JS-A-CoreProject/DiaryFeelings/assets/116487398/c859d30e-4174-46d9-a766-1e68804e4a91">
                                                             |

### 4.5 검증

| 모델링 평가 결과     |                                                              |
|----------------------|--------------------------------------------------------------|
|                      | <img width="306" alt="image" src="https://github.com/JS-A-CoreProject/DiaryFeelings/assets/116487398/197ff9e7-9a33-4f1a-97fe-cd563a7eab58">
      
<hr>

## 4.2 개발 환경

<img width="701" alt="image" src="https://github.com/JS-A-CoreProject/DiaryFeelings/assets/116487398/d398ecb1-fd00-4aa3-85d4-d158ddb0614b">


🌼클라이언트 :

- **React** : 컴포넌트 기반의 UI 라이브러리로써, vuejs보다는 높은 자율성을 가지며, 풍성한 생태계를 가지고 있다는 점에서 선택

- **TypeScript** : 정적 타입 검사를 통한 안정성과 타입 인텔리센스를 통한 생산성 향상을 위해 사용

- **Tailwind(CSS)** : CSS 프레임워크로, 많은 utility 클래스를 제공하여 직접 CSS를 작성하는 번거로움을 줄이고, 유연하게 디자인을 구성할 수 있어 선택

- **Recoil** : 전역 상태를 관리하기 위한 라이브러리로써, Redux와 비교했을 때, 더욱 간결하고, 상태를 작은 단위로 활용하기에 용이함이 있다고 생각해 사용

- **Nextjs** : 서버사이드 렌더링을 지원하기 위하여 사용했습니다. 또한, 빌드 시간을 단축시키고, 빌드된 파일을 캐싱하여 빠른 로딩을 지원하기 위해 사용

🌸서버 :

- **Node.js** : JavaScript를 사용하여 프론트엔드와 백엔드 간의 일관된 클라이언트와의 언어적 호환성을 고려하여 선택하

- **Mysql** : 관계형 데이터베이스로, 데이터를 구조화하여 효율적으로 저장하고 검색하기 위해 선택

- **python** : 서버 사이드 로직 및 감정분석 모델을 구현하기 위해 도입

🌺 모델 :

- **koGPT-2** : koGPT2는 텍스트 생성 작업에 뛰어난 성능을 보이고 문맥을 이해하며 이를 기반으로 자연스러운 텍스트를 생성할 수 있어, 사용자와의 상호 작용에 적합하여 선택
  
- **koBert** : 'KoBert' 모델은 한국어 텍스트의 감정 분석에 적합한 모델로, 사용자의 감정을 이해하고 상황에 맞게 대응하여 선택
  
- **Karlo** : : 텍스트를 분석하여 키워드에 맞는 이미지생성을 위해 선택 



<hr/>



## 4.3 테이블 명세서 

## 회원 테이블 (tb_user)

| 컬럼명            | 컬럼 ID         | 타입           | 길이      | NN | PK | FK | UK | CK | 비고           |
|-------------------|-----------------|----------------|----------|----|----|----|----|----|----------------|
| 회원번호           | user_number     | INT UNSIGNED  |          | Y  |    |    |    |    |                |
| 회원ID            | user_id         | VARCHAR(30)   |          | Y  | Y  |    |    |    |                |
| 비밀번호          | user_password   | VARCHAR(130)  |          | Y  |    |    |    |    |                |
| 비밀번호 salt     | user_salt       | VARCHAR(130)  |          | Y  |    |    |    |    |                |
| 회원 이름         | user_name       | VARCHAR(30)   |          | Y  |    |    |    |    |                |
| 로그인 형태       | user_provider   | VARCHAR(20)   |          |    |    |    |    |    |                |
| 가입 날짜         | created_time    | DATETIME      |          |    |    |    |    |    |                |
| 수정 날짜         | updated_time    | DATETIME      |          |    |    |    |    |    |                |
| 프로필 사진       | user_image      | VARCHAR(500)  |          |    |    |    |    |    |                |

## 일기 정보 테이블 (tb_diary)

| 컬럼명            | 컬럼 ID         | 타입           | 길이      | NN | PK | FK | UK | CK | 비고           |
|-------------------|-----------------|----------------|----------|----|----|----|----|----|----------------|
| 일기 번호         | diary_number    | INT UNSIGNED  |          | Y  |    |    |    |    |                |
| 회원 ID           | user_id         | VARCHAR(30)   |          | Y  |    | Y  |    |    |                |
| 회원 이름         | user_name       | VARCHAR(30)   |          |    |    | Y  |    |    |                |
| 일기 제목         | diary_title     | VARCHAR(500)  |          |    |    |    |    |    |                |
| 일기 내용         | diary_content   | TEXT          |          |    |    |    |    |    |                |
| 감정              | diary_emotion   | VARCHAR(100)  |          |    |    |    |    |    |                |
| 날씨              | diary_weather   | VARCHAR(50)   |          |    |    |    |    |    |                |
| 폰트              | diary_font      | VARCHAR(1000) |          |    |    |    |    |    |                |
| 조언              | diary_advice    | VARCHAR(64)   |          |    |    |    |    |    |                |
| 생성 날짜         | created_time    | DATETIME      |          |    |    |    |    |    |                |
| 수정 날짜         | updated         | DATETIME      |          |    |    |    |    |    |                |
| 사용자 선택 감정  | diary_userEmo   | VARCHAR(50)   |          |    |    |    |    |    |                |
| 사용자 선택 날짜  | user_date       | DATETIME      |          |    |    |    |    |    |                |

## 토큰 테이블 (tb_refresh_token)

| 컬럼명            | 컬럼 ID         | 타입           | 길이      | NN | PK | FK | UK | CK | 비고           |
|-------------------|-----------------|----------------|----------|----|----|----|----|----|----------------|
| 회원 ID           | user_id         | VARCHAR(30)   |          | Y  |    |    |    |    |                |
| refresh 토큰      | user_token      | VARCHAR(255)  |          |    |    |    |    |    |                |



<hr/>

## 5.3 폴더구조

##### 11.13일 전체적으로 Merge 완료 (update)

          Front End

          .
          ├── app
          │   └── componenets
          │          ├── Nav.tsx
          │   └── calendar
          │   └── diary
          │   └── join
          │   └── signin
          │   └── write
          ├── page.tsx
          ├── layout.tsx
          └── README.md

<hr/>


# 5. 협업툴

<hr/>

### 5.1 Git 

Milestone으로 작업할 일들을 생성후 그에 관련된 Issue를 만들고 Issue에 따른 브랜치를 생성후 각 기능별로 파트를 분담하고 PR를 올리며 작업상황을 공유함

### 5.2 Notion 

협업을 위한 올인원 워크스페이스로, 문서, 데이터베이스, 프로젝트 관리, 일정 관리 등 다양한 기능을 제공하기때문에 팀원들과 실시간으로 정보를 공유 등 회의기록을 작성 

### 5.3 Google Drive 

클라우드 기반의 파일 저장 및 공유 서비스로, 구글 문서, 스프레드시트, 프레젠테이션 등의 앱을 함께 사용할 수 있어서  팀원들과 파일을 쉽게 공유하고 동시에 작업함

<hr/>

# 참고

<hr/>

#### front-react(Next.js) 로컬 빌드 방법

- (package.json 변경 없을 시 실행 필요X) package.json에 정의된 라이브러리 설치(node_modules 생성 및 업데이트)

         $ npm install

- 개발환경 실행

         $ npm run dev

         또는

         $ yarn dev

         또는

         $ pnpm dev

         또는

         $ bun dev

▲ Next.js 14.0.1

       - Local:  http://localhost:3000




