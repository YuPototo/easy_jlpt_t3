import { Button } from "@/components/ui/Button";
import type { NextPage } from "next";

const ButtonPage: NextPage = () => {
  return (
    <>
      <main className="m-5">
        <h1>Button</h1>

        <div className="my-10">
          <div>default</div>
          <div>
            <div>
              intent: <code>primary</code>
            </div>
            <div>
              size: <code>medium</code>
            </div>
            <div>
              outline: <code>false</code>
            </div>
          </div>
          <Button>按钮</Button>
        </div>

        <div className="my-10">
          <div>
            size: <code>small</code>
          </div>

          <Button size="small">按钮</Button>
        </div>

        <div className="my-10">
          <div>
            outline: <code>true</code>
          </div>

          <Button outline>按钮</Button>
        </div>

        <div className="my-10">
          <div>
            intent: <code>secondary</code>
          </div>

          <Button intent="secondary">按钮</Button>
        </div>

        <div className="my-10">
          <div>
            intent: <code>secondary</code>
          </div>
          <div>
            outline: <code>true</code>
          </div>

          <Button intent="secondary" outline>
            按钮
          </Button>
        </div>

        <div className="my-10">
          <div>
            intent: <code>danger</code>
          </div>

          <Button intent="danger">按钮</Button>
        </div>

        <div className="my-10">
          <div>
            intent: <code>danger</code>
          </div>
          <div>
            outline: <code>true</code>
          </div>

          <Button intent="danger" outline>
            按钮
          </Button>
        </div>
      </main>
    </>
  );
};

export default ButtonPage;
