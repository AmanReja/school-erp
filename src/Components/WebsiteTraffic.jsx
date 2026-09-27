import React from "react";

const websites = [
  {
    name: "Google",
    value: "42%",
  },
  {
    name: "YouTube",
    value: "28%",
  },
  {
    name: "Instagram",
    value: "18%",
  },
  {
    name: "Pinterest",
    value: "14%",
  },
  {
    name: "Facebook",
    value: "10%",
  },
  {
    name: "Twitter",
    value: "8%",
  },
];

const WebsiteTraffic = () => {
  return (
    <div className="rounded-2xl bg-gray-50 p-5">

      <h3 className="mb-6 text-sm font-semibold">
        Traffic by Website
      </h3>

      <div className="space-y-6">

        {websites.map((website) => (
          <div
            key={website.name}
            className="flex items-center justify-between"
          >

            <span className="text-sm text-gray-700">
              {website.name}
            </span>

            <div className="flex items-center gap-3">

              <div className="h-1 w-12 overflow-hidden rounded-full bg-gray-200">

                <div
                  className="h-full rounded-full bg-gray-800"
                  style={{
                    width: website.value,
                  }}
                />

              </div>

              <span className="w-8 text-right text-xs text-gray-400">
                {website.value}
              </span>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default WebsiteTraffic;