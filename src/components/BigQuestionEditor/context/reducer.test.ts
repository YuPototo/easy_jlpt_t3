import { describe, expect, it } from "vitest";
import { createRichText } from "../../../lib/renderer/src/createRichText";
import { createBigQuestion } from "../intitialData";
import { reducer } from "./reducer";

describe("bigQuestionBodyAdded action", () => {
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
});

describe("bigQuestionBodyRemoved action", () => {
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

  it("移除之后再次添加", () => {
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
