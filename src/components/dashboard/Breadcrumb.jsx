import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function BreadcrumbComponent({ links }) {
  return (
    <Breadcrumb className="flex items-center">
      {links.map((link, index) => (
        <BreadcrumbList key={index} className="text-white">
          <>
            <BreadcrumbItem>
              <BreadcrumbLink href={link.url}>{link.title}</BreadcrumbLink>
            </BreadcrumbItem>
            {index < links.length - 1 && <BreadcrumbSeparator />}
          </>
        </BreadcrumbList>
      ))}
    </Breadcrumb>
  );
}

export default BreadcrumbComponent;
