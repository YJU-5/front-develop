// import { useNavigate, useParams } from "react-router-dom";
// import React, { useEffect, useState } from "react";

// const DetailedPost = () => {
//   const navigate = useNavigate();
//   const { id } = useParams(); // URL로부터 Post의 id를 가져옴

//   const [post, setPost] = useState<any>(null); 
//   const [comments, setComments] = useState<any[]>([]); 
//   const [newComment, setNewComment] = useState<string>(""); 
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);


//   // fetch로 post의 상세글을 가져옴
//   useEffect(() => {
//     if (!id) { // id가 없을 때, 에러 처리
//       setError("No post ID provided");
//       setLoading(false);
//       return;
//     }

//     const fetchPost = async () => {
//       try {
//         const response = await fetch(`http://localhost:3001/board/${id}`);
//         if (!response.ok) { // 에러처리
//           throw new Error(`Failed to fetch post: HTTP ${response.status}`);
//         }
//         const data = await response.json();
//         setPost(data);
//         setLoading(false); // 로딩 종료 처리
//       } catch (err: any) { // 에러처리
//         setError(err.message);
//         setLoading(false); // 로딩 종료 처리
//       }
//     };

//     fetchPost(); // Post 가져오기 함수 호출
//   }, [id]); // Post의 id가 변경될 때마다 리렌더링


  
//   // 새 댓글 달기 핸들링, POST 메서드
  
//   const handleSubmitComment = async (event: React.FormEvent) => {
//     event.preventDefault();
//     if (!newComment.trim()) return;

//     try {
//       const response = await fetch(`http://localhost:3001/comment/${id}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ content: newComment }),
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to post comment: HTTP ${response.status}`);
//       }

//       const data = await response.json();
//       setComments((prevComments) => [...prevComments, data]); // Append new comment
//       setNewComment(""); // Clear input field
//     } catch (err: any) {
//       console.error("Error posting comment:", err.message);
//     }
//   };

//   if (loading) return <p>Loading post...</p>;
//   if (error) return <p>Error: {error}</p>;

//   console.log(post);
  


  
//   // 화면에 렌더링 되는 부분 ->
//   return (
//     <div>
//       {/* 상세 Post */}
//       <h1>{post.title || "Untitled Post"}</h1>
//       <p>{post.content || "No content available"}</p>
//       {post.imageUrl && post.imageUrl.length > 0 && (
//         <img src={post.imageUrl[0]} alt="Post Thumbnail" className="w-full max-w-md" />
//       )}
//       <button onClick={() => navigate("/bulletinBoard")}>Back to Posts</button>

//       {/* 댓글 */}
//       <div className="mt-8">
//         <h2 className="text-lg font-bold">Comments {post.comments.length}</h2>
//         {post.comments.length === 0 ? (
//           <p>No comments yet. Be the first to comment!</p>
//         ) : (
//           <ul className="mt-4 space-y-2">
//             {post.comments.map((comment) => (
//               <li key={comment.id} className="p-2 rounded-md bg-black-100">
//                 <p>{comment.content}</p>
//                 <span className="text-sm text-gray-500">Created at: {comment.updatedAt}</span>
//               </li>
//             ))}
//           </ul>
//         )}

//         {/* 새 댓글 */}
//         <form onSubmit={handleSubmitComment} className="mt-4">
//           <textarea
//             value={newComment}
//             onChange={(e) => setNewComment(e.target.value)}
//             placeholder="Write your comment here..."
//             className="w-full p-2 border border-gray-300 rounded-md"
//             rows={4}
//           />
//           <button
//             type="submit"
//             className="p-2 mt-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
//           >
//             Post Comment
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default DetailedPost;


// import { useNavigate, useParams } from "react-router-dom";
// import React, { useEffect, useState } from "react";

// const DetailedPost = () => {
//   const navigate = useNavigate();
//   const { id } = useParams(); // URL에서 ID추출

//   const [post, setPost] = useState<any>(null);
//   const [comments, setComments] = useState<any[]>([]);
//   const [newComment, setNewComment] = useState<string>("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isEditing, setIsEditing] = useState(false); 
//   const [editTitle, setEditTitle] = useState<string>(""); 
//   const [editContent, setEditContent] = useState<string>(""); 

//   // 상세 페이지 READ
//   useEffect(() => {
//     if (!id) {
//       setError("No post ID provided");
//       setLoading(false);
//       return;
//     }

//     const fetchPost = async () => {
//       try {
//         const response = await fetch(`http://localhost:3001/board/${id}`);
//         if (!response.ok) {
//           throw new Error(`Failed to fetch post: HTTP ${response.status}`);
//         }
//         const data = await response.json();
//         setPost(data);
//         setEditTitle(data.title);
//         setEditContent(data.content);
//         setLoading(false);
//       } catch (err: any) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchPost();
//   }, [id]);

//   // 댓글 제출 핸들링
//   const handleSubmitComment = async (event: React.FormEvent) => {
//     event.preventDefault();
//     if (!newComment.trim()) return;

//     try {
//       const response = await fetch(`http://localhost:3001/comment/${id}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ content: newComment }),
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to post comment: HTTP ${response.status}`);
//       }

//       const data = await response.json();
//       setComments((prevComments) => [...prevComments, data]);
//       setNewComment("");
//     } catch (err: any) {
//       console.error("Error posting comment:", err.message);
//     }
//   };

//   // 업데이트 핸들링
//   const handleUpdatePost = async () => {
//     try {
//       const response = await fetch(`http://localhost:3001/board/${id}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           title: editTitle,
//           content: editContent,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to update post: HTTP ${response.status}`);
//       }

//       const data = await response.json();
//       setPost(data); // Update post details
//       setIsEditing(false); // Exit edit mode
//       alert("Post updated successfully!");
//     } catch (err: any) {
//       console.error("Error updating post:", err.message);
//     }
//   };

//   // 삭제 핸들링
//   const handleDeletePost = async () => {
//     if (!window.confirm("Are you sure you want to delete this post?")) return;

//     try {
//       const response = await fetch(`http://localhost:3001/board/${id}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to delete post: HTTP ${response.status}`);
//       }

//       alert("Post deleted successfully!");
//       navigate("/bulletinBoard"); // bulletin board로 리다이렉션
//     } catch (err: any) {
//       console.error("Error deleting post:", err.message);
//     }
//   };

//   if (loading) return <p>Loading post...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <>
//       <div className="container">
//           {/* 네비 바 */}
//           <button onClick={() => navigate("/home")}>홈</button>
//           <button onClick={() => navigate("/introduction")}>조원소개</button>
//           <button onClick={() => navigate("/localSemester")}>현지학기</button>
//           <button onClick={() => navigate("/bulletinBoard")}>게시판</button>
//         </div>
//       <div className="max-w-4xl p-4 mx-auto">
//         {/* 상세 정보 */}
//         {isEditing ? (
//             <div className="space-y-4">
//               <input
//                 type="text"
//                 value={editTitle}
//                 onChange={(e) => setEditTitle(e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded-md"
//                 placeholder="Edit Title"
//               />
//               <textarea
//                 value={editContent}
//                 onChange={(e) => setEditContent(e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded-md"
//                 rows={4}
//                 placeholder="Edit Content"
//               />
//               <button
//                 onClick={handleUpdatePost}
//                 className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
//               >
//                 Save Changes
//               </button>
//               <button
//                 onClick={() => setIsEditing(false)}
//                 className="px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700"
//               >
//                 Cancel
//               </button>
//             </div>
//             ) : (
//             <div>
//               <h1 className="text-2xl font-bold">{post.title}</h1>
//               <p className="mt-2">{post.content}</p>
//               {post.imageUrl && (
//                 <img src={post.imageUrl[0]} alt="Post Thumbnail" className="w-full max-w-md mt-4" />
//               )}
//               <div className="flex mt-4 space-x-4">
//                 <button
//                   onClick={() => setIsEditing(true)}
//                   className="px-4 py-2 text-white bg-yellow-600 rounded-md hover:bg-yellow-700"
//                 >
//                   Edit Post
//                 </button>
//                 <button
//                   onClick={handleDeletePost}
//                   className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
//                 >
//                   Delete Post
//                 </button>
//               </div>
//             </div>
//           )}
//         댓글
//         <div className="mt-8">
//           <h2 className="text-lg font-bold">Comments</h2>
//           {comments.length === 0 ? (
//             <p>No comments yet. Be the first to comment!</p>
//           ) : (
//             <ul className="mt-4 space-y-2">
//               {comments.map((comment) => (
//                 <li key={comment.id} className="p-2 border border-gray-300 rounded-md">
//                   <p>{comment.content}</p>
//                   <span className="text-sm text-gray-500">
//                     Created at: {new Date(comment.createdAt).toLocaleString()}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           )}

//           {/* 새 댓글*/}
//           <form onSubmit={handleSubmitComment} className="mt-4">
//             <textarea
//               value={newComment}
//               onChange={(e) => setNewComment(e.target.value)}
//               placeholder="Write your comment here..."
//               className="w-full p-2 border border-gray-300 rounded-md"
//               rows={4}
//             />
//             <button
//               type="submit"
//               className="px-4 py-2 mt-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
//             >
//               Post Comment
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DetailedPost;






import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

const DetailedPost = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // URL에서 ID추출

  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false); 
  const [editTitle, setEditTitle] = useState<string>(""); 
  const [editContent, setEditContent] = useState<string>(""); 
  const [editFile, setEditFile] = useState<File | null>(null); 

  // 상세 페이지 READ
  useEffect(() => {
    if (!id) {
      setError("No post ID provided");
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:3001/board/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch post: HTTP ${response.status}`);
        }
        const data = await response.json();
        setPost(data);
        setEditTitle(data.title);
        setEditContent(data.content);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // 댓글 제출 핸들링
  const handleSubmitComment = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await fetch(`http://localhost:3001/comment/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newComment }),
      });

      if (!response.ok) {
        throw new Error(`Failed to post comment: HTTP ${response.status}`);
      }

      const data = await response.json();
      setComments((prevComments) => [...prevComments, data]);
      setNewComment("");
    } catch (err: any) {
      console.error("Error posting comment:", err.message);
    }
  };

  // 업데이트 핸들링
  const handleUpdatePost = async () => {
    try {
      const response = await fetch(`http://localhost:3001/board/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editTitle,
          content: editContent,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update post: HTTP ${response.status}`);
      }

      const data = await response.json();
      setPost(data); // 상세 Post 업데이트
      setIsEditing(false); // edit모드에서 나가기
      alert("Post updated successfully!");
    } catch (err: any) {
      console.error("Error updating post:", err.message);
    }
  };
  
  // 파일 선택 핸들링
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setEditFile(selectedFile);
  };

  // 삭제 핸들링
  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await fetch(`http://localhost:3001/board/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete post: HTTP ${response.status}`);
      }

      alert("Post deleted successfully!");
      navigate("/bulletinBoard"); // bulletin board로 리다이렉션
    } catch (err: any) {
      console.error("Error deleting post:", err.message);
    }
  };

  if (loading) return <p>Loading post...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="container">
          {/* 네비 바 */}
          <button onClick={() => navigate("/home")}>홈</button>
          <button onClick={() => navigate("/introduction")}>조원소개</button>
          <button onClick={() => navigate("/localSemester")}>현지학기</button>
          <button onClick={() => navigate("/bulletinBoard")}>게시판</button>
        </div>
      <div className="max-w-4xl p-4 mx-auto">
        {/* 상세 정보 */}
        {isEditing ? (
            <div className="space-y-4">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Edit Title"
              />
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={4}
                placeholder="Edit Content"
              />
              <div className="mb-6">
                <label className="block mb-2 text-lg font-bold text-gray-700">Attach File</label>
                <input type="file" onChange={handleFileChange} className="block w-full" />
              </div>
              <button
                onClick={handleUpdatePost}
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
            ) : (
            <div>
              <h1 className="text-2xl font-bold">{post.title}</h1>
              <p className="mt-2">{post.content}</p>
              {post.imageUrl && (
                <img src={post.imageUrl[0]} alt="Post Thumbnail" className="w-full max-w-md mt-4" />
              )}
              <div className="flex mt-4 space-x-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 text-white bg-yellow-600 rounded-md hover:bg-yellow-700"
                >
                  Edit Post
                </button>
                <button
                  onClick={handleDeletePost}
                  className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                  Delete Post
                </button>
              </div>
              {/* 댓글*/}
              <div className="mt-8">
              <h2 className="text-lg font-bold">Comments</h2>
              {comments.length === 0 ? (
                <p>No comments yet. Be the first to comment!</p>
                ) : (
                  <ul className="mt-4 space-y-2">
                    {comments.map((comment) => (
                      <li key={comment.id} className="p-2 border border-gray-300 rounded-md">
                        <p>{comment.content}</p>
                        <span className="text-sm text-gray-500">
                          Created at: {new Date(comment.createdAt).toLocaleString()}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* 새 댓글*/}
                <form onSubmit={handleSubmitComment} className="mt-4">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write your comment here..."
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows={4}
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 mt-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Post Comment
                  </button>
                </form>
              </div>
            </div>
            )}
          </div>
    </>
  );
};

export default DetailedPost;