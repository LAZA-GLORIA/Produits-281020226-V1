import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, mapTo, Observable, of } from 'rxjs';
import { ComplexFormValue } from '../models/complex-form-value.models';
import { environment } from '../../../environments/environment';

@Injectable()
export class ComplexFormService {
  constructor(private http: HttpClient) {}

  //   Méthode appelée pour inscrire un utilisateur 
  //   Prend en argument la valeur du formulaire avec le type que l'on a crée dans le model
  //   et retourne un observable
  saveUserInfo(formValue: ComplexFormValue): Observable<boolean> {
    return this.http.post(`${environment.apiUrl}/users`, formValue).pipe(
      // mapTo va prendre n'importe quelle réponse de la requête post et la transformer en true
      mapTo(true),
      delay(1000),
      // permet de réagir à une erreur venant du serveur et retourne un observable
      // of génère un observable qui émet false et qui complète
      catchError(() =>
        of(false).pipe(
          // delay simule un délai de réseau
          delay(1000)
        )
      )
    );
  }
}
