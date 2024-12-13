import { jwtDecode } from "jwt-decode";
import { useEffect,  useState } from "react";
import { useNavigate } from "react-router-dom";

interface Datastate{
  title:string,
  content:string,
  imageUrl:File[],
}


const Semester_create = () => {
  const [token,setToken] = useState<any>();
  const [user,setUser] = useState<any>('');
  const navigate=useNavigate();
  const [data,setData] = useState<Datastate>({
    title:'',
    content:'',
    imageUrl:[],
  });
  
useEffect(()=>{
  const usertoken:any = localStorage.getItem('access_token')
  const user = jwtDecode(usertoken)
  setUser(user)
  setToken(usertoken)

},[])


  const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const Files = e.target.files
    if (Files){
      setData((prevData)=>({
        ...prevData,
        imageUrl: Array.from(Files),  //Files 는 배열처럼 보이지만 배열이 아니라서 Array.from(Files)이렇게 해준다
      }))
    }
  }

  const onChangetext = (e: React.ChangeEvent<HTMLTextAreaElement>)=>{
    const content = e.target.value
    setData((prevData)=>({
      ...prevData,
      ['content']: content,
    }))
  } 

  const onChangetitle = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const title = e.target.value
    setData((prevData)=>({
      ...prevData,
      ['title']: title
    }))
  }

  const onClickimgDelete = (file:File)=>{
    setData((prevData)=>({
      ...prevData,
      imageUrl:prevData.imageUrl.filter((item)=>item !== file)

    }))

  }


  const onClickPOST = ()=>{
    const formdata = new FormData();
    formdata.append('title',data.title)
    formdata.append('content',data.content)
    data.imageUrl.forEach((file)=>{
      formdata.append('imageUrl',file)
    })

    fetch('http://localhost:3001/local-semester',{
      method:'POST',
      headers: { 'Authorization': `Bearer ${token}`, // 여기서 yourToken은 실제 토큰 값입니다. 
      },
      body: formdata,
    })
    .then(r=>{
      if(r.ok){
        navigate('/localSemester')
      }
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
          onChange={onChangetitle}
        />
      </div>
  
      {/* 작성자 */}
      <div className="flex items-center mb-6">
        <span className="font-semibold text-black">작성자</span>
        <input
          type="text"
          className="ml-4 flex-1 border border-gray-300 bg-gray-100 px-4 py-2 text-black rounded-md focus:outline-none"
          value={user.name||''}
          readOnly
        />
      </div>
  
      {/* 이미지 */}
      <div className="mb-6">
        <label htmlFor="file_input" className="block font-semibold text-black mb-2">이미지</label>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          id="file_input"
          type="file"
          multiple
          onChange={handleImageChange}
        />
        <div className="mt-4 grid grid-cols-3 gap-4">
          {data.imageUrl.map((file, index) => {
            const imageUrl = URL.createObjectURL(file);
            return (
              <div className="flex justify-center" key={index}>
                <img src={imageUrl} className="object-contain max-w-full max-h-40 rounded-md" alt={`img-${index}`} 
                onClick={()=>{onClickimgDelete(file)}}
                />
              </div>
            );
          })}
        </div>
      </div>
  
      {/* 내용 */}
      <div className="mb-6">
        <label htmlFor="input" className="block font-semibold text-black mb-2">내용</label>
        <textarea
          id="input"
          name="content"
          className="block w-full h-40 p-4 text-black border border-gray-300 rounded-lg bg-gray-100 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={onChangetext}
        />
      </div>
  
      {/* 저장 버튼 */}
      <div className="flex items-center flex-row-reverse p-2">
        <button
          className="ml-2 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out"
          onClick={onClickPOST}
        >
          저장
        </button>
      </div>
    </div>
  </div>
  
  )
}

export default Semester_create