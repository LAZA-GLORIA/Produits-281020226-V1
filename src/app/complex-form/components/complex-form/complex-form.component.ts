import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-complex-form',
  templateUrl: './complex-form.component.html',
  styleUrls: ['./complex-form.component.scss'],
})
export class ComplexFormComponent implements OnInit {
  mainForm!: FormGroup;
  personalInfoForm!: FormGroup;
  contactPreferenceControl!: FormControl;
  // On va falloir écouter les changements de valeurs de contact preference
  // pour pouvoir afficher les différents éléments du formulaire => et donc control indépendant
  // contrairement à personalInfo qui est un sous groupe

  emailControl!: FormControl;
  confirmEmailControl!: FormControl;
  emailForm!: FormGroup;

  phoneControl!: FormControl;

  passwordControl!: FormControl;
  confirmPasswordControl!: FormControl;
  loginInfoForm!: FormGroup;

  showEmailControl$!: Observable<boolean>;
  showPhoneControl$!: Observable<boolean>;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initFormControls();
    this.initMainForm();
    this.initFormObservable();
  }

  private initMainForm(): void {
    this.mainForm = this.fb.group({
      personalInfo: this.personalInfoForm,
      contactPreference: this.contactPreferenceControl,
      email: this.emailForm,
      phone: this.phoneControl,
      loginInfo: this.loginInfoForm,
    });
  }

  //  Une méthode private ne peut pas être appelée dans le template
  private initFormControls(): void {
    this.personalInfoForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
    //  email comme selection par défaut de notre bouton de radio
    this.contactPreferenceControl = this.fb.control('email');

    this.emailControl = this.fb.control('');
    this.confirmEmailControl = this.fb.control('');
    this.emailForm = this.fb.group({
      email: this.emailControl,
      confirm: this.confirmEmailControl,
    });

    this.phoneControl = this.fb.control('');

    this.passwordControl = this.fb.control('', Validators.required);
    this.confirmPasswordControl = this.fb.control('', Validators.required);

    this.loginInfoForm = this.fb.group({
      username: ['', Validators.required],
      password: this.passwordControl,
      confirmPassword: this.confirmPasswordControl,
    });
  }

  initFormObservable() {
    this.showEmailControl$ = this.contactPreferenceControl.valueChanges.pipe(
      startWith(this.contactPreferenceControl.value),
      map((preference) => preference === 'email'), // preference === email vaut true
      // equivaut à:
      // if (preference === 'email') {
      // return true;
      // } else { return false}

      //pour générer une première emission, l'observable startWith va d'abord emettre true et
      // emettra ensuite les valuechanges transformées selon les conditions
      // startWith(true) mais n'est pas bien maintenable
    );
    startWith(this.contactPreferenceControl.value),
    this.showPhoneControl$ = this.contactPreferenceControl.valueChanges.pipe(
      map((preference) => preference === 'phone'),
    );
  }

  onSubmitForm() {
    console.log(this.mainForm.value);
  }
}
