import fetchMock from "jest-fetch-mock";
import { getProductPrice } from "../../../src/helper/getProductPrice";

describe("getProductPrice", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should return the price of a product", async () => {
    const productId = 3;
    const expectedPrice = 2;

    fetchMock.mockResponseOnce(JSON.stringify({ precio: expectedPrice }));

    const actualPrice = await getProductPrice(productId);

    expect(actualPrice).toBe(expectedPrice);
  });
});
