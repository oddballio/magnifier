import React from "react";
import { Query } from "react-apollo";
import Statistic from "./Statistic";

const StatisticsGroup = ({
  statistics,
  showHeader = true,
  title,
  showRemove = false,
  weekInReviewId
}) => {
  return (
    <div className="flex flex-wrap flex-col">
      {showHeader ? (
        <h3 className="py-8 px-0">{`${title} (${statistics.length})`}</h3>
      ) : (
        ""
      )}
      <div>
        {statistics
          ? statistics.map(statistic => (
              <Statistic
                {...statistic}
                key={statistic.sourceCreatedAt}
                showRemove={showRemove}
                weekInReviewId={weekInReviewId}
              />
            ))
          : ""}
      </div>
    </div>
  );
};

const StatisticsCollection = ({ customQuery, githubUserId, date, title }) => (
  <Query
    query={customQuery}
    skip={!githubUserId}
    variables={{ githubUserId: parseInt(githubUserId), date: date }}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error!</p>;
      if (data && data.statistics) {
        console.table(
          data.statistics.map(stat => ({ type: title, url: stat.url }))
        );
        return (
          <StatisticsGroup
            statistics={data.statistics}
            showHeader={githubUserId}
            title={title}
          />
        );
      }
      return <div />;
    }}
  </Query>
);

export default StatisticsCollection;
export { StatisticsGroup };
