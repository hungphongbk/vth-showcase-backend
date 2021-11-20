import { registerEnumType } from '@nestjs/graphql';
import { MediaModel } from '../media/media.model';

export enum ShowcaseStatus {
  COMING = 'coming soon',
  IDEA = 'idea',
  SHOWCASE = 'showcase',
}

registerEnumType(ShowcaseStatus, {
  name: 'ShowcaseStatus',
});

export interface ShowcaseDto {
  id: string;
  name: string;
  author: string;
  status: ShowcaseStatus;
  description: string;
  image: MediaModel;
  createdAt: Date;
  updatedAt: Date;
}
