import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateMember = () => {
  // 팀 멤버 정보를 관리하는 state
  const [teamMember, setTeamMember] = useState({
    title: "", // 이름
    age: 0, // 나이
    major: "", // 전공
    content: "", // 한 마디
  });

  // 선택된 이미지 파일을 관리하는 state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // 페이지 네비게이션을 위한 훅
  const navigate = useNavigate();

  // 수정
  // useCallback을 사용하여 함수를 캐싱
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTeamMember({
      ...teamMember,
      [name]: name === "age" ? Number(value) : value, // age는 숫자로 변환
    });
  };

  // 나이 입력 시 숫자만 허용하는 함수
  const getNumberOnly = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, "");
  };

  // 파일 업로드 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // 서버에 데이터를 전송하는 함수
  const onClickAdd = async () => {
    const formData = new FormData();
    // FormData 객체 구조:
    // - title: string
    // - age: string (숫자를 문자열로 변환)
    // - major: string
    // - content: string
    // - files: File (선택적)

    // FormData에 각 필드 추가
    formData.append("title", teamMember.title);
    formData.append("age", String(teamMember.age)); // 숫자는 문자열로 변환
    formData.append("major", teamMember.major);
    formData.append("content", teamMember.content);
    if (selectedFile) {
      formData.append("files", selectedFile);
    }

    try {
      const response = await fetch(`http://localhost:3001/team-members`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // response.json()은 Promise를 반환하므로 await를 사용하여 값을 추출
      const data = await response.json();
      setTeamMember(data);
      // 응답 처리 및 에러 핸들링
    } catch (error) {
      console.log("Error fetching data:", error);
    }
    navigate("/introduction");
  };

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
          style={{
            backgroundImage: `url("${
              selectedFile
                ? URL.createObjectURL(selectedFile)
                : "/images/test.jpg"
            }")`,
          }}
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
            <button onClick={onClickAdd}>진모띠</button>
          </div>
          <div className="one-input">
            <h1>이름</h1>
            <input type="text" name="title" onChange={handleInputChange} />
          </div>
          <div className="one-input">
            <h1>나이</h1>
            <input
              type="text"
              name="age"
              placeholder="0"
              defaultValue={0}
              onKeyDown={getNumberOnly}
              onChange={handleInputChange}
            />
            <p style={{ marginLeft: "2%", fontSize: "1rem" }}>
              ※ 0은 비밀로 표시됩니다.
            </p>
          </div>
          <div className="one-input">
            <h1>전공</h1>
            <input type="text" name="major" onChange={handleInputChange} />
          </div>
          <div className="one-input">
            <h1>한 마디</h1>
            <input type="text" name="content" onChange={handleInputChange} />
          </div>
          <div className="file-group">
            <h1>사진 업로드</h1>
            <input
              type="file"
              name="files"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMember;
