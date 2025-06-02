
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Home } from 'lucide-react';

interface BreadcrumbNavProps {
  toolName?: string;
  category?: string;
  customItems?: Array<{
    label: string;
    href?: string;
  }>;
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ toolName, category, customItems }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  // Generate breadcrumb items based on the current route
  const generateBreadcrumbItems = () => {
    const items: Array<{ label: string; href?: string }> = [
      { label: 'Home', href: '/' }
    ];

    if (customItems) {
      items.push(...customItems);
      return items;
    }

    // Handle different route patterns
    if (pathSegments[0] === 'categories') {
      items.push({ label: 'Categories', href: '/categories' });
      if (category) {
        items.push({ label: category, href: `/categories/${encodeURIComponent(category)}` });
      }
    } else if (pathSegments[0] === 'tool') {
      items.push({ label: 'AI Tools', href: '/categories' });
      if (category) {
        items.push({ label: category, href: `/categories/${encodeURIComponent(category)}` });
      }
      if (toolName) {
        items.push({ label: toolName });
      }
    } else if (pathSegments[0] === 'compare') {
      items.push({ label: 'Compare Tools', href: '/compare' });
    } else if (pathSegments[0] === 'blog') {
      items.push({ label: 'Blog', href: '/blog' });
    }

    return items;
  };

  const breadcrumbItems = generateBreadcrumbItems();

  return (
    <div className="mb-6">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbItems.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {item.href ? (
                  <BreadcrumbLink asChild>
                    <Link to={item.href} className="flex items-center">
                      {index === 0 && <Home className="h-4 w-4 mr-1" />}
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbNav;
