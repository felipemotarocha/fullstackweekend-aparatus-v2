import Image from "next/image";
import { notFound } from "next/navigation";
import { Smartphone } from "lucide-react";
import { getBarbershopById } from "@/data/barbershops";
import { PageSectionTitle } from "@/components/ui/page";
import ServiceItem from "@/components/service-item";
import BackButton from "./_components/back-button";
import CopyButton from "./_components/copy-button";

const BarbershopPage = async ({ params }: PageProps<"/barbershops/[id]">) => {
  const { id } = await params;
  const barbershop = await getBarbershopById(id);

  if (!barbershop) {
    notFound();
  }

  return (
    <div>
      {/* Banner Header */}
      <div className="relative h-[297px] w-full">
        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          className="object-cover"
        />
        <BackButton />
      </div>

      {/* Container */}
      <div className="bg-background relative z-10 -mt-9 rounded-t-3xl">
        {/* Barbershop Info */}
        <div className="flex flex-col gap-1 px-5 pt-6">
          <div className="flex items-center gap-1.5">
            <div className="relative size-[30px] shrink-0">
              <Image
                src={barbershop.imageUrl}
                alt={barbershop.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <h1 className="text-xl font-bold">{barbershop.name}</h1>
          </div>
          <p className="text-muted-foreground text-sm">{barbershop.address}</p>
        </div>

        {/* Divider */}
        <div className="py-6">
          <div className="bg-border h-px w-full" />
        </div>

        {/* Sobre Nós */}
        <div className="flex flex-col gap-3 px-5">
          <PageSectionTitle>Sobre Nós</PageSectionTitle>
          <p className="text-sm">{barbershop.description}</p>
        </div>

        {/* Divider */}
        <div className="py-6">
          <div className="bg-border h-px w-full" />
        </div>

        {/* Serviços */}
        <div className="flex flex-col gap-3 px-5">
          <PageSectionTitle>Serviços</PageSectionTitle>
          <div className="flex flex-col gap-3">
            {barbershop.services.map((service) => (
              <ServiceItem
                key={service.id}
                service={service}
                barbershopName={barbershop.name}
              />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="py-6">
          <div className="bg-border h-px w-full" />
        </div>

        {/* Contato */}
        <div className="flex flex-col gap-3 px-5">
          <PageSectionTitle>Contato</PageSectionTitle>
          {barbershop.phones.map((phone, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Smartphone className="size-6" />
                <p className="text-sm">{phone}</p>
              </div>
              <CopyButton text={phone} />
            </div>
          ))}
        </div>

        {/* Footer spacing */}
        <div className="pt-[60px]" />
      </div>
    </div>
  );
};

export default BarbershopPage;
