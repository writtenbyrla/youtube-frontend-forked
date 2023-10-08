import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getVideo } from "../api/video";
import { useEffect } from "react";
import { useState } from "react";
import {
  viewComments,
  addComment,
  updateComment,
  deleteComment,
} from "../store/commentSlice";
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

  const onSubmit = (e) => {
    e.preventDefault();
    const commentDesc = e.target.commentDesc.value;
    dispatch(addComment({ videoCode: video.videoCode, commentDesc }));
  };

  return (
    <StyledMain>
      {JSON.stringify(video, null, 2)}
      <form onSubmit={onSubmit}>
        <input type="text" name="commentDesc" />
        <input type="submit" value="댓글" />
      </form>
      {comments.map((comment) => (
        <div key={comment.commentCode}>
          <div>@{comment.member.id}</div>
          <div>{comment.commentDesc}</div>
        </div>
      ))}
    </StyledMain>
  );
};
export default Watch;
