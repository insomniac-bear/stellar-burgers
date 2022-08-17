import { FC } from "react";

interface IFeedCompletedCount {
  count: number;
  type: "onTotal" | "onToday";
}

const FeedCompletedCount: FC<IFeedCompletedCount> = ({ count, type }) => {
  const period = type === "onTotal" ? "все время" : "сегодня";
  return (
    <div className="pt-10">
      <p className="text text_type_main-default">Выполнено за {period}:</p>
      <p className="text text_type_digits-large">{count}</p>
    </div>
  );
};

export default FeedCompletedCount;
