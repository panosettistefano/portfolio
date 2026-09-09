import React from 'react';

export const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-12 pb-32">
      <h1 className="futura-bold-oblique text-6xl md:text-8xl mb-16 uppercase tracking-tighter border-b-8 border-black pb-6 leading-none">Privacy Policy</h1>
      <div className="space-y-12 text-sm font-bold leading-relaxed uppercase tracking-tight">
        <section>
          <h2 className="text-2xl mb-6">1. Data Collection</h2>
          <p className="opacity-60 leading-loose">Supreme Core collects minimal data necessary for order processing. This includes name, shipping address, and email. We do not store payment information on our servers.</p>
        </section>
        <section>
          <h2 className="text-2xl mb-6">2. Data Usage</h2>
          <p className="opacity-60 leading-loose">Your data is used exclusively to fulfill your orders and provide customer support. We do not sell or share your personal information with third parties for marketing purposes.</p>
        </section>
        <section>
          <h2 className="text-2xl mb-6">3. Security</h2>
          <p className="opacity-60 leading-loose">We implement industry-standard security measures to protect your data. All transactions are processed through secure, encrypted gateways.</p>
        </section>
        <section>
          <h2 className="text-2xl mb-6">4. Your Rights</h2>
          <p className="opacity-60 leading-loose">You have the right to access, correct, or delete your personal data at any time. Contact our support team for any data-related requests.</p>
        </section>
      </div>
    </div>
  );
};
