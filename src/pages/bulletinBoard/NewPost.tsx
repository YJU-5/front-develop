import { useState } from "react";
import { useNavigate } from "react-router-dom";

//인터페이스 정의
interface postState {
  title: string; // 글 제목
  content: string; // 글 내용
  imageUrl: File[]; // 글 이미지
}

const NewPost = () => {
  const navigate = useNavigate();
  // 글의 데이터 state선언
  const [data, setData] = useState<postState>({
    title: "", // 글 제목, str
    content: "", // 글 내용, str
    imageUrl: [], // 글 이미지, 여러 개 담을거라 배열
  });

  //e: React.ChangeEvent<HTMLInputElement>를 통해 e가 반드시 <input> 요소에서 발생한 ChangeEvent임을 명시
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setData((prevData) => ({
      ...prevData,
      ["title"]: title,
    }));
  };

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    setData((prevData) => ({
      ...prevData,
      ["content"]: content,
    }));
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const Files = e.target.files;
    if (Files) {
      setData((prevData) => ({
        ...prevData,
        imageUrl: Array.from(Files), //Files 는 배열처럼 보이지만 배열이 아니라서 Array.from(Files)를 통해 배열로 바꿔줌
      }));
    }
  };

  // form타입
  const onClickPOST = () => {
    const formdata = new FormData();
    formdata.append("title", data.title);
    formdata.append("content", data.content);
    data.imageUrl.forEach((file) => {
      formdata.append("imageUrl", file);
    });
    fetch("http://localhost:3001/board", {
      method: "POST",
      body: formdata,
    }).then((response) => {
      if (response.ok) {
        navigate("/bulletin-board");
      }
    });
  };
  // FormData 객체 구조:
  // - title: string
  // - age: string (숫자를 문자열로 변환)
  // - major: string
  // - content: string
  // - files: File (선택적)

  return (
    <div className="body">
      <div className="flex flex-col items-center mx-auto w-11/12 h-[calc(100vh-4.4rem)] max-w-4xl">
        <div className="mx-auto h-[calc(100vh-14rem)]">
          <div className="h-20" />

          {/* 제목 입력 */}
          <div className="mb-6">
            <label className="block mb-2 text-lg font-bold text-gray-700">
              Title
            </label>
            <input
              type="text"
              onChange={onChangeTitle}
              className="w-full max-w-4xl p-3 text-lg text-black border border-gray-300 rounded-md"
              placeholder="Enter the title"
            />
          </div>

          {/* 내용 입력 */}
          <div className="mb-6">
            <label className="block mb-2 text-lg font-bold text-gray-700">
              Content
            </label>
            <textarea
              onChange={onChangeContent}
              className="w-full max-w-4xl p-3 text-lg text-black border border-gray-300 rounded-md resize-none"
              placeholder="Enter the content"
              rows={10}
            />
          </div>

          {/* 이미지 파일 입력 */}
          <div className="mb-6">
            <label className="block mb-2 text-lg font-bold text-gray">
              파일 첨부
            </label>
            <input
              type="file"
              onChange={onChangeFile}
              multiple
              className="block w-full"
            />
            <div className="grid grid-cols-3 gap-4 mt-4">
              {data.imageUrl.map((file, index) => {
                // map함수로 이미지를 전부 띄움
                const imageUrl = URL.createObjectURL(file); // 파일 객체 → 브라우저에서 사용 가능한 URL로 변환, file 객체는 브라우저에서 직접 사용해 렌더링할 수 없기 때문에
                return (
                  <div className="flex justify-center" key={index}>
                    <img
                      src={imageUrl}
                      className="object-contain max-w-full rounded-md max-h-40"
                      alt={`img-${index}`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* 제출, 취소 버튼 */}
          <div className="flex space-x-6">
            <button
              type="submit"
              className="px-6 py-3 text-lg text-white bg-green-600 rounded-md hover:bg-green-700"
              onClick={onClickPOST}
            >
              등록
            </button>
            <button
              type="button"
              onClick={() => navigate("/bulletin-board")}
              className="px-6 py-3 text-lg text-white bg-gray-600 rounded-md hover:bg-gray-700"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
