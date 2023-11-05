import { Link } from "react-router-dom/cjs/react-router-dom.min";
import notFound from "./not-found.png";

export default function NotFoundPage() {
  return (
    <div>
      <h1 className="font-extrabold text-2xl text-center">OH NO!!! Looks like this page doesn't exist...</h1>
      <div className="flex justify-center">
        <Link to='/' className="rounded-lg btn btn-primary bg-primary_blue text-black my-4">Take me back home😩</Link>
      </div>
      <div>
        <img src={notFound} alt="not-found" />
      </div>
    </div>
  );
}
