import { useDispatch } from "react-redux";
import { asyncLogin } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import styled from "styled-components";

const H1 = styled.h1`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin: 20px;
`;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const id = e.target.id.value;
    const password = e.target.password.value;
    dispatch(asyncLogin({ id, password }));
    navigate("/");
  };
  return (
    <Container>
      <H1>로그인</H1>
      <Form onSubmit={onSubmit} style={{ width: "600px", margin: "0 auto" }}>
        <Form.Group className="mb-3">
          <Form.Control type="text" placeholder="아이디 입력" name="id" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="비밀번호 입력"
            name="password"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control type="submit" value="로그인" />
        </Form.Group>
      </Form>
    </Container>
  );
};
export default Login;
