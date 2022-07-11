import { Test, TestingModule } from "@nestjs/testing";
import { MarkResolver } from "./mark.resolver";

describe("MarkResolver", () => {
  let resolver: MarkResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarkResolver],
    }).compile();

    resolver = module.get<MarkResolver>(MarkResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
