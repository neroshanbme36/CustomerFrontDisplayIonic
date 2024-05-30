import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { peripheralTypes } from '../../../../core/constants/peripherialTypes';
import { ArrayHelper } from '../../../../core/helpers/array-helper';
import { Order } from '../../../../core/models/order/order';
import { PeripheralActionEposMiddlewareDto } from '../../../../core/models/peripheral_action/peripheralActionEposMiddlewareDto';
import { PeripheralActionSyncCompletedDto } from '../../../../core/models/peripheral_action/peripheralActionSyncCompletedDto';
import { PeripheralActionsApiService } from '../../../../core/services/api/peripheral-actions-api.service';
import { TransactionsApiService } from '../../../../core/services/api/transactions-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  private isMainTaskBusy = false;
  private peripheralTypes: string[] = [peripheralTypes.SECOND_DISPLAY];
  currentOrder: Order | null = null;

  constructor(
    private peripheralActionsApiService: PeripheralActionsApiService,
    private transactionsApiService: TransactionsApiService
  ) { }

  ngOnInit() {
    this.doTasks();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private doTasks(): void {
    const source = timer(1000, 1000 * 3);

    this.subscriptions.add(
      source.subscribe(val => {
        if (!this.isMainTaskBusy) {
          this.isMainTaskBusy = true;
          this.getNewPeripheralActions();
        }
      })
    );
  }

  private getNewPeripheralActions(): void {
    this.peripheralActionsApiService.getNewPeripheralActionsByDeviceProductKey(this.peripheralTypes)
      .subscribe({
        next: (response: PeripheralActionEposMiddlewareDto[]) => {
          this.processActions(response);
        },
        error: (error) => {
          this.isMainTaskBusy = false;
          console.log(error);
        },
      });
  }

  private processActions(actions: PeripheralActionEposMiddlewareDto[]): void {
    if (actions.length === 0) {
      this.isMainTaskBusy = false;
      return;
    }
    const lastAction = ArrayHelper.last(actions);
    if (!lastAction) {
      this.isMainTaskBusy = false;
      return;
    }
    if (lastAction.funcType === 'clear') {
      this.currentOrder = null;
      this.setPeripheralActionsSyncEnded(actions);
    } else if (lastAction.funcType === 'current epos transaction') {
      this.getCurrentEposTransactions(actions);
    }
  }

  private getCurrentEposTransactions(actions: PeripheralActionEposMiddlewareDto[]): void {
    this.transactionsApiService.getCurrentEposTransaction()
      .subscribe({
        next: (response: Order) => {
          this.currentOrder = response;
        }, error: (error) => {
          this.currentOrder = null;
          console.log(error);
        }
      })
      .add(() => {
        this.setPeripheralActionsSyncEnded(actions);
      });
  }

  private setPeripheralActionsSyncEnded(actions: PeripheralActionEposMiddlewareDto[]): void {
    const completedActions = actions.map((e) => {
      return { id: e.id, deviceId: e.deviceId } as PeripheralActionSyncCompletedDto;
    });
    this.peripheralActionsApiService.setPeripheralActionsSyncEndedByDeviceProductKey(completedActions)
      .subscribe({
        error: (error) => {
          console.log(error);
        }
      })
      .add(() => {
        this.isMainTaskBusy = false;
      });
  }
}
