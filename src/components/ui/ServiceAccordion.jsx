import * as Accordion from "@radix-ui/react-accordion";

export default function ServiceAccordion() {
  return (
    <Accordion.Root
      type="single"
      collapsible
      className="bg-white rounded-3xl shadow-lg border border-gray-100 mb-6 overflow-hidden"
    >

      <Accordion.Item value="item-1">

        <Accordion.Trigger className="w-full px-6 py-5 text-left font-bold text-lg hover:bg-gray-50 border-b">
          ✂️ Classic Haircut
        </Accordion.Trigger>

        <Accordion.Content className="px-6 py-4 text-gray-600">
          Professional haircut service with premium styling and consultation.
        </Accordion.Content>

      </Accordion.Item>

      <Accordion.Item value="item-2">

        <Accordion.Trigger className="w-full px-6 py-5 text-left font-bold text-lg hover:bg-gray-50 border-b">
          🎨 Hair Coloring
        </Accordion.Trigger>

        <Accordion.Content className="px-6 py-4 text-gray-600">
          Modern coloring techniques with premium products.
        </Accordion.Content>

      </Accordion.Item>

      <Accordion.Item value="item-3">

        <Accordion.Trigger className="w-full px-6 py-5 text-left font-bold text-lg hover:bg-gray-50">
          🧔 Beard Trim
        </Accordion.Trigger>

        <Accordion.Content className="px-6 py-4 text-gray-600">
          Precision beard trimming and shaping by professional barbers.
        </Accordion.Content>

      </Accordion.Item>

    </Accordion.Root>
  );
}