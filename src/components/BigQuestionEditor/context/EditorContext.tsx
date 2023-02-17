/**
 * context + useReducer pattern:
 * https://beta.reactjs.org/learn/scaling-up-with-reducer-and-context#step-1-create-the-context
 */
import { createContext, useContext, useReducer } from "react";
import type { BigQuestionType } from "../../../types/bigQuestion";
import { createBigQuestion } from "../intitialData";
import type { DispatchFunction } from "./reducer";
import { reducer } from "./reducer";

/* --- state --- */
export type EditorState = {
  data: BigQuestionType;
};

const initialState: EditorState = {
  data: createBigQuestion(),
};
/* --- context --- */
const EditorContext = createContext<EditorState | null>(null);
const EditorDispatchContext = createContext<DispatchFunction | null>(null);

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [data, dispatch] = useReducer(reducer, initialState);

  return (
    <EditorContext.Provider value={data}>
      <EditorDispatchContext.Provider value={dispatch}>
        {children}
      </EditorDispatchContext.Provider>
    </EditorContext.Provider>
  );
}

export function useEditor() {
  return useContext(EditorContext);
}

export function useEditorDispatch() {
  return useContext(EditorDispatchContext);
}
