export namespace models {
  type BaseModel<T> = {
    status: string;
    message: string;
    data: T;
  };

  type User = {
    username: string;
    email: string;
    password?: string;
    names: string;
  };

  type Output = {};
  
  interface IDetails {
    ip: string;
    location: string;
    timezone: string;
    isp: string;
    coordinates: [number, number];
  }

  type TSubmit = (ip: string) => void;

  interface IRetData {
    data: IDetails;
    setIp: TSubmit;
  }
}
