import type { NextPage } from "next";
import RichText from "@/lib/renderer/RichText";

const testDataOne = [
  {
    type: "paragraph",
    children: [{ text: "This is a paragraph" }],
  },
];

const testDataTwo = [
  {
    type: "paragraph",
    children: [
      {
        text: "this is bold",
        bold: true,
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "this is underline",
        underline: true,
      },
    ],
  },
];

const testDataThree = [
  {
    type: "paragraph",
    children: [
      {
        text: "images",
      },
    ],
  },
  {
    type: "image",
    src: "https://www.shutterstock.com/image-illustration/illustration-international-passengers-infrared-thermal-600w-1640970700.jpg",
    alt: "image",
    children: [{ text: "" }],
  },
];

const RendererPage: NextPage = () => {
  return (
    <>
      <main className="m-5">
        <h1>This is the renderer page</h1>

        <div className="my-10">
          <RichText data={JSON.stringify(testDataOne)} />
        </div>

        <div className="my-10">
          <RichText data={JSON.stringify(testDataTwo)} />
        </div>

        <div>
          <RichText data={JSON.stringify(testDataThree)} />
        </div>
      </main>
    </>
  );
};

export default RendererPage;
