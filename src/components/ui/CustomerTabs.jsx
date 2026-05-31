import * as Tabs from "@radix-ui/react-tabs";

export default function CustomerTabs() {
  return (
    <Tabs.Root
      defaultValue="all"
      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 mb-6"
    >
      <Tabs.List className="flex gap-3 flex-wrap">

        <Tabs.Trigger
          value="all"
          className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition font-semibold"
        >
          All Customers
        </Tabs.Trigger>

        <Tabs.Trigger
          value="vip"
          className="px-5 py-2 rounded-xl bg-amber-100 text-amber-700 hover:bg-amber-200 transition font-semibold"
        >
          VIP Customers
        </Tabs.Trigger>

        <Tabs.Trigger
          value="regular"
          className="px-5 py-2 rounded-xl bg-blue-100 text-blue-700 hover:bg-blue-200 transition font-semibold"
        >
          Regular Customers
        </Tabs.Trigger>

      </Tabs.List>

      <Tabs.Content
        value="all"
        className="mt-4 text-gray-500"
      >
        Showing all customers in the CRM.
      </Tabs.Content>

      <Tabs.Content
        value="vip"
        className="mt-4 text-gray-500"
      >
        Showing VIP customers.
      </Tabs.Content>

      <Tabs.Content
        value="regular"
        className="mt-4 text-gray-500"
      >
        Showing regular customers.
      </Tabs.Content>

    </Tabs.Root>
  );
}