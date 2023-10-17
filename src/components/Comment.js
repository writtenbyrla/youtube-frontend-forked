import styled from "styled-components";
import AddComment from "./AddComment";
import { useState, useRef } from "react";
import Reply from "./Reply";
import { useDispatch } from "react-redux";
import { deleteComment, updateComment } from "../store/commentSlice";
const Box = styled.div`
  width: 95%;
  margin: 10px auto;
  margin-bottom: 30px;

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

const Comment = ({ comment }) => {
  const [isActive, setIsActive] = useState(true);
  const [content, setContent] = useState(comment.commentDesc);
  const contentRef = useRef(null);
  const dispatch = useDispatch();
  const onClick = () => {
    setIsActive(!isActive);
  };

  // span에서 상태 유지 -> content로
  const handleBlur = () => {
    setContent(contentRef.current.innerText);
  };

  const onUpdate = () => {
    dispatch(
      // slice에서 import해온 updateComment임
      updateComment({
        // 받아온 comment의 코드, 비디오 코드 유지해서 수정
        commentCode: comment.commentCode,
        videoCode: comment.videoCode,
        // handleBlur통해 content 담은 것을 comment내용에 넣어서 수정
        commentDesc: content,
      })
    );
  };

  const onDelete = () => {
    dispatch(deleteComment(comment.commentCode));
  };
  return (
    <Box>
      <h2>@{comment.member.id}</h2>
      <div>
        <span
          contentEditable="true"
          suppressContentEditableWarning
          ref={contentRef}
          onBlur={handleBlur}
        >
          {content}
        </span>
        <button onClick={onClick}>답글</button>
        <button onClick={onUpdate}>수정</button>
        <button onClick={onDelete}>삭제</button>
      </div>
      <AddComment
        active={isActive}
        parent={comment.commentCode}
        code={comment.videoCode}
      />
      {comment.replies?.map((reply) => (
        <Reply reply={reply} key={reply.commentCode} />
      ))}
    </Box>
  );
};
export default Comment;
