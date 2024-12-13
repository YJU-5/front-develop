import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom";



const Sign_up = () => {
  const navigate = useNavigate()

  const [formdata,setformdata] = useState({
    name:'',
    email:'',
    password:'',
  });


  const onchange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const name = e.target.name
    const value = e.target.value
    setformdata({...formdata,[name]:value})
  }
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    if(!formdata.name ||!formdata.email|| !formdata.password ){
      alert('잘 확인해 주세요')
      return ;
    }
    
    fetch('http://localhost:3001/user/register',{
      method:'POST',
      headers: {
        "Content-Type": "application/json"},
      body:JSON.stringify(formdata)
    })
    .then(response=>{
      if(response.ok){
        console.log('성공');
        navigate('/Login')
      }else{
        alert('이름, 이메일 , 비밀번호에 중복이있습니다. 다시작성해 주세요')
      }
    }
    )
  }

console.log(formdata);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
          Home   
      </a>
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            회원가입
            </h1>
            <form className="space-y-4 md:space-y-6"  onSubmit={handleSubmit}>
                <div>
                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">이름</label>
                    <input type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="이름을입력해주세영"
                    onChange={onchange}
                    />
                </div>
                <div>
                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">귀하의 이메일</label>
                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" 
                    onChange={onchange}
                    />
                </div>
                <div>
                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">비밀번호</label>
                    <input type="" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    onChange={onchange}
                    />
                </div>
                
                <div className="flex items-center justify-between">
                    <div className="flex items-start">
                    </div>
                </div>
                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">회원가입</button>
            </form>
        </div>
    </div>
</div>
</section>

  )
}

export default Sign_up