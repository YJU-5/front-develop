// // 새 글 작성 페이지
// import { useNavigate } from "react-router-dom";
// // import Ajax from "./bulletinBoardComponents/ajax";
// import { useState } from "react";

// const NewPost = () => {
//   const navigate = useNavigate();

//   const onClick0 = () => {
//     navigate("/home");
//   };

//   const onClick1 = () => {
//     navigate("/introduction");
//   };

//   const onClick2 = () => {
//     navigate("/localSemester");
//   };

//   const onClick3 = () => {
//     navigate("/bulletinBoard");
//   };

//   const onClickCreate = () => {
//     return null
//   }

//   const onChangeValue = (event) => {
//     setValue(event.target.value)
//   }

//   const handleSubmit = (event) => {
//     alert('글 내용 : ' + value)
//     event.preventDefault()
//   }

//   const [value, setValue] = useState('!!!!!!!!!!새 글을 등록해주세요!!!!!!!!!!')

  
//   return (
//     <div className="body">
//       BulletinBoard
//       <div className="container">
//         <button onClick={onClick0}>홈</button>
//         <button onClick={onClick1}>조원소개</button>
//         <button onClick={onClick2}>현지학기</button>
//         <button onClick={onClick3}>게시판</button>
//       </div>
//       <div className="flex flex-col items-center mx-auto w-4/5 h-[calc(100vh-4.4rem)]">
//         <div className="mx-auto h-[calc(100vh-14rem)]">
//           <div className="h-20"/>
//           <form onSubmit={handleSubmit}>
//             <textarea value={value} onChange={onChangeValue} className="w-full border border-gray-300 rounded-md resize-y p-60 h-100"></textarea>
//             <input type="file"/><button onClick={onClickCreate}>등록</button><button onClick={onClick3}>취소</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewPost;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const NewPost = () => {
//   const navigate = useNavigate();
//   const [title, setTitle] = useState(""); 
//   const [content, setContent] = useState(""); 
//   const [file, setFile] = useState<File | null>(null); 
//   const [error, setError] = useState<string | null>(null); 
//   const [successMessage, setSuccessMessage] = useState<string | null>(null); 

//   // 제출 핸들링
//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     if (!title.trim() || !content.trim()) {
//       setError("Title and content are required.");
//       return;
//     }

//     // 파일 업로드
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("content", content);
//     if (file) {
//       formData.append("file", file);
//     }

//     try {
//       const response = await fetch("http://localhost:3001/board", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to create post: HTTP ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("Post Created:", data);

//       // 성공 메시지
//       setSuccessMessage("Post created successfully!");

//       // form태그 clear하기
//       setTitle("");
//       setContent("");
//       setFile(null);

//       // bulletinBoard페이지로 돌아가기
//       navigate("/bulletinBoard");
//     } catch (err: any) {
//       setError(err.message);
//     }
//   };

//   // 파일 고르기 핸들링
//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = event.target.files?.[0] || null;
//     setFile(selectedFile);
//   };

//   return (
//     <div className="body">
//       <div className="container">
//         {/* 네비 바 */}
//         <button onClick={() => navigate("/home")}>홈</button>
//         <button onClick={() => navigate("/introduction")}>조원소개</button>
//         <button onClick={() => navigate("/localSemester")}>현지학기</button>
//         <button onClick={() => navigate("/bulletinBoard")}>게시판</button>
//       </div>

//       <div className="flex flex-col items-center mx-auto w-11/12 h-[calc(100vh-4.4rem)] max-w-4xl">
//         <div className="mx-auto h-[calc(100vh-14rem)]">
//           <div className="h-20" />

//           {/* 에러 및 성공 메시지 */}
//           {error && <p className="text-red-500">{error}</p>}
//           {successMessage && <p className="text-green-500">{successMessage}</p>}

//           {/* Form양식 */}
//           <form onSubmit={handleSubmit}>
//             {/* 제목 입력 */}
//             <div className="mb-6">
//               <label className="block mb-2 text-lg font-bold text-gray-700">Title</label>
//               <input
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 className="w-full max-w-4xl p-3 text-lg border border-gray-300 rounded-md"
//                 placeholder="Enter the title"
//               />
//             </div>

//             {/* 내용 입력 */}
//             <div className="mb-6">
//               <label className="block mb-2 text-lg font-bold text-gray-700">Content</label>
//               <textarea
//                 value={content}
//                 onChange={(e) => setContent(e.target.value)}
//                 className="w-full max-w-4xl p-3 text-lg border border-gray-300 rounded-md resize-none"
//                 placeholder="Enter the content"
//                 rows={10} // Adjust height if needed
//               />
//             </div>

//             {/* 파일 입력 */}
//             <div className="mb-6">
//               <label className="block mb-2 text-lg font-bold text-gray-700">Attach File</label>
//               <input type="file" onChange={handleFileChange} className="block w-full" />
//             </div>

//             {/* 제출, 취소 버튼 */}
//             <div className="flex space-x-6">
//               <button
//                 type="submit"
//                 className="px-6 py-3 text-lg text-white bg-green-600 rounded-md hover:bg-green-700"
//               >
//                 등록
//               </button>
//               <button
//                 type="button"
//                 onClick={() => navigate("/bulletinBoard")}
//                 className="px-6 py-3 text-lg text-white bg-gray-600 rounded-md hover:bg-gray-700"
//               >
//                 취소
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewPost;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewPost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Submit new post
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await fetch("http://localhost:3001/board", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to create post: HTTP ${response.status}`);
      }

      const data = await response.json();
      setSuccessMessage("Post created successfully!");
      setTitle("");
      setContent("");
      setFile(null);
      navigate("/bulletinBoard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Edit existing post
  const handleEdit = async () => {
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await fetch("http://localhost:3001/board", {
        method: "PATCH",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to update post: HTTP ${response.status}`);
      }

      const data = await response.json();
      setSuccessMessage("Post updated successfully!");
      setIsEditing(false);
      setTitle(data.title || "");
      setContent(data.content || "");
      setFile(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Handle file change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  return (
    <div className="body">
      <div className="container">
        <button onClick={() => navigate("/home")}>홈</button>
        <button onClick={() => navigate("/introduction")}>조원소개</button>
        <button onClick={() => navigate("/localSemester")}>현지학기</button>
        <button onClick={() => navigate("/bulletinBoard")}>게시판</button>
      </div>

      <div className="flex flex-col items-center mx-auto w-11/12 h-[calc(100vh-4.4rem)] max-w-4xl">
        <div className="mx-auto h-[calc(100vh-14rem)]">
          <div className="h-20" />

          {error && <p className="text-red-500">{error}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}

          {!isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block mb-2 text-lg font-bold text-gray-700">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full max-w-4xl p-3 text-lg border border-gray-300 rounded-md"
                  placeholder="Enter the title"
                />
              </div>

              <div className="mb-6">
                <label className="block mb-2 text-lg font-bold text-gray-700">Content</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full max-w-4xl p-3 text-lg border border-gray-300 rounded-md resize-none"
                  placeholder="Enter the content"
                  rows={10}
                />
              </div>

              <div className="mb-6">
                <label className="block mb-2 text-lg font-bold text-gray-700">Attach File</label>
                <input type="file" onChange={handleFileChange} className="block w-full" />
              </div>

              <div className="flex space-x-6">
                <button
                  type="submit"
                  className="px-6 py-3 text-lg text-white bg-green-600 rounded-md hover:bg-green-700"
                >
                  등록
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/bulletinBoard")}
                  className="px-6 py-3 text-lg text-white bg-gray-600 rounded-md hover:bg-gray-700"
                >
                  취소
                </button>
              </div>
            </form>
          ) : (
            <div>
              <div className="mb-6">
                <label className="block mb-2 text-lg font-bold text-gray-700">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full max-w-4xl p-3 text-lg border border-gray-300 rounded-md"
                  placeholder="Edit the title"
                />
              </div>

              <div className="mb-6">
                <label className="block mb-2 text-lg font-bold text-gray-700">Content</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full max-w-4xl p-3 text-lg border border-gray-300 rounded-md resize-none"
                  placeholder="Edit the content"
                  rows={10}
                />
              </div>

              <div className="mb-6">
                <label className="block mb-2 text-lg font-bold text-gray-700">Replace File</label>
                <input type="file" onChange={handleFileChange} className="block w-full" />
              </div>

              <div className="flex space-x-6">
                <button
                  type="button"
                  onClick={handleEdit}
                  className="px-6 py-3 text-lg text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  변경 사항 저장
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 text-lg text-white bg-gray-600 rounded-md hover:bg-gray-700"
                >
                  취소
                </button>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="px-6 py-3 mt-4 text-lg text-white bg-yellow-600 rounded-md hover:bg-yellow-700"
          >
            Edit Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
