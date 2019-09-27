import { HinnovaAbpTemplatePage } from './app.po';

describe('HinnovaAbp App', function() {
  let page: HinnovaAbpTemplatePage;

  beforeEach(() => {
    page = new HinnovaAbpTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
