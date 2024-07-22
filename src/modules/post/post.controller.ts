import {
  Controller,
  ParseFilePipe,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  TsRestHandler,
  nestControllerContract,
  tsRestHandler,
} from '@ts-rest/nest';
import { contract } from './post.contract';
import { FileInterceptor } from '@nestjs/platform-express';

const c = nestControllerContract(contract);

@Controller()
export class PostController {
  constructor() {}

  @UseInterceptors(FileInterceptor('thumbnail'))
  @TsRestHandler(c.createPost)
  async createPost(
    @UploadedFile(new ParseFilePipe())
    thumbnail: Express.Multer.File,
  ) {
    return tsRestHandler(c.createPost, async ({ body }) => {
      console.log({ body, thumbnail });
      return {
        status: 200,
        body: {
          message: 'Done',
        },
      };
    });
  }
}
