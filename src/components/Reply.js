import styled from "styled-components";
import { useDispatch } from "react-redux";
import { deleteComment } from "../store/commentSlice";

const Box = styled.div`
  width: 95%;
  margin: 0 auto;
  margin-bottom: 15px;

  h2 {
    font-weight: bold;
    margin-bottom: 5px;
  }
  button {
    background: black;
    color: white;
    border-radius: 5px;
    margin: 10px;
    padding: 5px 10px;
  }
`;

const Reply = ({ reply }) => {
  const dispatch = useDispatch();
  const onDelete = () => {
    dispatch(deleteComment(reply.commentCode));
  };
  return (
    <Box>
      <h2>@{reply.member.id}</h2>
      <div>
        <span>{reply.commentDesc}</span>
        <button onClick={onDelete}>삭제</button>
      </div>
    </Box>
  );
};
export default Reply;
