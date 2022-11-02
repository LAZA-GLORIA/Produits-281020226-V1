import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
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
  constructor(private candidatesService: CandidatesService) {}

  ngOnInit(): void {
    this.loading$ = this.candidatesService.loading$;
  }
}
