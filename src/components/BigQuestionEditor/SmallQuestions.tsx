import { PartEditor } from "./PartEditor";
import {
  useBigQuestionEditor,
  useEditorDispatch,
} from "./context/ContextProvider";
import {
  addSmallQuestionBody,
  changeSmallQuestionBody,
  removeSmallQuestionBody,
  addSmallQuestionExplanation,
  removeSmallQuestionExplanation,
  changeSmallQuestionExplanation,
  removeSmallQuestion,
} from "./context";
import Options from "./Options";
import { Divider } from "../ui/Divider";
import { Button } from "../ui/Button";
import { SectionLayout } from "./components/SectionLayout";
import { PartLayout } from "./components/PartLayout";

export const SmallQuestions: React.FC = () => {
  const editor = useBigQuestionEditor();
  const dispatch = useEditorDispatch();
  const data = editor.data;
  const smallQuestions = data?.smallQuestions || [];

  return (
    <>
      {smallQuestions.map((smallQuestion, questionIndex) => (
        <SectionLayout
          title={`第 ${questionIndex + 1} 小题`}
          key={smallQuestion.uuid}
        >
          <Button
            intent="secondary"
            outline
            onClick={() => dispatch(removeSmallQuestion(questionIndex))}
          >
            移除小题
          </Button>

          <PartLayout title="题干">
            <PartEditor
              initialValue={smallQuestion.body}
              onAdd={() => dispatch(addSmallQuestionBody(questionIndex))}
              onRemove={() => dispatch(removeSmallQuestionBody(questionIndex))}
              onChange={(content) =>
                dispatch(
                  changeSmallQuestionBody({
                    smallQuestionIndex: questionIndex,
                    content,
                  })
                )
              }
            />
          </PartLayout>

          <Divider />

          <Options smallQuestionIndex={questionIndex} />

          <Divider />

          <PartLayout title="解析">
            <PartEditor
              initialValue={smallQuestion.explanation}
              onAdd={() => dispatch(addSmallQuestionExplanation(questionIndex))}
              onRemove={() =>
                dispatch(removeSmallQuestionExplanation(questionIndex))
              }
              onChange={(content) =>
                dispatch(
                  changeSmallQuestionExplanation({
                    smallQuestionIndex: questionIndex,
                    content,
                  })
                )
              }
              allowFiller={false}
            />
          </PartLayout>
        </SectionLayout>
      ))}

      <Button outline onClick={() => dispatch({ type: "smallQuestionAdded" })}>
        新增小题
      </Button>
    </>
  );
};
