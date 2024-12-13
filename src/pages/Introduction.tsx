// 조원소개 페이지
import "../styles/introduction.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// id, name, age, major, hitokoto, image

// 객체 타입 지정
interface TeamMember {
  id: string;
  title: string;
  age: number;
  major: string;
  content: string;
  imageUrl: string;
}

const Introduction = () => {
  // teamMembers: TeamMember[] 타입의 state, 초기값은 빈 배열
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeamInfo = async () => {
      try {
        const response = await fetch("http://localhost:3001/team-members");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // response.json()은 Promise를 반환하므로 await를 사용하여 값을 추출
        const data: TeamMember[] = await response.json();

        // 중복되지 않는 데이터만 추가
        setTeamMembers((prev) => {
          const newMembers = data.filter(
            (member) => !prev.some((prevMember) => prevMember.id === member.id)
          );
          return [...prev, ...newMembers];
        });
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchTeamInfo();
  }, []);

  const onClick0 = () => {
    navigate("/home");
  };

  const onClick1 = () => {
    navigate("/introduction");
  };

  const onClick2 = () => {
    navigate("/local-semester");
  };

  const onClick3 = () => {
    navigate("/bulletinBoard");
  };

  const onClickAdd = () => {
    navigate("/create-member");
  };

  const onClickProfile = (pram: string) => {
    navigate("/introduction-description", { state: pram });
  };

  return (
    <div className="introduction">
      Introduction
      <button onClick={onClick0}>홈</button>
      <button onClick={onClick1}>조원소개</button>
      <button onClick={onClick2}>현지학기</button>
      <button onClick={onClick3}>게시판</button>
      <div className="button-group">
        <button className="add-button" onClick={onClickAdd}>
          추가
        </button>
      </div>
      <div className="wrap-my-content">
        {teamMembers.map((item) => (
          <div
            className="one-card"
            key={item.id}
            style={{
              backgroundImage: `url("${item.imageUrl}")`,
            }}
            onClick={() => onClickProfile(item.id)}
          >
            <div className="overlay">
              <div className="content">
                <h2 className="member-name">{item.title}</h2>
                {item.age === 0 ? (
                  <p className="member-age">비밀</p>
                ) : (
                  <p className="member-age">{item.age}세</p>
                )}

                <p className="member-major">{item.major}</p>
                <p className="member-content">「{item.content}」</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Introduction;
