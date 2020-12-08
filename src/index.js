import React from 'react';
import ReactDOM from 'react-dom';
import { AnswerProvider } from './components/answers/AnswerProvider';
import { QuestionProvider } from './components/questions/QuestionProvider';
import './index.css';
import { Simulacrum } from "./Simulacrum"

ReactDOM.render(
  <React.StrictMode>
    <AnswerProvider>
      <QuestionProvider>
        <Simulacrum />
      </QuestionProvider>
    </AnswerProvider>
  </React.StrictMode>,
  document.getElementById('root')
);