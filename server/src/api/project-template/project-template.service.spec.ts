import { Test, TestingModule } from '@nestjs/testing';
import { ProjectTemplateService } from './project-template.service';

describe('ProjectTemplateService', () => {
  let service: ProjectTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectTemplateService],
    }).compile();

    service = module.get<ProjectTemplateService>(ProjectTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
