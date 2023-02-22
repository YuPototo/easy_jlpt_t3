import type { Dispatch } from "react";
// 必须从源文件引入 createRichText，否则单元测试会报错
import { createRichText } from "@/lib/renderer/createRichText";
import { createSmallQuestion } from "../initialData";
import type { ActionType } from "./actions";
import type { EditorState } from "./ContextProvider";

export function reducer(state: EditorState, action: ActionType): EditorState {
  switch (action.type) {
    // 添加大题题干
    case "bigQuestionBodyAdded":
      console.log("action: bigQuestionBodyAdded");
      if (state.data.body) {
        throw new Error("bigQuestionBody 已存在，不允许再添加");
      }
      state.data.body = createRichText("");
      return state;

    // 移除大题题干
    case "bigQuestionBodyRemoved":
      console.log("action: bigQuestionBodyRemoved");
      if (!state.data.body) {
        throw new Error(
          "bigQuestionBody 不存在，只能删除已存在的 bigQuestionBody"
        );
      }
      state.data.body = undefined;
      return state;

    // 添加大题题干
    case "bigQuestionExplanationAdded":
      console.log("action: bigQuestionExplanationAdded");
      state.data.explanation = createRichText("");
      return state;

    // 移除大题解析
    case "bigQuestionExplanationRemoved":
      console.log("action: bigQuestionExplanationRemoved");
      state.data.explanation = undefined;
      return state;

    // 修改大题题干
    case "bigQuestionBodyChanged":
      console.log("action: bigQuestionBodyChanged");
      if (!state.data.body) {
        throw new Error(
          "bigQuestionBody 不存在，只能修改已存在的 bigQuestionBody"
        );
      }
      state.data.body = action.payload;
      return state;

    // 修改大题解析
    case "bigQuestionExplanationChanged":
      console.log("action: bigQuestionExplanationChanged");
      if (!state.data.explanation) {
        throw new Error(
          "bigQuestionExplanation 不存在，只能修改已存在的 bigQuestionExplanation"
        );
      }
      state.data.explanation = action.payload;
      return state;

    // 添加小题题干
    case "smallQuestionBodyAdded": {
      console.log("action: smallQuestionBodyAdded");
      const smallQuestionIndex = action.payload;
      const smallQuestion = state.data.smallQuestions[smallQuestionIndex];
      if (!smallQuestion) {
        throw new Error("Invalid smallQuestionIndex");
      }
      if (smallQuestion.body) {
        throw new Error("smallQuestionBody 已存在，不允许再添加");
      }
      smallQuestion.body = createRichText("");
      return state;
    }

    // 移除小题题干
    case "smallQuestionBodyRemoved": {
      console.log("action: smallQuestionBodyRemoved");
      const smallQuestionIndex = action.payload;
      const smallQuestion = state.data.smallQuestions[smallQuestionIndex];
      if (!smallQuestion) {
        throw new Error("Invalid smallQuestionIndex");
      }

      if (!smallQuestion.body) {
        throw new Error(
          "smallQuestionBody 不存在，只能删除已存在的 smallQuestionBody"
        );
      }
      smallQuestion.body = undefined;

      return state;
    }

    // todo: add test case
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

    // todo: add test case
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

    // todo: add test case
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

    // todo: add test case
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

    // todo: add test case
    case "smallQuestionAdded": {
      console.log("action: smallQuestionAdded");
      const newSmallQuestion = createSmallQuestion();
      state.data.smallQuestions.push(newSmallQuestion);
      return state;
    }

    // todo: add test case
    case "smallQuestionRemoved": {
      console.log("action: smallQuestionRemoved");
      const smallQuestionIndex = action.payload;
      state.data.smallQuestions.splice(smallQuestionIndex, 1);
      return state;
    }

    // todo: add test case
    case "optionRemoved": {
      console.log("action: optionRemoved");
      const { smallQuestionIndex, optionIndex } = action.payload;
      const smallQuestion = state.data.smallQuestions[smallQuestionIndex];
      if (!smallQuestion) {
        throw new Error("Invalid smallQuestionIndex");
      }
      if (smallQuestion.options.length === 0) {
        throw new Error("已经没有选项可以移除了");
      }
      const optionsNumber = smallQuestion.options.length;
      if (optionIndex >= optionsNumber) {
        throw new Error(
          `选项 index ${optionIndex} 大于等于选项数量 ${optionsNumber}`
        );
      }
      smallQuestion.options.splice(optionIndex, 1);
      return state;
    }

    // todo: add test case
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

    // todo: add test case
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
