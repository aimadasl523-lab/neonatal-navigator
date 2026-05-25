import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  BookOpen,
  FileSearch,
  ClipboardCheck,
  Brain,
  GitBranch,
  Sparkles,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { modules } from "@/data/content";

const mainItems = [
  { title: "Tableau de bord", url: "/", icon: LayoutDashboard },
  { title: "Modules", url: "/modules", icon: BookOpen },
  { title: "Protocoles", url: "/protocoles", icon: FileSearch },
  { title: "Compétences", url: "/competences", icon: ClipboardCheck },
  { title: "Quiz", url: "/quiz", icon: Brain },
  { title: "Algorithmes", url: "/algorithmes", icon: GitBranch },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const path = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (url: string) => (url === "/" ? path === "/" : path.startsWith(url));

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2 px-2 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-bold text-sidebar-foreground">NéoFiches</span>
              <span className="text-[10px] text-muted-foreground">Néonatologie & Pédiatrie</span>
            </div>
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Domaines</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {modules.map((m) => (
                <SidebarMenuItem key={m.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={path === `/modules/${m.id}`}
                    tooltip={m.title}
                  >
                    <Link to="/modules/$moduleId" params={{ moduleId: m.id }} className="flex items-center gap-2">
                      <m.icon className="h-4 w-4" />
                      {!collapsed && <span className="truncate">{m.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
