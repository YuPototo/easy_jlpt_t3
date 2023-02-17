import type { Dispatch } from "react";
// 必须从源文件引入 createRichText，否则单元测试会报错
import { createRichText } from "../../../lib/renderer/src/createRichText";
import { createSmallQuestion } from "../intitialData";
import type { EditorState } from "./EditorContext";

type BigQuestionActionType =
  | { type: "bigQuestionBodyAdded" } // 增加大题题干
  | { type: "bigQuestionBodyRemoved" } // 移除大题题干
  | { type: "bigQuestionExplanationAdded" } // 增加大题解析
  | { type: "bigQuestionExplanationRemoved" } // 移除大题解析
  | { type: "bigQuestionBodyChanged"; payload: string } // 大题题干内容改变
  | { type: "bigQuestionExplanationChanged"; payload: string }; // 大题解析内容改变

type SmallQuestionActionType =
  | {
      // 增加小题题干
      type: "smallQuestionBodyAdded";
      payload: number;
    }
  | {
      // 移除小题题干
      type: "smallQuestionBodyRemoved";
      payload: number;
    }
  | {
      // 小题题干内容改变
      type: "smallQuestionBodyChanged";
      payload: {
        smallQuestionIndex: number;
        content: string;
      };
    }
  | {
      // 移除小题解析
      type: "smallQuestionExplanationRemoved";
      payload: number;
    }
  | {
      // 增加小题解析
      type: "smallQuestionExplanationAdded";
      payload: number;
    }
  | {
      // 小题解析内容改变
      type: "smallQuestionExplanationChanged";
      payload: {
        smallQuestionIndex: number;
        content: string;
      };
    }
  | {
      // 新增小题
      type: "smallQuestionAdded";
    }
  | {
      // 移除小题
      type: "smallQuestionRemoved";
      payload: number;
    }
  | {
      // 移除选项
      type: "optionRemoved";
      payload: {
        smallQuestionIndex: number;
        optionIndex: number;
      };
    }
  | {
      // 新增选项
      type: "optionAdded";
      payload: number;
    }
  | {
      // 选项内容改变
      type: "optionChanged";
      payload: {
        smallQuestionIndex: number;
        optionIndex: number;
        content: string;
      };
    };

type ActionType = BigQuestionActionType | SmallQuestionActionType;

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

    case "smallQuestionBodyAdded": {
      console.log("action: smallQuestionBodyAdded");
      const smallQuestionIndex = action.payload;
      const smallQuestion = state.data.smallQuestions[smallQuestionIndex];
      if (!smallQuestion) {
        throw new Error("Invalid smallQuestionIndex");
      }
      smallQuestion.body = createRichText("");
      return state;
    }

    case "smallQuestionBodyRemoved": {
      console.log("action: smallQuestionBodyRemoved");
      const smallQuestionIndex = action.payload;
      const smallQuestion = state.data.smallQuestions[smallQuestionIndex];
      if (!smallQuestion) {
        throw new Error("Invalid smallQuestionIndex");
      }
      smallQuestion.body = undefined;
      return state;
    }

    case "smallQuestionBodyChanged": {
      console.log("action: smallQuestionBodyChanged");
      const { smallQuestionIndex, content } = action.payload;
      const smallQuestion = state.data.smallQuestions[smallQuestionIndex];
      if (!smallQuestion) {
        throw new Error("Invalid smallQuestionIndex");
      }
      smallQuestion.body = content;
      return state;
    }

    case "smallQuestionExplanationAdded": {
      console.log("action: smallQuestionExplanationAdded");
      const smallQuestionIndex = action.payload;
      const smallQuestion = state.data.smallQuestions[smallQuestionIndex];
      if (!smallQuestion) {
        throw new Error("Invalid smallQuestionIndex");
      }
      smallQuestion.explanation = createRichText("");
      return state;
    }

    case "smallQuestionExplanationRemoved": {
      console.log("action: smallQuestionExplanationRemoved");
      const smallQuestionIndex = action.payload;
      const smallQuestion = state.data.smallQuestions[smallQuestionIndex];
      if (!smallQuestion) {
        throw new Error("Invalid smallQuestionIndex");
      }
      smallQuestion.explanation = undefined;
      return state;
    }

    case "smallQuestionExplanationChanged": {
      console.log("action: smallQuestionExplanationChanged");
      const { smallQuestionIndex, content } = action.payload;
      const smallQuestion = state.data.smallQuestions[smallQuestionIndex];
      if (!smallQuestion) {
        throw new Error("Invalid smallQuestionIndex");
      }
      smallQuestion.explanation = content;
      return state;
    }

    case "smallQuestionAdded": {
      console.log("action: smallQuestionAdded");
      const newSmallQuestion = createSmallQuestion();
      state.data.smallQuestions.push(newSmallQuestion);
      return state;
    }

    case "smallQuestionRemoved": {
      console.log("action: smallQuestionRemoved");
      const smallQuestionIndex = action.payload;
      state.data.smallQuestions.splice(smallQuestionIndex, 1);
      return state;
    }

    case "optionRemoved": {
      console.log("action: optionRemoved");
      const { smallQuestionIndex, optionIndex } = action.payload;
      const smallQuestion = state.data.smallQuestions[smallQuestionIndex];
      if (!smallQuestion) {
        throw new Error("Invalid smallQuestionIndex");
      }
      smallQuestion.options.splice(optionIndex, 1);
      return state;
    }

    case "optionAdded": {
      console.log("action: optionAdded");
      const smallQuestionIndex = action.payload;
      const smallQuestion = state.data.smallQuestions[smallQuestionIndex];
      if (!smallQuestion) {
        throw new Error("Invalid smallQuestionIndex");
      }
      smallQuestion.options.push(createRichText(""));
      return state;
    }

    case "optionChanged": {
      console.log("action: optionChanged");
      const { smallQuestionIndex, optionIndex, content } = action.payload;
      const smallQuestion = state.data.smallQuestions[smallQuestionIndex];
      if (!smallQuestion) {
        throw new Error("Invalid smallQuestionIndex");
      }
      smallQuestion.options[optionIndex] = content;
      return state;
    }

    default:
      throw new Error("Unknown action type");
  }
}

export type DispatchFunction = Dispatch<ActionType>;

// action creators
export function changeBigQuestionBody(payload: string): ActionType {
  return { type: "bigQuestionBodyChanged", payload };
}

export function changeBigQuestionExplanation(payload: string): ActionType {
  return { type: "bigQuestionExplanationChanged", payload };
}

export function addSmallQuestionBody(payload: number): ActionType {
  return { type: "smallQuestionBodyAdded", payload };
}

export function removeSmallQuestionBody(payload: number): ActionType {
  return { type: "smallQuestionBodyRemoved", payload };
}

export function changeSmallQuestionBody(payload: {
  smallQuestionIndex: number;
  content: string;
}): ActionType {
  return { type: "smallQuestionBodyChanged", payload };
}

export function addSmallQuestionExplanation(payload: number): ActionType {
  return { type: "smallQuestionExplanationAdded", payload };
}

export function removeSmallQuestionExplanation(payload: number): ActionType {
  {
    return { type: "smallQuestionExplanationRemoved", payload };
  }
}

export function changeSmallQuestionExplanation(payload: {
  smallQuestionIndex: number;
  content: string;
}): ActionType {
  return { type: "smallQuestionExplanationChanged", payload };
}

export function removeSmallQuestion(payload: number): ActionType {
  return { type: "smallQuestionRemoved", payload };
}

export function removeOption(payload: {
  smallQuestionIndex: number;
  optionIndex: number;
}): ActionType {
  return { type: "optionRemoved", payload };
}

export function addOption(payload: number): ActionType {
  return { type: "optionAdded", payload };
}

export function changeOption(payload: {
  smallQuestionIndex: number;
  optionIndex: number;
  content: string;
}): ActionType {
  return { type: "optionChanged", payload };
}
