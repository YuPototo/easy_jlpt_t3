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
    }
  | {
      // 修改答案
      type: "answerChanged";
      payload: {
        smallQuestionIndex: number;
        optionIndex: number;
      };
    };

export type ActionType = BigQuestionActionType | SmallQuestionActionType;

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

export function answerChanged(payload: {
  smallQuestionIndex: number;
  optionIndex: number;
}): ActionType {
  return { type: "answerChanged", payload };
}
