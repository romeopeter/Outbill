import { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  CirclesFour,
  User,
  UsersThree,
  Files,
  //   CaretDoubleRight,
  CaretDoubleLeft,
} from "@phosphor-icons/react";

/* -------------------------------------------------------- */

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-full bg-[var(--brand-blue-light)] p-1 flex gap-x-12">
      <div className="w-3xs bg-[var(--brand-black)] rounded-2xl text-white p-2.5">
        <header className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <FileText
              size="30px"
              weight="fill"
              className="mr-1 text-[var(--brand-blue)]"
            />

            <h1 className="text-2xl font-semibold">OutBill</h1>
          </div>

          <CaretDoubleLeft weight="duotone" className="cursor-pointer" />
        </header>

        <div>
          <div className="mb-2">
            <small className="uppercase leading-loose mb-2">Main</small>
            <div className="flex flex-col gap-y-2 text-[0.875rem] font-light ml-2">
              <Link
                to="/"
                className="rounded-lg p-2 flex items-center bg-[var(--brand-blue)]"
              >
                <CirclesFour className="text-xl mr-2" weight="duotone" />
                <span>Overview</span>
              </Link>

              <Link to="/invoices" className="rounded-lg p-2 flex items-center">
                <FileText className="text-xl mr-2" weight="duotone" />
                <span>Invoices</span>
              </Link>

              <Link
                to="/templates"
                className="rounded-lg p-2 flex items-center"
              >
                <Files className="text-xl mr-2" weight="duotone" />
                <span>Templates</span>
              </Link>
            </div>
          </div>

          <div>
            <small className="uppercase leading-loose mb-2">Other</small>
            <div className="flex flex-col text-[0.875rem] font-light ml-2">
              <Link to="/clients" className="rounded-lg p-2 flex items-center">
                <UsersThree className="text-xl mr-2" weight="duotone" />
                <span>Clients</span>
              </Link>

              <Link to="/profile" className="rounded-lg p-2 flex items-center">
                <User className="text-xl mr-2" weight="duotone" />

                <span>Profile</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
}
