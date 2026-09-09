import React from 'react';

export const CookiePolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-12 pb-32">
      <h1 className="futura-bold-oblique text-6xl md:text-8xl mb-16 uppercase tracking-tighter border-b-8 border-black pb-6 leading-none">Cookie Policy</h1>
      <div className="space-y-12 text-sm font-bold leading-relaxed uppercase tracking-tight">
        <section>
          <h2 className="text-2xl mb-6">1. What are Cookies?</h2>
          <p className="opacity-60 leading-loose">Cookies are small text files stored on your device when you visit our website. They help us provide a better shopping experience.</p>
        </section>
        <section>
          <h2 className="text-2xl mb-6">2. Essential Cookies</h2>
          <p className="opacity-60 leading-loose">We use essential cookies to manage your shopping cart and session state. These are necessary for the website to function correctly.</p>
        </section>
        <section>
          <h2 className="text-2xl mb-6">3. Performance Cookies</h2>
          <p className="opacity-60 leading-loose">We may use performance cookies to understand how visitors interact with our site, helping us optimize the user experience.</p>
        </section>
        <section>
          <h2 className="text-2xl mb-6">4. Managing Cookies</h2>
          <p className="opacity-60 leading-loose">You can manage or disable cookies through your browser settings. Note that disabling essential cookies may affect site functionality.</p>
        </section>
      </div>
    </div>
  );
};
