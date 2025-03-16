/**
 *    * 1)
   *  Post
   *    - title
   *    - descrizione
   *    - id
   *    - userId
 */
export interface Post{
  title: string,
  body: string,
  id: number,
  userId: number
}

export const PostListMock: Post[] = [
  {
    title: "Titolo 0",
    body: "lorem",
    id: 0,
    userId: 123
  },
  {
    title: "Titolo 1",
    body: "lorem",
    id: 1,
    userId: 123
  },
  {
    title: "Titolo 2",
    body: "PALLA",
    id: 3,
    userId: 123
  },
  {
    title: "Titolo 3",
    body: "bottiglia",
    id: 3,
    userId: 123
  },
];
