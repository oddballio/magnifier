import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import {
  UPDATE_ACCESS_TOKEN,
  UPDATE_GITHUB_USERNAME,
  UPDATE_GITHUB_ORG
} from "../mutations/user_mutations";
import { LOAD_USER_PROFILE } from "../queries/user_queries";

const Alert = () => {
  return (
    <div
      className="bg-red-lightest border border-red-light text-red-dark px-4 py-3 rounded relative"
      role="alert"
    >
      <strong className="font-bold">
        Warning!
        {"  "}
      </strong>
      <span className="block sm:inline">
        This will overwrite your current PAT
      </span>
      <span className="absolute pin-t pin-b pin-r px-4 py-3">
        <svg
          className="fill-current h-6 w-6 text-red"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
        </svg>
      </span>
    </div>
  );
};

const UpdateAccessToken = props => {
  let input;
  return (
    <Mutation mutation={UPDATE_ACCESS_TOKEN}>
      {(updateAccessToken, { data, error, loading, called }) => {
        if (error) {
          return <div>{JSON.stringify(error)}</div>;
        }
        if (loading) {
          return <div>Submitting...</div>;
        }
        if (called) {
          return <div>Access Token Updated!</div>;
        }
        return (
          <div>
            {props.hasAccessToken && <Alert />}
            <form
              className="w-full max-w-sm"
              onSubmit={e => {
                e.preventDefault();
                updateAccessToken({
                  variables: { accessToken: input.value }
                });
                input.value = "";
              }}
            >
              <div className="flex items-center border-b border-b-2 border-teal py-2">
                <input
                  className="appearance-none bg-transparent border-none w-full text-grey-darker mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="text"
                  ref={node => {
                    input = node;
                  }}
                  placeholder="Personal Access Token"
                  aria-label="Access Token"
                />
                <button
                  className="flex-no-shrink bg-teal hover:bg-teal-dark border-teal hover:border-teal-dark text-sm border-4 text-white py-1 px-2 rounded"
                  type="submit"
                >
                  Update Token
                </button>
              </div>
            </form>
          </div>
        );
      }}
    </Mutation>
  );
};
const UpdateGithubUsername = props => {
  let input;
  return (
    <Mutation mutation={UPDATE_GITHUB_USERNAME}>
      {(updateGithubUsername, { data, error, loading, called }) => {
        if (error) {
          return <div>{JSON.stringify(error)}</div>;
        }
        if (loading) {
          return <div>Submitting...</div>;
        }
        if (called) {
          return <div>Github Username Updated!</div>;
        }
        return (
          <div>
            <form
              className="w-full max-w-sm"
              onSubmit={e => {
                e.preventDefault();
                updateGithubUsername({
                  variables: { githubUsername: input.value }
                });
                input.value = "";
              }}
            >
              <div className="flex items-center border-b border-b-2 border-teal py-2">
                <input
                  className="appearance-none bg-transparent border-none w-full text-grey-darker mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="text"
                  ref={node => {
                    input = node;
                  }}
                  placeholder={props.githubUsername}
                  aria-label="Github Username"
                />
                <button
                  className="flex-no-shrink bg-teal hover:bg-teal-dark border-teal hover:border-teal-dark text-sm border-4 text-white py-1 px-2 rounded"
                  type="submit"
                >
                  Update Github Username
                </button>
              </div>
            </form>
          </div>
        );
      }}
    </Mutation>
  );
};
const UpdateGithubOrg = props => {
  let input;
  return (
    <Mutation mutation={UPDATE_GITHUB_ORG}>
      {(updateGithubOrg, { data, error, loading, called }) => {
        if (error) {
          return <div>{JSON.stringify(error)}</div>;
        }
        if (loading) {
          return <div>Submitting...</div>;
        }
        if (called) {
          return <div>Github Org Updated!</div>;
        }
        return (
          <div>
            <form
              className="w-full max-w-sm"
              onSubmit={e => {
                e.preventDefault();
                updateGithubOrg({
                  variables: { githubOrg: input.value }
                });
                input.value = "";
              }}
            >
              <div className="flex items-center border-b border-b-2 border-teal py-2">
                <input
                  className="appearance-none bg-transparent border-none w-full text-grey-darker mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="text"
                  ref={node => {
                    input = node;
                  }}
                  placeholder={props.githubOrg}
                  aria-label="Github Organization"
                />
                <button
                  className="flex-no-shrink bg-teal hover:bg-teal-dark border-teal hover:border-teal-dark text-sm border-4 text-white py-1 px-2 rounded"
                  type="submit"
                >
                  Update Github Organization
                </button>
              </div>
            </form>
          </div>
        );
      }}
    </Mutation>
  );
};

export default class Profile extends Component {
  render() {
    return (
      <Query query={LOAD_USER_PROFILE}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error</p>;
          return (
            <div className="flex-col w-2/5 mt-10 p-5 bg-gray m-auto bg-grey-lightest border border-grey rounded">
              <UpdateAccessToken hasAccessToken={data.me.hasAccessToken} />
              <UpdateGithubUsername githubUsername={data.me.githubUsername} />
              <UpdateGithubOrg githubOrg={data.me.org.name} />
            </div>
          );
        }}
      </Query>
    );
  }
}
