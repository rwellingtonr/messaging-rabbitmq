import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

interface IFindByIdResponse {
  data: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
  support: {
    url: string;
    text: string;
  };
}

@Injectable()
export class GatewayService {
  private baseUrs: string;
  constructor(private readonly httpService: HttpService) {
    this.baseUrs = 'https://reqres.in';
  }

  async findById(id: number | string) {
    const { data } = await this.httpService.axiosRef.get<IFindByIdResponse>(
      `${this.baseUrs}/api/users/${id}`,
    );
    return data;
  }
}
