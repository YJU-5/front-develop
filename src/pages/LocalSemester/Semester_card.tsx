  import { Semester } from './LocalSemester';
  import { useNavigate } from "react-router-dom";

  interface SemesterCardProps {
    data: Semester;
    
  }

  const Semester_card:React.FC<SemesterCardProps> = ({data}) => {
    const navigate = useNavigate();
    
    

    return (
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl dark:bg-gray-800 dark:border-gray-700">
      <a>
        <img className="rounded-t-lg w-full object-cover h-48" src={data.imageUrl[0]} alt="Semester Image" />
      </a>
      <div className="p-4">
        <h5 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">{data.title}</h5>
        <p className="text-gray-700 dark:text-gray-400 mb-4 line-clamp-3">{data.content}</p>
        <a
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-blue-300 transform transition-all hover:scale-110"
          onClick={() =>
            navigate("/Detailed_Page", {
              state: {
                id: data.id,
              },
            })
          }
        >
          상세보기
        </a>
      </div>
    </div>
    
    )
  }

  export default Semester_card