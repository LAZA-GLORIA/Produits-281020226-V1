import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { CandidateSearchType } from '../../enums/candidate-search-type.enum';
import { Candidate } from '../../models/candidate.model';
import { CandidatesService } from '../../services/candidates.service';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidateListComponent implements OnInit {
  // @Input() obj!: { firstName: string, lastName: string };

  loading$!: Observable<boolean>;
  candidates$!: Observable<Candidate[]>;

  searchControl!: FormControl;
  searchTypeControl!: FormControl;
  // Ce tableau associe des valeurs valident pour la recherche à un labl pour l'affichage dans le dropdown
  searchTypeOptions!: {
    value: CandidateSearchType;
    label: string;
  }[];

  constructor(
    private candidatesService: CandidatesService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initSearchForm();
    this.initObservables();
    // this.loading$ = this.candidatesService.loading$;
    this.candidatesService.getCandidatesFromServer();
  }

  private initSearchForm() {
    this.searchControl = this.fb.control('');
    this.searchTypeControl = this.fb.control(CandidateSearchType.TITLE);
    this.searchTypeOptions = [
      { value: CandidateSearchType.TITLE, label: 'Title' },
      { value: CandidateSearchType.DEPARTMENT, label: 'Department' },
      { value: CandidateSearchType.DESCRIPTION, label: 'Description' },
    ];
  }
  // Attention une méthode private ne doit pas être appelée depuis le template
  // mieux de faire une methode quand on initialise plusieurs observables
  private initObservables() {
    this.loading$ = this.candidatesService.loading$;
    // Pour pouvoir implémenter le filtre il faut changer l'implémentation de candidate$
    // Pour en quelque sorte mélanger les valueChanges de 2 controles (searchControl, searchTypeControl)
    // et l'appel du service : l'observable du service qui va emettre le tableau

    // Attention quand on ne met pas de startWith avec un valueChanges il n'emet rien
    //  Tant que l'utilisateur n'a rien mis dans le champ
    const search$ = this.searchControl.valueChanges.pipe(
      startWith(this.searchControl.value),
      map(value => value.toLowerCase())
    );
    const searchType$: Observable<CandidateSearchType> = this.searchTypeControl.valueChanges.pipe(
      startWith(this.searchTypeControl.value)
      // pas besoin de modifier/map les valeurs car searchTypeControl emet déjà des valeurs qui correspondent à des clés
      // du modèle et faire une recherche avec 
    );
    // à modifier : this.candidates$ = this.candidatesService.candidates$;
    //  Un opérateur de création d'observable pour combiner plusieurs observables ensembles
    this.candidates$ = combineLatest([
      search$,
      searchType$,
      this.candidatesService.candidates$
    ]).pipe(
      map(([search, searchType, candidates]) => candidates.filter(candidate => candidate[searchType]
        .toLowerCase()
        .includes(search as string))
    )
    );
  }
}
