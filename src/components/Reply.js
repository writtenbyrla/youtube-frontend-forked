const Reply = ({ reply }) => {
  return (
    <>
      <div>@{reply.member.id}</div>
      <div contentEditable="true" suppressContentEditableWarning>
        {reply.commentDesc}
      </div>
    </>
  );
};
export default Reply;
