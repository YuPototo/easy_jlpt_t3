import type { Dispatch } from "react";
// 必须从源文件引入 createRichText，否则单元测试会报错
import { createRichText } from "../../../lib/renderer/src/createRichText";
import type { EditorState } from "./EditorContext";

type ActionType =
  | { type: "bigQuestionBodyAdded" } // 增加大题题干
  | { type: "bigQuestionBodyRemoved" } // 移除大题题干
  | { type: "bigQuestionExplanationAdded" } // 增加大题解析
  | { type: "bigQuestionExplanationRemoved" } // 移除大题解析
  | { type: "bigQuestionBodyChanged"; payload: string } // 大题题干内容改变
  | { type: "bigQuestionExplanationChanged"; payload: string }; // 大题解析内容改变

export function reducer(state: EditorState, action: ActionType): EditorState {
  switch (action.type) {
    case "bigQuestionBodyAdded":
      console.log("action: bigQuestionBodyAdded");
      state.data.body = createRichText("");
      return state;
    case "bigQuestionBodyRemoved":
      console.log("action: bigQuestionBodyRemoved");
      state.data.body = undefined;
      return state;
    case "bigQuestionExplanationAdded":
      console.log("action: bigQuestionExplanationAdded");
      state.data.explanation = createRichText("");
      return state;
    case "bigQuestionExplanationRemoved":
      console.log("action: bigQuestionExplanationRemoved");
      state.data.explanation = undefined;
      return state;
    case "bigQuestionBodyChanged":
      console.log("action: bigQuestionBodyChanged");
      state.data.body = action.payload;
      return state;
    case "bigQuestionExplanationChanged":
      console.log("action: bigQuestionExplanationChanged");
      state.data.explanation = action.payload;
      return state;
    default:
      throw new Error("Unknown action type");
  }
}

export type DispatchFunction = Dispatch<ActionType>;

// action creators
export function bigQuestionBodyChanged(payload: string) {
  return { type: "bigQuestionBodyChanged", payload };
}
