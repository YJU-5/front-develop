import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Datastate {
  title: string;
  content: string;
  imageUrl: File[];
}

const Semester_create = () => {
  const [token, setToken] = useState<any>(); 
  const [user, setUser] = useState<any>("");
  const navigate = useNavigate();
  //내가 작성한 글을 저장
  const [data, setData] = useState<Datastate>({  
    title: "",
    content: "",
    imageUrl: [],
  });

  useEffect(() => {
    const usertoken: any = localStorage.getItem("access_token");
    const user = jwtDecode(usertoken);
    setUser(user);
    setToken(usertoken);
  }, []);


  // 이미지 받아오기기
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const Files = e.target.files;
    if (Files) {
      setData((prevData) => ({
        ...prevData,
        imageUrl: Array.from(Files), //Files 는 배열처럼 보이지만 배열이 아니라서 Array.from(Files)이렇게 해준다
      }));
    }
  };

  //content 받아오기
  const onChangetext = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    setData((prevData) => ({   //prevData는 기존data안에있는 값
      ...prevData,
      ["content"]: content,
    }));
  };


    //title 받아오기
  const onChangetitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setData((prevData) => ({
      ...prevData,
      ["title"]: title,
    }));
  };

  //이미지 지우기
  const onClickimgDelete = (file: File) => {
    setData((prevData) => ({
      ...prevData,
      imageUrl: prevData.imageUrl.filter((item) => item !== file),
    }));
  };


  //POST
  const onClickPOST = () => {
    const formdata = new FormData();
    formdata.append("title", data.title);
    formdata.append("content", data.content);
    data.imageUrl.forEach((file) => {
      formdata.append("imageUrl", file);
    });

    fetch("http://localhost:3001/local-semester", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // 여기서 yourToken은 실제 토큰 값입니다.
      },
      body: formdata,
    }).then((respones) => {
      if (respones.ok) {
        navigate("/local-semester");
      }
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
            onChange={onChangetitle}
          />
        </div>

        {/* 작성자 */}
        <div className="flex items-center mb-6">
          <span className="font-semibold text-black">작성자</span>
          <input
            type="text"
            className="flex-1 px-4 py-2 ml-4 text-black bg-gray-100 border border-gray-300 rounded-md focus:outline-none"
            value={user.name || ""}
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
            id="file_input"
            type="file"
            multiple
            onChange={handleImageChange}
          />
          <div className="grid grid-cols-3 gap-4 mt-4">
            {data.imageUrl.map((file, index) => {
              //화면에 보일수있도록 변경하여 imageUrl에 저장
              const imageUrl = URL.createObjectURL(file);
              return (
                <div className="flex justify-center" key={index}>
                  <img
                    src={imageUrl}
                    className="object-contain max-w-full rounded-md max-h-40"
                    alt={`img-${index}`}
                    onClick={() => {
                      onClickimgDelete(file);
                    }}
                  />
                </div>
              );
            })}
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
            className="block w-full h-40 p-4 text-base text-black bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={onChangetext}
          />
        </div>

        {/* 저장 버튼 */}
        <div className="flex flex-row-reverse items-center p-2">
          <button
            className="px-6 py-3 ml-2 text-white transition duration-200 ease-in-out bg-blue-600 rounded-md hover:bg-blue-700"
            onClick={onClickPOST}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default Semester_create;
