import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  basApi='http://localhost:3000/user';

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get(this.basApi);
  }

  getAllRole(){
    return this.http.get("http://localhost:3000/role");
  }

  getById(id:any){
    return this.http.get(this.basApi+'/'+id);
  }

  registerData(inputdata:any){
    return this.http.post(this.basApi, inputdata);
  }

  updateData(id: any, inputdata: any) {
    //return this.http.put(`${this.basApi}/${id}`, inputdata);
    return this.http.put(this.basApi+'/'+id,inputdata)
  }    

  isLoggedIn(){
    return sessionStorage.getItem('role')!=null;
  }

  getUserRole(){
    return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
  }
}
