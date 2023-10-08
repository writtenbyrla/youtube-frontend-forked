import { useSelector, useDispatch } from "react-redux";
import { asyncLogin } from "../store/userSlice";

const Login = () => {
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    const id = e.target.id.value;
    const password = e.target.password.value;
    console.log("여기!");
    dispatch(asyncLogin({ id, password }));
  };
  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="id" />
      <input type="password" name="password" />
      <input type="submit" value="로그인" />
    </form>
  );
};
export default Login;
