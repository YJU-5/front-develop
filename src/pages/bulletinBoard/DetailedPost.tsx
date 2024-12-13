import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

// 인터페이스 정의
interface commentState {
  id: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

interface postState {
  id: string;
  title: string;
  content: string;
  imageUrl: string[]; // 기존 이미지 파일 URL
  newImageUrl: string[]; //새로 추가된 이미지 파일 URL
  comments: commentState[];
}

const DetailedPost = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // URL에서 ID추출
  const [postData, setPostData] = useState<postState>({
    id: "",
    title: "",
    content: "",
    imageUrl: [],
    newImageUrl: [],
    comments: [],
  });
  const [commentData, setCommentData] = useState<commentState>({
    id: "",
    content: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingCommentId, setIsEditingCommentId] = useState<string | null>(
    null
  ); // 댓글 수정 상태 관리

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
      .then((r) => {
        if (r.ok) {
          console.log(r);
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
      .then((r) => {
        if (r.ok) {
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
      .then((r) => {
        if (r.ok) {
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
      body: JSON.stringify(payload),
    })
      .then((r) => {
        if (r.ok) {
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

  // const onClickCommentUPDATE = () => {
  //   const payload = {
  //     content: commentData.content,
  //   };

  //   fetch(`http://localhost:3001/comment/${id}`,{
  //     method:'PATCH',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(payload), // payload를 JSON string으로 변환
  //   })
  //   .then((r)=>{
  //     if(r.ok){
  //       alert("Post uploaded successfully!");
  //     }
  //     //여기서 새 댓글을 초기화시켜야 하나?
  //   })
  //   .then(()=>{
  //     navigate('/bulletinBoard/:id')
  //   })
  // }

  // 댓글 DELETE
  const onClickCommentDELETE = (commentId: string) => {
    if (!window.confirm("Are you sure you want to delete this comment?"))
      return;

    fetch(`http://localhost:3001/comment/${commentId}`, {
      method: "DELETE",
    })
      .then((r) => {
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

  // const onClickCommentDELETE = () => {
  //   if (!window.confirm("Are you sure you want to delete this comment?")) return; // 진짜 삭제할건지 사용자에게 확인 받기
  //   fetch(`http://localhost:3001/comment/${id}`, {
  //     method: "DELETE",
  //   })
  //   .then((r)=>{
  //     if(r.ok){
  //       alert("Comment deleted successfully!");
  //     }
  //   })
  //   .then(()=>{
  //     navigate('/bulletinBoard/:id')
  //   })
  // }

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
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Edit Title"
            />
            <textarea
              value={postData.content}
              onChange={onChangePostContent}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={4}
              placeholder="Edit Content"
            />
            <div className="mb-6">
              <label className="block mb-2 text-lg font-bold text-gray-700">
                Attach File
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
                  className="w-full p-2 border border-gray-300 rounded-md"
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
                {/* {postData.comments
                  .slice() // 원본 배열을 복사하여 원본 데이터가 변경되지 않도록 함
                    .sort((a, b) => { // createdAt을 기준으로 내림차순 정렬
                    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;  // createdAt의 값이 undefined일 가능성이 있어서 이렇게 기본값을 세팅해줌
                    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                    return dateB - dateA;
                  })
                  .map((comment, index) => (
                    <li key={index} className="p-2 border border-gray-300 rounded-md">
                      <p>{comment.content}</p>
                      {comment.createdAt ? (
                        <span className="text-sm text-gray-500">
                        Created at: {new Date(comment.createdAt).toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-500">Date not available</span>
                    )}
                    </li>
                  ))} */}
                {postData.comments
                  .slice()
                  .sort((a, b) => {
                    const dateA = a.createdAt
                      ? new Date(a.createdAt).getTime()
                      : 0;
                    const dateB = b.createdAt
                      ? new Date(b.createdAt).getTime()
                      : 0;
                    return dateB - dateA;
                  })
                  .map((comment, index) => (
                    <li
                      key={index}
                      className="p-2 border border-gray-300 rounded-md"
                    >
                      {isEditingCommentId === comment.id ? (
                        <>
                          <textarea
                            className="w-full p-2 border border-gray-300 rounded-md"
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
                          {comment.createdAt && (
                            <span className="text-sm text-gray-500">
                              Created at:{" "}
                              {new Date(comment.createdAt).toLocaleString()}
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
                              Edit
                            </button>
                            <button
                              onClick={() => onClickCommentDELETE(comment.id)}
                              className="px-2 py-1 text-white bg-red-600 rounded-md hover:bg-red-700"
                            >
                              Delete
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
