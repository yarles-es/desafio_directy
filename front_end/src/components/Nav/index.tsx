import { Link, useLocation } from "react-router-dom";

const arrayLinks = [
  { name: "Inicio", path: "/" },
  { name: "Contador", path: "/counter" },
  { name: "Tabela", path: "/counter-table" },
];

const Nav = () => {
  const location = useLocation();

  return (
    <div className="mb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between items-center">
      <nav className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
        <ol className="flex items-center gap-2">
          {arrayLinks.map((link, index) => {
            const isActive = location.pathname === link.path;

            return (
              <li key={index}>
                <Link
                  className={`font-medium hover:text-gray-300 dark:hover:text-gray-200 ${
                    isActive ? "text-white font-semibold" : ""
                  }`}
                  to={link.path}
                >
                  {link.name}
                </Link>
                {index < arrayLinks.length - 1 && " / "}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default Nav;
