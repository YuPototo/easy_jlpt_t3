import { createRichText } from "@/lib/renderer/createRichText";
import { describe, expect, it } from "vitest";
import { createBigQuestion } from "../initialData";
import {
  addSmallQuestionBody,
  changeBigQuestionBody,
  changeBigQuestionExplanation,
  changeSmallQuestionBody,
  removeOption,
  removeSmallQuestionBody,
} from "./actions";
import { reducer } from "./reducer";

describe("action: bigQuestionBodyAdded", () => {
  it("should add an empty big question body", () => {
    const initalState = {
      data: createBigQuestion(),
    };
    expect(initalState.data.body).toBeUndefined();
    const finalState = reducer(initalState, { type: "bigQuestionBodyAdded" });

    expect(finalState.data.body).toBeDefined();

    const newBigQuestion = createBigQuestion();
    const expectedState = {
      data: {
        body: createRichText(""),
        ...newBigQuestion,
      },
    };
    expect(finalState).toEqual(expectedState);
  });

  it("should not allow adding if body exits", () => {
    const initalState = {
      data: createBigQuestion(),
    };
    expect(initalState.data.body).toBeUndefined();

    const stateAfterAdd = reducer(initalState, {
      type: "bigQuestionBodyAdded",
    });

    expect(stateAfterAdd.data.body).toBeDefined();

    expect(() =>
      reducer(initalState, {
        type: "bigQuestionBodyAdded",
      })
    ).toThrow("bigQuestionBody 已存在，不允许再添加");
  });

  it("Add after remove", () => {
    // first we create a initial state
    const initalState = {
      data: createBigQuestion(),
    };
    expect(initalState.data.body).toBeUndefined();

    // then we add the big question body
    const stateAfterAdd = reducer(initalState, {
      type: "bigQuestionBodyAdded",
    });

    expect(stateAfterAdd.data.body).toBeDefined();

    // then we remove the big question body
    const stateAfterRemove = reducer(stateAfterAdd, {
      type: "bigQuestionBodyRemoved",
    });

    expect(stateAfterRemove.data.body).toBeUndefined();

    // then we add again
    const finalState = reducer(stateAfterAdd, {
      type: "bigQuestionBodyAdded",
    });

    expect(finalState.data.body).toBeDefined();
  });
});

describe("action: bigQuestionBodyRemoved", () => {
  it("should remove the big question body", () => {
    // first we create a initial state
    const initalState = {
      data: createBigQuestion(),
    };
    expect(initalState.data.body).toBeUndefined();

    // then we add the big question body
    const stateAfterAdd = reducer(initalState, {
      type: "bigQuestionBodyAdded",
    });

    expect(stateAfterAdd.data.body).toBeDefined();

    // then we remove the big question body
    const finalState = reducer(stateAfterAdd, {
      type: "bigQuestionBodyRemoved",
    });

    expect(finalState.data.body).toBeUndefined();
  });

  it("should throw error if big question body not exits", () => {
    // first we create a initial state
    const initalState = {
      data: createBigQuestion(),
    };
    expect(initalState.data.body).toBeUndefined();

    expect(() =>
      reducer(initalState, {
        type: "bigQuestionBodyRemoved",
      })
    ).toThrow("bigQuestionBody 不存在，只能删除已存在的 bigQuestionBody");
  });
});

describe("action: bigQuestionBodyChanged", () => {
  it("should change the big question body", () => {
    // first we create a initial state
    const initalState = {
      data: createBigQuestion(),
    };
    expect(initalState.data.body).toBeUndefined();

    // then we add the big question body
    const stateAfterAdd = reducer(initalState, {
      type: "bigQuestionBodyAdded",
    });

    expect(stateAfterAdd.data.body).toBeDefined();

    // then we change the big question body
    const finalState = reducer(stateAfterAdd, changeBigQuestionBody("hello"));

    expect(finalState.data.body).toBeDefined();
    expect(finalState.data.body).toEqual("hello");
  });

  it("should not allow to change a not existing big question body", () => {
    // first we create a initial state
    const initalState = {
      data: createBigQuestion(),
    };
    expect(initalState.data.body).toBeUndefined();

    // then we change the big question body
    expect(() => reducer(initalState, changeBigQuestionBody("hello"))).toThrow(
      "bigQuestionBody 不存在，只能修改已存在的 bigQuestionBody"
    );
  });
});

describe("action: bigQuestionExplanationAdded", () => {
  // first we create a initial state
  it("should add an empty big question explanation", () => {
    const initalState = {
      data: createBigQuestion(),
    };
    expect(initalState.data.explanation).toBeUndefined();

    // then we add the big question explanation
    const finalState = reducer(initalState, {
      type: "bigQuestionExplanationAdded",
    });
    expect(finalState.data.explanation).toBeDefined();
  });
});

describe("action: bigQuestionExplanationRemoved", () => {
  it("should remove the big question explanation", () => {
    // first we create a initial state
    const initalState = {
      data: createBigQuestion(),
    };
    expect(initalState.data.explanation).toBeUndefined();

    // then we add the big question explanation
    const stateAfterAdd = reducer(initalState, {
      type: "bigQuestionExplanationAdded",
    });
    expect(stateAfterAdd.data.explanation).toBeDefined();

    // then we remove the big question explanation
    const finalState = reducer(stateAfterAdd, {
      type: "bigQuestionExplanationRemoved",
    });
    expect(finalState.data.explanation).toBeUndefined();
  });
});

describe("action: bigQuestionExplanationChanged", () => {
  it("should change the big question explanation", () => {
    // first we create a initial state
    const initalState = {
      data: createBigQuestion(),
    };
    expect(initalState.data.explanation).toBeUndefined();

    // then we add the big question explanation
    const stateAfterAdd = reducer(initalState, {
      type: "bigQuestionExplanationAdded",
    });
    expect(stateAfterAdd.data.explanation).toBeDefined();

    // then we change the big question explanation
    const finalState = reducer(
      stateAfterAdd,
      changeBigQuestionExplanation("hello")
    );
    expect(finalState.data.explanation).toBeDefined();
    expect(finalState.data.explanation).toEqual("hello");
  });

  it("should not allow to change a not existing big question explanation", () => {
    // first we create a initial state
    const initalState = {
      data: createBigQuestion(),
    };
    expect(initalState.data.explanation).toBeUndefined();

    // then we change the big question explanation
    expect(() =>
      reducer(initalState, changeBigQuestionExplanation("hello"))
    ).toThrow(
      "bigQuestionExplanation 不存在，只能修改已存在的 bigQuestionExplanation"
    );
  });
});

describe("optionRemoved", () => {
  it("should remove the option", () => {
    // first we create a initial state
    const initalState = {
      data: createBigQuestion(),
    };
    const smallQuestionIndex = 0;
    const smallQuestion = initalState.data.smallQuestions[smallQuestionIndex];
    expect(smallQuestion?.options).toHaveLength(3);

    const firstOption = smallQuestion?.options[0];

    // 下面这个 option 内容是预设的
    const firstOptionContent = createRichText("a");
    expect(firstOption?.content).toMatch(firstOptionContent);

    const finalState = reducer(
      initalState,
      removeOption({
        smallQuestionIndex: 0,
        optionIndex: 0,
      })
    );

    expect(finalState.data.smallQuestions[0]?.options).toHaveLength(2);
  });

  it("should not allow to remove when there is no options", () => {
    const initalState = {
      data: createBigQuestion(),
    };
    const smallQuestionIndex = 0;
    const smallQuestion = initalState.data.smallQuestions[smallQuestionIndex];
    expect(smallQuestion?.options).toHaveLength(3);

    const payload = removeOption({
      smallQuestionIndex: 0,
      optionIndex: 0,
    });

    // then we remove 4 options
    const state_1 = reducer(initalState, payload);
    const state_2 = reducer(state_1, payload);
    const state_3 = reducer(state_2, payload);

    expect(state_3.data.smallQuestions[0]?.options).toHaveLength(0);

    // then we remove the option
    expect(() => reducer(state_3, payload)).toThrow("已经没有选项可以移除了");
  });

  it("should not allow to remove when the option index is out of range", () => {
    const initalState = {
      data: createBigQuestion(),
    };
    const smallQuestionIndex = 0;
    const smallQuestion = initalState.data.smallQuestions[smallQuestionIndex];
    expect(smallQuestion?.options).toHaveLength(3);

    const payload = removeOption({
      smallQuestionIndex: 0,
      optionIndex: 4,
    });

    // then we remove the option
    expect(() => reducer(initalState, payload)).toThrow(
      "选项 index 4 大于等于选项数量 3"
    );
  });
});

describe("smallQuestionBodyAdded", () => {
  it("should add an empty small question body", () => {
    // first we create a initial state
    const initalState = {
      data: createBigQuestion(),
    };
    const smallQuestion = initalState.data.smallQuestions[0];
    expect(smallQuestion).toBeDefined();
    expect(smallQuestion?.body).toBeDefined();

    // then we remove the small question body
    const stateAfterRemove = reducer(initalState, removeSmallQuestionBody(0));
    expect(stateAfterRemove.data.smallQuestions[0]?.body).toBeUndefined();

    // then we add the small question body
    const finalState = reducer(stateAfterRemove, addSmallQuestionBody(0));
    expect(finalState.data.smallQuestions[0]?.body).toBeDefined();
  });

  it("should throw error when body is already exist", () => {
    // first we create a initial state
    const initalState = {
      data: createBigQuestion(),
    };
    const smallQuestion = initalState.data.smallQuestions[0];
    expect(smallQuestion).toBeDefined();
    expect(smallQuestion?.body).toBeDefined();

    expect(() => reducer(initalState, addSmallQuestionBody(0))).toThrow(
      "smallQuestionBody 已存在，不允许再添加"
    );
  });
});

describe("smallQuestionBodyRemoved", () => {
  it("should remove the small question body", () => {
    // first we create a initial state
    const initalState = {
      data: createBigQuestion(),
    };
    const smallQuestion = initalState.data.smallQuestions[0];
    expect(smallQuestion).toBeDefined();
    expect(smallQuestion?.body).toBeDefined();

    // then we remove the small question body
    const finalState = reducer(initalState, removeSmallQuestionBody(0));
    expect(finalState.data.smallQuestions[0]?.body).toBeUndefined();
  });

  it("should not allow to remove when the small question body is not exist", () => {
    // first we create a initial state
    const initalState = {
      data: createBigQuestion(),
    };
    const smallQuestion = initalState.data.smallQuestions[0];
    expect(smallQuestion).toBeDefined();
    expect(smallQuestion?.body).toBeDefined();

    // then we remove
    const stateAfterRemove = reducer(initalState, removeSmallQuestionBody(0));
    expect(stateAfterRemove.data.smallQuestions[0]?.body).toBeUndefined();

    expect(() => reducer(stateAfterRemove, removeSmallQuestionBody(0))).toThrow(
      "smallQuestionBody 不存在，只能删除已存在的 smallQuestionBody"
    );
  });
});

describe("smallQuestionBodyChanged", () => {
  it("should change small question body", () => {
    // first we create a initial state
    const initalState = {
      data: createBigQuestion(),
    };
    const smallQuestion = initalState.data.smallQuestions[0];
    expect(smallQuestion).toBeDefined();
    expect(smallQuestion?.body).toBeDefined();

    // then we change it
    const finalState = reducer(
      initalState,
      changeSmallQuestionBody({
        smallQuestionIndex: 0,
        content: "hello",
      })
    );

    expect(finalState.data.smallQuestions[0]?.body).toBeDefined();
    expect(finalState.data.smallQuestions[0]?.body).toEqual("hello");
  });
});
