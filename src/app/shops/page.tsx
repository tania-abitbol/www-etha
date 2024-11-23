import React, { Suspense } from "react";

import Shops from "./Shops";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Shops />
    </Suspense>
  );
}
