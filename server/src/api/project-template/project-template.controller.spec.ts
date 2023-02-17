import { Test, TestingModule } from '@nestjs/testing';
import { ProjectTemplateController } from './project-template.controller';
import { ProjectTemplateService } from './project-template.service';

describe('ProjectTemplateController', () => {
  let controller: ProjectTemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectTemplateController],
      providers: [ProjectTemplateService],
    }).compile();

    controller = module.get<ProjectTemplateController>(ProjectTemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
