import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Candidate } from '../models/candidate.model';

@Injectable()
export class CandidatesService {
  constructor(private http: HttpClient) {}

  // Dans le service on stocke et on emet des éléments du state de l'appli
  // (des données) via des behaviour Subject : c'est un subject qui va
  // re emettre à chaques nouvelles souscriptions

  // On va faire en sorte que le comportement behaviour soit interne au service
  // ie Il ne sera pas possible d'appeler next depuis l'extérieur du service
  // pour cela on crée des variables private avec des getters

  // Il y a 2 éléments de state que l'on va exposer via ce service:
  // 1er: l'etat de loading, pour afficher des spinners de chargement

  private _loading$ = new BehaviorSubject<boolean>(false);

  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  // getLoading(): Observable<boolean> {
  //     return this._loading$.asObservable()
  // }

  // 2ème: :l'état qui émettre les données principales de ce module
  // va emettre des tableaux de candidates
  private _candidates$ = new BehaviorSubject<Candidate[]>([]);
  get candidates$(): Observable<Candidate[]> {
    return this._candidates$.asObservable();
  }

  private setLoadingStatus(loading: boolean) {
    // c'est en appelant .next sur nos behaviorSubject ici
    // que les composants utilisant l'observable (loading$ ici) d'être à jour
    // ie de récuperer le nouveau (dernier) statut (state) de chargement
    this._loading$.next(loading);
  }
}
