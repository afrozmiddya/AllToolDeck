export class SecurityService {
  /**
   * Generates a high-entropy password based on provided configurations.
   */
  public generatePassword(
    length: number,
    includeUppercase: boolean,
    includeNumbers: boolean,
    includeSymbols: boolean
  ): string {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let characterPool = lowercase;
    if (includeUppercase) characterPool += uppercase;
    if (includeNumbers) characterPool += numbers;
    if (includeSymbols) characterPool += symbols;

    let password = "";
    // Ensure at least one character of each requested type is present
    if (includeUppercase) password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
    if (includeNumbers) password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    if (includeSymbols) password += symbols.charAt(Math.floor(Math.random() * symbols.length));

    // Fill the rest
    for (let i = password.length; i < length; i++) {
      password += characterPool.charAt(Math.floor(Math.random() * characterPool.length));
    }

    // Shuffle the result
    return password.split('').sort(() => 0.5 - Math.random()).join('');
  }

  /**
   * Encodes a string to Base64
   */
  public base64Encode(text: string): string {
    return Buffer.from(text, 'utf-8').toString('base64');
  }

  /**
   * Decodes a Base64 string to utf-8
   */
  public base64Decode(encodedText: string): string {
    return Buffer.from(encodedText, 'base64').toString('utf-8');
  }
}
