# frozen_string_literal: true

module Queries
  module Organizations
    class AllOrganizationsQuery < Queries::BaseQuery
      description "All organizations."

      type [Types::OrganizationType], null: false
      argument :limit, Integer, required: false

      def resolve(limit: nil)
        ::Organization.order(id: :asc).limit(limit)
      end
    end
  end
end
