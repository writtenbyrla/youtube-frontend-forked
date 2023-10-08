### 추가된 코드 (2023.10.08)

#### Home 기존 페이징 처리에서 문제 생겼던 부분

```js
const hasScrollbar = () => {
  return document.documentElement.scrollHeight > window.innerHeight;
};

const [ref, inView] = useInView({
  skip: !hasScrollbar(), // 스크롤이 없을 경우 skip
});
```

해당 코드로 수정

#### 리덕스 반영 수정

- index.js

```js
import { Provider } from "react-redux";
import store from "./store";

root.render(
  <Provider store={store}>
    <RouterProvider router={Router} />
  </Provider>
);
```

- store/index.js 참고
- store/userSlice.js : 로그인/로그아웃 반영
- store/commentSlice.js : 댓글/대댓글 CRUD 반영

-> commentSlice 각각의 기능별 주석 추가해놓은 상태
