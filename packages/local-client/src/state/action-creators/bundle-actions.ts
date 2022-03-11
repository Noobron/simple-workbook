import { Dispatch } from "react";
import bundle from "../../bundler";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Block } from "../block";
import { RootState } from "../reducers";

export const createBundle = (
  id: string,
  code: string,
  jsInputRef: React.RefObject<HTMLInputElement>,
  formRef: React.RefObject<HTMLFormElement>,
  bindTo?: string
) => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    // don't dispatch any action(s) if any of the ref object(s) are not loaded yet
    if (!jsInputRef.current || !formRef.current) {
      return;
    }

    if (bindTo) {
      const codeSegments: string[] = [];
      let stream = "";
      const blocks: { [id: string]: Block } = getState().blocks.data;

      // collect all the binded segments while maintaining the sequence
      while (bindTo) {
        const block: Block = blocks[bindTo];

        if (block) {
          codeSegments.unshift(block.content.javascript);
        }

        bindTo = block ? block.bindTo : undefined;
      }

      codeSegments.forEach((content) => {
        stream += content + "\n";
      });

      code = stream + code;
    }

    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        id: id,
      },
    });

    // identify any error(s) during bundle process
    try {
      const bundleResult = await bundle(code);

      // set the bundle result as contents for the hidden text area
      jsInputRef.current.value = JSON.stringify(
        bundleResult.outputFiles[0].text
      ).replace(/<\/script>/, '</scr"+"ipt>');
    } catch (error) {
      // let the iframe handle the error
      jsInputRef.current.value = JSON.stringify(code);
    }

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        id,
      },
    });

    formRef.current.submit();

    // set the contents of the hidden js input element as empty after form submission
    jsInputRef.current.value = "";
  };
};
