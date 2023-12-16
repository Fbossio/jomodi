import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface classConstructor {
  new (...args: any[]): object;
}

export function Serialize(dto: classConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private readonly dto: classConstructor) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        // Verify if the response is paginated
        if (data.items && data.meta) {
          // Paginated response
          return {
            ...data,
            items: data.items.map((item: any) =>
              plainToInstance(this.dto, item, {
                excludeExtraneousValues: true,
              }),
            ),
          };
        } else {
          // Single response
          return plainToInstance(this.dto, data, {
            excludeExtraneousValues: true,
          });
        }
      }),
    );
  }
}
