import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getVideo } from "../api/video";
import { useEffect } from "react";
import { useState } from "react";
import { viewComments } from "../store/commentSlice";
import { useSelector, useDispatch } from "react-redux";
import Reply from "../components/Reply";

const StyledMain = styled.main`
  padding-top: 56px;
`;

const Watch = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [video, setVideo] = useState(null);
  const comments = useSelector((state) => {
    return state.comment;
  });

  const getVideoAPI = async () => {
    const result = await getVideo(id);
    setVideo(result.data);
  };

  useEffect(() => {
    getVideoAPI();
  }, []);

  useEffect(() => {
    dispatch(viewComments(id));
  }, [dispatch]);

  return (
    <StyledMain>
      {JSON.stringify(video, null, 2)}
      <form>
        <input type="text" />
        <input type="submit" value="댓글" />
      </form>
      {comments.map((comment) => (
        <div key={comment.commentCode}>
          <div>@{comment.member.id}</div>
          <div>{comment.commentDesc}</div>
          <div>{JSON.stringify(comment.replies)}</div>
          {comment.replies.map((reply) => (
            <Reply key={reply.commentCode} reply={reply} />
          ))}
        </div>
      ))}
    </StyledMain>
  );
};
export default Watch;
