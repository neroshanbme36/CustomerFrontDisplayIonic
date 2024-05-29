export class Encryption {
  public static encrypt(salt: string, text: string): string {
      const textToChars = (txt: string) => txt.split('').map((c) => c.charCodeAt(0));
      // const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
      const byteHex = (n: any) => ('0' + Number(n).toString(16)).slice(-2);
      // eslint-disable-next-line no-bitwise
      const applySaltToChar = (code: any) => textToChars(salt).reduce((a, b) => a ^ b, code);

      return text
          .split('')
          .map(textToChars)
          .map(applySaltToChar)
          .map(byteHex)
          .join('');
  };

  public static decrypt(salt: string, encoded: string): string {
      const textToChars = (text: string) => text.split('').map((c) => c.charCodeAt(0));
      // eslint-disable-next-line no-bitwise
      const applySaltToChar = (code: any) => textToChars(salt).reduce((a, b) => a ^ b, code);
      return encoded
          .match(/.{1,2}/g)!
          .map((hex) => parseInt(hex, 16))
          .map(applySaltToChar)
          .map((charCode) => String.fromCharCode(charCode))
          .join('');
  };
}
