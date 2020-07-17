export interface IDeployService {
  create(data: any): Promise<Object>;
  updateByUID(data: any, uid: string): Promise<Object>;
}
