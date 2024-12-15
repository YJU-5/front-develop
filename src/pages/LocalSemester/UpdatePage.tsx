import { useLocation, useNavigate } from "react-router-dom";
import { Semester } from "./LocalSemester";
import { useEffect, useState } from "react";

const Update_Page = () => {
  const navigate = useNavigate();
  //navigate로 보내준 state.id를 받아 const id에 저장장
  const location = useLocation();
  const id = location.state.id;
  const [data, setData] = useState<Semester>({
    id: "",
    title: "",
    content: "",
    imageUrl: [], // 기존 URL
    newFile: [], //새로 추가된 파일
    createdAt: "",
    user: { id: "", name: "" },
  });

  //id로 정보를 가져와서 data에 저장장
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

  //title변경될때마다 수정
  const onChangetitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setData((prevData) => ({
      ...prevData,
      ["title"]: title,
    }));
  };

  //content변경될때마다 수정
  const onChangetext = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    setData((prevData) => ({
      ...prevData,
      ["content"]: content,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const Files = e.target.files;
    if (Files) {
      setData((prevData) => ({
        ...prevData,
        newFile: Array.from(Files), //배열로 바꿔서 넣겠다
      }));
    }
  };

  //이미지 클릭시 삭제
  const onClickimgDelete = (file: string | File, type: "url" | "file") => {
    setData((prevData) => ({
      ...prevData,
      //내가 클릭한 기존 이미지를를 data.imageUrl에서 filter로 삭제
      imageUrl:
        type === "url"
          ? prevData.imageUrl.filter((url) => url !== file)
          : prevData.imageUrl,
      //내가 클릭한 새로운 이미지를  data.imageUrl에서 filter로 삭제
      newFile:
        type === "file"
          ? prevData.newFile?.filter((f) => f !== file)
          : prevData.newFile,
    }));
  };

  //db로 보내기기
  const onClickPATCH = () => {
    const formdata = new FormData();
    //title,constne가 있으면 formdata에 추가가
    if (data.title && data.content) {
      formdata.append("title", data.title);
      formdata.append("content", data.content);
    } else {
      console.log("값이 없어요");
    }

    // 기존 url  이미지가2개이상이면 한번에 담을수 없어서 forEach문으로 하나씩 저장
    if (data.imageUrl) {
      data.imageUrl.forEach((file) => {
        formdata.append("existingImageUrls", file);
      });
    }
    // 새파일 이미지가2개이상이면 한번에 담을수 없어서 forEach문으로 하나씩 저장
    if (data.newFile) {
      data.newFile.forEach((file) => {
        formdata.append("imageUrl", file);
      });
    }

    fetch("http://localhost:3001/local-semester/" + id, {
      method: "PATCH",
      body: formdata,
    })
      .then((r) => {
        if (r.ok) {
          console.log("요청완료");
        }
      })
      .then((respones) => {
        navigate("/local-semester");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-8 ">
      <div className="w-full max-w-4xl p-6 bg-white border border-gray-300 rounded-md shadow-lg">
        {/* 제목 */}
        <div className="flex items-center pb-4 mb-6 text-black border-b border-gray-300">
          <span className="text-xl font-semibold">제목</span>
          <input
            type="text"
            className="flex-1 px-4 py-2 ml-4 text-black bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="title"
            value={data.title}
            onChange={onChangetitle}
          />
        </div>

        {/* 작성자 */}
        <div className="flex items-center mb-6">
          <span className="font-semibold text-black">작성자</span>
          <input
            type="text"
            className="flex-1 px-4 py-2 ml-4 text-black bg-gray-100 border border-gray-300 rounded-md focus:outline-none"
            value=""
            readOnly
          />
        </div>

        {/* 이미지 */}
        <div className="mb-6">
          <label
            htmlFor="file_input"
            className="block mb-2 font-semibold text-black"
          >
            이미지
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            type="file"
            multiple
            onChange={handleImageChange}
          />
          <div className="grid grid-cols-3 gap-4 mt-4">
            {data.imageUrl.map((file, index) => {
              return (
                <div className="flex justify-center" key={index}>
                  <img
                    src={file}
                    className="object-contain max-w-full rounded-md max-h-40"
                    onClick={() => onClickimgDelete(file, "url")} //백엔드에서 s3에서 url로 변환해서 지금형태는 url
                  />
                </div>
              );
            })}

            {data.newFile && data.newFile.length > 0 ? (
              data.newFile.map((file, index) => {
                //화면에 보일수있도록 변경하여 imageUrl에 저장
                const imageUrl = URL.createObjectURL(file);
                return (
                  <div className="flex justify-center" key={index}>
                    <img
                      src={imageUrl}
                      className="object-contain max-w-full rounded-md max-h-40"
                      onClick={() => onClickimgDelete(file, "file")} //새로 업로드할 이미지여서 file형태임임
                    />
                  </div>
                );
              })
            ) : (
              <div></div>
            )}
          </div>
        </div>

        {/* 내용 */}
        <div className="mb-6">
          <label
            htmlFor="input"
            className="block mb-2 font-semibold text-black"
          >
            내용
          </label>
          <textarea
            id="input"
            name="content"
            value={data.content}
            className="block w-full h-40 p-4 text-base text-black bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={onChangetext}
          />
        </div>

        {/* 저장 버튼 */}
        <div className="flex flex-row-reverse items-center p-2">
          <button
            className="px-6 py-3 ml-2 text-white transition duration-200 ease-in-out bg-blue-600 rounded-md hover:bg-blue-700"
            onClick={onClickPATCH}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default Update_Page;
