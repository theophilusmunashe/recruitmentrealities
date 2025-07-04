"use client";

import clsx from "clsx";
import { PropsWithChildren } from "react";
import { Logo } from "../logo";

// Static footer configuration - EDIT THESE VALUES
const footerConfig = {
  copyright: "© 2024 Recruitment Realities. All rights reserved.",
  showLogo: true, // Set to false if you don't want to show the logo
};

export function WaitlistWrapper({ children }: PropsWithChildren) {
  return (
    <div
      className={clsx(
        "w-full mx-auto max-w-[500px] flex flex-col justify-center items-center bg-gray-1/85 pb-0 overflow-hidden rounded-2xl",
        "shadow-[0px_170px_48px_0px_rgba(18,_18,_19,_0.00),_0px_109px_44px_0px_rgba(18,_18,_19,_0.01),_0px_61px_37px_0px_rgba(18,_18,_19,_0.05),_0px_27px_27px_0px_rgba(18,_18,_19,_0.09),_0px_7px_15px_0px_rgba(18,_18,_19,_0.10)]"
      )}
    >
      <div className="flex flex-col items-center gap-0 flex-1 text-center w-full p-4 sm:p-8 pb-16 sm:pb-20">
        {footerConfig.showLogo && (
          <div>
            <Logo priority className="mx-auto" />
          </div>
        )}
        <div className="flex flex-col gap-4">{children}</div>
      </div>
      <footer className="flex justify-center items-center w-full self-stretch px-8 py-3 text-sm bg-gray-12/[.07] overflow-hidden">
        <p className="text-xs text-slate-10">{footerConfig.copyright}</p>
      </footer>
    </div>
  );
}
