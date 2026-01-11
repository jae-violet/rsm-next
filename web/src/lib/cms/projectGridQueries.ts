import { gql } from "graphql-request";

let defaultQuery = gql`
  query Projects($limit: Int) {
    projects(
      limit: $limit
      filter: { visibility: { _nin: ["draft", "archived"] } }
    ) {
      slug
      project_title
      location
      grid_image {
        filename_disk
        title
        description
      }
    }
  }
`;

let marketOnlyQuery = gql`
  query Projects($limit: Int, $markets: [String!]) {
    projects(
      limit: $limit
      filter: { 
        _and: [
          { visibility: { _nin: ["draft", "archived"] } },
          { markets: { markets_id: { name: { _in: $markets } } } }
        ]
      }
    ) {
      slug
      project_title
      location
      grid_image {
        filename_disk
        title
        description
      }
    }
  }
`;


let serviceOnlyQuery = gql`
  query Projects($limit: Int, $services: [String!]) {
    projects(
      limit: $limit
      filter: { 
        _and: [
          { visibility: { _nin: ["draft", "archived"] } },
          { services: { services_id: { name: { _in: $services } } } }
        ]
      }
    ) {
      slug
      project_title
      location
      grid_image {
        filename_disk
        title
        description
      }
    }
  }
`;

let eitherFilterQuery = gql`
  query Projects($limit: Int, $markets: [String!], $services: [String!]) {
    projects(
      limit: $limit
      filter: { 
        _and: [
          { visibility: { _nin: ["draft", "archived"] } },
          {
            _or: [
              { markets: { markets_id: { name: { _in: $markets } } } },
              { services: { services_id: { name: { _in: $services } } } }
            ]
          }
        ]
      }
    ) {
      slug
      project_title
      location
      grid_image {
        filename_disk
        title
        description
      }
    }
  }
`;

let bothFilterQuery = gql`
  query Projects($limit: Int, $markets: [String!], $services: [String!]) {
    projects(
      limit: $limit
      filter: { 
        _and: [
          { visibility: { _nin: ["draft", "archived"] } },
          {
            _and: [
              { markets: { markets_id: { name: { _in: $markets } } } },
              { services: { services_id: { name: { _in: $services } } } }
            ]
          }
        ]
      }
    ) {
      slug
      project_title
      location
      grid_image {
        filename_disk
        title
        description
      }
    }
  }
`;

export function projectGridQuery(filterType: string) {
  switch (filterType) {
    case "default":
      return defaultQuery;
    case "market":
      return marketOnlyQuery;
    case "service":
      return serviceOnlyQuery;
    case "either":
      return eitherFilterQuery;
    case "both":
      return bothFilterQuery;
    default:
      return defaultQuery;
  }
}