export class VersionControl {
  private static readonly IOS_APP_INSTALLED_VERSION: string = '1.0.0';
  private static readonly ANDROID_APP_INSTALLED_VERSION: string = '1.0.0';
  private static readonly WEB_APP_INSTALLED_VERSION: string = '1.0.0';

  public static getAppInstalledVersion(platform: string): string {
    switch (platform.trim().toLowerCase()) {
      case 'ios':
        return this.IOS_APP_INSTALLED_VERSION;
      case 'android':
        return this.ANDROID_APP_INSTALLED_VERSION;
      case 'web':
        return this.WEB_APP_INSTALLED_VERSION;
      default:
        return '1.0.0';
    }
  }

  public static isNewerVersion(previousVersion: string, currentVersion: string): boolean {
    const [prevMajor = 0, prevMinor = 0, prevPatch = 0] = previousVersion.split('.').map(Number);
    const [curMajor = 0, curMinor = 0, curPatch = 0] = currentVersion.split('.').map(Number);

    if (curMajor > prevMajor) {
      return true;
    }

    if (curMinor > prevMinor) {
      return true;
    }

    if (curPatch > prevPatch) {
      return true;
    }

    return false;
  }
}
