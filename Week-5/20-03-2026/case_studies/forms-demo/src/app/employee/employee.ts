import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  FormArray,
  FormRecord,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { from } from 'rxjs';
@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class Employee {
  name = new FormControl ('',Validators.required);

  account = new FormGroup( {
    email: new FormControl('',[Validators.required, Validators.email]),
    password:  new FormControl('', Validators.required)
  });

  skills= new FormArray([
    new FormControl('Angular')
 ]);
  preferences = new FormRecord ({
    darkMode: new FormControl(true),
    Notification : new FormControl(false)
  });
  //add skill
  addSkill(){
    this.skills.push(new FormControl(''));
  }
  //remove skill
  removeSkill(i : number){
    this.skills.removeAt(i);
  }

  addPreference(){
    const key = 'pref_' + Object.keys(this.preferences.controls).length;
    this.preferences.addControl(key, new FormControl(false));
  }

  //submit
  submit(){
    const data ={
      name: this.name.value,
      account:  this.account.value,
      skills: this.skills.value,
      preferences : this.preferences.value
    };
    console.log("EMPLOYEE DATA" ,data);
    alert(JSON.stringify(data,null,2));
  }
}
