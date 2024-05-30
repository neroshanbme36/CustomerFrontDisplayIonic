import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})

export class IonStorageService {
  private _storage: Storage | undefined;

  constructor(
    private storage: Storage
  ) {}

  async initAsync(): Promise<void> {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async setAsync(key: string, value: string): Promise<void> {
    await this._storage?.set(key, value);
  }

  async getAsync(key: string): Promise<string> {
    return await this._storage?.get(key);
  }

  async removeAsync(key: string): Promise<void> {
    await this._storage?.remove(key);
  }

  async clearAllAsync(): Promise<void> {
    await this._storage?.clear();
  }

  async getAllKeysAsync(): Promise<string[]> {
    return this._storage?.keys() ?? [];
  }

  async getQtyKvpStoredAsync(): Promise<number> {
    return await this._storage?.length() ?? 0;
  }
}
