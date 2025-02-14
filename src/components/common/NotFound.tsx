import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "../button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="grid place-items-center h-screen bg-background rounded-lg border">
      <div className="text-center space-y-6">
        <h1 className="text-8xl font-bold text-primary font-mono">404</h1>
        <p className="text-muted-foreground"> Oops! The page you're looking for doesn't exist.</p>
        <Button
          onClick={() => navigate("/")}
          className="inline-flex items-center text-white gap-2 px-6 py-2 bg-primary  rounded hover:bg-primary/90 transition-colors"
        >
          <Home className="w-4 h-4" />
          Return Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
