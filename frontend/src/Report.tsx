import React, { useEffect, useRef, useState } from "react";

interface ReportProps {
  id: number;
  date: Date;
  title: string;
  text: string;
  tag: string;
  isDarkTheme: boolean; // 추가
}

const Report: React.FC<ReportProps> = ({
  id,
  date,
  title,
  text,
  tag,
  isDarkTheme,
}) => {
  const [content, setContent] = useState<string>()

  const aboutRef = useRef<HTMLDivElement>(null)

 useEffect(() => {
  if(text.split('').length > 80) {
    console.log('long')
    setContent(text.substring(0, 80))
  } else {
    setContent(text)
  }
 }, [])

  const Hiden=() => {
    aboutRef.current?.style.setProperty('display', 'none')
    setContent(text)
  }

  return (
    <div className={`report-container ${isDarkTheme ? "dark-theme" : ""}`}>
      <div className="report-id">#{id}번째 코드</div>
      <div className="report-date">{date.toString()}</div>
      <div className="report-title">{title}</div>
      <div>
        <div className="report-text">{content}</div>
        { text.length > 80 ?
          <div className='report-about' ref={aboutRef} onClick={Hiden}>자세히 보기</div>
        : null }
      </div>
      <div className={`report-tag ${isDarkTheme ? "dark-theme" : ""}`}>
        {tag}
      </div>
    </div>
  );
};

export default Report;
