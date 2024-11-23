// src/api/shopify.ts

export interface Product {
  id: string;
  title: string;
  description: string;
  variants: {
    edges: {
      node: {
        price: string;
      };
    }[];
  };
}

export async function fetchShopifyProducts(): Promise<Product[]> {
  const SHOPIFY_API_URL = process.env.NEXT_PUBLIC_SHOPIFY_API_URL;
  const STOREFRONT_API_KEY = process.env.NEXT_PUBLIC_STOREFRONT_API_KEY;

  if (!SHOPIFY_API_URL || !STOREFRONT_API_KEY) {
    throw new Error("API URL ou clé API non configurée.");
  }

  const query = `
    {
     products(first: 3) {
        edges {
          node {
            id
            title
            variants(first: 1) {
          edges {
            node {
              id
            }
          }
        }
          }
        }
      }
    }
  `;

  const response = await fetch(SHOPIFY_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_API_KEY,
    },
    body: JSON.stringify({ query }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw new Error(
      errors.map((e: { message: string }) => e.message).join(", ")
    );
  }

  return data.products.edges.map((edge: { node: Product }) => edge.node);
}
