export const metadata = {
  title: "Home: Work Manager",
  description: "Home page for Work Manager",
};

export default function Home() {
  return (
    <div className="container mx-auto px-8 py-12">
      <header>
        <title>Welcome to Work Manager</title>
      </header>

      <header className="text-center mb-8">
        <h1 className="text-6xl font-bold">Work Manager</h1>
        <p className="text-lg text-gray-600 mt-2">
          Your Tool for Efficient Work Management
        </p>
      </header>

      <section className="text-lg">
        <p>
          Welcome to Work Manager, your ultimate solution for managing tasks,
          projects, and workflows seamlessly.
        </p>
        <p className="mt-4">
          Stay organized, collaborate with your team, and keep track of your
          progress all in one place.
        </p>
        <p className="mt-4">
          Let's get started and make work management a breeze!
        </p>
      </section>

      <div className="w-1/5 mx-auto my-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className="h-auto animate-bounce"
        >
          {/* Replace this content with your SVG animation */}
          <circle cx="50" cy="50" r="40" fill="#3498db" />
        </svg>
      </div>
    </div>
  );
}
