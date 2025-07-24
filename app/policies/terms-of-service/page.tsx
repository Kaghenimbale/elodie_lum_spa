import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <section className="px-4 py-10 md:px-16 lg:px-32 bg-white text-gray-800 mt-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="[1.8rem] md:text-[2.25rem] font-bold mb-8 text-center">
            Terms of Service
          </h1>

          <div className="space-y-8 text-base md:text-lg leading-relaxed">
            {/* Appointment Arrival Time */}
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Appointment Arrival Time
              </h2>
              <p>
                Please arrive on time for your appointment. Any arrival later
                than 15 minutes will be considered a no-show and must be
                rescheduled.
              </p>
              <p>All no-show appointments will be charged at 100%.</p>
            </div>

            {/* Refund Policy */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Refund Policy</h2>
              <p>
                We do not offer refunds on any services, memberships, packages,
                or products.
              </p>
              <p>
                Please contact management to discuss alternative solutions if
                needed.
              </p>
              <p>
                Exchanges on new, unopened products are available within 7 days.
                Any damages occurring after leaving the store are the customer's
                responsibility.
              </p>
            </div>

            {/* Non-Refundable Deposits */}
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Non-Refundable Deposits and Prepayments
              </h2>
              <p>
                All deposits and prepayments made to{" "}
                <strong>Elodi@ beauty&spa</strong> are non-refundable. This
                includes:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Service deposits when booking an appointment</li>
                <li>Deposits for product purchase holds</li>
                <li>
                  Deposits for academy training registrations and products
                </li>
              </ul>
            </div>

            {/* Cancellation Policy */}
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Cancellation Policy
              </h2>
              <p>
                Cancellations for any appointment must be made 72 hours prior to
                your appointment time. Failure to do so will result in a 50%
                cancellation fee.
              </p>
            </div>

            {/* Booking Accuracy */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Booking Accuracy</h2>
              <p>
                Please exercise caution when booking online. Ensure you select
                the correct location and verify the address from the drop-down
                menu in our booking system.
              </p>
              <p>
                Input the correct city in your GPS and allow sufficient time for
                parking.
              </p>
            </div>

            {/* Same-Day Cancellations */}
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Same-Day Cancellations
              </h2>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>
                  Any prepaid service appointment canceled on the same day
                  within the 72-hour period or no-showed will result in the
                  forfeiture of that session.
                </li>
                <li>
                  As an alternative, we can accept 100% deposits by transfer or
                  phone payment before booking your appointment.
                </li>
                <li>No deposit or card on file, no appointment.</li>
              </ul>
            </div>

            {/* Complaints or Concerns */}
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Complaints or Concerns
              </h2>
              <p>
                Any complaints or concerns after an appointment must be brought
                to the attention of the managing staff within 48 hours. Please
                contact Elodie directly at <br />
                <strong>
                  <Link href="tel:+14376650194" className="hover:underline">
                    Phone: +1 (437) 665-0194
                  </Link>
                </strong>
                .
              </p>
            </div>

            {/* Late Arrival Fee */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Late Arrival Fee</h2>
              <p>
                If you are 10–15 minutes late, a $10 late fee will be required
                for rescheduling the remaining appointments for the day.
              </p>
            </div>

            {/* Thank You Note */}
            <div>
              <p>Thank you for your understanding and cooperation.</p>
              <p className="font-semibold mt-2">
                Elva Aesthetics Management & Staff
              </p>
            </div>

            {/* Model Policy */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Model Policy</h2>
              <p>
                Models receiving a free or discounted service consent to
                pictures and videos being taken for social media purposes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
