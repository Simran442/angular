import { Injectable, Component } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class BackendApiService {

  public api_url: any;
  public backend_url: any;
  constructor() {
    this.api_url = 'http://ec2-13-58-229-161.us-east-2.compute.amazonaws.com:3000/api/v1/';
    this.backend_url = 'http://ec2-13-58-229-161.us-east-2.compute.amazonaws.com:3000';
  }

  /* constructor() {
    this.api_url = 'http://localhost:3000/api/v1/';
    this.backend_url = 'http://localhost:3000';
  } */

}
