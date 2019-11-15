import { Component, OnDestroy } from '@angular/core';
import { ProgressInfo, StatsProgressBarData } from '../../../@core/data/stats-progress-bar';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-progress-section',
  styleUrls: ['./progress-section.component.scss'],
  templateUrl: './progress-section.component.html',
})
export class ECommerceProgressSectionComponent implements OnDestroy {

  private alive = true;

  progressInfoData: ProgressInfo[];

  constructor(private statsProgressBarService: StatsProgressBarData) {
    // this.statsProgressBarService.getProgressInfoData()
    //   .pipe(takeWhile(() => this.alive))
    //   .subscribe((data) => {
    //     this.progressInfoData = data;
    //     console.log('Progress Info Data: ', this.progressInfoData)
    //   });

    this.progressInfoData = [
      {
        activeProgress: 15,
        description: 'En Crecimiento',
        title: 'Atletas Inscritos',
        value: 12
      },
      {
        activeProgress: 15,
        description: 'En Crecimiento',
        title: 'Comisiones Registradas',
        value: 4
      },
      {
        activeProgress: 30,
        description: 'En Crecimiento',
        title: 'Entrenadores Registrados',
        value: 6
      }
    ]
  }

  ngOnDestroy() {
    this.alive = true;
  }
}
