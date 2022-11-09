import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetId = createParamDecorator((data: never, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();

  return parseInt(request.params.id);
});
