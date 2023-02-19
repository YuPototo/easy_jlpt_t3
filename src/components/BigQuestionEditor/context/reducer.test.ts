import { describe, expect, it } from "vitest";
import { createRichText } from "../../../lib/renderer/src/createRichText";
import { createBigQuestion } from "../intitialData";
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
