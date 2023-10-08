import styled from "styled-components";

const Box = styled.div`
  background-color: pink;
  width: 95%;
  margin: 0 auto;

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
  return (
    <Box>
      <h2>@{reply.member.id}</h2>
      <div>
        <span>{reply.commentDesc}</span>
        <button>삭제</button>
      </div>
      {/* <div contentEditable="true" suppressContentEditableWarning>
        {reply.commentDesc}
      </div> */}
    </Box>
  );
};
export default Reply;
