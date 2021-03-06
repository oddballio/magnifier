# frozen_string_literal: true

module Types
  # Defines the fields on Statistic. Fields expose the data that may
  # be queried, and validated.
  #
  class StatisticType < Types::BaseObject
    field :id, Int, null: false
    field :source_id, String, null: false
    field :source_type, String, null: false
    field :source, String, null: false
    field :state, String, null: false
    field :repository_id, Int, null: false
    field :organization_id, Int, null: false
    field :url, String, null: false
    field :title, String, null: false
    field :source_created_at, String, null: true
    field :source_updated_at, String, null: true
    field :source_closed_at, String, null: true
    field :source_created_by, Integer, null: false
    field :created_at, String, null: false
    field :updated_at, String, null: false
    field :assignees, [Integer], null: true

    field(
      :github_users,
      [GithubUserType],
      null: true,
      description: "This Statistic's GithubUsers, or null if this Statistic has no GithubUsers."
    )

    field(
      :repository,
      RepositoryType,
      null: false,
      description: "This Statistic's Repository."
    )

    field(
      :organization,
      OrganizationType,
      null: false,
      description: "This Statistic's Organization"
    )
  end
end
