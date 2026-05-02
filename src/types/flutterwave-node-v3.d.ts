declare module "flutterwave-node-v3" {
  class Flutterwave {
    constructor(publicKey: string, secretKey: string);
    Payment: {
      initiate(payload: Record<string, unknown>): Promise<{
        status?: string;
        data?: { link?: string };
      }>;
    };
    Transaction: {
      verify(payload: { id: number }): Promise<{
        status?: string;
        data?: { status?: string; tx_ref?: string };
      }>;
    };
  }

  export default Flutterwave;
}
