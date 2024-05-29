import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { TruthyCheck } from '../helpers/truthy-check';
import { Encryption } from '../helpers/encryption';

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

  async setEncryptedTextAsync(salt: string, key: string, value: string): Promise<void> {
    const ciperText = Encryption.encrypt(salt, value);
    await this.setAsync(key, ciperText);
  }

  async getAsync(key: string): Promise<string> {
    return await this._storage?.get(key);
  }

  async getDecryptedTextAsync(salt: string, key: string): Promise<string | null> {
    const ciperText = await this.getAsync(key);
    if (TruthyCheck.isEmpty(ciperText)) {
      return null;
    }
    const plainText = Encryption.decrypt(salt, ciperText);
    return plainText;
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
