import React from "react";
import "./index.css";
import {
    ErrorBoundary,
    Facet, Paging,
    PagingInfo,
    Results, ResultsPerPage,
    SearchBox,
    SearchProvider,
    Sorting,
    WithSearch
} from "@elastic/react-search-ui";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import { SearchDriverOptions } from "@elastic/search-ui";
import {Layout} from "@elastic/react-search-ui-views";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";

function Search(){
    // Create AppSearchAPIConnector instance with deployment details
    const connector = new AppSearchAPIConnector({
        searchKey: "search-3u75tk5qahmdf94sr4q567wy", // Replace with your search key
        engineName: "acep-capstone-engine",
        endpointBase: "https://fa3ce9d7a8064a898c6417f9483a78db.ent-search.us-central1.gcp.cloud.es.io" // Replace with your endpoint URL
    });

    // Configure search driver options
    const config: SearchDriverOptions = {
        alwaysSearchOnInitialLoad: true,
        apiConnector: connector,
        hasA11yNotifications: true,
        searchQuery: {
            result_fields: {
                title: { raw: {} },
                author: {raw: {} },
                body_text: {raw: {}}
            },
            disjunctiveFacets: ["author", "date_published"],
            facets: {
                author: { type: "value", size: 10 },
                date_published: { type: "value", size: 10 }
            }
        }
    };

    return (
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
                                        bodyContent={<Results titleField="title" urlField="url" />}
                                        sideContent={
                                            <div>
                                                <Sorting
                                                    sortOptions={[
                                                        {
                                                            name: "Relevance",
                                                            value: "",
                                                            direction: ""
                                                        },
                                                        {
                                                            name: "Title",
                                                            value: "title",
                                                            direction: "asc"
                                                        },
                                                        {
                                                            name: "Date",
                                                            value: "date_published",
                                                            direction: "desc"
                                                        }
                                                    ]}
                                                />
                                                <Facet
                                                    field="author"
                                                    label="Author"
                                                    filterType="any"
                                                />
                                                <Facet
                                                    field="date_published"
                                                    label="Date Published"
                                                    filterType="any"
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
    );
}

export default Search;