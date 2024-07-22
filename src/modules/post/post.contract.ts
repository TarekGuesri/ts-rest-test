import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

const PostSchema = z.object({
  title: z.string(),
  //   thumbnail: z.instanceof(File),
});

export const contract = c.router({
  createPost: {
    method: 'POST',
    path: '/posts',
    body: PostSchema,
    responses: {
      200: z.object({
        message: z.string(),
      }),
    },
  },
});
