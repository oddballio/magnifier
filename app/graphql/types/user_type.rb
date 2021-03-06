# frozen_string_literal: true

module Types
  # Defines the fields on User. Fields expose the data that may
  # be queried, and validated.
  #
  class UserType < Types::BaseObject
    field :id, Int, null: false
    field :first_name, String, null: false
    field :last_name, String, null: false
    field :email, String, null: false
    field :github_username, String, null: true
    field :created_at, String, null: false
    field :updated_at, String, null: false
    field :access_token, Boolean, null: true
    field :org, OrganizationType, null: true
    field :github_user, GithubUserType, null: true
  end
end
