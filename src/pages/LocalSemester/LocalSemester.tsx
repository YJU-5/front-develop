// 현지학기 소개 페이지
import "../../styles/localsemester.css";
import { useNavigate } from "react-router-dom";
import Semester_card from "./SemesterCard";
import { useEffect, useState } from "react";

export interface Semester {
  id: string; //글의 id
  title: string; //글의 title
  content: string; // 글의 content
  imageUrl: string[]; //기존 이미지
  newFile?: File[]; //새로운 이미지
  createdAt: string; //생성날짜
  user?: {
    id: string;
    name: string;
  };  //글을쓴 유저의 id,name
}

const LocalSemester = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Semester[]>([]); //현지학기제 글 전체 받아서 저장

  //페이지가 실행될때 1번만 글을 가지고와서 setData에 저장장
  useEffect(() => {
    fetch("http://localhost:3001/local-semester", {
      method: "GET",
      // headers: {
      //   "Content-Type": "application/json",}
    })
      .then((response) => response.json()) // response를 json형태로 변환환
      .then((response) => {
        // data
        setData(response);
      });
  }, []);

  console.log(data);

  return (
    <div className="local-semester">
      <div className="fixed p-2 bottom-4 right-4">
        <button
          className="px-4 py-2 font-bold text-white bg-gray-400 rounded hover:bg-gray-500"
          onClick={() => {
            navigate("/semester-create");
          }}
        >
          글쓰기
        </button>
      </div>
      <div className="flex flex-wrap items-center justify-center w-full gap-8">
        {data.map((item) => (
          <div key={item.id} className="w-full p-4 sm:w-1/2 md:w-1/3 lg:w-1/4">
            <Semester_card data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocalSemester;
