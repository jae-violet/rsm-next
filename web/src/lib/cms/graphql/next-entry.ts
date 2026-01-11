import { gql } from "graphql-request";

export const nextProjectQuery = gql`
    query NextProject($filter: projects_filter) {
        projects(limit: -1, filter: $filter) {
            slug
            project_title
        }
    }
`
export const nextArticleQuery = gql`
    query NextArticle($filter: news_posts_filter) {
        news_posts(limit: -1, filter: $filter) {
            slug
            post_title
        }
    }
`