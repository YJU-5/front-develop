import { Semester } from "./LocalSemester";
import { useNavigate } from "react-router-dom";

interface SemesterCardProps {
  data: Semester; //LocalSemester에서 받아온 interface Semester의 기본 타입들
}

const SemesterCard: React.FC<SemesterCardProps> = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-sm transition-all transform bg-white border border-gray-200 rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl dark:bg-gray-800 dark:border-gray-700">
      <a>
        <img
          className="object-cover w-full h-48 rounded-t-lg"
          src={data.imageUrl[0]} //사진들중에서 0번째사진만 보여준다.
          alt="Semester Image"
        />
      </a>
      <div className="p-4">
        <h5 className="mb-3 text-2xl font-semibold text-gray-900 dark:text-white">
          {data.title}
        </h5>
        <p className="mb-4 text-gray-700 dark:text-gray-400 line-clamp-3">
          {data.content}
        </p>
        <a
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white transition-all transform rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-blue-300 hover:scale-110"
          onClick={() =>
            navigate("/detailed-page", {
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
  );
};

export default SemesterCard;
