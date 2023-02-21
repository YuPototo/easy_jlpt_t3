import { describe, expect, it } from "vitest";
import { createRichText } from "@/lib/renderer/src/createRichText";
import { createBigQuestion } from "../initialData";
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
    const finalState = reducer(stateAfterAdd, {
      type: "bigQuestionBodyChanged",
      payload: "hello",
    });

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
    expect(() =>
      reducer(initalState, {
        type: "bigQuestionBodyChanged",
        payload: "hello",
      })
    ).toThrow("bigQuestionBody 不存在，只能修改已存在的 bigQuestionBody");
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
    const finalState = reducer(stateAfterAdd, {
      type: "bigQuestionExplanationChanged",
      payload: "hello",
    });
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
      reducer(initalState, {
        type: "bigQuestionExplanationChanged",
        payload: "hello",
      })
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
    expect(smallQuestion?.options).toHaveLength(4);

    const firstOption = smallQuestion?.options[0];

    // 下面这个 option 内容是预设的
    const firstOptionContent = createRichText("a");
    expect(firstOption).toMatch(firstOptionContent);

    // then we remove the option
    const finalState = reducer(initalState, {
      type: "optionRemoved",
      payload: {
        smallQuestionIndex: 0,
        optionIndex: 0,
      },
    });
    expect(finalState.data.smallQuestions[0]?.options).toHaveLength(3);
  });

  it("should not allow to remove when there is no options", () => {
    const initalState = {
      data: createBigQuestion(),
    };
    const smallQuestionIndex = 0;
    const smallQuestion = initalState.data.smallQuestions[smallQuestionIndex];
    expect(smallQuestion?.options).toHaveLength(4);

    const payload = {
      type: "optionRemoved",
      payload: {
        smallQuestionIndex: 0,
        optionIndex: 0,
      },
    } as const;

    // then we remove 4 options
    const state_1 = reducer(initalState, payload);
    const state_2 = reducer(state_1, payload);
    const state_3 = reducer(state_2, payload);
    const state_4 = reducer(state_3, payload);

    expect(state_4.data.smallQuestions[0]?.options).toHaveLength(0);

    // then we remove the option
    expect(() => reducer(state_4, payload)).toThrow("已经没有选项可以移除了");
  });

  it("should not allow to remove when the option index is out of range", () => {
    const initalState = {
      data: createBigQuestion(),
    };
    const smallQuestionIndex = 0;
    const smallQuestion = initalState.data.smallQuestions[smallQuestionIndex];
    expect(smallQuestion?.options).toHaveLength(4);

    const payload = {
      type: "optionRemoved",
      payload: {
        smallQuestionIndex: 0,
        optionIndex: 5,
      },
    } as const;

    // then we remove the option
    expect(() => reducer(initalState, payload)).toThrow(
      "选项 index 5 大于等于选项数量 4"
    );
  });
});
