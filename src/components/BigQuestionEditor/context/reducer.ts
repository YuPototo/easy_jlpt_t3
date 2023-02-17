import type { Dispatch } from "react";
// 必须从源文件引入 createRichText，否则单元测试会报错
import { createRichText } from "../../../lib/renderer/src/createRichText";
import type { EditorState } from "./EditorContext";

type ActionType =
  | { type: "bigQuestionBodyAdded" } // 增加大题题干
  | { type: "bigQuestionBodyRemoved" } // 移除大题题干
  | { type: "bigQuestionExplanationAdded" } // 增加大题解析
  | { type: "bigQuestionExplanationRemoved" }; // 移除大题解析

// ! 我觉得 reducer 里的 state 并不是 immutable 的，我没有处理 deeply nested object 的 mutation 问题，这个明天再处理。我应该考虑用 immer

export function reducer(state: EditorState, action: ActionType): EditorState {
  switch (action.type) {
    case "bigQuestionBodyAdded":
      console.log("action: bigQuestionBodyAdded");
      return {
        data: {
          ...state.data,
          body: createRichText(""),
        },
      };
    case "bigQuestionBodyRemoved":
      console.log("action: bigQuestionBodyRemoved");

      return {
        data: {
          ...state.data,
          body: undefined,
        },
      };
    case "bigQuestionExplanationAdded":
      console.log("action: bigQuestionExplanationAdded");
      return {
        data: {
          ...state.data,
          explanation: createRichText(""),
        },
      };
    case "bigQuestionExplanationRemoved":
      console.log("action: bigQuestionExplanationRemoved");
      return {
        data: {
          ...state.data,
          explanation: undefined,
        },
      };

    default:
      throw new Error("Unknown action type");
  }
}

export type DispatchFunction = Dispatch<ActionType>;
