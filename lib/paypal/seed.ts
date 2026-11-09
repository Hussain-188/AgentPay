import { getPayPalToolkit } from "./toolkit";

export async function seedSandboxData() {
  const toolkit = getPayPalToolkit();
  const tools = toolkit.getTools();
  const results: Array<{ action: string; status: string; detail?: string }> =
    [];

  try {
    const createProduct = tools.create_product;
    if (createProduct?.execute) {
      const product = await createProduct.execute(
        {
          name: "Web Development Services",
          description: "Professional web development and design services",
          type: "SERVICE",
          category: "SOFTWARE",
        },
        {
          toolCallId: "seed-product-1",
          messages: [],
          abortSignal: new AbortController().signal,
        }
      );
      results.push({
        action: "create_product",
        status: "success",
        detail: JSON.stringify(product).slice(0, 100),
      });
    }
  } catch (e) {
    results.push({
      action: "create_product",
      status: "error",
      detail: String(e),
    });
  }

  try {
    const createInvoice = tools.create_invoice;
    if (createInvoice?.execute) {
      const invoice = await createInvoice.execute(
        {
          recipient_email: "sb-buyer@personal.example.com",
          items: [
            {
              name: "Website Redesign",
              quantity: "1",
              unit_amount: { currency_code: "USD", value: "2500.00" },
            },
            {
              name: "SEO Optimization",
              quantity: "1",
              unit_amount: { currency_code: "USD", value: "500.00" },
            },
          ],
          note: "Thank you for your business!",
        },
        {
          toolCallId: "seed-invoice-1",
          messages: [],
          abortSignal: new AbortController().signal,
        }
      );
      results.push({
        action: "create_invoice",
        status: "success",
        detail: JSON.stringify(invoice).slice(0, 100),
      });
    }
  } catch (e) {
    results.push({
      action: "create_invoice",
      status: "error",
      detail: String(e),
    });
  }

  return results;
}
