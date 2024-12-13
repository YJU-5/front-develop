import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Semester } from "./LocalSemester";

const Detailed_Page = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state.id;
  const [data, setData] = useState<Semester>({
    id: "",
    title: "",
    content: "",
    imageUrl: [],
    newFile: [],
    createdAt: "",
    user: { id: "", name: "" },
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:3001/local-semester/" + id,
        {
          method: "GET",
          // headers: {
          //   "Content-Type": "application/json",}
        }
      );
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, [id]);

  function onClickupdate() {
    navigate("/update-page", { state: { id: data.id } });
  }

  function onClickDelete() {
    fetch("http://localhost:3001/local-semester/" + id, {
      method: "Delete",
    }).then((r) => {
      navigate("/local-semester");
    });
  }

  return (
    <div className="flex items-center justify-center py-10">
      <div className="w-full max-w-4xl p-6 bg-white border rounded-lg shadow-lg">
        {/* 제목 */}
        <div className="pb-4 mb-4 text-2xl font-semibold text-gray-800 border-b">
          {data.title}
        </div>

        {/* 글쓴이 */}
        <div className="flex items-center justify-between mb-6 text-gray-600">
          <div className="text-sm">
            작성자: <span className="font-medium">{data.user?.name}</span>
          </div>
        </div>

        {/* 이미지 */}
        <div className="mb-6">
          {data.imageUrl && data.imageUrl.length > 0 ? (
            data.imageUrl.map((file, index) => (
              <div className="flex justify-center mb-4" key={index}>
                <img
                  className="object-cover w-full h-auto max-w-xl rounded-lg shadow-md"
                  src={file}
                  alt={`이미지 ${index + 1}`}
                />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">이미지가 없습니다.</p>
          )}
        </div>

        {/* 본문 내용 */}
        <div className="mb-8 text-lg text-gray-800">{data.content}</div>

        {/* 버튼들 */}
        <div className="flex justify-end gap-4">
          <button
            className="px-6 py-2 text-white transition duration-300 bg-red-500 rounded-lg hover:bg-red-600"
            onClick={onClickDelete}
          >
            삭제
          </button>
          <button
            className="px-6 py-2 text-white transition duration-300 bg-blue-500 rounded-lg hover:bg-blue-600"
            onClick={onClickupdate}
          >
            수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detailed_Page;
