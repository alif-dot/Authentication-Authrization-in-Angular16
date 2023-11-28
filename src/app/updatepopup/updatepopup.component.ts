import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css']
})
export class UpdatepopupComponent implements OnInit {

  rolelist: any;
  editData: any;

  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private dialogref: MatDialogRef<UpdatepopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.service.getAllRole().subscribe(res => {
      this.rolelist = res;
    });
    if (this.data.usercode != null && this.data.usercode != '') {
      this.loaduserdata(this.data.usercode);
    }
  }

  registerForm = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control(''),
    gender: this.builder.control('male'),
    role: this.builder.control('', Validators.required),
    isActive: this.builder.control(false),
  });

  loaduserdata(code: any) {
    this.service.getById(code).subscribe(res => {
      this.editData = res;
      console.log(this.editData);

      this.registerForm.setValue({
        id: this.editData.id,
        name: this.editData.name,
        password: this.editData.password,
        email: this.editData.email,
        gender: this.editData.gender,
        role: this.editData.role,
        isActive: this.editData.isActive
      });
    });
  }

  // updateUser() {
  //   if (this.registerForm.valid) {
  //     const userId = this.registerForm.value.id;
  //     const userData = this.registerForm.value;
  //     console.log('Updating user with ID:', userId);

  //     this.service.updateData(userId, userData).subscribe(
  //       _res => {
  //         this.toastr.success("Update Successful 🙂");
  //         this.dialogref.close();
  //       },
  //       error => {
  //         console.error('Update failed:', error);
  //       }
  //     );
  //   } else {
  //     this.toastr.warning("Please Select Role for User");
  //   }
  // }    

  updateUser() {
    this.service.updateData(this.registerForm.value.id, this.registerForm.value).subscribe(res => {
      this.toastr.success("Update Successfull");
      this.dialogref.close();
    })
  }
}