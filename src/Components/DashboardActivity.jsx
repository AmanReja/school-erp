import React from "react";
import {
  Bug,
  UserPlus,
  Radio,
  Palette,
  Rocket,
  FileWarning,
  FileEdit,
  Trash2,
} from "lucide-react";

const notifications = [
  {
    icon: Bug,
    title: "You fixed a bug.",
    time: "Just now",
  },
  {
    icon: UserPlus,
    title: "New user registered.",
    time: "59 minutes ago",
  },
  {
    icon: Bug,
    title: "You fixed a bug.",
    time: "12 hours ago",
  },
  {
    icon: Radio,
    title: "Andi Lane subscribed to you.",
    time: "Today, 11:59 AM",
  },
];

const activities = [
  {
    icon: Palette,
    title: "Changed the style.",
    time: "Just now",
  },
  {
    icon: Rocket,
    title: "Released a new version.",
    time: "59 minutes ago",
  },
  {
    icon: FileWarning,
    title: "Submitted a bug.",
    time: "12 hours ago",
  },
  {
    icon: FileEdit,
    title: "Modified A data in Page X.",
    time: "Today, 11:59 AM",
  },
  {
    icon: Trash2,
    title: "Deleted a page in Project X.",
    time: "Feb 2, 2026",
  },
];

const contacts = [
  "Natali Craig",
  "Drew Cano",
  "Andi Lane",
  "Koray Okumus",
  "Kate Morrison",
  "Melody Macy",
];

const DashboardActivity = () => {
  return (
    <aside className="hidden w-[270px] shrink-0 border-l border-gray-200 bg-white xl:block">

      <div className="h-screen overflow-y-auto px-5 py-7">

        {/* NOTIFICATIONS */}
        <ActivitySection title="Notifications">

          {notifications.map((item, index) => (
            <ActivityItem
              key={index}
              {...item}
            />
          ))}

        </ActivitySection>

        {/* ACTIVITIES */}
        <ActivitySection title="Activities">

          {activities.map((item, index) => (
            <ActivityItem
              key={index}
              {...item}
            />
          ))}

        </ActivitySection>

        {/* CONTACTS */}
        <ActivitySection title="Contacts">

          <div className="space-y-4">

            {contacts.map((contact) => (
              <div
                key={contact}
                className="flex items-center gap-3"
              >

                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 text-xs">
                  {contact.charAt(0)}
                </div>

                <span className="text-sm text-gray-700">
                  {contact}
                </span>

              </div>
            ))}

          </div>

        </ActivitySection>

      </div>

    </aside>
  );
};

const ActivitySection = ({
  title,
  children,
}) => {
  return (
    <section className="mb-8">

      <h3 className="mb-5 text-sm font-medium">
        {title}
      </h3>

      <div>
        {children}
      </div>

    </section>
  );
};

const ActivityItem = ({
  icon: Icon,
  title,
  time,
}) => {
  return (
    <div className="mb-5 flex gap-3">

      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100">
        <Icon size={14} />
      </div>

      <div className="min-w-0">

        <p className="text-sm text-gray-700">
          {title}
        </p>

        <p className="mt-0.5 text-xs text-gray-400">
          {time}
        </p>

      </div>

    </div>
  );
};

export default DashboardActivity;