// components/Breadcrumb.js
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function BreadcrumbComponent({ links }) {
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-white">
        {links.map((link, index) => (
          <>
            <BreadcrumbItem key={link.id}>
              <BreadcrumbLink href={link.url}>{link.title}</BreadcrumbLink>
            </BreadcrumbItem>
            {index < links.length - 1 && <BreadcrumbSeparator />}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default BreadcrumbComponent;
