import { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/introduction/introductionDescription.css";

// TeamMember 인터페이스 정의
// 팀원 정보를 담는 객체 타입
interface TeamMember {
  id: string; // 팀원의 고유 식별자
  title: string; // 팀원의 이름
  age: number; // 팀원의 나이
  major: string; // 팀원의 전공
  content: string; // 팀원의 소개글
  imageUrl: string[]; // 팀원의 이미지 URL 배열
}

const IntroductionDescription = () => {
  const { state: teamMemberId } = useLocation();
  const navigate = useNavigate();

  // 주요 상태값들 정의
  const [isUpdate, setIsUpdate] = useState<boolean>(false); // 수정 모드 상태
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // 선택된 파일
  const [teamMember, setTeamMember] = useState<TeamMember>({
    id: "",
    title: "",
    age: 0,
    major: "",
    content: "",
    imageUrl: [],
  });

  // 입력값 변경 핸들러 (useCallback으로 최적화)
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setTeamMember((prev) => ({
        ...prev,
        // teamMember 객체의 name 프로퍼티에 value 할당 ( age는 숫자로 변환 )
        [name]: name === "age" ? Number(value) : value,
      }));
    },
    []
  );

  // 파일 업로드 핸들러 (useCallback으로 최적화)
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setSelectedFile(e.target.files[0]);
      }
    },
    []
  );

  // 조원 정보 불러오기
  useEffect(() => {
    const fetchTeamInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/team-members/${teamMemberId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // response.json()은 Promise를 반환하므로 await를 사용하여 값을 추출
        const data = await response.json();
        setTeamMember(data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchTeamInfo();
  }, [teamMemberId, isUpdate]);

  const onClick0 = () => {
    navigate("/home");
  };

  const onClick1 = () => {
    navigate("/introduction");
  };

  const onClick2 = () => {
    navigate("/localSemester");
  };

  const onClick3 = () => {
    navigate("/bulletinBoard");
  };

  // 업데이트
  // useCallback을 사용하여 함수를 캐싱
  const onClickSave = useCallback(async () => {
    try {
      const formData = new FormData();
      formData.append("title", teamMember.title);
      formData.append("age", String(teamMember.age));
      formData.append("major", teamMember.major);
      formData.append("content", teamMember.content);

      if (selectedFile !== null) {
        formData.append("files", selectedFile);
      }

      const response = await fetch(
        `http://localhost:3001/team-members/${teamMemberId}`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.log("Error updating data:", error);
    }
    setIsUpdate(false);
  }, [selectedFile, teamMember, teamMemberId]);

  // 삭제
  // useCallback을 사용하여 함수를 캐싱
  const onClickDelete = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/team-members/${teamMemberId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("Successfully deleted");
      navigate("/introduction");
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }, [teamMemberId, navigate]);

  // 백그라운드 이미지
  // state 렌더할 때마다 깜빡거리는 현상을 해결하기 위해 useMemo 사용
  const backgroundImageStyle = useMemo(() => {
    const url = isUpdate
      ? selectedFile
        ? URL.createObjectURL(selectedFile)
        : teamMember.imageUrl[0]
      : teamMember.imageUrl;
    return { backgroundImage: `url("${url}")` };
  }, [selectedFile, teamMember.imageUrl]);

  return (
    <div className="introduction-description">
      introduction-description
      <button onClick={onClick0}>홈</button>
      <button onClick={onClick1}>조원소개</button>
      <button onClick={onClick2}>현지학기</button>
      <button onClick={onClick3}>게시판</button>
      <div className="wrap-my-content-description">
        <div
          className="one-card"
          key={teamMember.id}
          style={backgroundImageStyle}
        >
          <h1 className="preview">Preview</h1>
          <div className="overlay">
            <div className="content">
              <h2 className="member-name">{teamMember.title}</h2>
              {teamMember.age === 0 ? (
                <p className="member-age">비밀</p>
              ) : (
                <p className="member-age">{teamMember.age}세</p>
              )}
              <p className="member-major">{teamMember.major}</p>
              <p className="member-content">「{teamMember.content}」</p>
            </div>
          </div>
        </div>
        <div className="right-content">
          <div className="button-group">
            {isUpdate ? (
              <button onClick={onClickSave}>SAVE</button>
            ) : (
              <button onClick={() => setIsUpdate(true)}>수정</button>
            )}
            <button onClick={onClickDelete}>삭제</button>
          </div>
          <div className="one-input">
            <h1>이름</h1>
            {isUpdate ? (
              <input
                type="text"
                name="title"
                value={teamMember.title}
                onChange={handleInputChange}
              />
            ) : (
              <p>{teamMember.title}</p>
            )}
          </div>
          <div className="one-input">
            <h1>나이</h1>
            {isUpdate ? (
              <>
                <input
                  type="text"
                  name="age"
                  value={teamMember.age}
                  onChange={handleInputChange}
                />
                <p style={{ marginLeft: "2%", fontSize: "1rem" }}>
                  ※ 0은 비밀로 표시됩니다.
                </p>
              </>
            ) : teamMember.age === 0 ? (
              <p>비밀</p>
            ) : (
              <p>{teamMember.age}</p>
            )}
          </div>
          <div className="one-input">
            <h1>전공</h1>
            {isUpdate ? (
              <input
                type="text"
                name="major"
                value={teamMember.major}
                onChange={handleInputChange}
              />
            ) : (
              <p>{teamMember.major}</p>
            )}
          </div>
          <div className="one-input">
            <h1>한 마디</h1>
            {isUpdate ? (
              <input
                type="text"
                name="content"
                value={teamMember.content}
                onChange={handleInputChange}
              />
            ) : (
              <p>{teamMember.content}</p>
            )}
          </div>
          {isUpdate && (
            <div className="file-group">
              <h1>사진 업로드</h1>
              <input
                type="file"
                name="files"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntroductionDescription;
