import { Component } from '@angular/core';
import {FormsModule , NgForm} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feedback-form',
  imports: [FormsModule,CommonModule],
  templateUrl: './feedback-form.html',
  styleUrl: './feedback-form.css',
})
export class FeedbackForm {
  //Dropdown options
  departments= ['HR', 'Development', 'Design', 'QA'];
  allSkills= ['Angular','React','Node','Python' ];


  feedback = {
    name: '',
    email: '',
    department: '',
    rating: '',
    comments: '',
    skills: [] as string[]
  };

  //Submit Handler
  submitForm (form :NgForm){
    if(form.valid) {
      console.log("Feedback Submitted");
      alert(JSON.stringify(this.feedback,null,2));
      form.resetForm();
      this.feedback.skills= []; //reset skills manually
      
    }
    else {
      alert("Please fill all required fields");
    }
  }
  //update skills array
  updateSkills(skill: string, isChecked: boolean){
    if(isChecked) {
      this.feedback.skills.push(skill);
    }
    else {
      const index= this.feedback.skills.indexOf(skill);
      if(index >=0)this.feedback.skills.splice(index,1);
    }
  }
}
