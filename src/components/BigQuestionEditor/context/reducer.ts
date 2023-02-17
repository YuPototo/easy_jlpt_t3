import type { Dispatch } from "react";
// 必须从源文件引入 createRichText，否则单元测试会报错
import { createRichText } from "../../../lib/renderer/src/createRichText";
import type { EditorState } from "./EditorContext";

type ActionType =
  | { type: "bigQuestionBodyAdded" } // 增加大题题干
  | { type: "bigQuestionBodyRemoved" } // 移除大题题干
  | { type: "bigQuestionExplanationAdded" } // 增加大题解析
  | { type: "bigQuestionExplanationRemoved" }; // 移除大题解析

export function reducer(state: EditorState, action: ActionType): EditorState {
  const stateCopy = deepCopyState(state);
  switch (action.type) {
    case "bigQuestionBodyAdded":
      console.log("action: bigQuestionBodyAdded");
      // todo: find a better way to deep copy and get typescript help
      return {
        data: {
          ...stateCopy.data,
          body: createRichText(""),
        },
      };
    case "bigQuestionBodyRemoved":
      console.log("action: bigQuestionBodyRemoved");
      return {
        data: {
          ...stateCopy.data,
          body: undefined,
        },
      };
    case "bigQuestionExplanationAdded":
      console.log("action: bigQuestionExplanationAdded");
      return {
        data: {
          ...stateCopy.data,
          explanation: createRichText(""),
        },
      };
    case "bigQuestionExplanationRemoved":
      console.log("action: bigQuestionExplanationRemoved");
      return {
        data: {
          ...stateCopy.data,
          explanation: undefined,
        },
      };

    default:
      throw new Error("Unknown action type");
  }
}

export type DispatchFunction = Dispatch<ActionType>;

// todo: find better way to deep copy without using as
function deepCopyState<T>(state: T): T {
  return JSON.parse(JSON.stringify(state)) as T;
}
