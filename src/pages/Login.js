import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { changeField, initializeForm } from "../store/modules/auth";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const { form } = useSelector(({ auth }) => ({ form: auth.login }));

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(changeField({ form: "login", key: name, value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // 구현 예정
  };

  useEffect(() => {
    dispatch(initializeForm("login"));
  }, [dispatch]);

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
