import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-axyus-form',
  templateUrl: './axyus-form.component.html',
  styleUrls: ['./axyus-form.component.scss'],
})
export class AxyusFormComponent implements OnInit {
  // mainForm!: FormGroup;
  // infosPersoForm!: FormGroup;
  // enfantsInfos!: FormGroup;

  apiEnfants: any = [];
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  mainForm = this.fb.group({
    infosPerso: this.fb.group({
      genre: [''],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      nir: ['', Validators.required],
      email: ['', Validators.required],
      paysvisites: ['', Validators.required],
    }),

    // enfantsInfos: this.fb.group({
      enfantsInfosArray: this.fb.array([]),
      // genreenfant: [''],
      // nomenfant: ['', Validators.required],
      // prenomenfant: ['', Validators.required],
    // }),
  });

  // get enfantsInfosArray(): FormArray {
  //   return this.enfantsInfos.get('enfantsInfosArray') as FormArray;
  //   // return this.enfantsInfos.controls.enfantsInfosArray as FormArray;
  // }

  

  newEnfantsInfos(): FormGroup {
    return this.fb.group({
      genreenfant: [''],
      nomenfant: ['', Validators.required],
      prenomenfant: ['', Validators.required],
    });
  }

  ajouterEnfant() {
    // this.enfantsInfosArray.push(this.newEnfantsInfos());
    this.apiEnfants = this.mainForm.controls.enfantsInfosArray as FormArray;
    // this.newEnfantsInfos()
    this.apiEnfants.push(this.newEnfantsInfos());
    console.log(this.apiEnfants);
  }

  supprimer(index: number) {
    this.apiEnfants.removeAt(index);
  }

  valider() {
    console.log(this.mainForm);
  }
}
