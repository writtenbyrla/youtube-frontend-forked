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
import AddComment from "../components/AddComment";
import Comment from "../components/Comment";

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
      {/* video는 단순 비디오 1개 정보 가져와서 보여주는 거라 생략 */}
      {JSON.stringify(video, null, 2)}
      <AddComment code={video !== null ? video.videoCode : null} />
      {comments.map((comment) => (
        <Comment key={comment.commentCode} comment={comment} />
      ))}
    </StyledMain>
  );
};
export default Watch;
