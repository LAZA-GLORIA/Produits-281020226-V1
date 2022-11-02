import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
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

  // le behaviorSubject stock les dernières données dans son cache
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

  private lastCandidatesLoad = 0;

  private setLoadingStatus(loading: boolean) {
    // c'est en appelant .next sur nos behaviorSubject ici
    // que les composants utilisant l'observable (loading$ ici) d'être à jour
    // ie de récuperer le nouveau (dernier) statut (state) de chargement
    this._loading$.next(loading);
  }

  getCandidatesFromServer() {
    // Date.now retourne le nombre de ms depuis le 01 JANV 1970
    if (Date.now() - this.lastCandidatesLoad <= 300000) {
      // on ignore si < 5min
     return; 
    }
    this.setLoadingStatus(true);
    this.http
      .get<Candidate[]>(`${environment.apiUrl}/facesnaps`)
      .pipe(
        delay(1000),
        tap((candidates) => {
          this.lastCandidatesLoad = Date.now();
          this._candidates$.next(candidates);
          this.setLoadingStatus(false);
        })
      )
      .subscribe();
  }

  getCandidateById(id: number): Observable<Candidate> {
          // Pour pallier au refresh, car this.candidate$ ne contient rien si on est pas d'abord passé par candidateList
          // donc si on a pas de lastCandidatesLoad, s'il n'y a jamais eu de chargement 
          // On va récupérer les candidats du serveur getCandidateFromServer()
          if(!this.lastCandidatesLoad) {
            this.getCandidatesFromServer()
          }
    
    return this.candidates$.pipe(
      map(candidates => candidates.filter(candidate => candidate.id === id)[0])
    );
  }
}
