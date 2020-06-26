import { container } from 'tsyringe';

import IMailTemplateProvider from './models/ImailTemplateProvider';

import HandleBarsMailTemplateProvider from './implementations/HandlebarsMailTemplateProvider';

const providers = {
  handlebars: HandleBarsMailTemplateProvider,
};

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars
);
