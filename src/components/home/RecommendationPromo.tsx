
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const RecommendationPromo = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-12 bg-gradient-to-b from-secondary/10 to-background">
      <div className="container px-4">
        <Card className="overflow-hidden border-primary/20 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="md:col-span-3 p-8">
              <CardHeader className="p-0 mb-4">
                <div className="flex items-center mb-2">
                  <Sparkles className="h-6 w-6 text-primary mr-2" />
                  <p className="text-sm font-medium text-primary">AI-Powered</p>
                </div>
                <CardTitle className="text-2xl md:text-3xl font-bold">
                  Need help finding the perfect AI tool?
                </CardTitle>
                <CardDescription className="text-lg mt-2">
                  Our AI recommendation engine analyzes your specific requirements and suggests the best tools for your needs.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Simply describe what you're looking for, and our AI will recommend up to 4 tools tailored to your requirements - from content generation to data analysis, image creation to coding assistance.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button 
                      onClick={() => navigate("/recommend")}
                      size="lg"
                      className="mt-2"
                    >
                      Get Personalized Recommendations
                    </Button>
                  </div>
                </div>
              </CardContent>
            </div>
            <div className="md:col-span-2 bg-primary/5 flex items-center justify-center p-8">
              <div className="max-w-xs text-center">
                <Sparkles className="h-16 w-16 mx-auto mb-4 text-primary" />
                <h4 className="text-xl font-medium mb-2">How it works</h4>
                <ol className="text-left text-sm space-y-2">
                  <li className="flex items-start">
                    <span className="bg-primary/10 text-primary font-medium rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                    <span>Describe your specific requirements</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/10 text-primary font-medium rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                    <span>Our AI analyzes your needs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/10 text-primary font-medium rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                    <span>Get personalized tool recommendations</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default RecommendationPromo;
