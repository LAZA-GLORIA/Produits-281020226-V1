import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Candidate } from '../../models/candidate.model';
import { CandidatesService } from '../../services/candidates.service';

@Component({
  selector: 'app-single-candidate',
  templateUrl: './single-candidate.component.html',
  styleUrls: ['./single-candidate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleCandidateComponent implements OnInit {
  loading$!: Observable<boolean>;
  candidate$!: Observable<Candidate>;

  constructor(
    private candidatesService: CandidatesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initObservables();
  }

  private initObservables() {
    this.loading$ = this.candidatesService.loading$;
    // Les params c'est un Observable
    //  et au lieu d'appeler directement le service comme ici this.candidate$ = this.candidateService.getCandidateById();
    //  ca sera:
    this.candidate$ = this.route.params.pipe(
      // On veut transformer l'Observable qui vient des paramètres par l'Observable qui vient du service
      // et qui dit transformer un Observable en un autre dit Opérateur haut niveau
      switchMap((params) => this.candidatesService.getCandidateById(+params['id']))
    );
  }

  onHire() {}

  onRefuse() {}

  onGoBack() {
    this.router.navigateByUrl('reactive-state/candidates');
  }
}
