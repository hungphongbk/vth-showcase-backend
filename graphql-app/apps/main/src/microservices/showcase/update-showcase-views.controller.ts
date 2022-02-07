import { Controller } from '@nestjs/common';
import { GaDataService } from '@app/ga-data';

@Controller()
export class UpdateShowcaseViewsController {
  constructor(private readonly gaClient: GaDataService) {}
}
