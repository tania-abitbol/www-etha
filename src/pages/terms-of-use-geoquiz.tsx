import React from "react";
import "~/app/globals.css";

const TermsOfUseGeoquiz = () => (
  <main>
    <div className="min-h-screen px-8 md:px-32 pt-12 max-w-5xl m-auto">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center text-blue-700">
        Terms of Use for Geoquiz
      </h1>
      <p className="text-lg mb-6 text-gray-700 leading-relaxed">
        Welcome to Geoquiz. By using our app, you agree to comply with and be
        bound by the following terms and conditions. Please review these terms
        carefully before subscribing or using our services.
      </p>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-3 text-blue-600">
          1. Auto-Renewable Subscriptions
        </h2>
        <p className="text-lg mb-3 text-gray-700 leading-relaxed">
          Geoquiz offer :
        </p>
        <ul className="list-disc pl-5 text-lg text-gray-700 leading-relaxed">
          <li>No ads 1,99€ for no ads life</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-3 text-blue-600">
          2. Privacy Policy
        </h2>
        <p className="text-lg mb-3 text-gray-700 leading-relaxed">
          Your privacy is important to us. Please review our Privacy Policy at
          the following link:
          <a
            href="https://etha.app/privacy-policy-geoquiz"
            className="text-blue-500 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
          .
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-3 text-blue-600">
          4. General Terms
        </h2>
        <p className="text-lg mb-3 text-gray-700 leading-relaxed">
          By using this app, you agree not to misuse the app or use it for any
          unlawful purposes. Access to premium content is only available to
          users with an active subscription. We reserve the right to modify
          subscription terms or pricing with prior notice to users.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-3 text-blue-600">5. Contact Us</h2>
        <p className="text-lg mb-3 text-gray-700 leading-relaxed">
          If you have any questions or concerns regarding these Terms of Use,
          please feel free to contact us at{" "}
          <a href="mailto:contact@etha.app" className="text-blue-500 underline">
            contact@etha.app
          </a>
          .
        </p>
      </section>

      <p className="text-lg mb-3 text-gray-700 leading-relaxed">
        By using Geoquiz, you agree to these Terms of Use. Thank you for
        choosing Geoquiz!
      </p>
    </div>
  </main>
);

export default TermsOfUseGeoquiz;
