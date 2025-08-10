import { motion } from "framer-motion";
import { Home, Grid, Package } from "lucide-react";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: Grid },
  { href: "/files", label: "Files", icon: Package },
];


export default function Dock() {
  return (
    <nav
      className="fixed left-1/2 -translate-x-1/2 z-50"
      style={{ bottom: `20px` }}
      aria-label="Floating Dock"
    >
      <ul
        className="flex gap-2 p-2 rounded-2xl border border-white/10 bg-zinc-900/60 backdrop-blur-md shadow-xl"
        role="menubar"
      >
        {items.map(({ href, label, icon: Icon }) => (
          <li role="none" key={href}>
            <motion.a
              href={href}
              role="menuitem"
              aria-label={label}
              className="group relative grid place-items-center w-14 h-14 rounded-xl text-white select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 hover:bg-white/10 focus-visible:bg-white/10"
              whileHover={{ scale: 1.35, translateY: -6, transition: { type: "spring", stiffness: 300 } }}
              whileFocus={{ scale: 1.35, translateY: -6, transition: { type: "spring", stiffness: 300 } }}
              initial={{ scale: 1, translateY: 0 }}
              animate={{ scale: 1, translateY: 0 }}
            >
              <Icon aria-hidden="true" className="w-6 h-6" strokeWidth={1.5} />
              <span
                className="pointer-events-none absolute left-1/2 -translate-x-1/2 -translate-y-1 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-150 bottom-full mb-2 px-2 py-1 rounded-md bg-zinc-900 text-zinc-100 text-xs shadow-lg"
                aria-hidden="true"
              >
                {label}
              </span>
            </motion.a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
