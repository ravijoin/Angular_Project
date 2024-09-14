import { Component } from '@angular/core';
import { ApiService } from '../../shared/service/api.service';
import { PatientService } from '../../shared/service/patient.service';
import { User, UserType } from '../../models/models';
export interface TableElement {
  name: string;
  value: string;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  // columns: string[] = ['name', 'value'];
  // dataSource: { name: string, value: string }[] = [];

  // constructor(private patientService: PatientService) { }

  // ngOnInit() {
  //   const user: User | null = this.patientService.getUserInfo();
  //   if (user) {
  //     this.dataSource = [
  //       { name: 'Name', value: `${user.first_name} ${user.last_name}` },

  //       { name: 'Mobile', value: `${user.mobileNumber}` },
  //       { name: 'zipcode', value: `${user.zipcode}` },
  //       { name: 'blood_group', value: `${user.blood_group}` },

  //       { name: 'Type', value: `${UserType[user.userType]}` }
  //     ];
  //   }
  // }

}
