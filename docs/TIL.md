# Today I learned

- 이번 프로젝트 하면서 배운 내용 정리

## exiftool-vendored

`Shot2Day`의 핵심 기능인 이미지 파일 메타데이터(노출, 조리개값 등)를 읽기 위해 처음에는 `exifr`이란 라이브러리를 사용했다. 그런데 기능을 구현하고 보니까 모든 브랜드 카메라가 공통적으로 갖고 있는 기본적인 데이터만 추출되더라. 그런데 애초 기획상 Ricoh GR3 시리즈의 내장/커스텀한 프리셋 설정(소위 '레시피')으로 사진을 정밀 관리/검색/정렬하는 게 이 앱의 핵심이라 다른 라이브러리를 사용해야 했고 그래서 선택한게 `exiftool-vendored`이란 라이브러리인데 (perl로 작성된) 유명한 `exiftool`이란 라이브러리의 JS wrapper였다.
문제는 `exifr`와 달리 `exiftool-vendored` 구현하는게 매우 어려웠다. 그냥 init도 되지 않은 것 같음.

### 테스트 및 문제 해결 과정

- Q: API 라우트의 문제인가?
  `exifr`은 클라이언트 사이드에서 돌릴 수 있었으나 `exiftool-vendored`는 binary dependency가 있어서 서버 사이드로 돌려야 한다. 그래서 api를 새로 작성해 주었으나 안 되었다.

- Q: 비동기를 제대로 구현 안 했나?
  이미지 파일의 메타데이터(태그)값을 읽는 비동기 함수가 완료되기 전에 렌더링 되는게 문제인가 해서 60초 대기하는 timer 함수와 `Promise.race` 했는데 항상 타임아웃. 애초에 exiftool-vendored instance가 제대로 init도 안되는 것 같았다.

- Q: edge/node 런타임의 문제인가?
  Vercel v0/ChatGPT/Claude한테 코드 짜보라고 해도 다 똑같이 api/route.ts로 구축하고 다 실패했다. 그래서 라이브러리 공식 문서와 얼마 있지도 않은 stack overflow 질의응답 읽어보니까 '바이너리 의존성 때문에 문제가 생길 수도 있다', '[edge/node/serverless 런타임](https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes) 중 node 런타임이 아니면 api post로 전달받은 이미지 파일을 로컬에 저장하고 읽는 데서 접근성 문제가 생겨 라이브러리를 사용 못 할 수도 있다'는 내용이 있었다. 이 런타임 문제일수도 있다고 생각했던게 에러 수정할 때마다 재작성하고 참고했던 v0 앱에서도 `exiftool-vendored` 코드가 구동되지 않았는데, v0는 serverless 환경이여서 그런거고 api/ 는 혹시 edge 런타임으로 돌아서 읽어야 하는 이미지에 접근을 못하는 건가 했다. 그래서 exiftool api가 돌아가는 환경을 확인해보니 edge가 아닌 node 였다. 즉 런타임의 문제는 아닌 것 같다는...

  cf. `node` vs. `edge` runtime

  > Next.js has two server runtimes you can use in your application:
  > The Node.js Runtime (default), which has access to all Node.js APIs and compatible packages from the ecosystem. The Edge Runtime which contains a more limited set of APIs.
  > Use Cases: The Node.js Runtime is used for rendering your application. The Edge Runtime is used for Middleware (routing rules like redirects, rewrites, and setting headers).

  cf. `edge` 런타임에서 `exiftool-vendored`가 안될 가능성이 높은 이유(?): commonJS로 작성된 라이브러리 같음

  > The Edge Runtime has some restrictions including:
  > Native Node.js APIs are not supported. For example, you can't read or write to the filesystem.
  > node_modules can be used, as long as they implement ES Modules and do not use native Node.js APIs.
  > Calling require directly is not allowed. Use ES Modules instead.

- Q: 서버가 필요한 게 아닌가?
  `exiftool-vendored`가 제대로 init조차 못하길래 API 라우트 말고 아예 백엔드 서버에서 명시적으로 init/구동을 해보기로 했다.
