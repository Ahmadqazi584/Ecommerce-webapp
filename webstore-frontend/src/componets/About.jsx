import React from 'react';
import AboutPageBanner from '../assets/aboutus-banner.jpg';
import { Card, CardContent, Typography, Button } from '@mui/material';

const About = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-36 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">About Blataz</h1>
          <p className="text-lg sm:text-xl">
            We’re on a mission to make online shopping seamless, stylish, and affordable.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <img
            src={AboutPageBanner}
            alt="Our mission"
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600 text-lg mb-6">
              At ShopZone, we aim to provide top-quality products with an exceptional shopping experience.
              Our goal is to make every purchase memorable with great service, fast shipping, and easy returns.
            </p>
            <Button variant="contained" color="primary">Learn More</Button>
          </div>
        </div>
      </section>

      {/* Values or Team Section */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Why Shop With Us?</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { title: "Trusted Products", desc: "We curate only the most reliable, quality items." },
              { title: "Fast Delivery", desc: "Lightning-fast shipping to your doorstep." },
              { title: "Customer Support", desc: "Our support team is here 24/7 for you." }
            ].map((item, index) => (
              <Card key={index} className="shadow-lg">
                <CardContent>
                  <Typography variant="h6" gutterBottom>{item.title}</Typography>
                  <Typography variant="body2" color="textSecondary">{item.desc}</Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
