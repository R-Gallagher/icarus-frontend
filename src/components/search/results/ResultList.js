import React from "react";
import PropTypes from "prop-types";
import { List, Empty } from "antd";

import ResultItem from "./ResultItem";

const ResultList = ({
  results,
  onResultSelect,
  selectedResult,
  retrieveSearchResults,
  resultCount,
  formattedRadius,
  searchedSpecialty,
  isLoading,
}) => {
  return (
    <div>
      <h2>
        {isLoading ? (
          "Loading, please wait...."
        ) : (
          <div>
            Found{" "}
            <span style={{ color: "#e04556" }}>
              {resultCount} {searchedSpecialty.name}
            </span>{" "}
            within {formattedRadius} km
          </div>
        )}
      </h2>
      <List
        loading={isLoading}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="No results found."
            />
          ),
        }}
        bordered
        pagination={{
          onChange: page => {
            retrieveSearchResults(page);
          },
          pageSize: 6,
          total: resultCount,
        }}
        itemLayout="horizontal"
        dataSource={results}
        renderItem={result => (
          <ResultItem
            onResultSelect={onResultSelect}
            result={result}
            selectedResult={selectedResult}
          />
        )}
      />
    </div>
  );
};

ResultList.propTypes = {
  results: PropTypes.array.isRequired,
  onResultSelect: PropTypes.func.isRequired,
  selectedResult: PropTypes.object.isRequired,
  retrieveSearchResults: PropTypes.func.isRequired,
  resultCount: PropTypes.number.isRequired,
  formattedRadius: PropTypes.number.isRequired,
  searchedSpecialty: PropTypes.object.isRequired,
};

export default ResultList;
