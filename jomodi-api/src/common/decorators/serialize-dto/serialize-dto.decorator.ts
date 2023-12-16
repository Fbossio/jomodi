import { SetMetadata } from '@nestjs/common';

export const SerializeDto = (dto: any) => SetMetadata('serialize-dto', dto);
