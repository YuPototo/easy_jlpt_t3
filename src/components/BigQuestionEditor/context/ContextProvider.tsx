/**
 * context + useReducer pattern:
 * https://beta.reactjs.org/learn/scaling-up-with-reducer-and-context#step-1-create-the-context
 */
import { createContext, useContext } from "react";
import { useImmerReducer } from "use-immer";
import type { BigQuestionType } from "../../../types/bigQuestion";
import { createBigQuestion } from "../intitialData";
import type { DispatchFunction } from "./reducer";
import { reducer } from "./reducer";

/* --- state --- */
export type EditorState = {
  data: BigQuestionType;
};

const state: EditorState = {
  data: createBigQuestion(),
};
/* --- context --- */
const BigQuestionEditorContext = createContext<EditorState>(state);
const EditorDispatchContext = createContext<DispatchFunction | null>(null);

export function ContextProvider({
  children,
  initialData,
}: {
  children: React.ReactNode;
  initialData?: BigQuestionType;
}) {
  const initialState = initialData ? { data: initialData } : state;
  const [data, dispatch] = useImmerReducer(reducer, initialState);

  return (
    <BigQuestionEditorContext.Provider value={data}>
      <EditorDispatchContext.Provider value={dispatch}>
        {children}
      </EditorDispatchContext.Provider>
    </BigQuestionEditorContext.Provider>
  );
}

export function useBigQuestionEditor() {
  return useContext(BigQuestionEditorContext);
}

export function useEditorDispatch() {
  const dispatch = useContext(EditorDispatchContext);
  if (!dispatch) {
    throw new Error("dispatch is undefined");
  }
  return dispatch;
}
