import IparseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default interface IMailTemplateProvider {
  parse(data: IparseMailTemplateDTO): Promise<string>;
}
