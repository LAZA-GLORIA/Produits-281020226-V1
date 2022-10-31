import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { map, Observable, startWith, tap } from 'rxjs';

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
      // Lorsqu'on a pas encore de valueChanges on veut quand même déclencher
      // l'observable showEmailControl$ avec la valeur actuelle du formControl
      startWith(this.contactPreferenceControl.value),
      map((preference) => preference === 'email'), // preference === email vaut true
      // equivaut à:
      // if (preference === 'email') {
      // return true;
      // } else { return false}

      //pour générer une première emission, l'observable startWith va d'abord emettre true et
      // emettra ensuite les valuechanges transformées selon les conditions
      // startWith(true) mais n'est pas bien maintenable, utiliser la valeur du champ qui est bcp plus robuste
      tap((showEmailControl) =>
        // {
        //   if (showEmailControl) {
        //     // Validators
        //     this.emailControl.addValidators([
        //       Validators.required,
        //       Validators.email,
        //     ]);
        //     this.confirmEmailControl.addValidators([
        //       Validators.required,
        //       Validators.email,
        //     ]);
        //   } else {
        //     this.emailControl.clearValidators();
        //     this.confirmEmailControl.clearValidators();
        //   }
        //   this.emailControl.updateValueAndValidity();
        //   this.confirmEmailControl.updateValueAndValidity();
        // }
        this.setEmailValidators(showEmailControl)
      )
    );
    startWith(this.contactPreferenceControl.value),
      (this.showPhoneControl$ = this.contactPreferenceControl.valueChanges.pipe(
        map((preference) => preference === 'phone'),
        tap((showPhoneControl) =>
          // {
          //   if (showPhoneControl) {
          //     // ajouter Validators
          //     // On laisse ses formControl disponible en créant des formControl indépendant sinon aurait fait
          //     // this.mainForm.getControl.get('phone).addValidators
          //     this.phoneControl.addValidators([
          //       Validators.required,
          //       Validators.minLength(10),
          //       Validators.maxLength(10),
          //     ]);
          //   } else {
          //     // retirer Validators
          //     this.phoneControl.clearValidators();
          //   }
          //   // après avoir appelé ou modifié un Validators il faut appeler sur ce formControl la méthdoe suivante
          //   this.phoneControl.updateValueAndValidity();
          // }
          this.setPhoneValidators(showPhoneControl)
        )
      ));
  }

  private setEmailValidators(showEmailControl: boolean) {
    if (showEmailControl) {
      // Validators
      this.emailControl.addValidators([Validators.required, Validators.email]);
      this.confirmEmailControl.addValidators([
        Validators.required,
        Validators.email,
      ]);
    } else {
      this.emailControl.clearValidators();
      this.confirmEmailControl.clearValidators();
    }
    this.emailControl.updateValueAndValidity();
    this.confirmEmailControl.updateValueAndValidity();
  }

  private setPhoneValidators(showPhoneControl: boolean) {
    if (showPhoneControl) {
      // ajouter Validators
      // On laisse ses formControl disponible en créant des formControl indépendant sinon aurait fait
      // this.mainForm.getControl.get('phone).addValidators
      this.phoneControl.addValidators([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]);
    } else {
      // retirer Validators
      this.phoneControl.clearValidators();
    }
    // après avoir appelé ou modifié un Validators il faut appeler sur ce formControl la méthdoe suivante
    this.phoneControl.updateValueAndValidity();
  }

  onSubmitForm() {
    console.log(this.mainForm.value);
  }
}
