// 현지학기 소개 페이지
import "../../styles/localsemester.css";
import { useNavigate } from "react-router-dom";
import Semester_card from "./Semester_card";
import { useEffect, useState } from "react";



export interface Semester{
  id:string,
  title:string,
  content:string,
  imageUrl:File[],
  newFile:File[],
  createdAt:string,
  user:{
    'id':string;
    'name':string;
  },
}

const LocalSemester = () => {
  const navigate = useNavigate();
  const [data,setData] = useState<Semester[]>([]);


  useEffect(()=>{
    fetch('http://localhost:3001/local-semester',{
      method: "GET",
      // headers: {
      //   "Content-Type": "application/json",}
      })
      .then((r) => r.json()) 
      .then((d) => {
          setData(d);
          // 내림차순 정렬 (최신 날짜가 첫 번째에 위치)
          data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      })
  },[])

  console.log(data);

  return (
    <div className="local-semester">
      LocalSemester
      <div className="container">
        <button onClick={()=>navigate("/home")}>홈</button>
        <button onClick={()=>navigate("/introduction")}>조원소개</button>
        <button onClick={()=>navigate("/localSemester")}>현지학기</button>
        <button onClick={()=>navigate("/bulletinBoard")}>게시판</button>
      </div>


      <div className="p-2 fixed bottom-4 right-4">
  <button className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
    onClick={() => { navigate("/Semester-create"); }}>
    글쓰기
  </button>
</div>


<div className="flex flex-wrap gap-8 w-full justify-center items-center">
  {
    data.map((item) => (
      <div key={item.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
        <Semester_card data={item}  />
      </div>
    ))
  }
</div>
    </div>
  );
};

export default LocalSemester;

