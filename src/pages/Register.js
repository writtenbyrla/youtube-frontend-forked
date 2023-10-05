import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { changeField, initializeForm, register } from "../store/modules/auth";
import { useEffect } from "react";

const Register = () => {
  const dispatch = useDispatch();
  const { form, auth, authError } = useSelector(({ auth }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
  }));

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(changeField({ form: "register", key: name, value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { id, password, name } = form;
    dispatch(register({ id, password, name }));
  };

  useEffect(() => {
    dispatch(initializeForm("register"));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log("오류 발생");
      console.log(authError);
      return;
    }
    if (auth) {
      console.log("회원가입 성공");
      console.log(auth);
    }
  }, [auth, authError]);

  return (
    <div>
      <h1>회원가입</h1>
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
        <input
          type="text"
          placeholder="이름"
          name="name"
          onChange={onChange}
          value={form.name}
        />
        <input type="submit" value="회원가입" />
      </form>
      <Link to="/login">로그인</Link>
    </div>
  );
};
export default Register;
