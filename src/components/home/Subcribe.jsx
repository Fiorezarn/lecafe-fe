import { Button } from "../ui/button";
import { Input } from "../ui/input";

function Subcribe() {
  return (
    <section className="bg-earth6 py-16">
      <div className="container mx-auto px-6 lg:px-20 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 font-mono">
          Stay Updated!
        </h2>
        <p className="text-gray-600 text-lg mb-8 font-sour">
          Subscribe to our newsletter and never miss any updates or special
          offers.
        </p>
        <form className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Input
            type="email"
            className="w-full md:w-[400px] px-4 py-2 border font-mono border-gray-300 rounded-md focus:ring-2 focus:ring-earth3 focus:outline-none"
            placeholder="Enter your email address"
            required
          />
          <Button className="px-6 py-2 bg-earth3 text-white font-medium rounded-md hover:bg-earth4 transition-colors duration-300">
            Subscribe
          </Button>
        </form>
        <p className="text-gray-500 text-sm mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}

export default Subcribe;
