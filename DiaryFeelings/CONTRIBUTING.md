# 필요한 지식

### • vite.js

https://ko.vitejs.dev/guide/

### • Tailwindcss

https://tailwindcss.com/

### • Typescript

공식사이트
https://www.typescriptlang.org/₩

노마드코더
https://nomadcoders.co/typescript-for-beginners

타입스크립트 핸드북
https://typescript-kr.github.io/pages/basic-types.html

### • Next.js

공식사이트
https://nextjs.org/

Next.js Handbook
Next.js 핸드북
https://coffeeandcakeandnewjeong.tistory.com/5

노마드코더
[https://nomadcoders.co/nestjs-fundamentals](https://nomadcoders.co/nextjs-fundamentals)

## 1. 협업 규칙

### 브랜치 관리

- 브랜치명은 관련된 issue 번호(`#No`)를 추가하여 생성

  - 예시: `feature/5-nav-layout`
    <img width="368" alt="스크린샷 2023-11-06 오전 5 24 53" src="https://github.com/JS-A-CoreProject/DiaryFeelings/assets/116487398/3cf46572-29fe-4cb7-aff0-465b6056cef2">

- Issue에 따른 브랜치 생성은 `dev` 브랜치를 중심으로 하고, 브랜치를 생성하기 전에 항상 최신 상태로 업데이트하기

### Issue 관리

- 본인이 진행할 작업에 대한 issue를 생성
  - **Assignees:** 해당 이슈를 처리할 담당자를 지정

![스크린샷 2023-11-06 오전 5 24 20](https://github.com/JS-A-CoreProject/DiaryFeelings/assets/116487398/ae68fb5d-1922-43cc-999b-0d3d6714ed33)

### Pull Request 관리

- Pull Request (PR)를 생성할 때:

  - **Assignees:** 해당 PR을 처리할 담당자를 지정
  - **Reviewer:** 해당 PR을 Merge 승인할 권한이 있는 코드 리뷰 담당자를 지정

  - ![스크린샷 2023-11-06 오전 5 34 38](https://github.com/JS-A-CoreProject/DiaryFeelings/assets/116487398/fa36722c-eb14-48ec-bf1a-69bd96abaf32)

- PR을 Merge할 때:
  - 해당 issue와 (remote) 브랜치를 삭제. PR을 Merge한 후, 삭제 작업을 진행
  - [PR 템플릿](./.github/PULL_REQUEST_TEMPLATE.md)을 참고

### 주요 브랜치

- `main`: 최종 릴리스 버전 브랜치
- `dev`: 개발 중인 버전을 통합하는 최신 브랜치

### 주의사항

- 개발을 시작하기 전에 본인의 로컬 브랜치를 항상 확인
- 개발을 시작하기 전에 반드시 `git pull`을 통해 원격 저장소로부터 최신 업데이트를 받기
- 활성화 중인 issue를 확인하여 작업 파일 및 범위가 겹치지 않도록 주의
