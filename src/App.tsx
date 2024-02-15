import React from "react";
import {
  ErrorBoundary,
  SearchProvider,
  SearchBox,
  Results,
  PagingInfo,
  ResultsPerPage,
  Paging,
  WithSearch,
  Facet // Import Facet component
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
      title: {
        snippet: {
          fallback: true
        }
      },
      description: {
        snippet: {
          fallback: true
        }
      },
      states: {
        snippet: {
          fallback: true
        }
      },
      visitors: { raw: {} },
      acres: { raw: {} },
      square_km: { raw: {} },
      date_established: { raw: {} },
      nps_link: { raw: {} },
    },
    search_fields: {
      title: {
        weight: 5
      },
      description: {},
      states: {}
    },
    disjunctiveFacets: ["states", "author"],
    facets: {
      states: { type: "value", size: 30 },
      author: { type: "value", size: 30 },
      acres: {
        type: "range",
        ranges: [
          { from: -1, name: "Any" },
          { from: 0, to: 1000, name: "Small" },
          { from: 1001, to: 100000, name: "Medium" },
          { from: 100001, name: "Large" }
        ]
      },
      location: {
        // San Francisco. In the future, make this the user's current position
        center: "37.7749, -122.4194",
        type: "range",
        unit: "mi",
        ranges: [
          { from: 0, to: 100, name: "Nearby" },
          { from: 100, to: 500, name: "A longer drive" },
          { from: 500, name: "Perhaps fly?" }
        ]
      },
      date_established: {
        type: "range",
        ranges: [
          {
            from: '1972-04-13T12:48:33.420Z',
            name: "Within the last 50 years"
          },
          {
            from: '1922-04-13T12:48:33.420Z',
            to: '1972-04-13T12:48:33.420Z',
            name: "50 - 100 years ago"
          },
          {
            to: '1922-04-13T12:48:33.420Z',
            name: "More than 100 years ago"
          }
        ]
      },
      visitors: {
        type: "range",
        ranges: [
          { from: 0, to: 10000, name: "0 - 10000" },
          { from: 10001, to: 100000, name: "10001 - 100000" },
          { from: 100001, to: 500000, name: "100001 - 500000" },
          { from: 500001, to: 1000000, name: "500001 - 1000000" },
          { from: 1000001, to: 5000000, name: "1000001 - 5000000" },
          { from: 5000001, to: 10000000, name: "5000001 - 10000000" },
          { from: 10000001, name: "10000001+" }
        ]
      }
    }, 
  }
};

// Main App component
function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h1>ACEP Capstone UI</h1>
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
                      sideContent={ // Add sideContent here
                        <div>
                          <Facet
                            field="states"
                            label="States"
                            isFilterable={true}
                          />
                          <Facet
                            field="world_heritage_site"
                            label="World Heritage Site?"
                          />
                          <Facet
                            field="visitors"
                            label="Visitors"
                          />
                          <Facet
                            field="date_established"
                            label="Date Established"
                          />
                          <Facet
                            field="location"
                            label="Distance"
                          />
                          <Facet
                            field="acres"
                            label="Acres"
                          />
                          <Facet
                            field="author"
                            label="Author"
                          />
                          <Facet
                            field="date"
                            label="Date Published"
                          />
                          <Facet
                            field="source"
                            label="Source"
                          />
                        </div>
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
