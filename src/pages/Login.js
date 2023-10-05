import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { changeField, initializeForm, login } from "../store/modules/auth";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const { form, auth, authError } = useSelector(({ auth }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
  }));

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(changeField({ form: "login", key: name, value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { id, password } = form;
    dispatch(login({ id, password }));
  };

  useEffect(() => {
    dispatch(initializeForm("login"));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log("로그인 실패");
      console.log(authError);
      return;
    }
    if (auth) {
      console.log("로그인 성공");
      console.log(auth);
    }
  }, [auth, authError]);

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="아이디"
          name="id"
          onChange={onChange}
          value={form.id}
        />
        <input
          type="password"
          placeholder="비밀번호"
          name="password"
          onChange={onChange}
          value={form.password}
        />
        <input type="submit" value="로그인" />
      </form>
      <Link to="/register">회원가입</Link>
    </div>
  );
};
export default Login;
