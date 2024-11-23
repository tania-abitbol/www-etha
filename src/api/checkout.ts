export async function createCheckout(variantId: string, quantity: number) {
  const SHOPIFY_API_URL = process.env.NEXT_PUBLIC_SHOPIFY_API_URL;
  const SHOPIFY_API_KEY = process.env.NEXT_PUBLIC_STOREFRONT_API_KEY;

  if (!SHOPIFY_API_URL || !SHOPIFY_API_KEY) {
    throw new Error("L'URL de l'API Shopify ou la clé API est manquante.");
  }

  const mutation = `
    mutation {
      checkoutCreate(input: {
        lineItems: [
          { variantId: "${variantId}", quantity: ${quantity} }
        ]
      }) {
        checkout {
          id
          webUrl
        }
        checkoutUserErrors {
          message
        }
      }
    }
  `;

  try {
    const response = await fetch(SHOPIFY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_API_KEY,
      },
      body: JSON.stringify({ query: mutation }),
    });

    const { data, errors } = await response.json();

    // Gestion des erreurs renvoyées par Shopify
    if (errors) {
      throw new Error(
        errors.map((e: { message: string }) => e.message).join(", ")
      );
    }

    const checkout = data?.checkoutCreate?.checkout;
    const checkoutUserErrors = data?.checkoutCreate?.checkoutUserErrors;

    if (checkoutUserErrors.length > 0) {
      throw new Error(
        checkoutUserErrors.map((e: { message: string }) => e.message).join(", ")
      );
    }

    // Retourner l'URL du checkout
    return { id: checkout.id, webUrl: checkout.webUrl };
  } catch (error) {
    console.error("Erreur lors de la création du checkout :", error);
    throw error;
  }
}

export async function getCheckout(checkoutId: string) {
  const SHOPIFY_API_URL = process.env.NEXT_PUBLIC_SHOPIFY_API_URL;
  const SHOPIFY_API_KEY = process.env.NEXT_PUBLIC_STOREFRONT_API_KEY;

  if (!SHOPIFY_API_URL || !SHOPIFY_API_KEY) {
    throw new Error("L'URL de l'API Shopify ou la clé API est manquante.");
  }

  const query = `
    query {
      node(id: "${checkoutId}") {
        ... on Checkout {
          id
          lineItems(first: 10) {
            edges {
              node {
                id
                title
                quantity
                variant {
                  id
                  priceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
          subtotalPriceV2 {
            amount
            currencyCode
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(SHOPIFY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_API_KEY,
      },
      body: JSON.stringify({ query }),
    });

    const { data, errors } = await response.json();

    if (errors) {
      throw new Error(
        errors.map((e: { message: string }) => e.message).join(", ")
      );
    }

    return data.node;
  } catch (error) {
    console.error("Erreur lors de la récupération du checkout :", error);
    throw error;
  }
}

export async function addLineItem(
  checkoutId: string,
  variantId: string,
  quantity: number
) {
  const SHOPIFY_API_URL = process.env.NEXT_PUBLIC_SHOPIFY_API_URL;
  const SHOPIFY_API_KEY = process.env.NEXT_PUBLIC_STOREFRONT_API_KEY;

  if (!SHOPIFY_API_URL || !SHOPIFY_API_KEY) {
    throw new Error("L'URL de l'API Shopify ou la clé API est manquante.");
  }

  const mutation = `
    mutation {
      checkoutLineItemsAdd(checkoutId: "${checkoutId}", lineItems: [
        { variantId: "${variantId}", quantity: ${quantity} }
      ]) {
        checkout {
          id
          webUrl
          lineItems(first: 10) {
            edges {
              node {
                id
                title
                quantity
                variant {
                  id
                  priceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
        checkoutUserErrors {
          message
        }
      }
    }
  `;

  try {
    const response = await fetch(SHOPIFY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_API_KEY,
      },
      body: JSON.stringify({ query: mutation }),
    });

    const { data, errors } = await response.json();

    if (errors) {
      throw new Error(
        errors.map((e: { message: string }) => e.message).join(", ")
      );
    }

    const checkout = data?.checkoutLineItemsAdd?.checkout;
    const checkoutUserErrors = data?.checkoutLineItemsAdd?.checkoutUserErrors;

    if (checkoutUserErrors.length > 0) {
      throw new Error(
        checkoutUserErrors.map((e: { message: string }) => e.message).join(", ")
      );
    }

    return checkout;
  } catch (error) {
    console.error("Erreur lors de l'ajout d'articles :", error);
    throw error;
  }
}

export async function updateLineItemQuantity(
  checkoutId: string,
  lineItemId: string,
  quantity: number
) {
  const SHOPIFY_API_URL = process.env.NEXT_PUBLIC_SHOPIFY_API_URL;
  const SHOPIFY_API_KEY = process.env.NEXT_PUBLIC_STOREFRONT_API_KEY;

  if (!SHOPIFY_API_URL || !SHOPIFY_API_KEY) {
    throw new Error("L'URL de l'API Shopify ou la clé API est manquante.");
  }

  const mutation = `
    mutation {
      checkoutLineItemsUpdate(checkoutId: "${checkoutId}", lineItems: [
        { id: "${lineItemId}", quantity: ${quantity} }
      ]) {
        checkout {
          id
          lineItems(first: 10) {
            edges {
              node {
                id
                title
                quantity
                variant {
                  priceV2 {
                    amount
                  }
                }
              }
            }
          }
          subtotalPriceV2 {
            amount
          }
        }
        userErrors {
          message
        }
      }
    }
  `;

  try {
    const response = await fetch(SHOPIFY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_API_KEY,
      },
      body: JSON.stringify({ query: mutation }),
    });

    const { data, errors } = await response.json();
    if (errors) {
      throw new Error(
        errors.map((e: { message: string }) => e.message).join(", ")
      );
    }

    return data.checkoutLineItemsUpdate.checkout;
  } catch (error) {
    console.error("Erreur lors de la mise à jour des articles :", error);
    throw error;
  }
}

export async function deleteLineItem(checkoutId: string, lineItemId: string) {
  const SHOPIFY_API_URL = process.env.NEXT_PUBLIC_SHOPIFY_API_URL;
  const SHOPIFY_API_KEY = process.env.NEXT_PUBLIC_STOREFRONT_API_KEY;

  if (!SHOPIFY_API_URL || !SHOPIFY_API_KEY) {
    throw new Error("L'URL de l'API Shopify ou la clé API est manquante.");
  }

  const mutation = `
    mutation {
      checkoutLineItemsRemove(checkoutId: "${checkoutId}", lineItemIds: ["${lineItemId}"]) {
        checkout {
          id
          lineItems(first: 10) {
            edges {
              node {
                id
                title
                quantity
                variant {
                  priceV2 {
                    amount
                  }
                }
              }
            }
          }
          subtotalPriceV2 {
            amount
          }
        }
        userErrors {
          message
        }
      }
    }
  `;

  try {
    const response = await fetch(SHOPIFY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_API_KEY,
      },
      body: JSON.stringify({ query: mutation }),
    });

    const { data, errors } = await response.json();
    if (errors) {
      throw new Error(
        errors.map((e: { message: string }) => e.message).join(", ")
      );
    }

    return data.checkoutLineItemsRemove.checkout;
  } catch (error) {
    console.error("Erreur lors de la suppression de l'article :", error);
    throw error;
  }
}
