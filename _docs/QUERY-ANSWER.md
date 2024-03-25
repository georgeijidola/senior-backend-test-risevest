# Query Optimization Task

##### Optimize the following SQL query related to the designed schema:

```sql

SELECT users.id, users.name, posts.title, comments.content
FROM users
LEFT JOIN posts ON users.id = posts.userId
LEFT JOIN comments ON posts.id = comments.postId
WHERE comments.createdAt = (SELECT  MAX(createdAt) FROM comments WHERE postId = posts.id)
ORDER  BY (SELECT  COUNT(posts.id) FROM posts WHERE posts.userId = users.id) DESC
LIMIT  3;
```

## Solution 1

To optimize the query, we can introduce an incremental field postsCount in the users table. This field will increment by one each time a user makes a post. By doing so, we eliminate the need for a join and count query. **Redundant data, many times like in this case, allows faster access so that necessary information is easily accessible and available.**

```sql
SELECT users.id, users.username, users.postsCount, comments.id AS latest_comment_id, comments.content AS latest_comment_content
FROM users
LEFT JOIN (
SELECT postId, MAX(createdAt) AS latest_comment_date
FROM comments
GROUP BY postId
) lc ON users.latestCommentId = lc.id
LEFT JOIN comments ON lc.postId = comments.postId AND lc.latest_comment_date = comments.createdAt
ORDER BY users.postsCount DESC
LIMIT 3;
```

## Solution 2

In addition to Solution 1, we introduce a field latestCommentId in the users table. This field stores the ID of the user's latest comment every time the user adds a comment.

```sql
SELECT users.id, users.username, users.postsCount, comments.id AS latest_comment_id, comments.content AS latest_comment_content
FROM users
LEFT JOIN comments ON users.latestCommentId = comments.id
ORDER BY users.postsCount DESC
LIMIT 3;
```
