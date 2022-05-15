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
  padding: 1.5rem;
  /* 5. 신규 리뷰 등록 영역 버튼 */
  input.register {
    color: var(--color-white);
    background-color: var(--color-main);
    height: 3rem;
    font-size: 15px;
    border-radius: 10px;
    padding: 0;
    cursor: pointer;
  }
`;

// #2 리뷰 검색
const ReviewSearch = styled.article`
  padding: 1.5rem;
  background-color: var(--color-white);
  input.review-search {
    margin-top: 0;
    background-color: var(--color-background);
  }
`;

// #3 리뷰 내역 -> 큰 화면에서는 grid 형식으로 Column 2줄 정렬
const ReviewList = styled.article`
  padding: 1.5rem;
  article.review-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;

    /* 반응형 CSS로 작업지시서의 작은 화면과 같이 Column 1줄 정렬*/
    @media screen and (max-width: 500px) {
      display: flex;
      flex-direction: column;
    }
    /* 6. 영화 리뷰 박스 영역 */
    div.review-box {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      background-color: var(--color-white);
      border: 1px solid var(--color-border);
      border-radius: 10px;
      padding: 2rem 1.2rem;
      /* 7. 영화 리뷰 박스 별점 영역 */
      h3 {
        font-size: 18px;
      }
      p {
        margin-bottom: 0.5rem;
      }
      div.score-box {
        display: inline-flex;
        gap: 0.2rem;
        span.review-score {
          width: 15px;
          height: 15px;
          background-color: var(--color-yellow);
          border: 1px solid var(--color-yellow);
          border-radius: 50%;
        }
      }
    }
  }
`;

// --- Rendering Function ---
const Review = () => {
  // initialData
  // Redux store의 모든 state를 출력해줍니다.
  const reviewState = useSelector(({ initialData }) => {
    return initialData;
  });
  const [emptyReview, setEmptyReview] = useState([]);
  const [inputValue, setInputValue] = useState({
    title: "",
    comment: "",
    score: 1,
  });

  // --- 인풋 핸들러 ---
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

  // --- 등록 버튼 핸들러 ---
  // 로컬스토리지에 title, review, star를 저장합니다.
  const submitHandler = (e) => {
    e.preventDefault();
    const inputData = {
      id: uuid(),
      title: inputValue.title,
      comment: inputValue.comment,
      score: Number(inputValue.score),
      // option의 value가 string으로 저장되기 때문에 number로 변환
    };

    setEmptyReview((prev) => {
      return [...prev, inputData];
    });

    // JSON 형태로 변환 후 로컬 스토리지에 저장
    localStorage.setItem("review", JSON.stringify([...emptyReview, inputData]));
    setInputValue({ title: "", comment: "", score: 1 });
  };
  // ------

  // --- 정렬 함수 ---
  // #3 리뷰 내역 정렬
  // 1. 별점 순 정렬
  const scoreFilter = (a, b) => {
    return b.score - a.score;
  };
  // 2. A-Z 순 정렬
  const enFilter = (a, b) => {
    let textA = a.title.toLowerCase();
    let textB = b.title.toLowerCase();
    return textA < textB ? -1 : textA === textB ? 0 : 1;
  };
  // 3. 가나다 순 정렬
  const koFilter = (a, b) => {
    return a.title < b.title ? -1 : a.title === b.title ? 0 : 1;
  };
  // ------

  // 마운트 시
  useEffect(() => {
    const getLocalData = JSON.parse(localStorage.getItem("review"));
    if (getLocalData === null) {
      // 데이터가 없으면 더미데이터를 로컬스토리지에 입력
      localStorage.setItem("review", JSON.stringify(reviewState));
    } else {
      // 있다면
      setEmptyReview(emptyReview);
    }
  }, [emptyReview, reviewState]);

  // --- 리뷰 검색 ---
  // 검색창 상태값
  const [search, setSearch] = useState("");

  // 검색 핸들러
  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  // 검색 업데이트
  useEffect(() => {
    const getLocalData = JSON.parse(localStorage.getItem("review"));
    const searchFilter = getLocalData.filter((data) =>
      data.title.includes(search)
    );
    setEmptyReview(searchFilter);
  }, [search]);

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
            <option value="1">1점</option>
            <option value="2">2점</option>
            <option value="3">3점</option>
            <option value="4">4점</option>
            <option value="5">5점</option>
          </select>
          <input className="register" type="submit" value="등록"></input>
        </form>
      </ReviewRegister>
      <ReviewSearch>
        <h2>리뷰 검색</h2>
        <input
          className="review-search"
          type="text"
          placeholder="영화 제목을 입력해 주세요."
          onChange={searchHandler}
          value={search}
        ></input>
      </ReviewSearch>
      <ReviewList>
        <h2>리뷰 내역</h2>
        <article className="review-grid">
          {emptyReview
            .sort(enFilter)
            .sort(koFilter)
            .sort(scoreFilter)
            .map(({ id, title, comment, score }) => {
              return (
                <ReviewCard
                  title={title}
                  comment={comment}
                  score={score}
                  key={id}
                />
              );
            })}
        </article>
      </ReviewList>
    </ReviewContainer>
  );
};

export default Review;
