import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import styled from "styled-components";
import { ReviewCard } from "./ReviewCard";
import { useSelector } from "react-redux";

// --- Styled-Components CSS ---
const ReviewContainer = styled.section`
  width: 100%;
  background-color: var(--color-background);
`;

// #1 신규 리뷰 등록
const ReviewRegister = styled.article`
  padding: 1rem;

  /* 5. 신규 리뷰 등록 영역 버튼 */
  input.register {
    color: var(--color-white);
    background-color: var(--color-main);
    height: 45px;
    font-size: 15px;
    border-radius: 10px;
    padding: 0;
    cursor: pointer;
  }
`;

// #2 리뷰 검색
const ReviewSearch = styled.article`
  padding: 1rem;
  background-color: var(--color-white);
  input {
    background-color: var(--color-background);
  }
`;

// #3 리뷰 내역 -> grid 형식으로 제작하기
const ReviewList = styled.article`
  padding: 1rem;

  /* 6. 영화 리뷰 박스 영역 */
  div.review-box {
    background-color: var(--color-white);
    border: 1px solid var(--color-border);
    border-radius: 10px;
    padding: 2rem 1.2rem;

    gap: 1rem;
    /* 7. 영화 리뷰 박스 별점 영역 */
    div.review-score {
      width: 15px;
      height: 15px;
      background-color: var(--color-yellow);
      border: 1px solid var(--color-yellow);
    }
  }
`;

// --- Rendering Function ---
const Review = () => {
  // Redux store의 모든 state를 출력해줍니다.
  // initialData

  // console.log(reviewState);

  // 객체 데이터를 담기 위한 배열 상태값
  const [newReview, setNewReview] = useState([]);

  // 기본 입력 상태값
  const [inputValue, setInputValue] = useState({
    title: "",
    comment: "",
    score: "1점",
  });

  // 제목 핸들러
  const titleHandler = (e) => {
    setInputValue((prevState) => {
      return { ...prevState, title: e.target.value };
    });
  };

  // 한줄평 핸들러
  const commentHandler = (e) => {
    setInputValue((prevState) => {
      return { ...prevState, comment: e.target.value };
    });
  };

  // 별점 핸들러
  const scoreHandler = (e) => {
    setInputValue((prevState) => {
      return { ...prevState, score: e.target.value };
    });
  };

  // 등록 버튼 핸들러
  // 로컬스토리지에 title, review, star를 저장합니다.
  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      id: uuid(),
      title: inputValue.title,
      comment: inputValue.comment,
      score: inputValue.score,
    };
    setNewReview((prev) => {
      return [data, ...prev];
    });
    // newReview.push(data);
    // JSON 형태로 바꿔서 로컬 스토리지에 저장
    localStorage.setItem("review", JSON.stringify(newReview));
    setInputValue({ title: "", comment: "", score: "1점" });
  };
  // 입력값 업데이트 시 localStorage 데이터 저장
  // useEffect(() => {
  //   localStorage.setItem("review", JSON.stringify(newReview));
  // }, [newReview]);

  // 업마운트 시 localStorage 데이터 불러오기
  useEffect(() => {
    return () => {
      JSON.parse(localStorage.getItem("review"));
    };
  }, [newReview]);

  const reviewState = useSelector(({ review }) => {
    return review;
  });
  // console.log(...reviewState);

  return (
    <ReviewContainer>
      <ReviewRegister>
        <h2>신규 리뷰 등록</h2>
        <form onSubmit={submitHandler}>
          <label htmlFor="title">영화 제목</label>
          <input
            type="text"
            value={inputValue.title}
            name="title"
            placeholder="제목을 입력해 주세요"
            id="title"
            onChange={titleHandler}
          ></input>
          <label htmlFor="comment">한줄평</label>
          <input
            type="text"
            value={inputValue.comment}
            name="comment"
            placeholder="내용을 입력해 주세요"
            id="comment"
            onChange={commentHandler}
          ></input>
          <label htmlFor="score">별점</label>
          <select
            name="score"
            id="score"
            onChange={scoreHandler}
            value={inputValue.score}
          >
            <option value="1점">1점</option>
            <option value="2점">2점</option>
            <option value="3점">3점</option>
            <option value="4점">4점</option>
            <option value="5점">5점</option>
          </select>
          <input className="register" type="submit" value="등록"></input>
        </form>
      </ReviewRegister>
      <ReviewSearch>
        <h2>리뷰 검색</h2>
        <input type="text" placeholder="영화 제목을 입력해 주세요."></input>
      </ReviewSearch>

      <ReviewList>
        <h2>리뷰 내역</h2>
        {newReview.map((card, idx) => {
          return <ReviewCard card={card} key={idx} />;
        })}
        {/* {reviewState} */}
        {/* {data} */}
        {/* {newReview.map((arr, i) => (
          <>
            <div key={i} className="review-box">
              <h3>{arr.title}</h3>
              <p>{arr.comment}</p>
              <div className="review-score">{arr.score}</div>
            </div>
          </>
        ))} */}
        {/* {reviewState.map((arr, i) => (
          <>
            <div key={i} className="review-box">
              <h3>{arr.title}</h3>
              <p>{arr.comment}</p>
              <div className="review-score">{arr.score}</div>
            </div>
          </>
        ))} */}
      </ReviewList>
    </ReviewContainer>
  );
};

export default Review;
