import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

// 인터페이스 정의
interface commentState { // 댓글 인터페이스
  id: string; // 댓글 id
  content: string; // 댓글 내용
  createdAt?: string; // 댓글 작성시간
  updatedAt?: string; // 댓글 수정시간
}

interface postState { // 게시글 인터페이스
  id: string; // 게시글 id
  title: string; // 게시글 제목
  content: string; // 게시글 내용
  imageUrl: string[]; // 기존 이미지 파일 URL
  newImageUrl: string[]; //새로 추가된 이미지 파일 URL
  comments: commentState[]; // 해당 게시글의 댓글
}

const DetailedPost = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // URL에서 ID추출
  // 게시글 state관리
  const [postData, setPostData] = useState<postState>({
    id: "", // 게시글 id, str
    title: "", // 게시글 제목, str
    content: "", // 게시글 내용, str
    imageUrl: [], // 게시글의 기존 이미지, 여러 개를 담아야 하기 때문에 배열
    newImageUrl: [], // 게시글에 새로 추가된 이미지, 여러 개를 담아야 하기 때문에 배열
    comments: [], // 해당 게시글의 댓글, 여러 개를 담아야 하기 때문에 배열, 읽기를 위해서 필요
  });
  // 댓글 state관리, 추가, 수정, 삭제를 위해서 필요
  const [commentData, setCommentData] = useState<commentState>({
    id: "", /* 댓글 id */
    content: "", /* 댓글 내용 */
  });
  const [isEditing, setIsEditing] = useState(false); // 글 수정 상태 관리, 이걸로 수정할 때와 아닐 때의 화면을 다르게 띄울 수 있음
  const [isEditingCommentId, setIsEditingCommentId] = useState<string | null>(
    null
  ); // 댓글 수정 상태 관리, 이걸로 수정할 때와 아닐 때의 화면을 다르게 띄울 수 있음



  
  
  // 게시글&댓글 READ
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3001/board/${id}`, {
        method: "GET",
      });
      const data = await response.json();
      console.log(data.imageUrl);
      setPostData(data);
    };
    fetchData();
  }, [id]);

  // 게시글 관련 메서드, form타입
  // onChange(게시글 관련 메서드)
  const onChangePostTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setPostData((prevData) => ({
      ...prevData,
      ["title"]: title,
    }));
  };

  const onChangePostContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    setPostData((prevData) => ({
      ...prevData,
      ["content"]: content,
    }));
  };

  const onChangePostFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setPostData((prevData) => ({
        ...prevData,
        newFile: Array.from(files),
      }));
    }
  };

  // onClick(게시글 관련 메서드)
  // 게시글 UPDATE
  const onClickPostUPDATE = () => {
    const formdata = new FormData();
    if (postData.title && postData.content) {
      formdata.append("title", postData.title);
      formdata.append("content", postData.content);
    } else {
      console.log("값이 없어요");
    }
    // 기존 이미지파일 url
    if (postData.imageUrl) {
      postData.imageUrl.forEach((file) => {
        formdata.append("existingImageUrls", file);
      });
    }
    // 새 이미지파일 url
    if (postData.newImageUrl) {
      postData.newImageUrl.forEach((file) => {
        formdata.append("imageUrl", file);
      });
    }
    fetch(`http://localhost:3001/board/${id}`, {
      method: "PATCH",
      body: formdata,
    })
      .then((request) => { 
        if (request.ok) {
          setIsEditing(false); // edit모드에서 나가기
          alert("Post updated successfully!");
        }
      })
      .then(() => {
        navigate(`/detailedPost/${id}`);
      });
  };

  // 게시글 DELETE
  const onClickPostDELETE = () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return; // 진짜 삭제할건지 사용자에게 확인 받기
    fetch(`http://localhost:3001/board/${id}`, {
      method: "DELETE",
    })
      .then((request) => { 
        if (request.ok) {
          alert("Post deleted successfully!");
        }
      })
      .then(() => {
        navigate("/bulletinBoard");
      });
  };




  
  // 댓글 관련 메서드, json타입
  // onChange(댓글 관련 메서드)
  const onChangeCommentContent = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const content = e.target.value;
    setCommentData((prevData) => ({
      ...prevData,
      ["content"]: content,
    }));
  };

  // onClick(댓글 관련 메서드)
  const onClickCommentCREATE = () => {
    const payload = {
      content: commentData.content,
    };
    fetch(`http://localhost:3001/comment/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload), // payload를 JSON string으로 변환
    })
      .then((request) => { 
        if (request.ok) {
          alert("Comment uploaded successfully!");
        }
      })
      .then(() => {
        navigate("/bulletinBoard/:id");
      });
  };

  // 댓글 UPDATE
  const onClickCommentUPDATE = (commentId: string) => {
    const payload = {
      content: commentData.content,
    };

    fetch(`http://localhost:3001/comment/${commentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload), // payload를 JSON string으로 변환
    })
      .then((request) => {
        if (request.ok) {
          alert("Comment updated successfully!");
          return fetch(`http://localhost:3001/board/${id}`);
        }
      })
      .then((response) => response?.json())
      .then((latestData) => {
        setPostData(latestData);
        setIsEditingCommentId(null); // 수정 모드 해제
      });
  };


  // 댓글 DELETE
  const onClickCommentDELETE = (commentId: string) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) // 진짜 삭제할건지 사용자에게 확인 받기
      return; // 사용자가 삭제를 취소했을 때, 뒤의 fetch함수가 동작하지 않도록 막아줌

    fetch(`http://localhost:3001/comment/${commentId}`, {
      method: "DELETE",
    })
      .then((r) => { // request
        if (r.ok) {
          alert("Comment deleted successfully!");
          return fetch(`http://localhost:3001/board/${id}`);
        }
      })
      .then((response) => response?.json())
      .then((latestData) => {
        setPostData(latestData);
      });
  };

  return (
    <>
      <div className="max-w-4xl p-4 mx-auto">
        {/* 글 수정 */}
        {isEditing ? (
          <div className="space-y-4">
            <input
              type="text"
              value={postData.title}
              onChange={onChangePostTitle}
              className="w-full p-2 text-black border-gray-300 rounded-md" /* 색깔 변경 */
              placeholder="제목 수정" /* 이름 변경 */
            />
            <textarea
              value={postData.content}
              onChange={onChangePostContent}
              className="w-full p-2 text-black border-gray-300 rounded-md" /* 색깔 변경 */
              rows={4}
              placeholder="내용 수정" /* 이름 변경 */
            />
            <div className="mb-6">
              <label className="block mb-2 text-lg font-bold text-lightgray-700"> {/* 색깔 변경 */}
                파일 첨부
              </label>
              <input
                type="file"
                onChange={onChangePostFile}
                multiple
                className="block w-full"
              />
              <div className="grid grid-cols-3 gap-4 mt-4">
                {postData.imageUrl.map((url, index) => (
                  <div className="flex justify-center" key={index}>
                    <img
                      src={url} // URL을 직접 사용
                      className="object-contain max-w-full rounded-md max-h-40"
                      alt={`img-${index}`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={onClickPostUPDATE}
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              저장
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700"
            >
              취소
            </button>
          </div>
        ) : (
          // 글 상세보기
          <div>
            <h1 className="text-2xl font-bold">{postData.title}</h1>
            <p className="mt-2">{postData.content}</p>
            {postData.imageUrl.length > 0 &&
              postData.imageUrl.map((url, index) => (
                <img
                  key={index}
                  src={url} // URL을 직접 사용
                  alt={`Post Thumbnail ${index}`}
                  className="w-full max-w-md mt-4"
                />
              ))}
            <div className="flex mt-4 space-x-4">
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-white bg-yellow-600 rounded-md hover:bg-yellow-700"
              >
                글 수정
              </button>
              <button
                onClick={onClickPostDELETE}
                className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                글 삭제
              </button>
            </div>
            {/* 댓글*/}
            <div className="mt-8">
              <h2 className="text-lg font-bold">
                Comments {postData.comments.length}
              </h2>
              {postData.comments.length === 0 && (
                <p>아직 댓글이 없습니다. 첫 댓글을 남겨주세요</p>
              )}
              {/* 새 댓글*/}
              <form onSubmit={onClickCommentCREATE} className="mt-4">
                <textarea
                  value={commentData.content}
                  onChange={onChangeCommentContent}
                  placeholder="댓글을 작성해주세요..."
                  className="w-full p-2 text-black border border-gray-300 rounded-md"
                  rows={4}
                />
                <button
                  type="submit"
                  className="px-4 py-2 mt-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  댓글 등록
                </button>
              </form>
              <ul className="mt-4 space-y-2">
                {postData.comments
                  .slice() // 원본 배열을 복사하여 원본 데이터가 변경되지 않도록 함
                  .sort((a, b) => { // createdAt을 기준으로 내림차순 정렬
                    const dateA = a.updatedAt
                      ? new Date(a.updatedAt).getTime() // createdAt의 값이 undefined일 가능성이 있어서 이렇게 기본값을 세팅해줌
                      : 0;
                    const dateB = b.updatedAt
                      ? new Date(b.updatedAt).getTime()
                      : 0;
                    return dateB - dateA;
                  })
                  .map((comment, index) => (
                    <li
                      key={index}
                      className="p-2 border border-gray-300 rounded-md"
                    >
                      {/* 댓글 수정 */}
                      {isEditingCommentId === comment.id ? (
                        <>
                          <textarea
                            className="w-full p-2 text-black border-gray-300 rounded-md text-" /* 색깔 변경 */
                            value={commentData.content}
                            onChange={(e) =>
                              setCommentData({
                                ...commentData,
                                content: e.target.value,
                              })
                            }
                          />
                          <button
                            onClick={() => onClickCommentUPDATE(comment.id)}
                            className="px-2 py-1 text-white bg-green-600 rounded-md hover:bg-green-700"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setIsEditingCommentId(null)}
                            className="px-2 py-1 text-white bg-gray-600 rounded-md hover:bg-gray-700"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <p>{comment.content}</p>
                          {comment.updatedAt && (
                            <span className="text-sm text-gray-500">
                              Updated at:{" "}
                              {new Date(comment.updatedAt).toLocaleString()}
                            </span>
                          )}
                          <div className="flex mt-2 space-x-2">
                            <button
                              onClick={() => {
                                setIsEditingCommentId(comment.id);
                                setCommentData({
                                  id: comment.id,
                                  content: comment.content,
                                });
                              }}
                              className="px-2 py-1 text-white bg-yellow-600 rounded-md hover:bg-yellow-700"
                            >
                              수정
                            </button>
                            <button
                              onClick={() => onClickCommentDELETE(comment.id)}
                              className="px-2 py-1 text-white bg-red-600 rounded-md hover:bg-red-700"
                            >
                              삭제
                            </button>
                          </div>
                        </>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default DetailedPost;
