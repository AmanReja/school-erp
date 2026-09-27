import React from "react";

const devices = [
  {
    name: "Linux",
    value: 18000,
  },
  {
    name: "Mac",
    value: 31000,
  },
  {
    name: "iOS",
    value: 22000,
  },
  {
    name: "Windows",
    value: 35000,
  },
  {
    name: "Android",
    value: 14000,
  },
  {
    name: "Other",
    value: 26000,
  },
];

const DeviceTraffic = () => {
  const maxValue = Math.max(
    ...devices.map((item) => item.value)
  );

  return (
    <div className="rounded-2xl bg-gray-50 p-5">

      <h3 className="mb-6 text-sm font-semibold">
        Traffic by Device
      </h3>

      <div className="flex h-[220px] items-end justify-between gap-3 px-3">

        {devices.map((device) => {

          const height =
            (device.value / maxValue) * 100;

          return (
            <div
              key={device.name}
              className="flex h-full flex-1 flex-col items-center justify-end"
            >

              <div
                className="w-full max-w-[28px] rounded-t-lg bg-gray-300"
                style={{
                  height: `${height}%`,
                }}
              />

              <span className="mt-3 text-[11px] text-gray-400">
                {device.name}
              </span>

            </div>
          );
        })}

      </div>

    </div>
  );
};

export default DeviceTraffic;