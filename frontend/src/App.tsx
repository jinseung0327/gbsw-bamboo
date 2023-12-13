// App.tsx 파일

import React, { useState, useEffect } from "react";
import Report from "./Report";
import axios from "axios";
import GbswChar from "../src/img/gbsw_char.png";

// Post 인터페이스 정의
interface Post {
  createdAt: Date;
  id: number;
  title: string;
  description: string;
  name: string;
  password: string;
  categories: string;
}

const App: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isReportMode, setIsReportMode] = useState(false);
  const [postData, setPostData] = useState<Post[]>([]);
  const [formData, setFormData] = useState<Post>({
    id: 0,
    title: "",
    description: "",
    name: "",
    password: "",
    createdAt: new Date(),
    categories: "유머",
  });

  useEffect(() => {
    // 페이지 로드 시 GET 요청 수행
    axios
      .get<Post[]>("http://localhost:3000/api/boards")
      .then((response) => {
        setPostData(response.data.reverse());
      })
      .catch((error) => {
        console.error("에러 발생:", error);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // POST 요청 수행
    axios
      .post<Post>("http://localhost:3000/api/boards", formData)
      .then((response) => {
        console.log("제보 성공:", response.data);
        setIsSubmitted(true);
      })
      .catch((error) => {
        console.error("에러 발생:", error);
      });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    // 입력 폼의 값이 변경될 때마다 상태 업데이트
    if (e.target.value !== "none") {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  const handleReportClick = () => {
    setIsReportMode(true);
  };

  const handleCancelReport = () => {
    setIsReportMode(false);
  };

  const handleReportSubmit = () => {
    const reportReasonInput = document.getElementById(
      "reportReason"
    ) as HTMLInputElement;
    const reportReason = reportReasonInput.value.trim();
    if (!reportReason) {
      alert("신고 내용을 입력하세요.");
      return;
    }
    const postId = parseInt(reportReason, 10);

    axios
      .post(`http://localhost:3000/api/boards/${postId}/report`)
      .then((response) => {
        console.log("신고 성공:", response.data);
        alert("신고에 성공하였습니다.");
        setIsReportMode(false);
      })

      .catch((error) => {
        console.error("에러 발생:", error);
        alert("5번이상 신고하여 게시물이 삭제되었습니다.");
      });
  };

  return (
    <>
      <div className={`background ${isDarkTheme ? "dark-theme" : ""}`}></div>
      <div className={`inner ${isDarkTheme ? "dark-theme" : ""}`}>
        {isReportMode && (
          <div
            className={`report-input-container ${
              isDarkTheme ? "dark-theme" : ""
            }`}
          >
            <span>
              제출한 제보의 상태 또는 반려 사유를 확인하거나 제보를 삭제할 수
              있습니다.
            </span>
            <input
              type="text"
              placeholder="신고 번호"
              id="reportReason"
              className={`${isDarkTheme ? "dark-theme" : ""}`}
            />
            <div>
              <button
                type="button"
                onClick={handleReportSubmit}
                className={`${isDarkTheme ? "dark-theme" : ""}`}
              >
                제출
              </button>
              <button
                type="button"
                onClick={handleCancelReport}
                className={`${isDarkTheme ? "dark-theme" : ""}`}
                style={{ backgroundColor: "transparent" }}
              >
                취소
              </button>
            </div>
          </div>
        )}
        <img src={GbswChar} className="gbsw-logo" alt="Logo" />
        <header>
          <h3>
            <div>경</div>소고<div>&nbsp;대</div>나무<div>숲</div>
          </h3>
          <div onClick={toggleTheme} className="theme-btn">
            {isDarkTheme ? "밝은 테마" : "어두운 테마"}
          </div>
        </header>
        <form
          onSubmit={handleSubmit}
          className={`${isDarkTheme ? "dark-theme" : ""}`}
        >
          <div className="input-container">
            <input
              type="text"
              placeholder="제목 (최대 20자)"
              id="title"
              value={formData.title}
              onChange={handleChange}
              className={`${isDarkTheme ? "dark-theme" : ""}`}
            />
            <input
              type="text"
              placeholder="이름"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className={`${isDarkTheme ? "dark-theme" : ""}`}
            />
            <input
              type="password"
              placeholder="비밀번호"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className={`${isDarkTheme ? "dark-theme" : ""}`}
            />
            <select
              id="categories"
              value={formData.categories}
              onChange={handleChange}
              className={`${isDarkTheme ? "dark-theme" : ""}`}
            >
              <option value="none">태그 선택</option>
              <option value="유머">유머</option>
              <option value="개인">개인</option>
              <option value="궁금증">궁금증</option>
              <option value="진로진학">진로진학</option>
              <option value="기타">기타</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="설명"
            id="description"
            value={formData.description}
            onChange={handleChange}
            className={`${isDarkTheme ? "dark-theme" : ""}`}
          />
          <div
            style={{
              backgroundColor: "transparent",
              padding: "0",
            }}
          >
            <button
              type="submit"
              className={`${isDarkTheme ? "dark-theme" : ""}`}
            >
              제보하기
            </button>
            <button
              type="button"
              onClick={handleReportClick}
              className={`${isDarkTheme ? "dark-theme" : ""}`}
            >
              신고하기
            </button>
          </div>
          {isSubmitted && (
            <div className="submit-check">
              제보가 성공적으로 완료되었습니다!
            </div>
          )}
        </form>

        {/* 제보된 게시물 목록 출력 */}
        {postData.map((post) => (
          <Report
            date={post.createdAt}
            text={post.description}
            tag={post.categories}
            key={post.id}
            {...post}
            isDarkTheme={isDarkTheme}
          />
        ))}
      </div>
    </>
  );
};

export default App;
