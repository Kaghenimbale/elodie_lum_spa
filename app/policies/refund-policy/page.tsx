import React from "react";

const page = () => {
  return (
    <div>
      <section className="px-4 py-8 md:px-16 lg:px-32 bg-gray-50 text-gray-800 mt-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="[1.8rem] md:text-[2.25rem] font-bold mb-6 text-center">
            Refund Policy
          </h1>

          <div className="space-y-4 text-base md:text-lg leading-relaxed">
            <p>
              <strong>We do not offer refunds</strong> on any services,
              memberships, packages, or products.
            </p>

            <p>
              Please contact management to discuss alternative solutions if
              needed.
            </p>

            <p>
              <strong>Exchanges</strong> on new, unopened products are available
              within 7 days. Any damages occurring after leaving the store are
              the customer's responsibility.
            </p>

            <h2 className="text-xl font-semibold mt-6">
              Non-Refundable Deposits and Prepayments:
            </h2>
            <p>
              All deposits and prepayments made to{" "}
              <strong>Elodi@ beauty&spa</strong> are non-refundable. This
              includes:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Service deposits when booking an appointment</li>
              <li>Deposits for product purchase holds</li>
              <li>Deposits for academy training registrations and products</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
