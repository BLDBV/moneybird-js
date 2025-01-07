import { HttpHandler } from "./httpHandler";
import { Moneybird } from "./moneybird";
import { Administration } from "./administration";
import {
  IAttachment,
  IPayment,
  IPaymentCreate,
  IEstimate,
  IEstimateSending,
} from "./common";

export class Estimate {
  private readonly moneybird: Moneybird;
  private readonly administration: Administration;
  private readonly id: string;
  public readonly data: IEstimate;
  private readonly HTTP: HttpHandler;

  constructor(
    moneybird: Moneybird,
    administration: Administration,
    data: IEstimate
  ) {
    this.moneybird = moneybird;
    this.administration = administration;
    this.id = data.id;
    this.data = data;
    this.HTTP = new HttpHandler(
      this.administration.HTTP,
      `estimates/${this.id}`
    );
  }

  /**
   * Download the PDF of the sales invoice
   * @returns The content of the PDF
   */
  public async downloadPDF(): Promise<ArrayBuffer> {
    return this.HTTP.GET<ArrayBuffer>("download_pdf", {
      responseType: "arraybuffer",
    });
  }
}
