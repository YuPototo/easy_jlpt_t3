import { Form, Formik } from "formik";
import toast from "react-hot-toast";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { api } from "../utils/api";
import { Button } from "./ui/Button";

const SectionSchema = z.object({
  title: z.string().min(1).max(30),
});

export const AddSectionForm: React.FC<{
  bookId: string;
  onSuccess: () => void;
}> = ({ bookId, onSuccess }) => {
  const addSection = api.section.add.useMutation({
    onSuccess,
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <Formik
      initialValues={{ title: "" }}
      validationSchema={toFormikValidationSchema(SectionSchema)}
      onSubmit={(values, actions) => {
        addSection.mutate(
          {
            bookId,
            title: values.title,
          },
          {
            onError: () => {
              // Maybe there is a better way to set isSubmitting to false when error is returned
              actions.setSubmitting(false);
            },
          }
        );
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-50"
            >
              Title 标题
            </label>
            <div className="my-1">
              <input
                className="block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 "
                type="title"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
            </div>

            <div className="text-sm text-red-500">
              {errors.title && touched.title && errors.title}
            </div>
          </div>

          <div className="mx-auto">
            <Button type="submit" disabled={isSubmitting}>
              提交
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
