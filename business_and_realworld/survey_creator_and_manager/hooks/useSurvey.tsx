import { useCallback, useReducer } from "react";
import { v4 as uuid } from "uuid";
import { Survey, SurveyItem } from "../type/survey";
import { assertNever } from "../utils/asertNever";

type Action =
  | { type: "changeTitle"; title: string }
  | { type: "changeDescription"; description: string }
  | { type: "addSurveyItem" }
  | { type: "deleteSurveyItem"; id: string }
  | { type: "changeSurveyItem"; item: SurveyItem };

const reducer = (state: Survey, action: Action): Survey => {
  switch (action.type) {
    case "changeTitle": {
      return { ...state, title: action.title };
    }
    case "changeDescription": {
      return { ...state, description: action.description };
    }
    case "addSurveyItem": {
      return {
        ...state,
        items: [
          ...state.items,
          {
            // フロント側で仮のidをつける
            id: uuid(),
            type: "Radio",
            question: "",
            required: false,
            choices: ["選択肢1"],
          },
        ],
      };
    }
    case "deleteSurveyItem": {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.id),
      };
    }
    case "changeSurveyItem": {
      return {
        ...state,
        items: state.items.map((item) => {
          if (action.item.id !== item.id) {
            return item;
          }

          return action.item;
        }),
      };
    }
    default: {
      assertNever(action);
    }
  }
};

export const useSurvey = (initialSurvey: Survey) => {
  const [survey, dispatch] = useReducer(reducer, initialSurvey);

  const changeTitle = useCallback((title: string) => {
    dispatch({ type: "changeTitle", title });
  }, []);

  const changeDescription = useCallback((description: string) => {
    dispatch({ type: "changeDescription", description });
  }, []);

  const addItem = useCallback(() => {
    dispatch({ type: "addSurveyItem" });
  }, []);

  const changeItem = useCallback((newItem: SurveyItem) => {
    dispatch({ type: "changeSurveyItem", item: newItem });
  }, []);

  const deleteItem = useCallback((itemId: string) => {
    dispatch({ type: "deleteSurveyItem", id: itemId });
  }, []);

  return {
    survey,
    changeTitle,
    changeDescription,
    addItem,
    changeItem,
    deleteItem,
  };
};
