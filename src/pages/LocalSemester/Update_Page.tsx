import { useLocation, useNavigate } from "react-router-dom"
import { Semester } from "./LocalSemester";
import { useEffect, useState } from "react";

export interface User{
  id:string;
  name:string;
}

const Update_Page = () => {
  const navigate =  useNavigate();
  const location = useLocation();
  const id = location.state.id
  const [data,setData] = useState<Semester>({
    id:'',
    title:'',
    content:'',
    imageUrl:[], // 기존 URL
    newFile:[], //새로 추가된 파일
    createdAt:'',
    user:{'id':'','name':''},
  });


  useEffect (()=>{
    const fetchData = async()=>{
      const response= await fetch('http://localhost:3001/local-semester/'+id,{
        method: "GET",
        // headers: {
        //   "Content-Type": "application/json",}
        })
        const data = await response.json();
        setData(data);
    } 
    fetchData();
  },[id])



  const onChangetitle = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const title = e.target.value
    setData((prevData)=>({
      ...prevData,
      ['title']: title
    }))
  }

  const onChangetext = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
    const content = e.target.value
    setData((prevData)=>({
      ...prevData,
      ['content']: content
    }))
  }
  
  
  const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const Files = e.target.files
    if (Files){
      setData((prevData)=>({
        ...prevData,
        newFile:Array.from(Files)
      }))
    }
  }

console.log(data);


  const onClickimgDelete = (file:File)=>{
    setData((prevData)=>({
      ...prevData,
      imageUrl:prevData.imageUrl.filter((item)=>item !== file),
      newFile:prevData.newFile.filter((item)=>item !== file),
    }))
  }

  const onClickPATCH = ()=>{
    const formdata = new FormData();
    if(data.title && data.content){
      formdata.append('title',data.title)
      formdata.append('content',data.content)
    }else{
      console.log('값이 없어요')
    }

    // 기존 url 
    if(data.imageUrl){
      data.imageUrl.forEach((file)=>{
        formdata.append('existingImageUrls',file)
      })
    }
    // 새파일 
    if(data.newFile){
      data.newFile.forEach((file)=>{
        formdata.append('imageUrl',file)
      })
    }

      fetch('http://localhost:3001/local-semester/'+id,{
        method: "PATCH",
        body:formdata,
      })
      .then((r)=>{
        if(r.ok){
          console.log('요청완료');
        }
      })
      .then((respones)=>{
        navigate('/LocalSemester')
      })
  }


  return (
    <div className="p-8 min-h-screen flex items-center justify-center ">
    <div className="max-w-4xl w-full bg-white border border-gray-300 shadow-lg rounded-md p-6">
      
      {/* 제목 */}
      <div className="flex items-center border-b border-gray-300 pb-4 mb-6 text-black">
        <span className="font-semibold text-xl">제목</span>
        <input
          type="text"
          className="ml-4 flex-1 border border-gray-300 bg-gray-100 px-4 py-2 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="ml-4 flex-1 border border-gray-300 bg-gray-100 px-4 py-2 text-black rounded-md focus:outline-none"
          value=""
          readOnly
        />
      </div>
  
      {/* 이미지 */}
      <div className="mb-6">
        <label htmlFor="file_input" className="block font-semibold text-black mb-2">이미지</label>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          type="file"
          multiple
          onChange={handleImageChange}
        />
        <div className="mt-4 grid grid-cols-3 gap-4">
          {data.imageUrl.map((file, index) => {
            return (
              <div className="flex justify-center" key={index} >
                <img src={file} className="object-contain max-w-full max-h-40 rounded-md"  
                onClick={()=>{onClickimgDelete(file)}} />
              </div>
            );
          })}

          {
            data.newFile && data.newFile.length>0 ? (data.newFile.map((file, index) => {
              const imageUrl = URL.createObjectURL(file); 
              return (
                <div className="flex justify-center" key={index} >
                  <img src={imageUrl} className="object-contain max-w-full max-h-40 rounded-md"  
                  onClick={()=>{onClickimgDelete(file)}} />
                </div>
              );
            })):(<div></div>) 
          }
        </div>
      </div>
  
      {/* 내용 */}
      <div className="mb-6">
        <label htmlFor="input" className="block font-semibold text-black mb-2">내용</label>
        <textarea
          id="input"
          name="content"
          value={data.content}
          className="block w-full h-40 p-4 text-black border border-gray-300 rounded-lg bg-gray-100 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={onChangetext}
        />
      </div>
  
      {/* 저장 버튼 */}
      <div className="flex items-center flex-row-reverse p-2">
        <button
          className="ml-2 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out"
          onClick={onClickPATCH}
        >
          저장
        </button>
      </div>
    </div>
    </div>


    
  )
}

export default Update_Page