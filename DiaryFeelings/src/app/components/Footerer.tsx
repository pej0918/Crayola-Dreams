'use client'
import React from 'react'
import styled from 'styled-components'

const FooterWrapper = styled.footer`
  position: fixed;
  bottom: -3px;
  width: 100%;
  border-top: 1px solid #e4e4e4;
  background-color: #f8f9fa;
  padding: 0.3rem 0;
  margin: 0.1rem 0;
  z-index: 20;
`

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const FooterCopyright = styled.div`
  font-size: 0.9rem;
  color: #545e6f;
  margin: 0.1rem;

  a {
    color: blue; /* 원하는 색상으로 변경하세요. */
    text-decoration: underline;
    cursor: pointer;
  }
`

const Footer: React.FC = () => {
  return (
    <FooterWrapper className="dark:bg-black dark:border-black">
      <InnerContainer className="dark:bg-black ">
        <FooterCopyright className=" dark:text-white/80 ">
          Created with by {''}
          <a
            href="https://github.com/JS-A-CoreProject/DiaryFeelings"
            target="_blank"
            rel="noopener noreferrer"
          >
            ReluMolu
          </a>{' '}
          / 인공지능사관학교의 ReluMolu에 대해 알고 싶다면 {''}
          <a
            href="https://github.com/JS-A-CoreProject/DiaryFeelings"
            target="_blank"
            rel="noopener noreferrer"
          >
            여기
          </a>
          를 클릭하세요 :)
        </FooterCopyright>
      </InnerContainer>
    </FooterWrapper>
  )
}

export default Footer
