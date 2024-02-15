import React from "react";
import {
  ErrorBoundary,
  SearchProvider,
  SearchBox,
  Results,
  PagingInfo,
  ResultsPerPage,
  Paging,
  WithSearch
} from "@elastic/react-search-ui";
import {
  Layout,
} from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import { SearchDriverOptions } from "@elastic/search-ui";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";

// Import logo and CSS
import logo from './logo.svg';
import './App.css';

// Create AppSearchAPIConnector instance with deployment details
const connector = new AppSearchAPIConnector({
  searchKey: "search-3u75tk5qahmdf94sr4q567wy", // Replace with your search key
  engineName: "national-parks-demo",
  endpointBase: "https://fa3ce9d7a8064a898c6417f9483a78db.ent-search.us-central1.gcp.cloud.es.io" // Replace with your endpoint URL
});

// Configure search driver options
const config: SearchDriverOptions = {
  alwaysSearchOnInitialLoad: true,
  apiConnector: connector,
  hasA11yNotifications: true,
  searchQuery: {
    result_fields: {
      title: { raw: {} }
    },
    search_fields: {
      title: {}
    },
    disjunctiveFacets: [""],
    facets: {}
  }
};

// Main App component
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">ACEP Capstone UI</h1>
        <img src="acep-logo.png" className="App-logo" alt="ACEP Logo" />
      </header>

      {/* Search Section */}
      <div className="Search-section">
        {/* Search Provider with Elastic Search UI */}
        <SearchProvider config={config}>
          <WithSearch
            mapContextToProps={({ wasSearched }) => ({
              wasSearched
            })}
          >
            {({ wasSearched }) => {
              return (
                <div className="Search-container">
                  <ErrorBoundary>
                    <Layout
                      header={<SearchBox debounceLength={0} />}
                      bodyContent={
                        <Results
                          titleField="title"
                          urlField="nps_link"
                          thumbnailField="image_url"
                          shouldTrackClickThrough
                        />
                      }
                      bodyHeader={
                        <React.Fragment>
                          {wasSearched && <PagingInfo />}
                          {wasSearched && <ResultsPerPage />}
                        </React.Fragment>
                      }
                      bodyFooter={<Paging />}
                    />
                  </ErrorBoundary>
                </div>
              );
            }}
          </WithSearch>
        </SearchProvider>
      </div>
    </div>
  );
}

export default App;
