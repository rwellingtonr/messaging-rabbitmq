import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import fs from 'fs';

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

  async download(id: number | string) {
    const user = await this.findById(id);

    const response = await this.httpService.axiosRef.get<string>(
      user.data.avatar,
      {
        responseType: 'text',
        responseEncoding: 'base64',
      },
    );

    const file = {
      name: `${randomUUID()}-${user.data.avatar}`,
      base64: `data:image/jpeg;charset=utf-8;base64,${response.data}`,
      ...user,
    };
    const downloadData = {
      user,
      file,
    };

    return downloadData;
  }
}
