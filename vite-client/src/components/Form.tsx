import { FormEventHandler, useRef } from "react";
import { trpc } from "../trpc";

export const Form = () => {
  const { invalidateQueries } = trpc.useContext();
  const mutation = trpc.useMutation(["add"], {
    onSuccess(input) {
      // "getList" を invalidate することで todo list の最新を読み込む
      invalidateQueries("getList");
      if (textRef.current) {
        textRef.current.value = "";
      }
    },
  });
  const textRef = useRef<HTMLInputElement>(null);
  const handleClick: FormEventHandler = (e) => {
    e.preventDefault();
    if (textRef.current?.value) {
      mutation.mutate({ text: textRef.current.value });
    }
  };

  return (
    <form>
      <input
        type="text"
        name="text"
        placeholder="thing you want to!"
        ref={textRef}
      />
      <button onClick={handleClick}>ADD</button>
    </form>
  );
};
