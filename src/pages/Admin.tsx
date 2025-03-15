
import { useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { DataMigration } from "@/components/admin/DataMigration";
import { Helmet } from "react-helmet-async";
import { ScrollToTop } from "@/components/common/ScrollToTop";

const Admin = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Admin Dashboard | AI Tools Directory</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-foreground/70 max-w-3xl">
              Manage your AI tools database and perform administrative tasks.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">Data Management</h2>
              <DataMigration />
            </section>
          </div>
        </div>
      </main>
      
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default Admin;
