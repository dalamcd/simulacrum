import React from 'react';
import ReactDOM from 'react-dom';
import { AnswerProvider } from './components/answers/AnswerProvider';
import { CharacterProvider } from './components/characters/CharacterProvider';
import { QuestionProvider } from './components/questions/QuestionProvider';
import './index.css';
import { Simulacrum } from "./Simulacrum"

ReactDOM.render(
  <React.StrictMode>
    <CharacterProvider>
      <AnswerProvider>
        <QuestionProvider>
          <Simulacrum />
        </QuestionProvider>
      </AnswerProvider>
    </CharacterProvider>
  </React.StrictMode>,
  document.getElementById('root')
);