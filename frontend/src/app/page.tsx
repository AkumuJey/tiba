import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-[95%] md:w-full mx-auto min-h-screen bg-transparent">
      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center bg-transparent py-[10rem] text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Tiba Healthcare</h1>
        <p className="text-lg mb-8">
          Providing quality healthcare for you and your family
        </p>
        <Link
          href="/appointments"
          className="px-6 py-3 bg-[#DDE2EE] text-[#1D2E5C] rounded-md font-semibold"
        >
          Book an Appointment
        </Link>
      </section>

      {/* About Us Section */}
      <section className="py-16 px-4 md:px-8 bg-transparent">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">About Us</h2>
          <p className="text-lg text-gray-700">
            Tiba Healthcare is committed to providing top-notch medical services
            to the community. Our team of experienced doctors and nurses are
            here to ensure your well-being and comfort. We offer a wide range of
            medical services tailored to meet your needs.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 md:px-8 bg-transparent">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-transparent rounded-md shadow-md">
              <h3 className="text-xl font-semibold mb-4">General Checkup</h3>
              <p className="text-gray-700">
                Regular health checkups are essential for maintaining good
                health. Schedule your checkup with us today.
              </p>
            </div>
            <div className="p-6 bg-transparent rounded-md shadow-md">
              <h3 className="text-xl font-semibold mb-4">Pediatrics</h3>
              <p className="text-gray-700">
                Our pediatric services ensure your children receive the best
                care from our specialized doctors.
              </p>
            </div>
            <div className="p-6 bg-transparent rounded-md shadow-md">
              <h3 className="text-xl font-semibold mb-4">Emergency Services</h3>
              <p className="text-gray-700">
                We provide 24/7 emergency services to handle any urgent medical
                needs you may have.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 md:px-8 bg-transparent">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
          <p className="text-lg text-gray-700 mb-4">
            Have questions or need to make an appointment? Reach out to us.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <div>
              <h3 className="text-xl font-semibold">Email</h3>
              <p className="text-gray-700">info@tibahealthcare.com</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Phone</h3>
              <p className="text-gray-700">+123 456 7890</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Address</h3>
              <p className="text-gray-700">
                123 Westland , Nairobi City, Kenya
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
