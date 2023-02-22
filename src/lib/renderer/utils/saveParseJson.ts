export default function saveParseJson(
  data: string
): SuccessResult | ErrorResult {
  try {
    const parsed = JSON.parse(data) as unknown;
    return { success: true, data: parsed };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error };
    }
    return {
      success: false,
      error: new Error("Parse 富文本为 JSON 时出现未知错误"),
    };
  }
}

type SuccessResult = {
  success: true;
  data: unknown;
};

type ErrorResult = {
  success: false;
  error: Error;
};
