import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BulletinBoard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<any[]>([]); // 게시글 state관리
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 state관리, 기본값 1
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 state관리, 기본값 1
  const limit = 10; // 한 페이지 최대 게시물 수

  //fetch로 post들을 가져옴
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `http://localhost:3001/board?page=${currentPage}&limit=${limit}`
      );
      const data = await response.json();
      // posts를 updatedAt 기준으로 정렬
      const sortedPosts = data.items.sort((a: any, b: any) => {
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime() 
        );
      });
      setPosts(sortedPosts);
      setTotalPages(data.meta.totalPages);
    };
    fetchPosts();
  }, [currentPage]); // 페이지가 변경될 때마다 리렌더링

  // detailedPost페이지로 이동
  const goToDetailPage = (id: string) => {
    navigate(`/detailed-post/${id}`);
  };

  // newPost페이지로 이동
  const goToNewPost = () => {
    navigate("/new-post");
  };

  // 페이지 변경 핸들러, 페이지네이션 바에 사용됨
  const handlePageChange = (newPage: number) => { 
    if (newPage > 0 && newPage <= totalPages) { // 변경하게 되는 페이지가 0보다 크고 전체 페이지 수보다 작거나 같을 때
      setCurrentPage(newPage); // 현재 페이지를 변경하게 되는 페이지로 변경
    }
  };

  return (
    <div className="max-w-6xl px-4 py-6 mx-auto">
      {/* 글 작성 버튼 */}
      <div className="flex justify-end mb-4">
        <button
          onClick={goToNewPost}
          className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
        >
          글 작성
        </button>
      </div>

      {/* post리스트 */}
      <div className="grid grid-cols-1 gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex items-center justify-between p-4 border border-gray-300 rounded-md shadow-md cursor-pointer hover:shadow-lg hover:bg-gray-50"
            onClick={() => goToDetailPage(post.id)}
          >
            <span className="font-semibold">{post.title}</span>
            <span className="text-sm text-gray-500">
              {new Date(post.updatedAt).toLocaleString()} {/* 업데이트 시간 기준으로 적혀있음 */}
            </span>
          </div>
        ))}
      </div>

      {/* 페이지네이션 바 */}
      <div className="flex items-center justify-center mt-6">
        <nav aria-label="Pagination" className="flex space-x-2">
          {/* 앞으로 가기 버튼 */}
          <button
            disabled={currentPage === 1} // 첫번째 페이지면 적용할 수 없으니까
            onClick={() => handlePageChange(currentPage - 1)} // 현재 페이지보다 한 페이지 앞의 값을 보냄
            className="px-3 py-1 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {/* 페이지 수 */}
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (
              page 
            ) => (
              <button
                key={page} // map이니까 key있음
                onClick={() => handlePageChange(page)} // 목록의 각 Post 박스 중 하나 선택했을 때
                className={`px-3 py-1 rounded-md ${
                  page === currentPage // ex. 현재 페이지가 1페이지일 때, 1페이지 버튼은 파랑, 나머지는 하양
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                {page} {/* 몇 번 페이지인지 알려줌 */}
              </button>
            )
          )}

          {/* 뒤로 가기 버튼 */}
          <button
            disabled={currentPage === totalPages} // 마지막 페이지면 적용할 수 없으니까
            onClick={() => handlePageChange(currentPage + 1)} // 현재 페이지보다 한 페이지 뒤의 값을 보냄
            className="px-3 py-1 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

export default BulletinBoard;
